<template>
  <div id="backlogEdit">
    <section class="pagetitle">
      <div class="titleName">备份管理</div>
    </section>
    <div class="horizontai">
      <!-- 上传 -->
      <section class="uploadBox">
        <div class="nomal-Box">
          <div class="upload-demo" style="width:360px;">
            <div class="inputBox">
              <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px">
                <el-form-item label="备份信息" prop="title">
                  <el-input placeholder="标题不得超过10个字" v-model="addForm.title"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <el-upload
              ref="upload"
              drag
              :action="fileUrl"
              :file-list="fileList"
              :limit="1"
              :before-upload="beforefileUpload"
              :on-remove="fileRemove"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
              :on-success="fileSuccess"
              :on-error="fileError"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将备份文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip" style="color: red">
                <p>提示:只能上传("bak","sql")等格式的视频文件</p>
                <p>(大小限500M）</p>
              </div>
            </el-upload>
            <div class="textCenter firstButton">
              <el-button class="buttonBlue" type="primary" @click="uploadBtn">上传</el-button>
              <el-button class="buttonGray" type="info" @click="cancelBtn">取消</el-button>
            </div>
          </div>
        </div>
      </section>
      <!-- 表格数据回显 -->
      <section class="ListBox">
        <el-scrollbar class="recomandList">
          <section class="namelessBox">
            <section class="changeBtnBox">
              <div class="oprateBtn">
                <button class="addBtn" @click="addBtn">
                  <i class="addIcon el-icon-plus"></i>创建备份
                </button>
                <button class="deleteBtn" @click="removeBtn">
                  <i class="deleteIcon el-icon-delete"></i>删除
                </button>
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
                    prop="operator"
                    label="操作人"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    prop="remark"
                    label="备注"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column align="center" label="操作" fixed="right" width="200">
                    <!-- 这里的scope代表着什么 index是索引 row则是这一行的对象 -->
                    <template slot-scope="scope">
                      <span class="revise" @click="recoverBtn(scope.$index, scope.row)">恢复备份</span>

                      <span class="revise" @click="downloadBtn(scope.$index, scope.row)">下载</span>
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
          </section>
        </el-scrollbar>
      </section>
    </div>
    <!-- 弹框 -->
    <!-- 数据绑定弹框 增加修改等 -->
    <section class="closeDialog">
      <el-dialog
        v-loading="createLoading"
        element-loading-text="拼命创建备份中"
        id="changeDialog"
        center
        :title="aeDialog.title[aeIndex]"
        :visible.sync="aeDialog.display"
        width="675px"
      >
        <div class="content">
          <el-form
            ref="aeForm"
            :rules="aeDialog.aeRules"
            label-width="100px"
            style="width:520px;"
            :model="aeDialog.aeForm"
          >
            <section class="firstInfoBox">
              <!-- 输出的信息 -->
              <div class="indexInfo">
                <div class="diagOneInput">
                  <el-form-item prop="remark" style="width:100%" label="备份信息:">
                    <el-input v-model="aeDialog.aeForm.remark" placeholder="请输入备份信息"></el-input>
                  </el-form-item>
                </div>
                <div class="diagOneInput">
                  <P class="text">
                    注意： 本功能只提供最简单的备份及导入备份操作，您若觉得不满足需求或不
                    方便使用，建议让数据库管理员自行对SQL SERVER数据库服务·器后台进行相
                    关操作，以便发挥不同数据库版本的最大效率。 当前“备份目录”指的是数据
                    库服务器上的文件目录，请确定其位置真实存在！
                    (提示:该操作可能会消耗大量时间 请确保系统在一定时间内可以暂停使用)
                  </P>
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
        v-loading="applyLoading"
        element-loading-text="恢复备份中"
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
    <a v-show="false" href download ref="excel" id="excel">下载</a>
  </div>
</template>

<script>
import { backLogInt, bakFile } from "@request/api/system/backLog";
import { uploadInt } from "@request/api/base.js";
import { videoUpload, dataAdd } from "@request/api/video.js";
export default {
  data() {
    return {
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
      // a：add e:edit 增加与编辑公用弹框
      aeIndex: 0, // 控制弹框标题 增加与删除弹框的切换
      aeDialog: {
        flag: false, // 是否被渲染过
        display: false,
        title: ["创建备份"],
        // 弹框表单
        aeForm: {
          remark: ""
        },
        // 弹框验证
        aeRules: {}
      },
      // war:waring
      warIndex: 0, // 控制标题
      warDialog: {
        display: false,
        title: ["删除备份", "恢复备份"]
      },
      // loading
      createLoading: false,
      downloadLoading: false, // 下等待
      applyLoading: false, // 恢复备份
      rowId: "",
      /*----- -----*/

      fileUrl: bakFile,
      centerDialogVisible: false,
      fileList: [], // 文件列表
      backUrl: "", // 返回的链接
      videoArr: [], // video数组
      jude: false, // 判定是否禁用
      addForm: {
        title: "",
        backUrl: ""
      },
      rules: {
        title: [{ required: true, message: "标题不得为空", trigger: "blur" }]
      },
      deleteObj: {}
    };
  },
  computed: {
    addTimeForm() {
      let obj = {
        url: this.addForm.backUrl,
        remark: this.addForm.title,
      };
      return obj;
    }
  },
  created() {
    this._search();
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
      this.aeDialog.display = true;
    },
    removeBtn() {
      console.log(this.tableObj.selectAll);
      let length = this.tableObj.selectAll.length;
      if (length) {
        this.warDialog.display = true;
      } else {
        this.$message.error("请先选择需要删除的对象");
      }
    },
    searchBtn() {
      this.searchForm = Object.assign(this.searchForm, this.searchInput);
      this._search(this.searchForm);
      console.log(this.searchInput);
    },
    downloadBtn(index, row) {
      console.log();
      let url = uploadInt.showFile + row.url + "?fileName=" + row.fileName;
      const a = document.getElementById("excel");
      a.setAttribute("download", row.fileName);
      a.setAttribute("href", url);
      a.click();
    },
    recoverBtn(index, row) {
      this.warIndex = 1;
      this.rowId = row.id;
      this.warDialog.display = true;
    },
    /*------ 弹框按钮 ------*/
    aeConfirmBtn() {
      this.$refs.aeForm.validate(valid => {
        if (valid) {
          if (this.aeIndex == 0) {
            this._add(this.aeDialog.aeForm);
          } else {
          }
        } else {
          return false;
        }
      });
    },
    warBtn() {
      let obj = {};
      obj.ids = this.tableObj.selectAll;
      console.log(obj);
      if (this.warIndex) {
        let pbj = {};
        this.applyLoading = true;
        pbj.id = this.rowId;
        this._reconver(pbj);
      } else {
        this._remove(obj);
      }
    },
    loginOut() {
      this.$store.commit("removeToken");
      this.$store.commit("deleteUserInfo");
      this.$store.commit("deleteMenu");
      this.$router.push("/login");
    },
    /*------ api ------*/
    _add(obj) {
      this.createLoading = true;
      let data = obj;
      backLogInt.add(data).then(res => {
        if (res.data.state == true) {
          this.$message.success(res.data.msg);
          this._search();
          this.createLoading = false;
          this.aeDialog.display = false;
        } else {
          this.createLoading = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    _remove(obj) {
      let data = obj;
      console.log("删除", data);
      backLogInt.remove(data).then(res => {
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
      backLogInt.search(data).then(res => {
        if (res.data.state == true) {
          this.tableObj.tableData = res.data.row;
          this.pagationObj.total = res.data.total;
        }
        console.log(res, "查询");
      });
    },
    // 返回链接  通过链接
    _reconver(obj) {
      let data = obj;

      backLogInt.apply(data).then(res => {
        if (res.data.state == true) {
          this.applyLoading = false;
          this.loginOut();
          console.log(res, "这是啥");
        } else {
          this.applyLoading = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    /*--- ---*/
    cancelBtn() {
      this.$refs.addForm.resetFields();
      this.fileList = [];
    },
    uploadBtn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this._upload();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("上传之前的数据", this.addTimeForm);
    },
    /*--- API ---*/
    _upload() {
      backLogInt.upload(this.addTimeForm).then(res => {
        if (res.data.state == true) {
          this.clearObj(this.addForm);
          this.fileList = [];
          this.$refs.addForm.resetFields();
          this._search();
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /*--- 过滤函数 ---*/
    clearObj(obj) {
      for (let key in obj) {
        obj[key] = "";
      }
    },
    clearValue(obj) {
      // 不使用for in 避免遍历出原型属性
      let { keys, values, entries } = Object;

      for (let key of keys(obj)) {
        obj[key] = "";
      }
    },

    /*--- 功能函数 ---*/
    // 传入一个字符串和一个限制长度的数字 生成一个补0到指定长度的字符串
    toNumebr(value, num) {
      let str = String(value);
      let length = str.length;
      while (length < num) {
        str = "0" + str;
        length++;
      }
      return str;
    },
    /*--- 上传视频文件设置 ---*/
    beforefileUpload(file) {
      let that = this;
      const fileExe = file.name.replace(/.+\./, ""); // 正则匹配 有丶慌

      const fileType = file.type;
      // 获取视频时长

      console.log("文件类型", fileType);
      if (["bak", "sql"].indexOf(fileExe.toLowerCase()) === -1) {
        this.$message({
          type: "warning",
          message: "请上传后缀名bak,sql的文件！"
        });
        return false;
      }
      console.log("上传之前", file);
    },
    beforeRemove(file, fileList) {
      /*  return this.$confirm(`确定移除 ${file.name}？`); */
    },
    fileRemove(file, fileList) {
      this.fileList = fileList;
      this.addForm.backUrl = "";
      console.log("删除后的列表", this.fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
      console.log("限制后的数据列表", this.fileList, fileList);
    },
    fileSuccess(res, file, fileList) {
      if (res.state == true) {
        console.log("正确回复的是", res, fileList);
        this.fileList = fileList;
        this.addForm.backUrl = res.row;

        console.log("绑定的数据列表", this.fileList);
      } else {
        this.$message.error(res.msg);
        console.log("", res, this.fileList, fileList);
        fileList.pop();
        this.fileList = fileList;
        console.log("移出后的fileList", this.fileList);
      }
    },
    fileError(res, file, fileList) {
      this.$message.error("文件上传失败");
    },
    fileChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.addForm.backUrl = "";
      console.log("超过三个的列表", this.fileList);
    }
  }
};
</script>


<style lang="scss" scoped>
#backlogEdit {
  background-color: #ffffff;
  padding-left: 30px;
  padding-bottom: 117px;
  .pagetitle {
    padding: 30px 0;
    .titleName {
      font-size: 16px;
      color: #878787;
      border-left: 4px solid #0096ff;
      padding-left: 10px;
    }
  }
  .horizontai {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    .uploadBox {
      padding-top: 66px;
      margin-right: 40px;
      width: 40%;
      .nomal-Box {
        height: 453px;
        border-right: 2px solid #e4e4e4;
        position: relative;
        .upload-demo {
          margin: 0 auto;
        }
      }
      .firstButton {
        margin-top: 30px;
      }
    }
    .ListBox {
      max-width: 820px;
      width: 100%;
      height: 610px;
      .recomandList {
        height: 100%;
        .namelessBox {
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
        }
      }
    }
  }
  #changeDialog {
    .dialogBoxBtn {
      text-align: center;
    }
    .text {
      font-size: 14px;
      color: #dc2b2b;
      line-height: 22px;
      text-align: justify;
      margin-bottom: 20px;
      padding-left: 20px;
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
<style>
#backlogEdit .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>