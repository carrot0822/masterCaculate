<template>
  <div style="display: flex;flex-direction: row;overflow: auto">
    <div style="width:250px;display: flex;flex-direction:column;">
      <div style="width: 250px;height:60px;background-color: #0096FF;font-size: 18px;color: white;text-align: center;line-height: 60px ">藏馆信息</div>
      <div style="overflow-y: auto;background-color:white;height: 900px">
        <ul id="treeDemo" class="ztree" style="margin-top:30px;margin-left:30px"></ul>
      </div>
    </div>
      <div style="width:1320px;margin-left: 30px;background-color:white;height:952px">
        <el-container>
          <div class="box-card">
            <!-- 0.0 面包屑路由导航部分 此处路由导航可以直接跳 属于动态添加渲染出的 -->
            <div class="space"></div>
            <!-- 估计是第三层路由展示区域 -->
            <div class="important">
              <!-- 1.0 标题 -->
              <div class="sonTitle">
                <span class="titleName">藏馆信息</span>
              </div>
              <div style="display: flex;flex-direction: row">
                <!-- 3.0 添加删除按钮 添加之前：弹框提交  状态： 正在添加 添加完成（alert提示自带）/添加失败请重试 -->
                <div class="buttonBox">
                  <button class="add" @click="addDialogOpen">
                    <i class="addIcon el-icon-plus"></i>添加
                  </button>
                </div>
              </div>
              <!-- 4.0 表格展示内容 编辑功能：状态用上 禁用 批量禁用弹框 弹框可尝试用slot插槽封装 -->
              <section class="text item tablebox" v-loading="tableLoading" element-loading-text="拼命加载中">
                <el-table
                  class="tableBorder"
                  :data="tableData"
                  empty-text="无数据"
                  style="width: 100%; text-align:center;"
                  type="index"
                  :row-style="rowStyle"
                  :header-cell-style="{background:'#0096FF', color:'#fff',height:'60px', fontSize:'18px'}"
                >
                  <el-table-column align="center" prop="index" width="200" label="序号">
                    <template slot-scope="scope">
                      <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="name" width="200" label="藏馆名称" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column align="center" prop="fkCityName" width="200" label="城市名字"></el-table-column>
                  <el-table-column align="center" prop="libraryKey" width="200" label="密钥" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column align="center" prop="creatTime" width="230" label="创建时间"></el-table-column>
                  <el-table-column align="center" prop="updateTime" width="230" label="更新时间"></el-table-column>
                </el-table>
                <!-- 5.0 分页内容 分页提交刷新页面 前进后退 点击以及调转四个事件传递数值-->
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
          <!-- 添加弹框 -->
          <div class="addEditDialog">
            <!-- Form -->
            <el-dialog  width="568px" :title="Dialogtitle[0]" :visible.sync="dialogFormVisible" @close="closeForm">
              <el-form :label-position="labelPosition" :ref="addForm" label-width="80px" :model="addForm" :rules="addRules" style="width: 400px;margin: 0px auto" id="addFormYf">
                <el-form-item label="藏馆名称" prop="name">
                  <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="藏馆编码" prop="code">
                  <el-input v-model="addForm.code"></el-input>
                </el-form-item>
                <el-form-item label="藏馆密匙" prop="key">
                  <el-input v-model="addForm.key"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm('addForm')" style="width: 200px;margin-left: 100px">保存</el-button>
              </el-form>
            </el-dialog>
          </div>
        </el-container>
      </div>
  </div>
</template>

