<template>
  <div class="dataError">
    <div class="commonMode normal" style="width:100%">
      <div class="sonTitle">
        <span class="titleName">数据字典</span>
        <p class="tips"></p>
      </div>
    </div>
    <div class="errBox">
      <el-form ref="changeForm" :model="changeForm" :rules="changeRules" label-width="140px" size="mini">
        <el-form-item label="公告置顶条数" prop="apex">
          <div class="inputBox">
            <el-input v-model.number="changeForm.apex"></el-input>
            <span class="ml_10 text">条</span>
          </div>
        </el-form-item>
        <el-form-item label="充值验证额度" prop="recharge">
          <div class="inputBox">
            <el-input v-model.number="changeForm.recharge"></el-input>
            <span class="ml_10 text">元</span>
          </div>
        </el-form-item>
        <el-form-item label="补办费用设置" prop="assist">
          <div class="inputBox">
            <el-input v-model.number="changeForm.assist"></el-input>
            <span class="ml_10 text">元</span>
          </div>
        </el-form-item>
        <el-form-item label="读者卡有效时间" prop="cardValid">
          <div class="inputBox">
            <el-input v-model.number="changeForm.cardValid"></el-input>
            <span class="ml_10 text">天</span>
          </div>
        </el-form-item>
        <el-form-item label="办卡机默认等级" prop="cardValid">
          <div class="inputBox">
            <el-select @change="test"  value-key="code"  v-model="changeForm.level" placeholder="请选择">
                <el-option
                  v-for="(item) in optionsData"
                  :key="item.code"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
             <span class="ml_30" style="color: #878787">押金金额￥：{{changeForm.level.deposit}}元</span>
          </div>
        </el-form-item>
        <el-form-item label="系统名称设置">
          <div class="inputBox">
            <el-input v-model.number="changeForm.manageSystemName"></el-input>
            <span class="ml_10 text" style="color: #ffffff">天</span>
          </div>
        </el-form-item>
        <el-form-item class="uploadBox" label="系统logo更换">
          <section class="upload">
            <!-- 背景图片做改动 -->
            <div class="defultHead" @click="pointer" style="width:200px; height:100px; border-radius:6px;border:1px solid #DCDFE6">
              <img
                ref="imgTest"
                class="defaultimage"
                style="width:100px; height:100px; border-radius:20px;margin-left: 50px"
                alt="怎么回事小老弟"
                :src="srcPre"
                v-if="!preloadImg"
              >

              <img
                style="width:100%; height:100px"
                v-if="preloadImg"
                :src="preloadImg"
                alt="预览照片"
                class="preloadImg"
              >
              <input
                type="file"
                accept="jpg/png"
                style="display:none;"
                ref="file"
                id="file"
                @change="getFile"
              >
            </div>
          </section>
        </el-form-item>
        <div class="textCenter">
          <el-button type="primary" @click="editBtn">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { bookWordInt,cardLevelInt,logoImg,uploadInt } from "@request/api/base.js";
