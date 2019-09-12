<template>
  <div class="dataError">
    <div class="commonMode normal" style="width:100%">
      <div class="sonTitle">
        <span class="titleName">系统设置</span>
        <p class="tips"></p>
      </div>
    </div>
    <div class="errBox">
      <el-form ref="changeForm" :model="changeForm" label-width="140px" size="mini">
        <el-form-item label="系统名称" prop="maxPlacingNum">
          <div class="inputBox">
            <el-input v-model.number="changeForm.manageSystemName"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="图片logo">
          <div class="logoBox">
            <span class="avatar">
              <img v-if="uploadObj.imgDataUrl" class="avatarImg" :src="uploadObj.imgDataUrl" />
              <img v-if="!uploadObj.imgDataUrl" class="avatarImg" :src="logoUrl" />
            </span>
            
          </div>
          <div class="edit" @click="toggleShow">更换</div>
        </el-form-item>
      </el-form>

      <div class="textCenter">
        <el-button type="primary" @click="editBtn">提交</el-button>
      </div>
    </div>
    <section class="uploadBox">
      <my-upload
        field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="uploadObj.show"
        :width="100"
        :height="100"
        :langExt="lb"
        :noCircle= "true"
        :url="uploadObj.uploadurl"
        img-format="png"
      ></my-upload>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import { logoImg, uploadInt } from "@request/api/base.js";
import myUpload from "vue-image-crop-upload";
import { systemInt } from "../../request/api/system/baseData";
export default {
  data() {
    return {
      headSrc: require("../../base/img/logo.png"),
      changeForm: {
        manageSystemName: "", //名称
        manageSystemLogoAddress:'',
        id:""
      },
      uploadObj: {
        uploadurl: logoImg,
        show: false,
        cutimgUrl: "",
        imgDataUrl: "",
        
      },

      lb:{
          
        hint: "点击，或拖动图片至此处",
        loading: "正在上传……",
        noSupported: "浏览器不支持该功能，请使用IE10以上或其他现在浏览器！",
        success: "上传成功",
        fail: "图片上传失败",
        preview: "logo预览",
        btn: {
          off: "取消",
          close: "关闭",
          back: "上一步",
          save: "保存"
        },
        error: {
          onlyImg: "仅限图片格式",
          outOfSize: "单文件大小不能超过 ",
          lowestPx: "图片最低像素为（宽*高）："
        }
      
      } 
      
    };
  },
  computed: {
    logoUrl() {
        return this.changeForm.manageSystemLogoAddress?this.changeForm.manageSystemLogoAddress:this.headSrc
    }
  },
  components: {
    myUpload
  },
  methods: {
    toggleShow() {
      this.uploadObj.show = !this.uploadObj.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      console.log("裁剪成功的imgData", imgDataUrl);
      console.log("裁剪成功的field", field);
      this.uploadObj.cutimgUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("图片地址", jsonData.row);
      let imgFile = "";
      imgFile = jsonData.row;
      this.changeForm.manageSystemLogoAddress = uploadInt.preimg + imgFile
      console.log("field: " + field);
      this.uploadObj.imgDataUrl = this.uploadObj.cutimgUrl;
    },
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
    editBtn() {
      
      this.editApi(this.changeForm);
    },
    searchApi() {
      axios.get(systemInt.search).then(res => {
        if (res.data.state) {
            this.changeForm.id = res.data.row.id
            this.changeForm.manageSystemName = res.data.row.manageSystemName
            this.changeForm.manageSystemLogoAddress = res.data.row.manageSystemLogoAddress
          console.log("接收的数据", res.data.row);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    editApi(value) {
      this.$refs.changeForm.validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: systemInt.revise,
            data: value
          }).then(res => {
            if (res.data.state) {
                let item = JSON.stringify(this.changeForm)
                sessionStorage.setItem('logo',item)
                let data = JSON.parse(item)
                this.$store.commit('setLogo',data)
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },

  created() {
    this.searchApi();
  }
};
</script>
<style scoped>
.dataError {
  background-color: #ffffff;
  min-height: 810px;
  position: relative;
  box-sizing: border-box;
}
.errBox {
  width: 50%;
  margin: 0 auto;
}
.normal {
  margin-bottom: 120px;
}
.textCenter {
  text-align: center;
}
.inputBox {
  position: relative;
  display: flex;
}
.inputBox .text {
  margin-left: 10px;
  line-height: 36px;
  color: #878787;
}
.edit{
    color: #0096ff;
    cursor: pointer;
}
</style>
<style lang="scss" scoped>
.logoBox {
  .avatar {
    background: #0096ff;
    height: 34px;
    width: 34px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
