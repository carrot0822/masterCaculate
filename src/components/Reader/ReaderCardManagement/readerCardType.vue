<template>
  <div class="useradd">
    <el-container>
      <div class="box-card">
        <!-- 估计是第三层路由展示区域 -->
        <div class="important">
          <!-- 1.0 标题 -->
          <div class="sonTitle">
            <span class="titleName">读者卡类型管理列表</span>
          </div>
          <!-- 2.0 表单填写 查询接口 状态：正在查询（loading组件） 查询成功 查询失败 -->
          <section
            class="searchBox"
            style="display: flex;flex-direction: row;justify-content: space-between"
          >
            <div class="buttonBox">
              <button class="add" @click="addBtn">
                <i class="addIcon el-icon-plus"></i>添加
              </button>
              <button class="delete" @click="deleteBtn">
                <i class="deleteIcon el-icon-delete"></i>批量删除
              </button>
            </div>
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="类型名称:" size="160">
                <el-select clearable v-model="searchForm.type" placeholder="请选择类型">
                  <el-option
                    v-for="(option,index) of optionsDataType"
                    :key="index"
                    :label="option.name"
                    :value="option.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="等级名称:" size="160">
                <el-select clearable v-model="searchForm.level" placeholder="请选择等级">
                  <el-option
                    v-for="(option,index) of levelOption"
                    :key="index"
                    :label="option.name"
                    :value="option.code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="15" type="primary" @click="searchBtn">查询</el-button>
              </el-form-item>
            </el-form>
          </section>
          <!-- 4.0 表格展示内容 编辑功能：状态用上 禁用 批量禁用弹框 弹框可尝试用slot插槽封装 -->
          <section class="text item tablebox">
            <el-table
              @selection-change="selectAllBtn"
              class="tableBorder"
              :data="tableData"
              style="width: 100%; text-align:center;"
              :row-style="rowStyle"
              :header-cell-style="{background:'#0096FF', color:'#fff',height:'60px'}"
            >
              <el-table-column align="center" type="selection" width="100"></el-table-column>
              <el-table-column width="100" align="center" prop="index" type="index" label="序号">
                <template slot-scope="scope">
                  <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="类型名称"></el-table-column>
              <el-table-column align="center" prop="gradeName" label="等级名称"></el-table-column>
              <el-table-column align="center" prop="creatTime" label="创建时间"></el-table-column>
              <el-table-column align="center" prop="updateTime" label="修改时间"></el-table-column>
              <el-table-column align="center" prop="disabled" width="70" label="状态">
                <template slot-scope="scope">
                  <span>{{scope.row.disabled ===0?'启用':'禁用'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200">
                <!-- 这里的scope代表着什么 index是索引 row则是这一行的对象 -->
                <template slot-scope="scope">
                  <span class="edit" @click="editBtn(scope.$index, scope.row)">编辑</span>
                  <span class="ban" @click="banBtn(scope.$index, scope.row)">禁用</span>
                </template>
              </el-table-column>
            </el-table>
            <section class="pagination mt_30">
              <el-pagination
                style="display: inline-block"
                background
                layout="prev, pager, next,total,slot"
                :total="total"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="current_change"
              >
                <slot>
              <span>
                前往
                <div class="el-input el-pagination__editor is-in-pagination">
                  <input ref="text" type="number" v-model="pageInput" autocomplete="off" min="1" max="1" class="compo el-input__inner">
                </div>
                页
              </span>
                </slot>
              </el-pagination>
              <el-button type="primary" class="ml_30"  size="medium" @click="jumpBtn">确定</el-button>
            </section>
          </section>
          <!-- 5.0 分页内容 分页提交刷新页面 前进后退 点击以及调转四个事件传递数值-->
        </div>
      </div>
      <!-- 弹框组 添加弹框未知 批量删除弹框 禁用弹框 编辑弹框 -->
      <!-- 禁用弹框/批量删除弹框 -->
      <div class="forbid">
        <el-dialog :title="Dialogtitle[i]" :visible.sync="deleteDialog" width="500px" center>
          <div class="dialogBody">是否{{Dialogtitle[i]}}?</div>
          <div slot="footer" >
            <span class="dialogButton true mr_40" @click="subDelete">确 定</span>
            <span class="dialogButton cancel" @click="deleteDialog = false">取消</span>
          </div>
        </el-dialog>
      </div>
      <!-- 批量删除弹框 -->
      <!-- 编辑弹框 -->
      <!-- 添加弹框 -->
      <div class="addEditDialog readerCard">
        <!-- Form -->
        <el-dialog
          @close="closeForm('changeForm')"
          width="460px"
          :title="Dialogtitle[i]"
          :visible.sync="changeFormDialog"
        >
          <el-form ref="changeForm" :model="changeForm" :rules="changeRules">
            <!-- 表单域 -->
            <el-form-item label="类型名称" prop="name">
              <el-input v-model="changeForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="等级名称:" prop="level">
              <el-select clearable v-model="changeForm.level" placeholder="请选择等级">
                <el-option
                  v-for="(option,index) of optionsData"
                  :key="index"
                  :label="option.name"
                  :value="option.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="selectBan" prop="disabled" label="状　　态">
              <el-radio-group v-model="changeForm.disabled">
                <el-radio label="1" value="1">禁用</el-radio>
                <el-radio label="0" value="0">启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 弹框表单按钮  验证失效-->
            <el-form-item class="dialogFooter">
              <el-button
                class="buttonTrueColor"
                @click="submitForm('changeForm','changeFormDialog')"
              >确定</el-button>
              <el-button
                class="buttonCancelColor"
                @click="resetForm('changeForm','changeFormDialog')"
              >取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {
  selectEffect,
  levelOption,
  cardTypeInt,
  unBanOption
} from "../../../request/api/base.js";
export default {
  data() {
    return {
      /*====== 2.0查询功能配置项 ======*/
      optionsData: [],
      optionsDataType: [], // 类型下拉框
      levelOption:[],
      searchForm: {
        level: "",
        type: ""
      },
      /*====== 3.0添加 批量删除所需数据 ======*/
      Allseclet: [], // 全选
      deleteParams: [], // 删除所需数据
      /*====== 4.0表格设置项 ======*/
      rowStyle: {
        height: "60px"
      },
      tableData: [],
      // 分页器设置
      total: 0,
      pageSize: 10,
      pageInput:1,
      currentPage: 1,
      paginationForm: {},
      /*====== 弹框配置项 ======*/
      Dialogtitle: ["禁用", "批量删除", "编辑", "添加"],
      deleteDialog: false, // 禁用弹框,
      deleteArr: {},
      banData: {},
      // 添加编辑
      i: 0, // 切换弹框标题
      changeFormDialog: false, // // 添加弹框的展示和消失
      formLabelWidth: "100px",
      changeForm: {
        name: "", // 等级名称
        level:'',
        disabled: "", // 状态
        id: "" // ID
      },
      changeRules: {
        name: [{ required: true, message: "请输入类型名称", trigger: "blur" }],
        level:[{ required: true, message: "请选择等级名称", trigger: "change" }],
        disabled: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  computed: {
    searchTimeForm() {
      let obj = {
        typeCode: this.searchForm.type,
        gradeCode: this.searchForm.level,
        currentPage: 1,
        pageSize: this.pageSize
      };
      return obj;
    },
    addTimeForm() {
      let obj = {
        name: this.changeForm.name,
        fkGradeCode: this.changeForm.level,
        disabled: this.changeForm.disabled
      };
      return obj;
    },
    editTimeForm() {
      let obj = {
        name: this.changeForm.name,
        fkGradeCode: this.changeForm.level,
        id: this.changeForm.id,
        disabled: this.changeForm.disabled
      };
      return obj;
    },
    deleteTimeForm() {}
  },
  methods: {
    jumpBtn() {
      // v-mode绑定好像会默认转数据类型
      let page = Math.ceil(this.total / this.pageSize)
      page ==0?1:page;
      if(this.pageInput>page){
        this.pageInput = 1
        this.$nextTick(()=>{
          this.$refs.text.value = 1 // hack方法
          console.log('Vmode绑定值',this.pageInput)
        })
      }else{
        let num = parseInt(this.pageInput)
        this.current_change(num)
      }
    },
    /*====== 2.0 启动按钮组 ======*/
    // 全选按钮
    selectAllBtn(val) {
      this.Allseclet = val;
      console.log("全选后的数据", this.Allseclet);
    },
    // 批量删除按钮
    deleteBtn() {
      this.deleteParams = [];
      if (this.Allseclet.length) {
        this.i = 1;
        let arr = this.Allseclet;
        console.log(arr);
        for (let item of arr) {
          this.deleteParams.push({ id: item.id });
        }
        console.log("删除数据", this.deleteParams);
        this.deleteDialog = true;
      } else {
        this.$message.error("请先选择删除对象");
      }
    },
    // 添加按钮
    addBtn() {
      this.i = 3;
      this.changeFormDialog = true;
    },
    // 查询按钮
    searchBtn() {
      this.searchTable(this.searchTimeForm);
      this.currentPage = 1
      console.log("当前查询", this.searchTimeForm);
    },
    // 编辑按钮
    editBtn(index, row) {
      this.i = 2;
      this.changeForm.name = row.name;
      this.changeForm.level = row.gradeCode // 下拉的value和label对应关系
      this.changeForm.id = row.id;
      this.changeForm.disabled = row.disabled.toString();
      this.changeFormDialog = true;
      console.log(index, row, this.changeForm);
    },
    // 禁用按钮
    banBtn(index, row) {
      console.log(index, row); // 当前选中表格的索引和对象
      if (row.disabled == 1) {
        this.$message.error("该用户已被禁用");
      } else {
        this.i = 0;
        this.banData.id = row.id;
        this.banData.disabled = 1;
        this.deleteDialog = true;
      }
    },
    /*====== 弹框相关按钮 ======*/

    // 删除禁用弹框的提交按钮
    subDelete() {
      let flag = this.i; // 关闭弹框
      switch (flag) {
        case 1:
          console.log("删除Api");
          this.deleteApi(this.deleteParams);
          break;
        case 0:
          this.banApi(this.banData);
          console.log("禁用API");
      }
    },
    // 编辑 添加弹框按钮
    submitForm(formName, dialogName) {
      let flag = this.i;
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (flag) {
            case 2:
              this.editApi(this.editTimeForm, dialogName);
              break;
            case 3:
              this.addApi(this.addTimeForm, dialogName);
          }
          this.changeFormDialog = true; // 关闭弹框
        } else {
          return false;
        }
      });
    },
    // 编辑添加取消按钮
    resetForm(formName, dialogName) {
      this.$refs[formName].resetFields();
      this[dialogName] = false;
    },
    // 弹框关闭的时候执行 清空数据
    closeForm(formName) {
      this.$refs[formName].resetFields();
      let obj = this.changeForm;
      for (let i in obj) {
        obj[i] = "";
      }
    },
    // 分页查询按钮
    current_change: function(currentPage) {
      this.currentPage = currentPage; //点击第几页
      this.paginationForm.currentPage = currentPage;
      //console.log('保存当前查询',this.paginationForm);
      this.pagationTable(this.paginationForm); // 这里的分页应该默认提交上次查询的条件
    },
    /*====== API部分 ======*/
    // 查询功能API 这里区别就是需要table数组接收 可以单独封装
    pagationTable(data) {
      console.log("记录查询", this.searchTimeForm);
      axios
        .get(cardTypeInt.select, {
          params: data
        })
        .then(res => {
          if (res.data.state === true) {
            console.log(res);
            // 获取数据进行过滤
            this.tableData = res.data.row;
            this.total = res.data.total; //总条目数
            this.paginationForm = Object.assign({}, data);
            console.log("保存当前查询", this.paginationForm);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    searchTable(data) {
      this.currentPage = 1
      console.log("初始化查询", this.searchTimeForm);
      axios
        .get(cardTypeInt.select, {
          params: data
        })
        .then(res => {
          if (res.data.state === true) {
            console.log(res);
            // 获取数据进行过滤
            this.tableData = res.data.row;
            this.total = res.data.total; //总条目数
            this.paginationForm = Object.assign({}, data);
            this.currentPage = 1
            console.log("保存当前查询", this.paginationForm);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 等级API
    UnBanApi() {
      axios.get(unBanOption).then(res => {
        if (res.data.state === true) {
          this.levelOption = res.data.row;
          console.log("等级下拉框数据", res);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 类型API
    searchOption() {
      axios.get(selectEffect).then(res => {
        if (res.data.state === true) {
          this.optionsData = res.data.row;
          console.log("添加等级下拉框数据", this.optionsData);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加 等级API
    searchOptionType() {
      axios.get(levelOption).then(res => {
        if (res.data.state === true) {
          this.optionsDataType = res.data.row;
          console.log("类型下拉框数据", res);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加编辑API
    addApi(data, dialogName) {
      console.log("提交的数据", data);
      axios.post(cardTypeInt.add, data).then(res => {
        if (res.data.state === true) {
          this.$message.success("执行成功");
          this.searchTable();
          this.searchOption()
          this.searchOptionType()
          this[dialogName] = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    editApi(data, dialogName) {
      console.log("提交的数据", data);
      axios.put(cardTypeInt.edit, data).then(res => {
        if (res.data.state === true) {
          this.$message.success("执行成功");
          this.searchTable();
          this[dialogName] = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 禁用删除API
    deleteApi(data) {
      console.log("提交的删除数据", data);
      let deleterStr = {
        deleteParams: data
      };
      axios.delete(cardTypeInt.delete, { data: deleterStr }).then(res => {
        if (res.data.state === true) {
          this.$message.success("删除成功");
          this.searchTable();
          this.searchOption()
          this.searchOptionType()
          this.deleteDialog = false;
          console.log(res);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    banApi(data) {
      console.log("禁用的数据", data);
      axios.put(cardTypeInt.edit, data).then(res => {
        if (res.data.state === true) {
          this.$message.success("禁用成功");
          this.searchTable();
          this.deleteDialog = false;
          console.log(res);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.searchOption();
    this.searchOptionType();
    this.UnBanApi()
    this.searchTable(this.searchTimeForm);
  }
};
</script>

<style scoped>
/*====== 0.0 初始化部分 ======*/
.routerBox {
  background-color: #fff;
  min-height: 70px;
  width: 100%;
  padding: 0 30px;
  align-items: center;
  display: flex;
  box-sizing: border-box;
}
.routerButton {
  margin-right: 30px;
}
.space {
  background-color: #ebf7ff;
  height: 30px;
}
.box-card {
  background-color: #fff;
  box-sizing: border-box;
}
.important {
  padding: 30px;
}
/* 1.0标题 通用部分 */
.sonTitle {
}
.sonTitle .titleName {
  border-left: 4px solid #0096ff;
  padding-left: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(135, 135, 135, 1);
  display: inline-block;
  margin-bottom: 33px;
}
.useradd {
}
.useradd .box-card {
  width: 100%;
}
.text {
  font-size: 14px;
}
/* 清楚浮动 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
/*====== 2.0表单区域 ======*/
/* 可以通过size属性添加一个classname */

.el-form--inline .el-form-item {
  margin-right: 25px;
}
.el-form--inline .el-form-item:last-child {
  margin-right: 0;
}
.el-input.el-input--120 {
  width: 160px;
}
.el-input.el-input--120 input {
  height: 36px;
  line-height: 36px;
}
.el-input.el-input--160 {
  width: 160px;
}
.el-range-editor--130 {
  width: 300px;
}
.el-select.el-select--160 {
  width: 160px;
}
.el-button--15 {
  padding: 12px 29px;
}
/* 按钮 */
.buttonBox {
  margin-bottom: 30px;
}
.buttonBox button {
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
.buttonBox .add {
  background: rgba(255, 146, 49, 1);
  border-radius: 10px;
  margin-right: 30px;
}
.buttonBox .add .addIcon {
  margin-right: 6px;
}
.buttonBox .delete {
  background: rgba(255, 92, 60, 1);
  border-radius: 10px;
}
.buttonBox .delete .deleteIcon {
  margin-right: 6px;
}
/*====== 3.0表格区域 ======*/
.item {
  margin-bottom: 50px;
}
.tablebox .tableBorder {
  border: 1px solid #ebeef5;
  border-bottom: none;
  font-size: 16px;
}
/* 操作表格区 表格列添加样式名是无效的 */
.imgDefault {
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 50%;
  background-color: #333;
}
.operator {
}
.edit {
  color: #00d7f0;
  cursor: pointer;
  margin-right: 20px;
}
.ban {
  color: #ff5c3c;
  cursor: pointer;
}
/*====== 4.0 分页器区域 ======*/
.pagination .el-pagination {
  display: flex;
  justify-content: center;
}

/*====== 后期频繁更改部分 ======*/
.routerButton {
  position: relative;
  text-align: left;
  padding-left: 20px;
}
.Iconerror {
  position: absolute;
  width: 12px;
  height: 12px;
  font-size: 16px;
  color: #fff;
  right: 20px;
}
.labelActive {
  background-color: #0096ff;
  color: #fff;
  border: none;
}
/*====== 弹框相关部分 后期可能更新为全局通用样式 ======*/
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.addDialog {
  width: 685px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0 !important;
  border-radius: 20px;
  z-index: 5;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: none;
}
.addDialog .dialogTitle {
  height: 80px;
  background-color: #0096ff;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 26px;
  position: relative;
}
.addDialog .close {
  position: absolute;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #fff;
  top: 25px;
  right: 30px;
  font-size: 16px;
  cursor: pointer;
}
.addDialog .dialogBody {
  background: #fff;
  padding-top: 30px;
}
.addDialog .dialog-footer {
  padding-bottom: 46px;
}
/*Vue过渡动画*/
/*遮罩过渡*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*过渡的状态 即过渡的关键帧打那些*/
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s;
}
.dialog-enter, .dialog-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  top: 47%;
}
/*row排列*/
.row1 {
  display: flex;
  padding: 0 30px;
}
.row1 .el-form-item {
  margin-bottom: 30px;
}
.row1.el-input .el-input__inner {
  width: 200px;
}
.upload {
  display: flex;
  justify-content: center;
}
.upload .defultHead {
  position: relative;
}
.defultHead:hover .bgload {
  display: block;
}
.bgload {
  background-color: rgba(0, 0, 0);
  position: absolute;
  top: 0;
  text-align: center;
  line-height: 100px;
  z-index: 3;
  opacity: 0.7;
  cursor: pointer;
  display: none;
  color: #fff;
}
.defultImg {
  position: absolute;
  z-index: 1;
}
.preloadImg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  text-align: center;
  line-height: 100px;
}
/*样式单独*/

</style>
<style>
.readerCard{

}
.readerCard form.el-form{
  flex-direction: column;

}
.readerCard .el-input .el-input__inner {
    width: 100%;
}
.readerCard .el-form-item__content {
    display: flex;
}
.readerCard .el-select {
    width: 100%;
}
.readerCard .el-form-item.select {
    width: 260px;
    margin-left: 0;
}
.readerCard .selectBan{
  display: flex;
}
.readerCard .selectBan .el-form-item__content{
  display: block;
}
</style>



