<template>
  <div class="useradd">
    <el-container>
      <div class="box-card">
        <div class="space"></div>
        <!-- 估计是第三层路由展示区域 -->
        <div class="important">
          <!-- 1.0 标题 -->
          <div class="sonTitle">
            <span class="titleName">缴费记录</span>
          </div>
          <!-- 2.0 表单填写 查询接口 状态：正在查询（loading组件） 查询成功 查询失败 -->
          <section class="searchBox">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="用户名:" size="160">
                <el-input v-model="formInline.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="卡号:">
                <el-input size="120" v-model="formInline.cardNum" placeholder="请输入卡号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="15" type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </section>
          <!-- 4.0 表格展示内容 编辑功能：状态用上 禁用 批量禁用弹框 弹框可尝试用slot插槽封装 -->
          <section class="text item tablebox">
            <el-table class="tableBorder" :data="tableData"style="width: 100%; text-align:center;" :row-style="rowStyle" :header-cell-style="{background:'#0096FF', color:'#fff',height:'60px'}">
              <el-table-column align="center" width="140" prop="idType" label="序号"></el-table-column>
              <el-table-column align="center" width="140" prop="srcdata" label="头像">
                <template slot-scope="scope">
                  <span class="imgDefault">
                    <img
                      v-if="scope.row.srcdata"
                      class="head_pic"
                      :src="scope.row.srcdata"
                      width="30px"
                      height="30px;"
                      style="border-radius: 50%"
                    >
                  </span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name"width="150" label="用户名"></el-table-column>
              <el-table-column align="center" prop="cardNum" width="180" label="卡号"></el-table-column>
              <el-table-column align="center" prop="depositTime" width="180" label="缴费之间"></el-table-column>
              <el-table-column align="center" prop="depositMethods" width="150" label="缴费方式"></el-table-column>
              <el-table-column align="center" prop="depositMoney" width="150" label="缴费金额"></el-table-column>
              <el-table-column align="center" prop="handleMethods" width="150" label="处理方式"></el-table-column>
              <el-table-column align="center" prop="status" width="150" label="状态"></el-table-column>
              <el-table-column align="center" prop="operation" width="150" label="操作"></el-table-column>
            </el-table>
          </section>
          <!-- 5.0 分页内容 分页提交刷新页面 前进后退 点击以及调转四个事件传递数值-->
          <section class="pagination">
            <el-pagination background layout="prev, pager, next,total, jumper, ->" :total="1000"></el-pagination>
          </section>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        /*====== 0.0初始化弹框数据 ======*/
        defaultImg: " ", // 上传头像默认头像
        dialogFormVisible: false, // // 添加弹框的展示和消失
        optionsData: [
          "出纳",
          "前台",
          "图书盘点员",
          "采购员",
          "仓库管理员",
          "系统管理员"
        ],
        formLabelWidth: "120px",
        /*====== 2.0表单提交数据项 ======*/
        optionsData: [
          "出纳",
          "前台",
          "图书盘点员",
          "采购员",
          "仓库管理员",
          "系统管理员"
        ],
        formInline: {
          // 搜索需要的表单数据
          userName: "",
          cardNum: "",
        },
        search: "", // 存储搜索完成后的2.0表单数据 用于调用分页接口
        /*====== 4.0表格设置项 ======*/
        rowStyle: {
          height: "60px"
        },
        tableData: [
          // 用于注入表单的数据 这里的数据应该在created钩子函数创建的时候向后台获取
          {
            idType: "1",
            srcdata:"",//头像
            name:"张三",
            cardNum:"2222",
            depositTime:"2019-10-12",
            depositMethods:"现金",
            depositMoney:"100",
            handleMethods:"设备",
            status:"充值成功",
            operation:"详情"
          },
          {
            idType: "1",
            srcdata:"",//头像
            name:"张三",
            cardNum:"2222",
            depositTime:"2019-10-12",
            depositMethods:"现金",
            depositMoney:"100",
            handleMethods:"设备",
            status:"充值成功",
            operation:"详情"
          },
        ]
        /*====== 5.0 分页相关设置项 ======*/
      };
    },

    methods: {
      onSubmit() {
        // date提交的值需要做相关处理转换 提交之后的数据绑定到tableDta 映射到表格数据中
        console.log(this.formInline);
      },
    }
  };
</script>

<style scoped>
  /*====== 0.0 初始化部分 ======*/
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
    margin-right: 25px;
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