import { control } from '@/request/api/base';
export default {
  data() {
    return {
      defaultImg: " ", // 上传头像默认头像
      preloadImg: "",
      changeForm: {
        manageSystemName:'',//系统名称
        headerAddress: "", // 图片相关
        headIcon: "",
        files: "", // 用于上传
        apex: "",
        recharge: "",
        assist: "",
        cardValid: "",
        id: "",
        level:{}
      },
      changeRules: {
        apex: [
          {
            required: true,
            message: "公告置顶条数不得为空",
            trigger: "blur"
          }
        ],
        recharge: [
          { required: true, message: "充值验证额度不得为空", trigger: "blur" }
        ],
        assist: [
          { required: true, message: "补办费用设置不得为空", trigger: "blur" }
        ],
        cardValid: [
          { required: true, message: "读者卡有效时间不得为空", trigger: "blur" }
        ]
      },
      optionsData:[]
    };
  },
  methods: {
    editBtn() {
      this.editApi(this.submitForm);
    },
    searchApi() {
      axios.get(bookWordInt.search).then(res => {
        if (res.data.state) {
          console.log('数据字典初始化数据',res)
          let data = res.data.row;
          this.changeForm.manageSystemName = data.manageSystemName
          this.changeForm.apex = data.maxPlacingNum;
          this.changeForm.recharge = data.maxRechargeNum;
          this.changeForm.assist = data.setReissueCost;
          this.changeForm.cardValid = data.effectiveTime;
          this.changeForm.id = data.id;
          this.changeForm.level.code = data.equipmentGardCardCode
          this.changeForm.level.name = data.equipmentGardCardName
          this.changeForm.level.deposit = data.equipmentGardCardDeposit
          this.preloadImg = uploadInt.preimg + data.manageSystemLogoAddress;
          console.log("接收的数据", res.data.row);
          console.log("回显", this.changeForm);
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
            url: bookWordInt.edit,
            data: value
          }).then(res => {
            if (res.data.state) {
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
    },
    levelOptionApi() {
      axios.get(bookWordInt.select).then(res => {
        if(res.data.state == true){
          this.optionsData = res.data.row
          console.log('当前下拉框',this.optionsData)
        } else{
          this.$message.error(res.data.msg)
        }
        console.log("查询等级下拉框", res);
      });
    },
    test(){
      console.log('你是否变化了',this.changeForm)
    },
    uPphotoApi() {
      let files = this.files;
      if (files != null) {
        // 检测是否有文件 有就意味着被更改了
        var formdatas = new FormData();
        formdatas.append("file", files);
        //console.log(formdatas.get('file'))
        this.axios({
          method: "post",
          url: logoImg,
          data: formdatas,
          //cache: false,//上传文件无需缓存
          processData: false, //用于对data参数进行序列化处理 这里必须false
          contentType: false, //
          dataType: "JSON",
          ContentType: "multipart/form-data",
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        }).then(request => {
          // 如果是编辑 更换图片失败后
          if (request.data.state == true) {
            this.changeForm.headerAddress = request.data.row;
            console.log("是否图片", this.changeForm);
            console.log("图片上传成功", request.data.row, this.addEdit);
          } else {
            this.$message.error(request.data.msg);
          }
        });
      }
    },
    pointer() {
      this.$refs.file.click();
    },
    getFile(e) {
      // 1.判断选择事件是否为空
      // 2. 获取数据
      let _this = this; // 缓存this
      let value = _this.$refs.file.value;

      var files = e.target.files[0]; // 事件对象包含的信息 files是路径
      _this.files = files;
      console.log(_this.files);
      // 2.1 防止后台拿不到数据 可能需要提交额外数据时

      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader(); // 定义 fileReader对象
      _this.uPphotoApi();
      reader.readAsDataURL(files); // 转换为base64的url路径 其他三个API转换为text 二进制  arraybuffer
      reader.onloadend = function() {
        _this.preloadImg = this.result; // 此时this指向的fileReader对象
        _this.$refs.file.value = "";
      };
    },
  },
  computed: {
    srcPre() {
      let src = "";
      if (
        this.changeForm.headerAddress != null &&
        this.changeForm.headerAddress != ""
      ) {
        src = this.changeForm.preUrl;
        console.log(this.changeForm.preUrl);
        console.log("真就不执行了？");
      } else {
        src = require('../..//base/img/logoChange.png');
      }
      return src;
    },
    submitForm() {
      let obj = {
        manageSystemName: this.changeForm.manageSystemName,
        maxPlacingNum: this.changeForm.apex,
        maxRechargeNum: this.changeForm.recharge,
        setReissueCost: this.changeForm.assist,
        manageSystemLogoAddress: this.changeForm.headerAddress,
        effectiveTime: this.changeForm.cardValid,
        equipmentGardCardCode:this.changeForm.level.code,
        equipmentGardCardName:this.changeForm.level.name,
        id: this.changeForm.id
      };
      return obj;
    }
  },
  created() {
    this.searchApi();
    this.levelOptionApi()
     console.log('你是否变化了',this.changeForm)
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
</style>
