<template>
  <div class="dataError">
    <div class="commonMode normal" style="width:100%">
      <div class="sonTitle">
        <span class="titleName">初始参数</span>
        <p class="tips"></p>
      </div>
    </div>
    <div class="errBox">
      <el-form
        ref="changeForm"
        :model="changeForm"
        :rules="changeRules"
        label-width="140px"
        size="mini"
      >
        <el-form-item label="公告置顶条数" prop="maxPlacingNum">
          <div class="inputBox">
            <el-input v-model.number="changeForm.sysTbParam.maxPlacingNum"></el-input>
            <span class="ml_10 text">条</span>
          </div>
        </el-form-item>
        <el-form-item label="充值验证额度" prop="recharge">
          <div class="inputBox">
            <el-input v-model.number="changeForm.sysTbParam.maxRechargeNum"></el-input>
            <span class="ml_10 text">元</span>
          </div>
        </el-form-item>
        <el-form-item label="补办费用设置" prop="assist">
          <div class="inputBox">
            <el-input v-model.number="changeForm.sysTbParam.setReissueCost"></el-input>
            <span class="ml_10 text">元</span>
          </div>
        </el-form-item>
        <el-form-item label="读者卡有效时间" prop="cardValid">
          <div class="inputBox">
            <el-input v-model.number="changeForm.sysTbParam.effectiveTime"></el-input>
            <span class="ml_10 text">年</span>
          </div>
        </el-form-item>
        <el-form-item label="办卡机默认等级" prop="cardValid">
          <div class="inputBox">
            <el-select @change="trans" value-key="code"  v-model="changeForm.code" placeholder="请选择">
              <el-option
                v-for="(item) in optionsData"
                :key="item.code"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            <span class="ml_30" style="color: #878787">当前办卡机名称：{{show.name}}</span>
            <span class="ml_30" style="color: #878787">当前押金金额￥：{{show.deposit}}元</span>
            
          </div>
        </el-form-item>
        <el-form-item label="逾期天数" prop="expectDay">
          <div class="inputBox">
            <el-input v-model.number="changeForm.expectDay"></el-input>
            <span class="ml_10 text">天</span>
          </div>
        </el-form-item>
        <el-form-item label="逾期金额" prop="expectMoneyF">
          <div class="inputBox">
            <el-input v-model.number="changeForm.expectMoneyF"></el-input>
            <span class="ml_10 text">元</span>
          </div>
        </el-form-item>
        <el-form-item label="催还间隔" prop="reminderInterval">
          <div class="inputBox">
            <el-input v-model.number="changeForm.reminderInterval"></el-input>
            <span class="ml_10 text">天</span>
          </div>
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
import {
  bookWordInt,
  cardLevelInt,
  logoImg,
  uploadInt
} from "@request/api/base.js";
import { baseInt } from "../../request/api/system/baseData";
export default {
  data() {
    return {
      changeForm: {
        expectDay: "", //逾期天数
        expectMoneyF: "", // 逾期金额
        id: "", // 逾期方式ID
        reminderInterval: "", //催还间隔
        sysTbParam: {
          effectiveTime: "", // 读者卡有效时间
          equipmentGardCardCode: "", // 设置机器办卡等级code
          id: "", // 系统设置id
          maxPlacingNum: "", //置顶最大值
          maxRechargeNum: "", //单笔押金最大值
          setReissueCost: "", // 补办金额
        },
        level:{
          code:""
        }
      },
      show:{
        name:"",
        deposit:"",
        code:""
      },
      changeRules: {
        /* sysTbParam.maxPlacingNum: [
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
        ] */
      },
      optionsData: []
    };
  },
  methods: {
    editBtn() {
      this.changeForm.sysTbParam.equipmentGardCardCode = this.show.code
      this.editApi(this.changeForm);
    },
    searchApi() {
      axios.get(baseInt.search).then(res => {
        if (res.data.state) {
          console.log("接收的数据", res.data.row);
          let data= res.data.row
          this.changeForm.expectDay = data.expectDay;
          this.changeForm.expectMoneyF = data.expectMoneyF;
          this.changeForm.id = data.id
          this.changeForm.reminderInterval = data.reminderInterval
          this.changeForm.sysTbParam = Object.assign(data.sysTbParam)
          this.show.name = data.sysTbParam.equipmentGardCardName
          this.show.deposit = data.sysTbParam.equipmentGardCardDeposit
          this.show.code = data.sysTbParam.equipmentGardCardCode
          this.changeForm.level.code = data.sysTbParam.equipmentGardCardCode
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    trans(val){
      console.log(val,'下拉的值')
      this.show.name = val.name;
      this.show.deposit = val.deposit;
      this.show.code = val.code
    },
    editApi(value) {
      this.$refs.changeForm.validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: baseInt.revise,
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
        if (res.data.state == true) {
          this.optionsData = res.data.row;
          console.log("当前下拉框", this.optionsData);
        } else {
          this.$message.error(res.data.msg);
        }
        console.log("查询等级下拉框", res);
      });
    }
  },

  created() {
    this.searchApi();
    this.levelOptionApi();
    console.log("你是否变化了", this.changeForm);
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
