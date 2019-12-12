<template>
  <div class="wxed" id="Notice">
    <el-container>
      <div style="width:100%">
        <div class="sonTitle">
          <span class="titleName">微信广告栏管理</span>
        </div>
        <!-- 2.0表单填写 -->
        <section class="mb_30 searchBox">
          <div class="left buttonBox">
            <button @click="addBtn" class="add">
              <i class="addIcon el-icon-plus"></i>添加
            </button>
          </div>
        </section>
        <!-- 3.0表格数据 -->
        <section class="tableBox" v-loading="tableLoading">
          <el-table
            :header-cell-style="{background:'#0096FF', color:'#fff',height:'60px', fontSize:'14px',borderRight:'none'}"
            empty-text="无数据"
            
            style="width: 100%; text-align:center;"
            :data="tableData"
            :row-style="{height:'60px'}"
          >
            <el-table-column
              align="center"
              prop="index"
              type="index"
              width="100"
              label="序号"
              fixed="left"
            >
              <template slot-scope="scope">
                <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px" align="center" prop="name" label="预览封面">
              <template slot-scope="scope">
                <div class="tab-imgBox">
                  <img :src="scope.row.preImg" style="width:187px;height:87px;" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              prop="linkType"
              label="链接类型"
            >
              <template slot-scope="scope">
                <span
                >{{scope.row.linkType =='0'?'内部链接':'外部链接'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              prop="link"
              label="链接地址"
              width="500"
            >
            </el-table-column>
            <!-- 自定义插槽 -->
            <el-table-column width="300" align="center" prop="state" label="操作" fixed="right">
              <template slot-scope="scope">
                <span class="operate editColor" @click="editBtn(scope.$index, scope.row)">编辑</span>
                <span class="operate deleteColor" @click="deleteBtn(scope.$index, scope.row)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </div>
    </el-container>
    <!-- 弹框 -->
    <section class="waringDialog">
      <el-dialog :title="warDialog.title" :visible.sync="warDialog.display" width="400px" center>
        <div class="dialogBody">是否{{warDialog.title}}?</div>
        <div style="margin-bottom: 20px">
          <span class="dialogButton true mr_40" @click="warBtn">确 定</span>
          <span class="dialogButton cancel" @click="warDialog.display=false">取 消</span>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { coverInt } from "@request/api/progress/banner";
import { uploadInt } from "@request/api/base.js";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      /*------ 弹框参数 ------*/
      warDialog: {
        title: "删除",
        display: false
      },
      row: {},
      tableLoading: true,
      tableData: []
    };
  },
  methods: {
    // 新增按钮
    addBtn() {
      this.$router.push({ path: "/addWxAdvertisement" });
    },
    warBtn() {
      let id = this.row.id;
      let obj = [
        {
          id: id
        }
      ];
      this._delete(obj);
    },
    // 删除按钮
    deleteBtn(index, row) {
      this.row = row;
      this.warDialog.display = true;
      console.log(this.row, "参数是否传递");
    },
    // 编辑按钮
    editBtn(index, row) {
      let id = row.id;
      this.$router.push({ path: `/editWxAdvertisement/${id}` });
      console.log("这个信息是", row);
    },
    /*------ Api ------*/
    _search(value) {
      this.tableLoading = true;
      coverInt.search().then(res => {
        if (res.data.state) {
          for(let item of res.data.row){
            item.preImg = uploadInt.preimg + item.url
          }
          this.tableData = res.data.row;
        } else {
        }
        this.tableLoading = false;
        console.log(res);
      });
    },
    _delete(value) {
      let data = value
      coverInt.remove(data).then((res)=>{
        if(res.data.state){
          this.$message.success("删除成功");
          this.warDialog.display = false
          this._search();
        }else{
          this.$message.error(res.data.msg);
        }
      })
    }
  },
  created() {
    this._search();
  }
};
</script>
<style lang="scss">
.wxed {
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
<style scoped>
#Notice {
  background: #ffffff;
  padding: 30px;
}
#Notice .searchBox {
  display: flex;
  justify-content: space-between;
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
.page_div {
  text-align: center;
  margin-top: 30px;
}
.confirm_bt {
  display: inline-block;
  text-align: center;
  width: 70px;
  padding: 8px 8px;
}

.button_s {
  width: 90px;
  font-size: 16px;
  text-align: center;
}

#loginrecord {
  background: #ffffff;
}

.time_p {
  margin-left: 30px;
}

/*.el-select-dropdown__item {*/
/*color: #878787;*/
/*}*/
.operate {
  cursor: pointer;
}
.textLeft {
  text-align: left;
}
/* .textLeft:hover{
  color: #1e9eff;
  cursor: pointer;
} */
#title {
  display: inline-block;
  padding-left: 10px;
  border-left: 5px solid #1e9eff;
  color: #878787;
}

#loginrecord .el-table {
  border: 1px solid #eaeaea;
  /*border-width: 0 1px 1px 1px ;*/
  border-bottom: 0;
}
.buttonBox .add {
  background: rgba(255, 146, 49, 1);
  border-radius: 10px;
  margin-right: 30px;
}
.buttonBox .add .addIcon {
  margin-right: 6px;
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
</style>
