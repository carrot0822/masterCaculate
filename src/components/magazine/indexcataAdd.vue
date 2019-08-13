<template>
  <div id="indexCataBox">
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
            >
              <el-option label="馆藏名" value="0"></el-option>
              <el-option label="馆藏码" value="1"></el-option>
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

    <!-- 新增与修改弹框 -->
    <el-dialog
      id="changeDialog"
      center
      :title="aeDialog.title[aeindex]"
      :visible.sync="aeDialog.display"
      width="900px;"
    >
      <div id="indexCataAdd" class="content">
        <el-form ref="aeForm" label-width="80px" :model="aeDialog.aeForm" style="width:840px;">
          <section class="firstInfoBox">
            <div class="searchForm">
              <el-form-item label="ISSN:">
                <el-input
                  style="width:350px;"
                  v-model="aeDialog.aeForm.issn"
                  placeholder="请输入ISSN进行搜索选择相关数据"
                >
                  <el-button slot="append" type="primary" @click="sIssnBtn" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
              <div class="otherInput">
                <el-checkbox style="margin:0;" v-model="aeDialog.aeForm.checked">含有复本</el-checkbox>
                <el-input-number
                  style="width:80px;"
                  :disabled="aeDialog.aeForm.checked"
                  v-model="aeDialog.aeForm.changeNum"
                  controls-position="right"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </div>
            </div>
            <!-- 输出的信息 -->
            <div class="indexInfo">
              <div class="diagOneInput">
                <el-form-item style="width:100%" label="期刊名称:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagOneInput">
                <el-form-item label="期刊名称:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagtwoInput flexRow">
                <el-form-item label="主编:">
                  <el-input
                    style="width:250px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
                <el-form-item label="发行单位:">
                  <el-input
                    style="width:320px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagThreeInput flexRow">
                <el-form-item label="统一刊号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮发代号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
                <el-form-item label="发行周期:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </section>
          <section class="twiceInfoBox">
            <div class="indexNum">
              <el-form-item label="期刊号:">
                <el-input
                  style="width:350px;"
                  v-model="aeDialog.aeForm.isbn"
                  placeholder="请填入期刊号新增数据或点击搜索选取已有期刊号"
                >
                  <el-button slot="append" type="primary" @click="sIndexBtn" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
            </div>
            <!--- 期刊号输入信息 --->
            <div class="indexNumInfo">
              <div class="diagtwoInput flexRow">
                <el-form-item label="主编:">
                  <el-input
                    style="width:250px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
                <el-form-item label="发行单位:">
                  <el-input
                    style="width:320px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="diagOneInput">
                <el-form-item label="期刊名称:">
                  <el-input
                    style="width:720px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </section>
          <section class="threeInfoBox">
            <div class="number">
              <div class="diagThreeInput flexRow">
                <el-form-item label="统一刊号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
                <el-form-item label="邮发代号:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
                <el-form-item label="发行周期:">
                  <el-input
                    style="width:180px;"
                    v-model="aeDialog.aeForm.isbn"
                    placeholder="请输入ISSN进行搜索选择相关数据"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="mutilyBox">
              <el-checkbox style="margin:0;" v-model="aeDialog.aeForm.checked">含有复本</el-checkbox>
              <el-checkbox style="margin:0;" v-model="aeDialog.aeForm.checked">含有复本</el-checkbox>
              <el-checkbox style="margin:0;" v-model="aeDialog.aeForm.checked">含有复本</el-checkbox>
            </div>
          </section>
          <div class="dialogBoxBtn">
            <span class="dialogButton true mr_40" @click="aeConfirmBtn">确 定</span>
            <span class="dialogButton cancel" @click="aeDialog.display = false">取 消</span>
          </div>
        </el-form>
      </div>
      <!--- ISSN搜索数据弹框 --->
      <div id="issnLogBox">
        <el-dialog :title="issnDialog.title[0]" :visible.sync="issnDialog.display" append-to-body>
          <div id="issnTable">
            <div class="issnTableBox">
              <el-table
                :data="issnDialog.tableData"
                max-height="250"
                :header-row-style="tableNomalHead"
                :header-cell-style="tableNomalHead"
                empty-text="无数据"
                style="width: 100%;"
                :row-style="{height:'30px'}"
              >
                <el-table-column align="center" width="180" prop="name" label="期刊名"></el-table-column>
                <el-table-column align="center" width="120" prop="issn" label="ISSN"></el-table-column>
                <el-table-column align="center" width="120" prop="author" label="主编"></el-table-column>
                <el-table-column align="center" width="120" prop="fkPressName" label="出版社"></el-table-column>
                <el-table-column width="120" align="center" prop="fkTypeCode" label="分类号"></el-table-column>
                <el-table-column align="center" fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <span class="ban" @click="getLocalBtn(scope.$index, scope.row)">获取</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="dialogBoxBtn textCenter">
              <span class="dialogButton cancel" @click="issnDialog.display = false">取 消</span>
            </div>
          </div>
        </el-dialog>
      </div>
      <!--- 期刊号弹框 --->
      <div id="indexNumBox">
        <el-dialog :title="indexNumDlg.title" :visible.sync="indexNumDlg.display" append-to-body>
          <div id="indexNumTable">
            <div class="indexNumTableBox" style="marginBottom:20px;">
              <el-table
                :data="indexNumDlg.tableData"
                max-height="250"
                :header-row-style="tableNomalHead"
                :header-cell-style="tableNomalHead"
                empty-text="无数据"
                style="width: 100%;"
                :row-style="{height:'30px'}"
              >
                <el-table-column width="120" prop="date" label="日期"></el-table-column>
                <el-table-column width="120" prop="name" label="姓名"></el-table-column>
                <el-table-column width="120" prop="address" label="地址"></el-table-column>
                <el-table-column width="120" prop="date" label="日期"></el-table-column>
                <el-table-column width="120" prop="name" label="姓名"></el-table-column>
                <el-table-column width="120" prop="address" label="地址"></el-table-column>
                <el-table-column align="center" label="操作" width="120" fixed="right">
                  <template slot-scope="scope">
                    <span class="ban" @click="deleteBtn(scope.$index, scope.row)">获取</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="dialogBoxBtn textCenter">
              <span class="dialogButton cancel" @click="indexNumDlg.display = false">取 消</span>
            </div>
          </div>
        </el-dialog>
      </div>
      <!--- 馆藏地树弹框 --->
      <div id="treeBox"></div>
    </el-dialog>
    <!-- ISSN搜索弹框 -->
    <!-- 期刊号弹框 -->
    <!-- 期刊号 增加与修改弹框 -->

    <!------ 确定与取消弹框 用于删除 调馆 ------>
  </div>
