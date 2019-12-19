<template>
  <div class="editor">
    <section class="titleBox mb_30">
      <p>新增资讯</p>
      <span class="backBtn" @click="backBtn">
        <i class="el-icon-back"></i>返回
      </span>
    </section>
    <section class="layerBox">
      <div class="mirronBox">
        <section class="formInputBox">
          <div class="imgBox">
            <div class="preBox">
              <div @click="imgBtn" class="mask">
                <div class="iconBox">
                  <i class="el-icon-plus"></i>
                  <p class="icon-text">点击上传封面</p>
                </div>
              </div>
              <img v-if="preImg" class="normalImg" :src="preImg" />
            </div>
            <div class="tips">温馨提示：图片大小为310*140为最佳尺寸</div>
          </div>
          <div class="formInput">
            <div class="inputBox">
              <el-form
                :rules="editrules"
                ref="editForm"
                :label-position="labelPosition"
                label-width="100px"
                :model="editForm"
              >
                <el-form-item label="活动标题" prop="title">
                  <el-input placeholder="请填写标题" v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="发布者" prop="person">
                  <el-input placeholder="请填写发布者" v-model="editForm.person"></el-input>
                </el-form-item>
                <el-form-item label="活动地点" prop="place">
                  <el-input placeholder="请填写活动地点" v-model="editForm.place"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" prop="time">
                  <el-input placeholder="请填写活动时间" v-model="editForm.time"></el-input>
                </el-form-item>
                
                <el-form-item label="简介" prop="introducation">
                  <el-input placeholder="请填写简介" v-model="editForm.introducation"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </section>
        <!-- 富文本编辑器 -->
        <section class="editorBox mb_30" v-loading="editorloading">
          <quill-editor
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </section>
      </div>
      <div class="page-display">
        <div class="preShow">
          <div class="demo">
            <div class="main">
              <div class="demoimgBox">
                <img v-if="preImg" class="normalImg" :src="preImg" />
              </div>
              <div class="contentBox">
                <h2 class="title">{{editForm.title}}</h2>
                <div v-html="content" class="des"></div>
              </div>
              <div class="authorBox">
                <p class="publish">发布者：{{editForm.person}}</p>
                <p class="position">地点：{{editForm.place}}</p>
                <p class="date">活动时间：{{editForm.time}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 实时预览 -->

    <!-- 发布按钮 -->
    <section class="buttonBox mb_30">
      <el-button type="primary" @click="submitFile">发布</el-button>
    </section>
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
</template>

<script>
import axios from "axios";
import { uploadInt } from "@request/api/base.js";
import { wxInterface } from "@request/api/progress/api";
import { editorData } from "./editor.js";
import { Quill, quillEditor } from "vue-quill-editor";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
var Font = Quill.import("formats/font");
var Size = Quill.import("attributors/style/size");
Size.whitelist = editorData.size;
Font.whitelist = editorData.fonts;
Quill.register(Font, true);
Quill.register(Size, true);
export default {
  data() {
    return {
      /*------ 表单配置项 ------*/
      labelPosition: "right",
      editForm: {
        title: "",
        content: "",
        introducation: "",
        place: "",
        person: "",
        time: "",
        creater: "",
        disabled: "1"
      },
      editrules: {
        title: [{ required: true, message: "请填写文章标题", trigger: "blur" }],
        person: [{ required: true, message: "请填写发布者", trigger: "blur" }],
        time: [{ required: true, message: "请填写活动时间", trigger: "blur" }],
        place: [{ required: true, message: "请填写文章活动地点", trigger: "blur" }],
        introducation: [{ required: true, message: "请输入简介", trigger: "blur" }],
      },
      /*------ 富文本配置项 ------*/
      editorloading: false,
      content: "",
      editorOption: {
        placeholder: "请输入文字",
        theme: "snow",
        modules: {
          toolbar: {
            container: editorData.toolbarOptions,
            handlers: {
              // 配置按钮点击自定义程序
              image: function(value) {
                if (value) {
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          },
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      },
      /*------ 图片上传配置 ------*/
      imgUrl: uploadInt.editorImg,
      preImg: "", // 预览图片
      nomalImg: require('../../base/img/normal/activeImg.jpg'), // 默认图片
      submitImg: "" // 表单图片
    };
  },
  computed: {
    editTimeForm() {
      let obj = {
        title: this.editForm.title,
        content: this.content,
        category: this.editForm.user,
        state: this.editForm.apex,
        // disabled: this.editForm.disabled,
        sysTbEnclosures: this.fileContent
      };
      return obj;
    }
  },
  components: {
    quillEditor
  },
  methods: {
    /*------ ------*/

    // 离开前需要提示用户 单独的路由守卫
    backBtn() {
      this.$router.push({ path: "/wxNoticeInfo" });
    },
    /*------ 富文本编辑器 ------*/
    onEditorBlur(editor) {
      //console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      //console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      //console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log("editor change!", editor, html, "限制一下", this.content);
      console.log("text文本内容", text, "text字数", text.length);
    },

    /*------ 上传图片 ------*/
    imgBtn() {
      document.querySelector(".avatar-uploader input").click();
    },
    beforeUpload(res, file) {
      this.$message.info("图片上传中");
    },
    imgSuccess(res, file) {
      if (res.state) {
        this.preImg = uploadInt.preimg + res.row;
        this.submitImg = res.row;
      }
      console.log(res);
      // 获取富文本组件实例
      // loading动画消失
    },
    imgError(res, file) {
      this.$message.error("图片插入失败");
    },
    /*------ 提交 ------*/
    submitFile() {
      let flag = false;
      let obj = {};
      obj.picture = this.submitImg || "";

      obj.content = this.content;

      obj = Object.assign(this.editForm, obj);
      console.log(obj, "测试提交的数据");
      if (this.content) {
        flag = true;
      }
      
      // 是否需要判定文件列表为空 对了 这里要开验证
      this.$refs.editForm.validate(valid => {

        if (valid && flag) {
            this._add(obj);
        } else {
          if (!flag) {
            this.$message.error("请填写文章内容");
          }
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearObj(obj){
      for(var key in obj){
        if(key == 'disabled'){

        }else{
          obj[key] = ''
        }
        
      }
    },
    /*------ Api ------*/
    _add(params = {}) {
      let data = params;
      wxInterface.add(data).then(res => {
        if(res.data.state){
          this.$message.success(res.data.msg);
          this.clearObj(this.editForm)
          this.content = ''
          this.preImg = this.nomalImg
          this.submitImg = ''
          console
        }else{
          this.$message.error(res.data.msg);
        }
        
      });
    }
  },
  created() {
    this.preImg = this.nomalImg
    console.log(this.$route.params.id);
  }
};
</script>

<style scoped>
.editor {
  border: 1px solid rgba(220, 220, 220, 1);
  background-color: #fff;
}
.titleBox {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding-left: 25px;
  padding-right: 25px;
  background-color: #dcdcdc;
  display: flex;
  justify-content: space-between;
}
.titleBox .backBtn {
  cursor: pointer;
}
/*------ 输入框 ------*/
.inputBox {
  width: 440px;
}
.limit {
  padding-left: 25px;
}
/*------ 富文本编辑器 ------*/
.editorBox {
  padding: 0 37px;
  width: 400px;
}
.upFile {
  padding-left: 37px;
}
/*------ 上传文件 ------*/
.uploadBox {
  width: 400px;
}
.buttonBox {
  text-align: center;
}
</style>

<style>
.ql-tooltip.ql-editing {
  left: 0 !important;
}
.editorBox .ql-container.ql-snow {
  height: 200px;
}
</style>
<style lang="scss" scoped>
.layerBox {
  display: flex;
  justify-content: center;
  .mirronBox{
    margin-right: 100px;
  }
}

.preShow {
  position: relative;
  width: 330px;
  height: 645px;
  margin: 0 56px 0 26px;
  background: url("../../assets/iphoneX.png") no-repeat center 0;
  background-size: 100%;
  .demo {
    position: absolute;
    top: 64px;
    left: 21px;
    right: 23px;
    bottom: 22px;
    overflow: hidden;
    border-radius: 0 0 35px 35px;
    border: 1px solid #edf0f4;
    border-top: none;
    background-color: #ffffff;
  }
}
.main {
  padding: 0 33px;
  padding-top: 10px;
  .demoimgBox {
    width: 100%;
    height: 140px;
    background-color: #555555;
    margin-bottom: 5px;
    .normalImg {
      width: 100%;
      height: 140px;
    }
  }
  .contentBox {
    margin-bottom: 5px;
    width: 100%;
    word-wrap: break-word; 
    word-break: normal;
    .title {
      font-size: 15px;
      color: #171717;
      line-height: 20px;
      font-weight: bold;
    }
    .des {
      font-size: 13px;
      color: #878997;
      text-align: justify;
      line-height: 18px;
      min-height: 200px
    }
    .authorBox {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      flex-direction: column;
      p {
        font-size: 14rpx;
        color: #000000;
        line-height: 21px;
        font-weight: bold;
        margin-bottom: 4rpx;
      }
    }
  }
}

.imgBox {
  padding-left: 100px;
  margin-bottom: 20px;
  .preBox {
    width: 310px;
    height: 140px;
    background-color: #555555;
    position: relative;
    cursor: pointer;
    &:hover .mask {
      display: block;
    }
    .normalImg {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
      .iconBox {
        font-size: 35px;
        color: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        text-align: center;
      }
      .icon-text {
        font-size: 16px;
        text-align: center;
        color: #ffffff;
        padding-top: 5px;
        font-family: MicrosoftYaHei;
      }
    }
  }
  .tips{
    padding-top: 20px;
  }
}
</style>
