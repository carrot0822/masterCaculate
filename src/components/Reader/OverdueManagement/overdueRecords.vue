<template>
  <div class="useradd">
    <el-container>
      <div class="box-card">
        <!-- 估计是第三层路由展示区域 -->
        <div class="important">
          <!-- 1.0 标题 -->
          <div class="sonTitle">
            <span class="titleName">逾期记录</span>
          </div>
          <!-- 2.0 表单填写 查询接口 状态：正在查询（loading组件） 查询成功 查询失败 -->
          <section class="searchBox flexLayout">
            <div class="buttonBox"></div>
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="筛选 :">
                <el-select
                  style="width: 150px"
                  v-model="searchForm.makeMethod"
                  placeholder="请选择 :"
                  clearable
                  @change="selectCheck(searchForm.makeMethod)"
                >
                  <el-option label="用户名" value="0"></el-option>
                  <el-option label="卡号" value="1"></el-option>
                  <el-option label="书名" value="2"></el-option>
                </el-select>
                <el-input v-model="searchForm.searchData" placeholder="请输入相关信息" clearable style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="15" type="primary" class="button_s" @click="onSubmit">搜索</el-button>
              </el-form-item>
            </el-form>
          </section>
          <!-- 4.0 表格展示内容 编辑功能：状态用上 禁用 批量禁用弹框 弹框可尝试用slot插槽封装 -->
          <section class="tablebox" v-loading="tableLoading">
            <el-table id="out-table" :data="tableData" style="width: 100%; text-align:center;" :row-style="rowStyle" :header-cell-style="{background:'#0096FF', color:'#fff',height:'60px'}">
              <el-table-column align="center" prop="index" type="index" label="序号" width="100" fixed="left">
                <template slot-scope="scope">
                  <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="fkReaderName" label="用户名"></el-table-column>
              <el-table-column align="center" prop="fkCardNumber" label="卡号"></el-table-column>
              <el-table-column align="center" prop="bookName" label="书名"></el-table-column>
              <el-table-column align="center" prop="creatTime" label="应还书时间"></el-table-column>
              <el-table-column align="center" prop="overdueDay" label="已逾期天数">
                <template slot-scope="scope">
                  <span>{{scope.row.overdueDay == null || scope.row.overdueDay=='' ?'---':scope.row.overdueDay}}天</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="overdueExpenses" label="已逾期金额">
                <template slot-scope="scope">
                  <span>{{scope.row.overdueExpenses}}元</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" fixed="right">
              <!-- 这里的scope代表着什么 index是索引 row则是这一行的对象 -->
              <template slot-scope="scope">
                <span class="edit" @click="handleEdit(scope.$index, scope.row)">催还</span>
                <span class="edit" @click="handleBan(scope.$index, scope.row)">处理</span>
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
                    <input
                      ref="text"
                      type="number"
                      v-model="pageInput"
                      autocomplete="off"
                      min="1"
                      max="1"
                      class="compo el-input__inner"
                    >
                  </div>页
                </span>
                </slot>
              </el-pagination>
              <el-button type="primary" class="ml_30" size="medium" @click="jumpBtn">确定</el-button>
            </section>
          </section>
          <div class="forbid">
            <el-dialog :title="Dialogtitle[i]" :visible.sync="centerDialogVisible" width="500px" center>
              <div v-if="i!=1" style="text-align: center">
                <div style="font-size: 20px;color: grey">电话 : &nbsp; &nbsp;{{phone}}</div>
              </div>
              <div v-if="i==1">
                <div style="font-size: 20px;color: grey">该用户逾期金额为{{overdueMoney}}元，是否处理？</div>
              </div>
              <div slot="footer">
                <span class="dialogButton true mr_40" @click="submitDialog">确 定</span>
                <span class="dialogButton cancel" @click="centerDialogVisible = false">取消</span>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>

  import {overdue} from '@request/api/base.js'
  export default {
    data() {
      return {
        /*====== 0.0初始化弹框数据 ======*/
        rowStyle: {
          height: "60px"
        },
        Dialogtitle:['催还','处理'],
        i: null, // 切换弹框标题
        centerDialogVisible:false,
        defaultImg: " ", // 上传头像默认头像
        formLabelWidth: "120px",
        /*====== 2.0表单提交数据项 ======*/
        /*====== 4.0表格设置项 ======*/
        total: 0,
        pageSize: 10,
        pageInput:1,
        currentPage: 1,
        searchForm: {
          // 接受搜索表单的数据
          makeMethod: "",
          searchData: "",
          currentPage: 0
        },
        searchData: "",
        selectSearchForm: {
          userName: "", //用户名
          cardNum: "", //卡号
          bookName:'',//书名
          currentPage: 0
        },
        tableLoading:true,
        tableData: [
          // 用于注入表单的数据 这里的数据应该在created钩子函数创建的时候向后台获取
        ],
        phone:'',//催还用户电话号码
        overdueMoney:'',//处理用户逾期金额
        id:''
      };
    },
    mounted() {
      this.SearchApi(this.searchTimeForm); // 调用查询接口获取数据
    },
    computed:{
      searchTimeForm() {
        // 计算属性 真正传递的数据
        if (this.searchData) {
          switch (this.searchData / 1) {
            case 0:
              console.log("用户名");
              this.selectSearchForm.userName = this.searchForm.searchData;
              break;
            case 1:
              console.log("卡号");
              this.selectSearchForm.cardNum = this.searchForm.searchData;
              break;
            case 2:
              console.log("书名");
              this.selectSearchForm.bookName = this.searchForm.searchData;
              break;
          }
        } else {
          console.log("为空");
          this.selectSearchForm.userName = "";
          this.selectSearchForm.cardNum = "";
          this.selectSearchForm.bookName = "";
        }
        let searchForm = {
          pageSize: this.pageSize,
          currentPage: 1,
          cardNumber:this.selectSearchForm.cardNum,
          name:this.selectSearchForm.userName,
          bookName:this.selectSearchForm.bookName
        };
        return searchForm;
      },
    },
    methods: {
      selectCheck(val) {
        console.log("val", val);
        this.searchForm.searchData=""
        for(const index in this.selectSearchForm){
          this.selectSearchForm[index]=""
        }
        this.searchData = val;
      },
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
      submitDialog(){
        console.log(this.id)
        this.axios.post(overdue.make,{id:this.id,overdueExpenses:this.overdueMoney}).then((res)=>{
          console.log(res)
          if(res.data.state==true){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.centerDialogVisible=false
            this.SearchApi(this.searchTimeForm)
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      },
      //导出按钮
      deriveBtn(){
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            "sheetjs.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },
      onSubmit() {
        // date提交的值需要做相关处理转换 提交之后的数据绑定到tableDta 映射到表格数据中
        console.log("此时传给后台的搜索数据", this.searchTimeForm);
        this.SearchApi(this.searchTimeForm);
        this.currentPage = 1;
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
        this.tableLoading= true; // 加载前控制加载状态
        this.axios
          .get(overdue.table, {
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
          .catch(error => {
            console.log(error);
          });
      },
      handleEdit(index, row){
        //this.centerDialogVisible=true
        this.i=0
        this.phone=row.phone
        this.centerDialogVisible=true
        this.id=row.id
        console.log(row)
      },
      handleBan(index, row){
        this.id=row.id
        this.i=1
        console.log('修改获取的数据',row.overdueExpenses)
        this.centerDialogVisible=true
        this.overdueMoney=row.overdueExpenses
      }
    }
  };
</script>

<style scoped>
  /*====== 0.0 初始化部分 ======*/
  .buttonBox{
    margin-bottom: 30px;
  }
  .buttonBox .blue {
    background: #31D6FF;
    border-radius: 10px;
  }
  .buttonBox .blue .blueIcon {
    margin-right: 6px;
  }
  .edit {
    color: #00d7f0;
    cursor: pointer;
    margin-right: 20px;
  }
  section.pagination {
    display: flex;
    justify-content: center;
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
  .el-form--inline .el-form-item {
    margin-right: 10px;
  }
  .el-form--inline .el-form-item:last-child {
    margin-right: 0;
  }
  .el-input.el-input--120 input {
    height: 36px;
    line-height: 36px;
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
  .row1 .el-form-item {
    margin-bottom: 30px;
  }
  .row1.el-input .el-input__inner {
    width: 200px;
  }

  .upload .defultHead {
    position: relative;
  }
  .defultHead:hover .bgload {
    display: block;
  }
</style>


