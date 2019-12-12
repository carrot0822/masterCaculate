<template>
  <div id="video" class="video wxadd">
    <section class="pagetitle">
      <div>
        <span class="titleName" @click="backBtn">
          <i class="el-icon-back"></i>返回列表
        </span>
      </div>
    </section>
    <div v-if="loading" class="videoBox">
      <section class="uploadBox">
        <div class="nomal-Box">
          <div class="upload-demo">
            <div class="inputBox">
              <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                <el-form-item label="链接类型">
                  <el-select @change="changeBtn" v-model="addForm.linkType" placeholder="请选择链接类型">
                    <el-option label="资讯内链" value="0"></el-option>
                    <el-option label="web外链" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="addForm.linkType=='0'" label="内部链接" prop="inLink">
                  <el-input
                    :disabled="true"
                    placeholder="请点击搜索按钮进行选择"
                    v-model="addForm.instr"
                    class="input-with-select"
                  >
                    <el-button @click="openDialog" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item v-if="addForm.linkType=='1'" label="外部链接" prop="inLink">
                  <el-input placeholder="https://xxx" v-model="addForm.outLink"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="tips">提示:</div>
            <cover
              :height="175"
              :width="375"
              :img ="preImg"
              ref="cover"
              @imgSuccess="imgSuccess"
              @imgDelete="imgDelete"
            ></cover>
            <div class="textCenter firstButton">
              <el-button class="buttonBlue" type="primary" @click="addBtn">添加</el-button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="listDialog">
      <el-dialog :title="inLinkDlg.title" :visible.sync="inLinkDlg.display">
        <section class="ListBox">
          <el-scrollbar class="recomandList">
            <section>
              <p class="data-title mb_20" style="color:#0096FF">广告栏列表</p>
              <section class="tableBox">
                <el-table
                  :header-cell-style="{background:'#0096FF', color:'#fff',height:'50px', fontSize:'18px',borderRight:'none'}"
                  empty-text="无数据"
                  style="width: 100%; text-align:center;"
                  :data="list"
                  :row-style="{height:'30px'}"
                >
                  <el-table-column prop="title" label="标题"></el-table-column>
                  <el-table-column align="center" width="100px" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="small"
                        @click="getBtn(scope.$index, scope.row)"
                        type="primary"
                      >选中</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </section>
            </section>
          </el-scrollbar>
        </section>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { uploadInt } from "@request/api/base.js";
import { coverInt } from "@request/api/progress/banner";
import cover from "../../common/upload/upCover";
export default {
  data() {
    return {
      // 选择列表
      list: [], // 循环列表
      currentPage: 1,
      pageInput: 1,
      pageSize: 10,
      total: 0,
      preImg:'',
      addForm: {
        linkType: "0", // 链接类型
        url: "",
        inLink: "", // 内部链接
        outLink: "", // 外部链接
        instr: ""
      },
      loading:false,
      rules: {
        title: [{ required: true, message: "标题不得为空", trigger: "blur" }]
      },
      timeFile: null, // 文件转换
      deleteObj: {},
      // 弹框
      inLinkDlg: {
        title: "文章选择",
        display: false
      }
    };
  },
  computed: {
    addTimeForm() {
      let type = this.linkType;
      let obj = {
        url: this.addForm.url,
        linkType: this.addForm.linkType
      };
      if (this.addForm.linkType == "0") {
        obj.link = this.addForm.inLink;
      } else {
        obj.link = this.addForm.outLink;
      }
      return obj;
    }
  },
  created() {
      let obj = this.$route.params
    this._search();

    this._selectOne(obj)
    console.log(this.$route.params,'参数')
  },
  methods: {
    openDialog() {
      this.inLinkDlg.display = true;
    },
    changeBtn(val) {
      if (val == "1") {
        this.addForm.inLink = "";
        this.addForm.instr = "";
      }
      console.log(typeof val, "改变", this.addForm);
    },
    getBtn(index, row) {
      console.log(row, "?在哪");
      this.addForm.instr = row.title;
      this.addForm.inLink = row.id;
      this.inLinkDlg.display = false;
      console.log(this.addForm,'选择后')
    },
    backBtn() {
      this.$router.push({ path: "/WxAdvertisement" });
    },
    /** */

    /*------ 图片封面 ------*/
    imgDelete(value) {
      this.addForm.url = "";
      console.log(value, "删除的");
    },
    imgSuccess(value) {
      this.addForm.url = value.row;
      console.log(value, "上传的");
    },
    /*--- ---*/
    addBtn() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this._revise();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("上传之前的数据", this.addTimeForm);
    },

    /*--- API ---*/
    _search() {
      coverInt.article().then(res => {
        if (res.data.state == true) {
          if (res.data.row == null || res.data.length > 6) {
            this.juge = true;
          } else {
            this.juge = false;
          }
          this.list = res.data.row;
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("测试接口", res);
      });
    },
    _selectOne(obj={}){
        let params = obj
        coverInt.selectOne(params).then(res => {
        if (res.data.state == true) {
          let data = res.data.row
          if(data.linkType=='0'){
              this.addForm.inLink = data.link
              this.addForm.instr = data.title
          }else{
              this.addForm.outLink = data.link
          }
          this.addForm.linkType = data.linkType + ''
          this.url = data.url
          this.preImg = uploadInt.preimg + data.url
          this.loading = true
          console.log(this.addForm,'改变过后')
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    _revise() {

      coverInt.revise(this.addTimeForm).then(res => {
        if (res.data.state == true) {
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
    }
  },
  components: {
    cover
  }
};
</script>

<style scoped>
.video {
  background-color: #ffffff;
  padding-left: 30px;
  padding-bottom: 117px;
}
.pagetitle {
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.back {
  padding: 10px;
  padding: 30px;
}

.titleName {
  font-size: 16px;
  color: #878787;
  border-left: 4px solid #0096ff;
  padding-left: 10px;
  display: inline-block;
  cursor: pointer;
}
.videoBox {
  display: flex;
  flex-direction: row;

  box-sizing: border-box;
}
.uploadBox {
  padding-top: 66px;
  margin-right: 40px;
  width: 100%;
}
.nomal-Box {
  height: 453px;

  position: relative;
}
.upload-demo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*--- 视频上传列表 ---*/
.ListBox {
  max-width: 820px;
  width: 100%;
  height: 610px;
}
.recomandList {
  height: 100%;
}
.red {
  cursor: pointer;
  color: #ff3535;
}
.firstButton {
  margin-top: 30px;
}
.buttonBlue {
  color: white;
  cursor: pointer;
  background-color: #0096ffad;
  border-width: 0px;
  border-style: none;
  width: 100px;

  outline: none;
}
.buttonBlue:hover {
  color: white;
  background-color: #0096ff73;
}
.buttonGray {
  background-color: #dcdcdc;
  color: #878787;
  cursor: pointer;
  margin-left: 10px;
  border-style: none;
  width: 100px;

  outline: none;
}
.buttonGray:hover {
  background-color: #d2d2d2;
  color: #878787;
  margin-left: 10px;
}
</style>
<style>
.wxadd .el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  color: #000000;
}

#video .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

