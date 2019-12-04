<template>
  <div class="wxed" id="Notice">
    <el-container>
      <div style="width:100%">
        <div class="sonTitle">
          <span class="titleName">活动资讯管理</span>
        </div>
        <!-- 2.0表单填写 -->
        <section class="searchBox">
          <div class="left buttonBox">
            <button @click="addBtn" class="add">
              <i class="addIcon el-icon-plus"></i>添加
            </button>
          </div>
          <div class="right">
            <el-form :inline="true" :model="searchForm">
              <el-form-item size="180" label="发布时间:">
                <el-date-picker
                  v-model="searchForm.beginTime"
                  type="date"
                  style="width: 200px"
                  placeholder="开始日期"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
                <el-date-picker
                  v-model="searchForm.endTime"
                  type="date"
                  style="width: 200px"
                  placeholder="结束日期"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="button_s" @click="searchBtn">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
        </section>
        <!-- 3.0表格数据 -->
        <section class="tableBox" v-loading="tableLoading">
          <el-table
            :header-cell-style="{background:'#0096FF', color:'#fff',height:'60px', fontSize:'14px',borderRight:'none'}"
            empty-text="无数据"
            border
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

            <el-table-column width="180" align="center" prop="createTime" label="发布时间"></el-table-column>
            <el-table-column align="center" width="150" prop="creater" label="创建者"></el-table-column>
            <el-table-column align="center" width="150" prop="person" label="发布人"></el-table-column>
            <el-table-column align="center" width="150" prop="disabled" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.disabled ===0?'禁用':'启用'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              prop="title"
              label="标题"
              min-width="800"
            >
              <template slot-scope="scope">
                <p class="textLeft">{{scope.row.title}}</p>
              </template>
              <!-- <template slot-scope="scope">
                  <p @click="jumpArticle(scope.row.id)" class="textLeft">{{scope.row.title}}</p>
              </template>-->
            </el-table-column>
            <!-- 自定义插槽 -->
            <el-table-column width="300" align="center" prop="state" label="操作" fixed="right">
              <template slot-scope="scope">
                <span class="operate editColor" @click="editBtn(scope.$index, scope.row)">编辑</span>
                <span class="operate deleteColor" @click="deleteBtn(scope.$index, scope.row)">删除</span>
                <span
                  class="operate"
                  @click="controlBtn(scope.row)"
                >{{scope.row.disabled ==0?'启用':'禁用'}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 4.0 分页 -->
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
                    />
                  </div>页
                </span>
              </slot>
            </el-pagination>
            <el-button type="primary" class="ml_30" size="medium" @click="jumpBtn">确定</el-button>
          </section>
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
import moment from "moment";
import { wxInt } from "../../request/api/progress/api";

export default {
  data() {
    return {
      /*------ 弹框参数 ------*/
      warDialog:{
        title:"删除",
        display:false
      },
      row:{},
      /*====== 2.0表单搜索区域 ======*/
      searchForm: {
        // 接受搜索表单的数据
        name: "",
        beginTime: "",
        endTime: ""
      },
      /*日期禁用规则 */
      pickerOptions: {
        // 双重绑定限制规则
        disabledDate(date) {
          const maxDate = Date.now();
          const time = date.getTime();
          return time > maxDate;
        }
      },
      pickerOptions0: {
        disabledDate: time => {
          if (this.searchForm.endTime) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() > this.searchForm.endTime
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return (
            time.getTime() < this.searchForm.beginTime ||
            time.getTime() > Date.now()
          );
        }
      },

      tableLoading: true,
      currentPage: 1,
      pageInput: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    };
  },
  computed: {
    searchTimeForm() {
      // 计算属性 真正传递的数据
      let searchForm = {
        pageSize: this.pageSize,
        currentPage: 1,
        category: this.searchForm.name,
        beginTime: !this.searchForm.beginTime
          ? null
          : moment(this.searchForm.beginTime).format("YYYY-MM-DD"), //开始时间
        endTime: !this.searchForm.endTime
          ? null
          : moment(this.searchForm.endTime).format("YYYY-MM-DD") //结束时间
      };
      return searchForm;
    },
    // 判定提示语

    cancelTimeForm() {}
  },
  methods: {
    // 新增按钮
    addBtn() {
      this.$router.push({ path: "/wxCreator" });
    },
    warBtn(){
      let id = this.row.id;
      let obj = [
        {
          id: id
        }
      ];
      this.deleteApi(obj);
    },
    // 删除按钮
    deleteBtn(index, row) {
      
      this.row = row
      this.warDialog.display = true
      console.log(this.row,'参数是否传递')
      
    },
    // 编辑按钮
    editBtn(index, row) {
      let id = row.id;
      this.$router.push({ path: `/wxEditor/${id}` });
      console.log("这个信息是", row);
    },
    // 查询按钮
    searchBtn() {
      this.searchApi(this.searchTimeForm); // 查询后 把新数据保存到分页表单中
      this.currentPage = 1;
    },
    // 禁用启用按钮
    controlBtn(row) {
      let disabled = row.disabled;
      let obj = {};
      obj.id = row.id;
      if (disabled) {
        this.closeApi(obj);
        console.log("禁用");
      } else {
        this.openApi(obj);
        console.log("启用");
      }
      console.log(row.disabled, "启用禁用");
    },
    // 跳转按钮
    jumpArticle(id) {
      this.$router.push({ path: `/article/${id}` });
      console.log(id);
    },
    // 分页按钮
    jumpBtn() {
      // v-mode绑定好像会默认转数据类型
      let page = Math.ceil(this.total / this.pageSize);
      page == 0 ? 1 : page;
      if (this.pageInput > page || this.pageInput == "" || this.pageInput < 0) {
        this.pageInput = 1;
        this.$nextTick(() => {
          this.$refs.text.value = 1; // hack方法
          console.log("Vmode绑定值", this.pageInput);
        });
      } else {
        this.pageInput = parseInt(this.pageInput);
        this.$refs.text.value = parseInt(this.pageInput);
        let num = parseInt(this.pageInput);
        this.current_change(num);
      }
    },
    /*------ Api ------*/
    searchApi(value) {
      //
      console.log(value);
      this.tableLoading = true;
      axios
        .get(wxInt.search, {
          params: value
        })
        .then(res => {
          console.log("文章数据", res.data);
          if (res.data.state === true) {
            this.tableData = res.data.row; //获取返回数据
            this.total = res.data.total; //总条目数
            this.paginationForm = Object.assign({}, value); // 保存上次的查询结果
            this.currentPage = 1; // 回到第一页显示
            this.tableLoading = false;
            console.log("列表", this.tableData);
          } else {
            this.$message.error(res.data.msg);
            this.tableLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteApi(value) {
      axios({
        url: wxInt.remove,
        method: "delete",
        data: value
      }).then(res => {
        if (res.data.state == true) {
          this.$message.success("删除成功");
          this.warDialog.display = false
          this.searchApi(this.searchTimeForm);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    openApi(params = {}) {
      axios({
        url: wxInt.open,
        method: "put",
        data: params
      }).then(res => {
        if (res.data.state == true) {
          this.$message.success("启用成功");

          this.searchApi(this.searchTimeForm);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    closeApi(params = {}) {
      axios({
        url: wxInt.close,
        method: "put",
        data: params
      }).then(res => {
        if (res.data.state == true) {
          this.$message.success("禁用成功");
          this.searchApi(this.searchTimeForm);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    paginationApi(value) {
      //获取登录记录
      console.log(value);
      this.tableLoading = true;
      axios
        .get(wxInt.select, {
          params: value
        })
        .then(res => {
          console.log("文章数据", res.data);
          if (res.data.state === true) {
            this.tableData = res.data.row; //获取返回数据
            this.total = res.data.total; //总条目数
            this.paginationForm = Object.assign({}, value); // 保存上次的查询结果
            this.tableLoading = false;
            console.log("列表", this.tableData);
          } else {
            this.$message.error(res.data.msg);
            this.tableLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    current_change(currentPage) {
      //分页查询
      this.currentPage = currentPage; //点击第几页
      this.paginationForm.currentPage = currentPage;
      console.log("保存当前查询", this.paginationForm, this.currentPage);
      this.paginationApi(this.paginationForm); // 这里的分页应该默认提交上次查询的条件
    }
  },
  created() {
    this.searchApi(this.searchTimeForm); // 调用查询接口获取数据
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
