<template>
  <div class="bookInfo">
    <el-container>
      <div class="box-card">
        <!-- 类型名称弹框-->
        <div id="typeMessage" >
          <div style="position: relative">
            <p>请选择类型名称</p>
            <img src="../../../base/img/menu/xx.png" style="position: absolute;top: 10px;left: 340px;width: 30px;height: 30px" @click="closeCheck">
          </div>
          <div>
            <ul id="treeDemo" class="ztree"></ul>
          </div>
        </div>
        <!-- 估计是第三层路由展示区域 -->
        <div class="important">
          <!-- 1.0 标题 -->
          <div class="sonTitle">
            <span class="titleName">馆内图书信息</span>
          </div>
          <!-- 2.0 表单填写 查询添加 内容需做调整  -->
          <section class="searchBox Posleft">
            <div class="buttonBox">
              <button class="add" @click="rechargeBtn">
                <i class="addIcon el-icon-plus"></i>新增
              </button>
            </div>
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="书名:">
                <el-input size="120" v-model="searchForm.bookName" placeholder="请输入书籍名称"></el-input>
              </el-form-item>
              <el-form-item label="索书号:" size="160">
                <el-input v-model="searchForm.bookIndex" placeholder="请输入索书号"></el-input>
              </el-form-item>
              <!-- 下拉框 -->
              <el-form-item label="状态:" size="160">
                <el-select v-model="searchForm.status"  clearable  placeholder="请选择状态">
                  <el-option
                    v-for="(option,index) of optionsStatus"
                    :key="index"
                    :label="option"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型:" size="160"  style="position: relative;width:250px">
                <el-input v-model="searchForm.type" placeholder="请选择类型" style="width: 200px;" @focus="typeMessage"></el-input>
                <img :src="changeSrc" id="typeImg" style="width: 13px;height:13px;position: absolute;top:14px;left: 177px" @click="typeInput">
              </el-form-item>
              <el-form-item>
                <el-button size="15" type="primary" @click="searchSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
          </section>
          <!-- 3.0 表格展示内容 需做更改部分 -->
          <section class="text item tablebox" v-loading="tableLoading" element-loading-text="拼命加载中">
            <el-table

              class="tableBorder"
              :data="tableData"
              style="width: 100%; text-align:center;"
              :row-style="rowStyle"
              :header-cell-style="{background:'#0096FF', color:'#fff',height:'60px'}"
            >
              <el-table-column align="center" width="90" prop="index" label="序号">
                <template slot-scope="scope">
                  <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" prop="name" label="书名"></el-table-column>
              <el-table-column
                align="center"
                :show-overflow-tooltip="true"
                prop="searchNumber"
                width="150"
                label="索书号"
              ></el-table-column>
              <el-table-column align="center" prop="barcode" width="130" :show-overflow-tooltip="true" label="条码"></el-table-column>
              <el-table-column align="center" prop="isbn" width="130" :show-overflow-tooltip="true" label="ISBN"></el-table-column>
              <el-table-column align="center" prop="lend" width="130" label="借出数量"></el-table-column>
              <el-table-column align="center" prop="total" width="120" :show-overflow-tooltip="true" label="录入员"></el-table-column>
              <el-table-column align="center" prop="entryTime" width="130" :show-overflow-tooltip="true" label="录入时间"></el-table-column>
              <el-table-column align="center" prop="creatTime" width="130" :show-overflow-tooltip="true" label="入藏时间"></el-table-column>
              <el-table-column align="center" prop="fkTypeName" width="120" :show-overflow-tooltip="true" label="类型"></el-table-column>
              <el-table-column align="center" prop="state" width="120" label="状态">
                <template slot-scope="scope">
                  <span>{{scope.row.state ===1?'上架':'下架'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <!-- 这里的scope代表着什么 index是索引 row则是这一行的对象 -->
                <template slot-scope="scope">
                  <span class="edit" @click="detailButton(scope.$index, scope.row)">详情</span>
                  <span class="ban" @click="handleBan(scope.$index, scope.row)">下架</span>
                </template>
              </el-table-column>
            </el-table>
            <!--分页-->
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
        </div>
      </div>
      <!-- 新增弹框 -->
      <div class="addEditDialog">
        <!-- Form -->
        <el-dialog @close="closeForm" width="650px" :title="Dialogtitle[i]" :visible.sync="dialogFormVisible">
          <el-form :rules="rules" :model="addForm" :ref="addForm" style="display: flex;flex-direction: column">
            <div class="flexLayout">
              <el-form-item label=" 索 书 号 :" prop="bookIndex" label-width="85px" style="">
                <el-input v-model="addForm.bookIndex"></el-input>
              </el-form-item>
              <el-form-item label=" 馆 藏 吗 :" prop="libNumber" label-width="85px" style="">
                <el-input v-model="addForm.libNumber "></el-input>
              </el-form-item>
            </div>
            <div class="flexLayout">
              <el-form-item label=" 馆藏数量 :" prop="libQuantity" label-width="92px" style="">
                <el-input v-model="addForm.libQuantity"></el-input>
              </el-form-item>
              <el-form-item label=" 借出数量 :" prop="returnQuantity" label-width="92px" style="">
                <el-input v-model="addForm.returnQuantity "></el-input>
              </el-form-item>
            </div>
            <el-form-item label=" 状　　态 :" prop="state" label-width="92px">
              <el-radio-group v-model="addForm.state">
                <el-radio label="在架"></el-radio>
                <el-radio label="不在架"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 弹框表单按钮  验证失效-->
            <el-form-item style="margin:0px auto">
              <el-button type="primary" @click="submitForm()" >确定</el-button>
              <el-button type="info" @click="resetForm()" >取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!-- 下架弹框 -->
      <div class="forbid">
        <el-dialog :title="Dialogtitle[i]" :visible.sync="centerDialogVisible" width="500px" center>
          <div class="dialogBody">是否{{Dialogtitle[i]}}?</div>
          <div slot="footer">
            <span class="dialogButton true mr_40" @click="submitDialog">确 定</span>
            <span class="dialogButton cancel" @click="centerDialogVisible = false">取 消</span>
          </div>
        </el-dialog>
      </div>
    </el-container>
  </div>
</template>

<script>
import {
  userManageInterface,
  roleType,
  headUpload,
  headimg,
  booknews,
  libbooknews
} from "../../../request/api/base.js";
import moment from "moment";
import sousou from "../../../base/img/currency/ss.png"
import cuowu from "../../../base/img/currency/X.png"
import axios from "axios";
export default {
  data() {
    return {
      changeSrc:sousou,
      setting: {
        edit: {
          enable: true,
          showRemoveBtn: false,
          addHoverBtn: false,
          showRenameBtn: false,
          editNameSelectAll: true
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: 0
          }
        },
        view: {
          showLine: false,
          showIcon: true,
          dblClickExpand: false,
          selectedMulti: true,
        },
        callback: {
          onClick: this.zTreeOnClick, //节点点击事件
        }
      },
      zNodes: [],
      optionsStatus: [
        "上架",
        "下架",
      ],
      addForm:{
        //添加的数据
        bookIndex:'',//索书号
        libNumber:'',//馆藏码
        libQuantity:'',//馆藏数量
        returnQuantity:'',//借出数量
        state:'' //状态

      },
      rules:{
        bookIndex:[{ required: true, message: "请输入索书号", trigger: "blur" }],
        libNumber:[{ required: true, message: "请输入馆藏码", trigger: "blur" }],
        libQuantity:[{ required: true, message: "请输入馆藏数量", trigger: "blur" }],
        returnQuantity:[{ required: true, message: "请输入借出数量", trigger: "blur" }],
        state:[{ required: true, message: "请选择状态", trigger: "change" }],
      },
      /*====== 2.0表单搜索提交数据项 ======*/
      searchForm: {
        bookName: "",
        bookIndex: "",
        type: "",
        status: ""
      },

      /*====== 3.0表格设置项 ======*/
      tableLoading: false,
      rowStyle: {
        height: "60px"
      },
      tableData: [
        // 用于注入表单的数据 这里的数据应该在created钩子函数创建的时候向后台获取
      ],
      /*====== 3.1 分页设置项 ======*/
      total: 0,
      pageSize: 10,
      pageInput:1,
      currentPage: 1,
      paginationForm: {},
      /*===== end 弹框初始化数据 ======*/
      dialogFormVisible: false, // // 添加弹框的展示和消失
      centerDialogVisible:false,
      editLoading: false,
      files: null, // 传递给后台的请求
      defaultImg:'', // 默认图片地址
      i:0,
      Dialogtitle: ["添加",'下架'],
      id:null,
    };
  },
  computed: {
    searchTimeForm() {
      // 搜索所需数据 过滤数据 传递给后端的数据
      var state=null
      if(this.searchForm.status=='上架'){
        state=1
      }else if(this.searchForm.status=='下架'){
        state=0
      }else if(this.searchForm.status==''){
        state=''
      }
      let searchForm = {
        pageSize: this.pageSize,
        currentPage:1,
        name:this.searchForm.bookName,
        searchNumber:this.searchForm.bookIndex,
        fkTypeCode:this.searchForm.type,
        state:state
      };
      return searchForm;
    },
  },
  mounted() {
    this.SearchApi(this.searchTimeForm); // 调用查询接口获取数据
    this.freshArea()
    $('#typeMessage').fadeOut()
    this.axios.get(libbooknews.table).then((res)=>{
      console.log(res)
    })
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
    async freshArea() {
      this.axios.get(libbooknews.type).then((res)=>{
        console.log('res',res)
        if(res.data.state==true){
          for (let item of res.data.row) {
            //console.log(item)
            this.zNodes.push({
              id: item.id, //节点id
              pId: item.pid, //节点父id
              name: item.name, //节点名称
              code:item.code, //
            });
          }
          //将数据渲染到ztree树
          $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
        }else{
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
    },
    typeInput(){
      console.log(this.zNodes.length)
      console.log('changeSrc',this.changeSrc)
      if(this.changeSrc==sousou){
        if(this.zNodes.length!=0){
          $('#typeMessage').fadeIn()
        }
      }else if(this.changeSrc==cuowu){
        this.searchForm.type=''
        this.changeSrc=sousou
      }
    },
    typeMessage(){
      if(this.zNodes.length!=0){
        $('#typeMessage').fadeIn()
      }
    },
    //新增按钮
    rechargeBtn(){
      this.i=0
      this.dialogFormVisible=true
    },
    //添加弹框确定按钮
    submitForm(){

    },
    //添加弹窗取消按钮
    resetForm(){

    },
    //关闭添加弹窗
    closeForm(){

    },
    closeCheck(){
      $('#typeMessage').fadeOut()
    },
    zTreeOnClick(event, treeId, treeNode) {
      $('#typeMessage').fadeOut()
      this.searchForm.type=treeNode.name
      this.changeSrc=cuowu
    },
    /*====== 2.0 搜索与添加按钮触发 ======*/
    searchSubmit() {
      // 条件查询按钮

      console.log("此时传给后台的搜索数据", this.searchTimeForm);
      this.SearchApi(this.searchTimeForm);
      this.currentPage = 1;
    },
    handleBan(index, row) {
      //下架
      console.log( row); // 当前选中表格的索引和对象
      this.id=row.id
      this.i= 1;
      this.centerDialogVisible = true;
    },
    submitDialog() {
      // 用于提交接口数据的函数 可以传入一个接口回调函数使用 删除操作和禁用操作可以写在外面 然后根据i来判断此时是禁用窗口还是删除窗口 来执行对应操作 如果觉得麻烦就复制两份单独处理
      this.axios.post(libbooknews.edit,{state:0,id:this.id}).then((res)=>{
        console.log(res)
        if(res.data.state==true){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.SearchApi()
        }else{
          this.$message.error(res.data.msg);
        }
      })
      this.centerDialogVisible = false;
    },

    /*====== 3.0表格操作相关 ======*/
    // 打开详情页
     detailButton(index, row) {
      // 详情
      let id = row.barcode
      this.$router.push({path:`/LibBookInfo/${id}`})
    },
    /*====== 3.1 分页查询和初始化 ======*/
    current_change: function(currentPage) {
      //分页查询
      this.currentPage = currentPage; //点击第几页
      this.paginationForm.currentPage = currentPage;
      console.log("保存当前查询", this.paginationForm);
      this.SearchApi(this.paginationForm); // 这里的分页应该默认提交上次查询的条件
    },
    /*====== baseAPI调用相关 ======*/
    SearchApi(value) {
      //获取登录记录 或者说是加载数据 这里应该请求的时候加状态动画
      this.tableLoading = true; // 加载前控制加载状态
      axios
        .get(libbooknews.table, {
          params: value
        })
        .then(res => {
          console.log("当前获取的数据", res.data);
          if (res.data.state === true) {
            let nomol = res.data.row;
            let i = 1;
            for (let item of nomol) {
              item.index = i;
              i++;
            }
            this.tableData = nomol; //获取返回数据
            this.total = res.data.total; //总条目数
            this.paginationForm = Object.assign({}, value); // 保存上次的查询结果
            console.log("过滤后的数据", nomol);
            console.log("保存当前查询", this.paginationForm);
            this.tableLoading = false;
          } else {
            this.$message.error(res.data.msg);
            this.tableLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });

    },
  }
};
</script>

<style scoped>
/*====== 0.0 初始化部分 ======*/
.edit {
  color: #00d7f0;
  cursor: pointer;
  margin-right: 20px;
}
.ban {
  color: #ff5c3c;
  cursor: pointer;
}
#typeMessage{
  display: none;
  position: absolute;
  top: 200px;
  left:750px;
  z-index: 30000;

}
#typeMessage div:nth-child(1){
  width: 400px;
  height: 50px;
  background-color: #0096FF;
  font-size: 20px;
  color: white;
  text-align: center;
  line-height: 50px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
  -moz-box-shadow: 2px 2px 10px #909090;
  -webkit-box-shadow: 2px 2px 10px #909090;
  box-shadow:2px 2px 10px #909090;
}
#typeMessage div:nth-child(2) {
  overflow: auto;
  height: 500px;
  width: 370px;
  background-color: white;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-left: 30px;
  padding-bottom: 30px;
  filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090, direction=120, strength=4);
  -moz-box-shadow: 2px 2px 10px #909090;
  -webkit-box-shadow: 2px 2px 10px #909090;
  box-shadow: 2px 2px 10px #909090;
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

.box-card {
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
.Posleft {
  display: flex;
  justify-content: space-between;
}
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
#addFormBI {
}

#addFormBI .upload {
  width: 150px;
  height: 200px;
  background-color: #333;
}
#addFormBI .infoGroup {
  width: 440px;
}
.row1 {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>

