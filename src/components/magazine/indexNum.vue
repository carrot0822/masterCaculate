<template>
  <div id="indexNum">
    <section class="titleBox">
      <h2 class="title">期刊号</h2>
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
          <el-form-item label="期刊号 :">
            <!-- <el-select
              style="width: 150px"
              v-model="searchInput.option"
              placeholder="请选择"
              clearable
            >
              <el-option label="馆藏名" value="0"></el-option>
              <el-option label="馆藏码" value="1"></el-option>
            </el-select> -->
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
          
          <el-table-column align="center" prop="aNumber" label="期刊号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="sNumber" label="总期号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="page" label="页数" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="price" label="价格" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            align="center"
            prop="publicationDateStr"
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
    <!-- 弹框 -->
    <!-- 数据绑定弹框 增加修改等 -->
    <section class="closeDialog">
      <el-dialog
        id="changeDialog"
        center
        :title="aeDialog.title[aeIndex]"
        :visible.sync="aeDialog.display"
        width="470px"
      >
        <div class="content">
          <el-form
            ref="aeForm"
            :rules="aeDialog.aeRules"
            label-width="80px"
            style="width:420px;"
            :model="aeDialog.aeForm"
          >
            <section class="firstInfoBox">
              <!-- 输出的信息 -->
              <div class="indexInfo">
                <div class="diagOneInput">
                  <el-form-item prop="aNumber" style="width:100%" label="期刊号:">
                    <el-input v-model="aeDialog.aeForm.aNumber" placeholder="请输入期刊号"></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <el-form-item label="总期号:">
                    <el-input v-model="aeDialog.aeForm.sNumber" placeholder="请输入总期号"></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <el-form-item label="价格:">
                    <el-input v-model="aeDialog.aeForm.price" placeholder="请输入价格"></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <el-form-item label="页数:">
                    <el-input v-model="aeDialog.aeForm.page" placeholder="请输入页数"></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <el-form-item label="出版日期:">
                    <el-date-picker
                      v-model="aeDialog.aeForm.publicationDateStr"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <el-form-item label="备注:">
                    <el-input
                      type="textarea"
                      v-model="aeDialog.aeForm.remark"
                      :rows="4"
                      resize="none"
                      :autosize="{minRows:4,maxRows: 4}"
                      placeholder="备注"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <p class="copyTime" style=" "><span @click="copyBtn">复制上一次录入信息</span></p>
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
import { indexNumInt } from "@/request/api/indexNum";
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
      pageId: "", // 子页面ID存储
      // 查询表单
      searchInput: {
        option: "", // 选择框
        search: "" // 输入框
      },
      searchForm: {
        cataPeriodicalId: "",
        pageSize: 10,
        name:'', // 期刊名
        currentPage: 1
      },
      // 特殊 查询必须使用参数的时候调用
      resetSearch:{
          cataPeriodicalId: "",
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
      // a：add e:edit 增加与编辑公用弹框
      aeIndex: 0, // 控制弹框标题 增加与删除弹框的切换
      aeDialog: {
        flag: false, // 是否被渲染过
        display: false,
        title: ["增加期刊号", "修改期刊号"],
        // 弹框表单
        aeForm: {
          aNumber: "",
          sNumber: "",
          price: "",
          page: " ",
          publicationDateStr: "",
          remark: "",
          fkCataPeriodicalId: ""
        },
        // 弹框验证
        aeRules: {
          aNumber: [
            { required: true, message: "请输入期刊号", trigger: "blur" }
          ],
          
        }
      },
      // war:waring
      warIndex: 0, // 控制标题
      warDialog: {
        display: false,
        title: ["删除"]
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
    /*------ 非弹框触发按钮 ------*/
    addBtn() {
      if (this.aeDialog.flag) {
        this.$refs.aeForm.resetFields();
      }
      this.aeIndex = 0;
      this.aeDialog.flag = true;
      this.clearValue(this.aeDialog.aeForm);
      this.aeDialog.aeForm.fkCataPeriodicalId = this.pageId;
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
      /* if (this.searchInput.option) {
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
      } */
      this.searchForm.name = this.searchInput.search
      this._search(this.searchForm)
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
    copyBtn() {
        this._getPrev()
    },
    /*------ api ------*/
    _add(obj) {
      let data = obj;
      indexNumInt.add(data).then(res => {
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
      indexNumInt.remove(data).then(res => {
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
      
      obj = obj || this.resetSearch
      console.log(obj,typeof(obj))
      let data = obj;
      indexNumInt.search(data).then(res => {
        if (res.data.state == true) {
          this.tableObj.tableData = res.data.row;
          this.pagationObj.total = res.data.total;
        }
        console.log(res, "查询");
      });
    },
    _revise(obj) {
      let data = obj;
      indexNumInt.revise(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.aeDialog.display = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _getPrev() {
        
        indexNumInt.getPrev(this.resetSearch).then(res => {
        if (res.data.state == true) {
         this.aeDialog.aeForm = Object.assign(this.aeDialog.aeForm, res.data.row);
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
    let obj = this.$route.params;
    this.searchForm.cataPeriodicalId = obj.id;
    this.pageId = obj.id;
    this.resetSearch.cataPeriodicalId = obj.id
    this._search(); // 偷懒 暂时不传搜索条件
  }
};
</script>

<style lang="scss" scoped>
#indexNum {
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
    .content{
        .firstInfoBox{
            .indexInfo{
                .diagOneInput{
                    .copyTime{
                        text-align:center;
                        margin-bottom:20px;
                        cursor: pointer;
                        text-decoration: underline;
                        color:#0096FF;
                    }
                }
            }
        }
    }
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
#indexNum {
  .changeBtnBox {
    .searchBtn {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  #changeDialog{
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 320px;
      }
  }
}
</style>