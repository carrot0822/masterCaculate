<template>
  <div id="orderNum">
    <section class="titleBox">
      <h2 class="title">历史订单记录</h2>
    </section>
    <!-- 按钮集合 -->
    <section class="changeBtnBox">
      <div class="searchBtn">
        <el-form :inline="true" :model="searchTime">
          <el-form-item label="筛选 :">
            <el-select
              style="width: 150px"
              v-model="searchInput.option"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,index) of searchOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-model="searchInput.search"
              placeholder="请输入相关信息"
              clearable
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item size="130" label="创建时间:">
            <el-date-picker
              v-model="searchTime.beginTime"
              type="date"
              placeholder="开始日期"
              style="width: 200px"
              :picker-options="pickerOptions0"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-date-picker
              v-model="searchTime.endTime"
              type="date"
              placeholder="结束日期"
              style="width: 200px"
              :picker-options="pickerOptions1"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
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
        >
          <el-table-column fixed align="center" prop="index" type="index" width="100" label="序号">
            <template slot-scope="scope">
              <span>{{(pagationObj.currentPage - 1) * pagationObj.pageSize + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="orderNumber"
            label="订单号"
            :show-overflow-tooltip="true"
            width="300"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="entranceGuardName"
            label="设备名称"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="entranceGuardNum"
            label="设备号"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="交易产生时间"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="toState"
            label="状态"
            width="80"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="toMoney"
            label="金额"
            width="80"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="reason" label="错误说明" :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column align="center" label="操作" fixed="right" width="200">
            
            <template slot-scope="scope">
              <span class="revise" @click="dealBtn(scope.$index, scope.row)">处理</span>
            </template>
          </el-table-column> -->
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
        <!-- <div class="warBody">
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
        </div> -->
        <div class="dialogBody">是否{{warDialog.title[warIndex]}}?</div>
        <div style="margin-bottom: 20px">
          <span class="dialogButton true mr_40" @click="warBtn">确 定</span>
          <span class="dialogButton cancel" @click="warDialog.display=false">取 消</span>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { orderNumInt } from "@request/api/Finance/orderNum.js";
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
      searchTime: {
        beginTime: "", // 选择框
        endTime: "" // 输入框
      },
      searchOption: [
        {
          label: "订单号",
          value: "1"
        },
        {
          label: "设备名称",
          value: "2"
        },
        {
          label: "设备号",
          value: "3"
        }
      ],
      searchInput: {
        option: "", // 选择框
        search: "" // 输入框
      },
      pickerOptions0: {
        disabledDate: time => {
          if (this.searchTime.endTime) {
            let second = new Date(
              Date.parse(this.searchTime.endTime.replace(/-/g, "/"))
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
          if (this.searchTime.beginTime) {
            let frist = new Date(
              Date.parse(this.searchTime.beginTime.replace(/-/g, "/"))
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
        orderNumber:"",
        equipmentName:"",
        equipmentCode:"",
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
        title: ["处理订单"],
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
    dealBtn(index, row) {
      console.log(row, "撤销的");
      this.warIndex = 0;
      this.warDialog.display = true;
      this.warDialog.id = row.id;
    },
    /*------ 非弹框触发按钮 ------*/
    searchBtn() {
      let value = parseInt(this.searchInput.option);
      console.log(value);
      if (value) {
        switch (value) {
          case 1:
            this.clearValue(this.searchForm);
            this.searchForm.orderNumber = this.searchInput.search;
            break;
          case 2:
            this.clearValue(this.searchForm);
            this.searchForm.equipmentName = this.searchInput.search;
            break;
          case 3:
            this.clearValue(this.searchForm);
            this.searchForm.equipmentCode = this.searchInput.search;
            break;
        }
      } else {
        this.clearValue(this.searchForm);
      }
      this.searchForm.pageSize = 10;
      this.searchForm.currentPage = 1;
      this.searchForm = Object.assign(this.searchForm, this.searchTime);
      this._search(this.searchForm);
      console.log(this.searchTime);
    },

    pagationBtn() {},
    /*------ 弹框按钮 ------*/

    warBtn() {
      let obj = {};
      obj.id = this.warDialog.id;
      
      this._deal(obj);
      console.log(obj);
    },
    /*------ api ------*/

    _search(obj) {
      let data = obj;
      orderNumInt.getHistory(data).then(res => {
        if (res.data.state == true) {
          for (let item of res.data.row) {
            item.toMoney = this.toMoney(item.money);
            item.toState = this.toState(item.state);
          }
          this.tableObj.tableData = res.data.row;
          this.pagationObj.total = res.data.total;
        }
        console.log(res, "查询");
      });
    },
    _deal(obj) {
      let data = obj;
      orderNumInt.deal(data).then(res => {
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
    },
    toState(num) {
      let i = parseInt(num);
      let arr = ["失败", "成功"];
      return arr[i];
    },
    toMoney(num) {
      let value = num + "元";
      return value;
    }
  },
  created() {
    this._search();
  }
};
</script>

<style lang="scss" scoped>
#orderNum {
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
#orderNum {
  .changeBtnBox {
    .searchBtn {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>