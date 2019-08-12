<template>
  <div id="library">
    <section class="titleBox">
      <h2 class="title">馆藏地</h2>
    </section>
    <!-- 按钮集合 -->
    <section class="changeBtnBox">
      <div class="oprateBtn">
        <button class="addBtn" @click="addBtn">
          <i class="addIcon el-icon-plus"></i>添加
        </button>
        <button class="deleteBtn" @click="removeBtn">
          <i class="deleteIcon el-icon-delete"></i>批量删除
        </button>
      </div>
      <div class="searchBtn">
        <el-form :inline="true" :model="searchInput">
          <el-form-item label="筛选 :">
            <el-select
              style="width: 150px"
              v-model="searchInput.option"
              placeholder="请选择"
              clearable
              @change="selectCheck"
            >
              <el-option label="馆藏名" value="0"></el-option>
              <el-option label="备注信息" value="1"></el-option>
            </el-select>
            <el-input
              v-model="searchInput.search"
              placeholder="请输入相关信息"
              clearable
              style="width: 250px"
            ></el-input>
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
          <el-table-column align="center" prop="code" label="馆藏地代码" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="name" label="馆藏地名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            align="center"
            prop="creatTime"
            label="创建时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="updateTime"
            label="更新时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="remark" label="备注信息" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="200">
            <!-- 这里的scope代表着什么 index是索引 row则是这一行的对象 -->
            <template slot-scope="scope">
              <span class="revise" @click="reviseBtn(scope.$index, scope.row)">修改</span>
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
          @current-change="current_change"
        >
          <slot>
            <span class="el-pagination__jump">
              前往
              <div class="el-input el-pagination__editor is-in-pagination">
                <input
                  ref="text"
                  type="number"
                  v-model="pagationObj.pageInput"
                  autocomplete="off"
                  min="1"
                  max="1"
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
    <!-- 数据绑定弹框 增加修改等 -->
    <section class="closeDialog">
      <el-dialog
        id="changeDialog"
        center
        :title="aeDialog.title[aeIndex]"
        :visible.sync="aeDialog.display"
        width="675px"
      >
        <div class="content">
          <el-form ref="aeForm" label-width="100px" style="width:520px;" :model="aeDialog.aeForm">
            <section class="firstInfoBox">
              <!-- 输出的信息 -->
              <div class="indexInfo">
                <div class="diagOneInput">
                  <el-form-item style="width:100%" label="馆藏地编号:">
                    <el-input v-model="aeDialog.aeForm.code" placeholder="请输入馆藏地编号"></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <el-form-item label="馆藏地名称:">
                    <el-input v-model="aeDialog.aeForm.name" placeholder="请输入馆藏地名称"></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <el-form-item label="馆藏地备注:">
                    <el-input
                      type="textarea"
                      v-model="aeDialog.aeForm.remark"
                      :rows="8"
                      resize="none"
                      :autosize="{minRows:8,maxRows: 8}"
                      placeholder="请输入馆藏地备注"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </section>
            <div class="dialogBoxBtn">
              <span class="dialogButton true mr_40" @click="aeConfirmBtn">确 定</span>
              <span class="dialogButton cancel" @click="aeDialog.display = false">取 消</span>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </section>
    <!-- 否定弹框 只有确定和取消的弹框 -->
    <section class="waringDialog">
      <el-dialog
        :title="warDialog.title[warIndex]"
        :visible.sync="warDialog.display"
        width="400px"
        center
      >
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
import { libraryInt } from "@/request/api/library";
export default {
  data() {
    return {
      /*------ 非弹框数据 ------*/

      // 查询表单
      searchInput: {
        option: "", // 选择框
        search: "" // 输入框
      },
      searchForm: {
        name: "",
        code: "",
        remark: "",
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
        pageInput: 1,
        
      },
      /*------ 弹框数据 ------*/
      // a：add e:edit 增加与编辑公用弹框
      aeIndex: 0, // 控制弹框标题 增加与删除弹框的切换
      aeDialog: {
        flag: false, // 是否被渲染过
        display: false,
        title: ["增加分馆", "修改分馆"],
        aeForm: {
          code: "",
          name: "",
          remark: ""
        }, // 弹框表单
        aeRules: [] // 弹框验证
      },
      // war:waring
      warIndex: 0, // 控制标题
      warDialog: {
        display: false,
        title: ["删除分馆"]
      }
    };
  },
  methods: {
    /*------ 通信框架函数 ------*/
    selectCheck() {},
    selectAll(val) {
         let arr = []
         for(let item of val){
             arr.push(item.id)
         }
         this.tableObj.selectArr = arr
      console.log("全选的内容", val);
    },
    current_change() {},
    jumpBtn() {},
    /*------ 非弹框触发按钮 ------*/
    addBtn() {
      if (this.aeDialog.flag) {
      }
      this.aeIndex = 0;
      this.clearValue(this.aeDialog.aeForm);
      this.aeDialog.display = true;
    },
    removeBtn() {
        this.warDialog.display = true
    },
    searchBtn() {

    },
    reviseBtn(index, row) {
      this.aeIndex = 1;
      this.aeDialog.display = true;
      this.aeDialog.aeForm = Object.assign(this.aeDialog.aeForm, row);
      console.log("当前row数据", row);
    },
    pagationBtn() {},
    /*------ 弹框按钮 ------*/
    aeConfirmBtn() {
      if (this.aeIndex == 0) {
        this._add(this.aeDialog.aeForm);
      } else {
        this._revise(this.aeDialog.aeForm);
      }
    },
    warBtn() {
        let  obj = {}
        obj.ids = this.tableObj.selectArr
        this._remove(obj)
    },
    /*------ api ------*/
    _add(obj) {
      let data = obj;
      libraryInt.add(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.aeDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _remove(obj) {
      let data = obj; 
      libraryInt.remove(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        }
        console.log(res, "查询");
      });
    },
    _search(obj) {
      let data = obj;
      libraryInt.search(data).then(res => {
        if (res.data.state == true) {
          this.tableObj.tableData = res.data.row;
        }
        console.log(res, "查询");
      });
    },
    _revise(obj) {
      let data = obj;
      libraryInt.revise(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.aeDialog.display = false;
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
#library {
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
#library {
  .changeBtnBox {
    .searchBtn {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>