<script>
  import {bookpublish,libnews} from '../../request/api/base.js'
  export default {
    data() {
      return {
        /*====== 0.0初始化弹框数据ztree ======*/
        setting: {
          edit: {
            enable: true,
            showRemoveBtn: false,
            addHoverBtn: false,
            removeTitle: "删除节点",
            showRenameBtn: false,
            editNameSelectAll: false
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
            dblClickExpand: true,
            addDiyDom: this.addDiyDom,
            selectedMulti: true,
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom
          },
          callback: {
            onClick: this.zTreeOnClick, //节点点击事件
            onCheck: this.zTreeOnCheck, //勾选时事件
          },
          check: {
            enable: true,
            chkStyle: "radio",
            radioType: "all"
          }
        },
        zNodes: [],
        tableLoading:false,
        /*====== 0.0初始化弹框数据 ======*/
        /*初始化 */
        //total: 0,
        labelPosition:'left',
        total: 0,
        pageSize: 10,
        pageInput: 1,
        currentPage: 1,
        paginationForm: {},
        centerDialogVisible: false, // 禁用弹框
        Dialogtitle: ["添加"],
        i: 0, // 切换弹框标题
        dialogFormVisible: false, // // 添加弹框的展示和消失
        addForm: {
          // 添加的数据表单 共8个参数
          name:'',
          code:'',
          key:''
        },
        addRules: {
          // 添加的参数验证
          name: [{ required: true, message: "请输入藏馆名称", trigger: "blur" }],
          code: [{ required: true, message: "请输入藏馆编码", trigger: "blur" }],
          key: [{ required: true, message: "请输入藏馆密匙", trigger: "blur" }],
        },
        formLabelWidth: "120px",
        /*====== 2.0表单提交数据项 ======*/
        search: "", // 存储搜索完成后的2.0表单数据 用于调用分页接口

        /*====== 3.0添加 批量删除所需数据 ======*/
        Allseclet: [], // 存储全选框 单选框的数据/索引 用于传递给后台同时 前端用索引号去删除表格内的内容

        /*====== 4.0表格设置项 ======*/
        rowStyle: {
          height: "60px"
        },
        /*====== 5.0 分页相关设置项 ======*/
        zTree:{},
        tableData:[],
        addmessage:''
      };
    },
    computed:{
      searchTimeForm() {
        // 计算属性 真正传递的数据
        console.log('ztree',this.zTree.code)
        let citynameCode=''
        if(this.zTree.code==undefined){
          citynameCode='bj_jing'
        }else{
          citynameCode=this.zTree.code
        }
        let searchForm = {
          pageSize: this.pageSize,
          current:1,
          cityCode:citynameCode
        };
        return searchForm;
      },
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
      closeForm(){
        //this.addmessage=''
      },
      /*====== 3.0添加删除相关操作 ======*/
      addDialogOpen() {
        console.log(this.zTree.code)
        this.dialogFormVisible = true;
      },
      /*====== 3.1ztree城市树状图 ======*/
      async freshArea() {
        this.axios.get(bookpublish.city).then((response)=>{
          console.log('ztree树',response)
          for (var item of response.data.row) {
            this.zNodes.push({
              name:item.name,
              code: item.code, //节点菜单编码
              checked:item.checked
            });
          }
          //将数据渲染到ztree树
          $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
        })
      },
      zTreeOnCheck(event,treeId,treeNode){
        console.log('treeNode',treeNode.checked)
        if(treeNode.checked==false){
          let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
          treeObj.checkNode(treeNode, !treeNode.checked, true);
        }
        let list={
          name:treeNode.name,
          code:treeNode.code
        }
        this.zTree=list
        this.SearchApi(this.searchTimeForm)
      },
      /*====== 3.1点击ztree节点获取节点信息======*/
      zTreeOnClick(event, treeId, treeNode){
        if(treeNode.checked==false){
          let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
          treeObj.checkNode(treeNode, !treeNode.checked, true);
        }
        let list={
          name:treeNode.name,
          code:treeNode.code
        }
        this.zTree=list
        this.SearchApi(this.searchTimeForm)
      },
      /*====== 弹框相关函数 ======*/
      // 编辑弹框
      submitForm() {
        console.log('ztree树节点信息',this.zTree.code)
        this.$refs[this.addForm].validate((valid) => {
          if (valid) {
            //alert('submit!');
            if(this.zTree.code==undefined){
              this.formApi('北京市','bj_jing')
            }else{
              this.formApi(this.zTree.name,this.zTree.code)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      formApi(ztreeName,ztreeCode){
        var addStr=[{
          fkCityCode:ztreeCode,
          fkCityName:ztreeName,
          code:this.addForm.code,
          name:this.addForm.name,
          libraryKey:this.addForm.key
        }]
        this.axios.post(libnews.add,addStr).then((res)=>{
          console.log(res)
          if(res.data.state==true){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.closeForm()
            this.dialogFormVisible=false
            this.SearchApi(this.searchTimeForm)
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
            this.closeForm()
            this.dialogFormVisible=false
          }
        })
        this.$refs[this.addForm].resetFields();
        this.addmessage=''
      },
      SearchApi(value){
        this.tableLoading= true; // 加载前控制加载状态
        this.axios
          .get(libnews.select, {
            params: value
          })
          .then(res => {
            console.log("当前获取的数据", res.data);
            if (res.data.state === true) {
              let nomol = res.data.row;
              this.tableData = nomol; //获取返回数据
              this.total = res.data.total; //总条目数
              this.paginationForm = Object.assign({}, value); // 保存上次的查询结果
              console.log("过滤后的数据", nomol);
              this.currentPage = 1
              console.log("保存当前查询", this.paginationForm);
              this.tableLoading = false;
            } else {
              this.$message.error(res.data.msg);
              this.tableLoading = false;
            }
          })
      },
      paginationApi(value){
        this.tableLoading= true; // 加载前控制加载状态
        this.axios
          .get(libnews.select, {
            params: value
          })
          .then(res => {
            console.log("当前获取的数据", res.data);
            if (res.data.state === true) {
              let nomol = res.data.row;
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
      },

      current_change: function(currentPage) {
        //分页查询
        this.currentPage = currentPage; //点击第几页
        this.paginationForm.currentPage = currentPage;
        console.log("保存当前查询", this.paginationForm);
        this.paginationApi(this.paginationForm); // 这里的分页应该默认提交上次查询的条件
      },
    },
    mounted(){
      this.SearchApi(this.searchTimeForm)
      this.freshArea()
    }
  };
</script>

<style scoped>
  #mybook{
    width: 100%;
  }
  section.pagination {
    display: flex;
    justify-content: center;
  }
  .formbutton button{
    width: 150px;
    border-radius: 10px
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
  .useradd .box-card {
    width: 100%;
  }
  .text {
    font-size: 14px;
  }
  /* 按钮 */
  .buttonBox {
    margin-bottom: 30px;
    margin-right: 800px;
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
</style>