</template>

<script>
import { reserveInt } from "@/request/api/magazine";
export default {
  data() {
    return {
      /*------ 非弹框组 ------*/
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
        pageInput: 1
      },
      /*------ 展示数据初始化 ------*/
      /*------ 弹框数据 ------*/
      // a: add e:edit
      aeDialog: {
        flag: false,
        display: false,
        title: ["新增", "修改"],
        aeForm: {
          issn: "",
          id: "", // 期刊ID
          checked: false,
          changeNum: 0
        }
      },
      aeindex: 0, //控制添加和编辑弹框的切换

      // issn搜索语言弹框
      issnDialog: {
        display: false,
        title: ["本地数据预览"],
        tableData: []
      },

      // 表头样式
      tableNomalHead: {
        background: "#0096FF",
        color: "#fff",
        height: "30px",
        fontSize: "18px",
        borderRight: "none",
        textAlign: "center"
      },
      tableRowHead: {},
      // 期刊号弹框
      indexNumDlg: {
        display: false,
        title: "期刊号选择",
        tableData: []
      },
       // war:waring 否定弹框
      warIndex: 0, // 控制标题
      warDialog: {
        display: false,
        title: ["删除分馆"]
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
    // 跳页
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
    handleChange() {},
    /*------ 非弹框触发按钮 ------*/
    addBtn() {
      if (this.aeDialog.flag) {
        this.$refs.aeForm.resetFields();
      }
      this.aeIndex = 0;
      this.aeDialog.flag = true;
      this.clearValue(this.aeDialog.aeForm);
      this.aeDialog.display = true;
    },
    removeBtn() {
      let length = this.tableObj.selectAll.length;
      if (length) {
        this.warDialog.display = true;
      } else {
        this.$message.error("请先选择需要删除的对象");
      }
    },
    searchBtn() {
      if (this.searchInput.option) {
        if (this.searchInput.option == "0") {
          this.searchForm.name = this.searchInput.search;
          this.searchForm.code = "";
          this._search(this.searchForm);
        } else {
          this.searchForm.code = this.searchInput.search;
          this.searchForm.name = "";
          this._search(this.searchForm);
        }
      } else {
        this.searchForm.code = "";
        this.searchForm.name = "";
        this._search(this.searchForm);
      }
      console.log(this.searchInput);
    },
    reviseBtn(index, row) {
      this.aeIndex = 1;
      this.aeDialog.display = true;
      this.aeDialog.flag = true;
      this.aeDialog.aeForm = Object.assign(this.aeDialog.aeForm, row);
      console.log("当前row数据", row);
    },
    pagationBtn() {},
    /*------ 弹框按钮 ------*/
    aeConfirmBtn() {
      this.$refs.aeForm.validate(valid => {
        if (valid) {
          if (this.aeIndex == 0) {
            this._add(this.aeDialog.aeForm);
          } else {
            this._revise(this.aeDialog.aeForm);
          }
        } else {
          return false;
        }
      });
    },
    warBtn() {
      let obj = {};
      obj.ids = this.tableObj.selectArr;
      this._remove(obj);
    },

    // 功能弹框 s: search 外层表单弹框
    sIssnBtn() {
      // 做数据验证
      let obj = {};
      obj.issn = this.aeDialog.aeForm.issn;

      console.log(obj, "传递的数据");
      this._getLocal(obj);
    },
    // 期刊号查询按钮
    sIndexBtn() {
      let obj = {};
      obj.issn = this.aeDialog.aeForm.issn;
      obj.cataPeriodicalId = this.aeDialog.aeForm.id;
      this._getIndexNum(obj);
    },
    /*--- ISSN搜索数据弹框 ---*/
    getLocalBtn(index, row) {
      this.aeDialog.aeForm.id = row.id;
      this.issnDialog.display = false;
      let obj = {};
      obj.issn = this.aeDialog.aeForm.issn;
      obj.cataPeriodicalId = this.aeDialog.aeForm.id;
      this._getNumber(obj);
      console.log(row, "获取的数据");
    },
    // 期刊号弹框
    getIndexBtn(index, row) {},
    /*------ api ------*/
    _add(obj) {
      let data = obj;
      reserveInt.add(data).then(res => {
        console.log(res, "添加");
      });
    },
    _remove(obj) {
      let data = obj;
      libraryInt.remove(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.warDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _search(obj) {
      let data = obj;
      reserveInt.search(data).then(res => {
        if (res.data.state == true) {
          this.tableObj.tableData = res.data.row;
          this.pagationObj.total = res.data.total;
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
    },

    /*------ 2019/8/10接盘版 api区 ------*/

    /*------ 额外API ------*/
    // 获取本地期刊数据
    _getLocal(obj) {
      let data = obj;
      reserveInt.getLocal(data).then(res => {
        if (res.data.state == true) {
          this.issnDialog.display = true;
          this.issnDialog.tableData = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("获取本地ISSN", res);
      });
    },
    // 获取期刊号数据
    _getIndexNum(obj) {
      let data = obj;
      reserveInt.getIndex(data).then(res => {
        if (res.data.state == true) {
          this.indexNumDlg.display = true;
          this.indexNumDlg.tableData = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("获取本地期刊号", res);
      });
    },
    // 获取索书号
    _getNumber(obj) {
      let data = obj;
      reserveInt.getNumber(data).then(res => {
        console.log(res, "索取号");
      });
    }
    // 获取馆藏地
  },
  created() {
    this._search();
  }
};
</script>

<style lang="scss">
#indexCataBox {
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
  /*弹框组*/
  #indexCataAdd {
    .firstInfoBox {
      .searchForm {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .indexInfo {
        padding: 20px 15px;
        border: 1px solid #d3dfe6;

        .el-form-item {
          margin-bottom: 0px;
        }
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #d3dfe6;
        }
      }
    }
    .twiceInfoBox {
      margin: 22px 0;
      .indexNumInfo {
        padding: 20px 15px;
        border: 1px solid #d3dfe6;

        .el-form-item {
          margin-bottom: 0px;
        }
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #d3dfe6;
        }
      }
    }
    .threeInfoBox {
      padding: 20px 15px;
      border: 1px solid #d3dfe6;
    }
    .dialogBoxBtn {
      text-align: center;
      padding-top: 20px;
    }
    /*------ 通用样式 ------*/
    .diagtwoInput {
      justify-content: space-between;
    }
    .diagThreeInput {
      justify-content: space-between;
      .el-form-item {
        margin-bottom: 0px;
      }
    }
    .flexRow {
      display: flex;
      flex-direction: row;
    }
    .el-form-item__label {
      text-align: right;
    }
  }
  #issnTable {
    .issnTableBox {
      margin-bottom: 30px;
      .el-table__fixed-right-patch {
        background: rgb(0, 150, 255);
      }
    }
  }
}
</style>
