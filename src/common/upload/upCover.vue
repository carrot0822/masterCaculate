<template>
  <div class="slibM">

    <!-- 文件上传 -->
    <div class="uploadImg">
      <!-- 外层盒子 仿B乎 上传单张 -->
      <section class="control">
        <div class="wrapper">
          <!-- 点击上传图片层 -->
          <div @click="imgBtn" class="iconBox">
            <div class="icon">
              <i class="el-icon-plus"></i>
              <span class="text">添加封面</span>
            </div>
          </div>
          <!-- 图片预览层 -->
          <div v-if="preImg" class="preImgBox">
            <img  :src="preImg" class="img" />
            <div class="iconMore">
              <button @click="imgBtn" class="iconBtn">
                  <i class="el-icon-plus"></i>
              </button>
              <button @click="deleteBtn" class="iconBtn">
                  <i  class="el-icon-delete"></i>
              </button>
              
            </div>
          </div>
        </div>
      </section>
      <!--  -->
      <section class="imageLoad">
        <el-upload
          class="avatar-uploader"
          :action="imgUrl"
          accept="image/*"
          name="img"
          :show-file-list="false"
          :on-success="imgSuccess"
          :on-error="imgError"
          :before-upload="beforeUpload"
        ></el-upload>
      </section>
    </div>
  </div>
</template>

<script>
import { uploadInt } from "@request/api/base.js";
export default {
  data() {
    return {
      /*------ 图片上传配置 ------*/
      imgUrl: uploadInt.editorImg,
      preImg: "", // 预览图片
      nomalImg: "", // 默认图片
      submitImg: "" // 表单图片
    };
  },
  methods: {
    /*------ 上传图片 ------*/
    deleteBtn(){
        this.preImg = ""
        this.$emit('imgDelete','delete')
    },

    imgBtn() {
      document.querySelector(".avatar-uploader input").click();
    },
    beforeUpload(res, file) {
      
    },
    imgSuccess(res, file) {
      if (res.state) {
        this.preImg = uploadInt.preimg + res.row;
        this.submitImg = res.row;
        this.$emit('imgSuccess',res)
      }else{
        this.$message.error(res.msg)
      }
      console.log(res);
    },
    imgError(res, file) {
      this.$message.error("图片插入失败");
    }
  },
  created() {
    console.log("???");
  }
};
</script>

<style lang="scss" scoped>
.slibM {
  .uploadImg {
    .control {
      .wrapper {
        width: 590px;
        height: 180px;
        background-color: #f6f6f6;
        color: grey;
        position: relative;
        .iconBox {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .icon{
              font-size: 24px;
              display: flex;
              flex-direction: column;
              text-align: center;
              .text{

              }
          }
        }
        .preImgBox {
          position: absolute;
          z-index: 22;
          width: 590px;
          height: 180px;
          top: 0;
          .img {
            width: 100%;
            height: 100%;
          }
          .iconMore {
            display: flex;
            height: 42px;
            position: absolute;
            right: 0;
            bottom: 0;
            background: rgba(26, 26, 26, 0.75);
            border-radius: 4px 0 0 0;
            border: 0;
            .iconBtn {
              height: 42px;
              width: 48px;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 0;
              border-radius: 0;
              padding: 0;
              font-size: 24px;
              cursor: pointer;
              background: none;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>