<template>
  <div id="backLog">
    <section class="titleBox">
      <h2 class="title">备份记录</h2>
    </section>
    <!-- 按钮集合 -->
    <section class="changeBtnBox">
      <div class="buttonBox">
        <el-button
          icon="el-icon-share"
          type="primary"
          class="blue"
          :loading="downloadLoading"
          @click="deriveBtn"
        >
          <!-- <i class="blueIcon el-icon-share"></i> -->
          导出
        </el-button>
      </div>
      <div class="searchBtn">
        <el-form :inline="true" :model="searchInput">
          <el-form-item size="130" label="创建时间:">
            <el-date-picker
              v-model="searchInput.beginTime"
              type="date"
              placeholder="开始日期"
              style="width: 200px"
              :picker-options="pickerOptions0"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-date-picker
              v-model="searchInput.endTime"
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
            prop="createTime"
            label="操作时间"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="operatRes"
            label="操作结果"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column align="center" prop="operator" label="操作人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="toType" label="操作方式" :show-overflow-tooltip="true"></el-table-column>
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
    <a v-show="false" href download ref="excel" id="excel">下载</a>
    <!-- 弹框 -->
  </div>
</template>

<script>
import axios from 'axios'
import { backLogInt,backUrl } from "@request/api/system/backLog";
import {  uploadInt } from "@request/api/base.js";
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
      // 导出
      downloadLoading: false,
      excelUrl: "",
      excelName: "",
      /*------ 弹框数据 ------*/

      // war:waring
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

    /*------ 非弹框触发按钮 ------*/
    searchBtn() {
      this.searchForm = Object.assign(this.searchForm, this.searchInput);
      this._search(this.searchForm);
      console.log(this.searchInput);
    },
    deriveBtn() {
      this.diriveApi();
    },
    pagationBtn() {},
    /*------ 弹框按钮 ------*/

    /*------ api ------*/

    _search(obj) {
      let data = obj;
      backLogInt.getLog(data).then(res => {
        if (res.data.state == true) {
          for (let item of res.data.row) {
            item.toType = this.toOperator(item.operatorType);
          }
          this.tableObj.tableData = res.data.row;
          this.pagationObj.total = res.data.total;
        }
        console.log(res, "查询");
      });
    },
    diriveApi(val) {
      this.downloadLoading = true;
      
      axios
        .get(backUrl, {
          params: val
        })
        .then(res => {
          if (res.data.state == true) {
            this.excelName = res.data.row.name;
            this.excelUrl =
              uploadInt.showFile +
              "/" +
              res.data.row.value +
              "?fileName=" +
              res.data.row.name;
            const a = document.getElementById("excel");

            a.setAttribute("href", this.excelUrl);
            a.setAttribute("download", this.excelName);
            a.click();
            this.downloadLoading = false;
          } else {
            console.log('导出',res)
            this.$message.error(res.data.msg);
            this.downloadLoading = false;
          }
        });
    },
    toOperator(num) {
      let index = parseInt(num);
      let arr = ["创建", "导入", "下载", "删除", "应用"];
      return arr[index];
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
#backLog {
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
#backLog {
  .changeBtnBox {
    .searchBtn {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>