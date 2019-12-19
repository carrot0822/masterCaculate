<template>
  <div id="video" class="video wxadd">
    <section class="pagetitle">
      <div>
        <span class="titleName">关于我们</span>
      </div>
    </section>
    <div v-if="loading" class="videoBox">
      <section class="uploadBox">
        <div class="nomal-Box">
          <div class="upload-demo">
            <cover
              :height="175"
              :width="375"
              ref="cover"
              :img ="preImg"
              @imgSuccess="imgSuccess"
              @imgDelete="imgDelete"
            ></cover>
            <div class="inputBox">
              <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                <el-form-item label="公司网址" prop="title">
                  <el-input placeholder="请填写网址" v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="联系我们" prop="phone">
                  <el-input placeholder="请填写发布者" v-model="addForm.phone"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="textCenter firstButton">
              <el-button class="buttonBlue" type="primary" @click="addBtn">修改</el-button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="waringDialog">
      <el-dialog :title="warDialog.title" :visible.sync="warDialog.display" width="400px" center>
        <div style="textAlign:center;" class="dialogBody">是否{{warDialog.title}}?</div>
        <div style="margin-bottom: 20px">
          <span class="dialogButton true mr_40" @click="warBtn">确 定</span>
          <span class="dialogButton cancel" @click="warDialog.display=false">取 消</span>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { uploadInt } from "@request/api/base.js";
import { wxInt } from "@request/api/progress/about";
import cover from "../../common/upload/upCover";
export default {
  data() {
    return {
      preImg: "",
      loading:false,
      addForm: {
        title:'',
        phone:'',
        url:'',
      },
      rules: {
        title: [
          { required: true, message: "公司网址不得为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "联系地址不得为空", trigger: "blur" }
        ]
      },
      normalData: {},
      // 弹框
      warDialog: {
        title: "修改",
        display: false
      }
    };
  },
  computed: {
    addTimeForm() {}
  },
  created() {
    this._search();
  },
  methods: {
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
            this.warDialog.display = true
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("上传之前的数据");
    },
    warBtn(){
        this._revise(this.addForm)
    },
    /*--- API ---*/
    _search() {
      wxInt.search().then(res => {
        if (res.data.state == true) {
            // 深浅拷贝 这里是为后续可能添加取消做准备
            this.normalData = Object.assign({},res.data.row)
            this.addForm = Object.assign(this.addForm,res.data.row)
            this.preImg = uploadInt.preimg + res.data.row.url
            this.loading = true
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("测试接口", res);
      });
    },
    _revise(params = {}) {
      let data = params;
      wxInt.revise(data).then(res => {
          if(res.data.state){
              this.warDialog.display = false
              this.$message.success(res.data.msg);
          }else{
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
<style lang="scss" scoped>

    .dialogBody {
      text-align: center;
      font-size: 16px;
      margin-top: 15px;
      margin-bottom: 30px;
    }
  
</style>

