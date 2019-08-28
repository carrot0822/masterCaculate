<template>
  <div id="appointment">
    <section class="titleBox">
      <h2 class="title">图书预约记录</h2>
    </section>
    <!-- 按钮集合 -->
    <section class="changeBtnBox">
      <div class="searchBtn">
        <el-form :inline="true" :model="searchInput">
          <el-form-item size="130" label="创建时间:">
            <el-date-picker
              v-model="searchInput.beginTime"
              type="date"
              placeholder="开始日期"
              style="width: 200px"
              :picker-options="pickerOptions0"
            ></el-date-picker>
            <el-date-picker
              v-model="searchInput.endTime"
              type="date"
              placeholder="结束日期"
              style="width: 200px"
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <!-- 表格数据与分页 -->
    <section class="tableBox">
      <div class="table">
        <el-table
          :header-cell-style="tableObj.headerCellSty"
          empty-text="无数据"
          style="width: 100%; text-align:center;"
          :data="tableObj.tableData"
          :row-style="tableObj.rowStyle"
          @selection-change="selectAll"
        >
          <el-table-column align="center" type="selection" width="100"></el-table-column>
          <el-table-column align="center" prop="index" type="index" width="100" label="序号">
            <template slot-scope="scope">
              <span>{{(pagationObj.currentPage - 1) * pagationObj.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="bookName"
            label="书籍名称"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="fkLibraryName"
            label="取书馆"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="预约登记时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="updateTime"
            label="预约生效时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="updateTime"
            label="预约失效时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="fkReaderName"
            label="取书人"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="200">
            <!-- 这里的scope代表着什么 index是索引 row则是这一行的对象 -->
            <template slot-scope="scope">
              <span class="revise" @click="rescindBtn(scope.$index, scope.row)">撤销</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagationBox">
        <el-pagination
          background
          layout="prev, pager, next,total,slot"
          :total=" pagationObj.total"
          :page-size=" pagationObj.pageSize"
          :current-page="pagationObj.currentPage"
          @current-change="current_change"
        >
          <slot>
            <span class="el-pagination__jump">
              前往
              <div class="el-input el-pagination__editor is-in-pagination">
                <input
                  ref="text"
                  v-model.number="pagationObj.pageInput"
                  autocomplete="off"
                  class="compo el-input__inner"
                />
              </div>页
            </span>
          </slot>
        </el-pagination>
        <el-button type="primary" class="ml_30" size="medium" @click="jumpBtn">确定</el-button>
      </div>
    </section>
    <!-- 弹框 -->

    <!-- 否定弹框 只有确定和取消的弹框 -->
    <section class="waringDialog">
      <el-dialog
        :title="warDialog.title[warIndex]"
        :visible.sync="warDialog.display"
        width="400px"
        center
      >
        <div class="warBody">
          <el-form label-width="50px">
            <el-form-item label="备注:">
              <el-input
                type="textarea"
                v-model="warDialog.remark"
                :rows="4"
                resize="none"
                :autosize="{minRows:4,maxRows: 4}"
                placeholder="请输入备注(请限制文字在0~20个文字)"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="dialogBody">是否{{warDialog.title[warIndex]}}?</div> -->
        <div style="margin-bottom: 20px">
          <span class="dialogButton true mr_40" @click="warBtn">确 定</span>
          <span class="dialogButton cancel" @click="warDialog.display=false">取 消</span>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { appointmentInt } from "@request/api/opac/appoinment";
export default {
  data() {
    /*------ 校检规则 ------*/
    /*  var checkCode = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value > 100) {
              callback(new Error('馆藏码小于100'));
            } else {
              callback();
            }
          }
        }, 1000);
      }; */
    return {
      /*------ 非弹框数据 ------*/

      // 查询表单
      searchInput: {
        beginTime: "", // 选择框
        endTime: "" // 输入框
      },
      pickerOptions0: {
        disabledDate: time => {
          if (this.searchInput.endTime) {
            let second = new Date(
              Date.parse(this.searchInput.endTime.replace(/-/g, "/"))
            );
            return (
              time.getTime() > Date.now() || time.getTime() > second.getTime()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          if (this.searchInput.beginTime) {
            let frist = new Date(
              Date.parse(this.searchInput.beginTime.replace(/-/g, "/"))
            );
            return (
              time.getTime() < frist.getTime() || time.getTime() > Date.now()
            );
          }
        }
      },
      searchForm: {
        beginTime: "",
        endTime: "",
        pageSize: 10,
        currentPage: 1
      },
      // 表格DOM数据
      tableObj: {
        tableData: [], // 表格数据
        headerCellSty: {
          background: "#0096FF",
          color: "#fff",
          height: "60px",
          fontSize: "14px",
          borderRight: "none"
        },
        rowStyle: { height: "60px" },
        selectAll: []
      },
      //分页DOM
      pagationObj: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageInput: 1
      },
      /*------ 弹框数据 ------*/

      // war:waring
      warIndex: 0, // 控制标题
      warDialog: {
        display: false,
        title: ["撤销预约"],
        id: "",
        remark: ""
      }
    };
  },
  computed: {
    pageCount() {
      let pageSize = 10;
      let all = parseInt(this.pagationObj.total);
      return Math.ceil(all / pageSize);
    }
  },
  methods: {
    /*------ 通信框架函数 ------*/
    selectCheck() {},
    selectAll(val) {
      let arr = [];
      for (let item of val) {
        arr.push(item.id);
      }
      this.tableObj.selectAll = arr;
      console.log("全选的内容", val);
    },
    current_change(val) {
      this.searchForm.currentPage = val;
      this.pagationObj.currentPage = val;
      this._search(this.searchForm);
      console.log(val);
    },
    jumpBtn() {
      let pageNum = this.pagationObj.pageInput;
      if (typeof pageNum != "number") {
        this.pagationObj.pageInput;
      }
      if (pageNum < 0 || pageNum > this.pageCount) {
        this.pagationObj.pageInput = 1;
        this.$refs.text.value = 1;
      } else {
        this.pagationObj.pageInput = parseInt(pageNum);
        this.$refs.text.value = parseInt(pageNum);
      }
      this.searchForm.currentPage = this.pagationObj.pageInput;
      this.pagationObj.currentPage = this.pagationObj.pageInput;
      this._search(this.searchForm);
    },
    rescindBtn(index, row) {
      console.log(row, "撤销的");
      this.warIndex = 0;
      this.warDialog.display = true;
      this.warDialog.id = row.id;
    },
    /*------ 非弹框触发按钮 ------*/
    searchBtn() {
      this.searchForm = Object.assign(this.searchForm, this.searchInput);
      this._search(this.searchForm);
      console.log(this.searchInput);
    },

    pagationBtn() {},
    /*------ 弹框按钮 ------*/

    warBtn() {
      let obj = {};
      obj.id = this.warDialog.id;
      obj.remark = this.warDialog.remark;
      this._rescind(obj);
      console.log(obj);
    },
    /*------ api ------*/

    _search(obj) {
      let data = obj;
      appointmentInt.search(data).then(res => {
        if (res.data.state == true) {
          this.tableObj.tableData = res.data.row;
          this.pagationObj.total = res.data.total;
        }
        console.log(res, "查询");
      });
    },
    _rescind(obj) {
      let data = obj;
      appointmentInt.rescind(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    /*------ 过滤函数 filter ------*/
    clearValue(obj) {
      // 不使用for in 避免遍历出原型属性
      let { keys, values, entries } = Object;

      for (let key of keys(obj)) {
        obj[key] = "";
      }
    }
  },
  created() {
    this._search();
  }
};
</script>

<style lang="scss" scoped>
#appointment {
  background-color: #ffffff;
  padding: 30px;
  .titleBox {
    margin-bottom: 35px;
    .title {
      padding-left: 5px;
      border-left: 4px;
      border-left-color: #0096ff;
      border-left-style: solid;
      font-size: 16px;
      color: #878787;
    }
  }
  .changeBtnBox {
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .oprateBtn {
      button {
        padding-left: 18px;
        padding-right: 18px;
        height: 40px;
        font-size: 16px;
        color: #fff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: none;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: 0.1s;
        transition: 0.1s;
        font-weight: 500;
      }
      .addBtn {
        background: rgba(255, 146, 49, 1);
        border-radius: 10px;
        margin-right: 10px;
      }
      .deleteBtn {
        background: rgba(255, 92, 60, 1);
        border-radius: 10px;
        margin-right: 10px;
      }
    }
    .searchBtn {
    }
  }
  .tableBox {
    .table {
      margin-bottom: 50px;
      .revise {
        cursor: pointer;
        color: #0096ff;
      }
    }
    .pagationBox {
      display: flex;
      flex-basis: row;
      justify-content: center;
      align-items: center;
    }
  }
  #changeDialog {
    .dialogBoxBtn {
      text-align: center;
    }
  }
  .waringDialog {
    .dialogBody {
      text-align: center;
      font-size: 16px;
      margin-top: 15px;
      margin-bottom: 30px;
    }
  }
}
</style>

<style lang="scss">
#appointment {
  .changeBtnBox {
    .searchBtn {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>