<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper onShelfC">
          <img src="../../..//base/img/circleCount/borrow.png" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-num onsheifF">
            <count :end="borrowNum"></count>
          </div>
          <div class="card-panel-text onsheifF">借出的数量</div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper borrowC">
          <img src="../../../base/img/circleCount/overdue.png" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-num borrowF">
            <count :end="overdueNum"></count>
          </div>
          <div class="card-panel-text borrowF">逾期的数量</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper returnC">
          <img src="../../../base/img/circleCount/return.png" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-num returnF">
            <count :end="returnNum"></count>
          </div>
          <div class="card-panel-text returnF">归还的数量</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper damageC">
          <img src="../../../base/img/circleCount/damage.png" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-num damageF">
            <count :end="damageNum"></count>
          </div>
          <div class="card-panel-text damageF">报损的数量</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import count from "./count";
export default {
  data() {
    return {
      endVal: 1000, // 如果数据是异步的话 需要v-if处理
      borrowNum: 5000,
      overdueNum: 1000,
      returnNum: 500,
      damageNum: 600
    };
  },
  components: {
    count
  }
};
</script>

<style lang="scss" scoped>
.onShelfC {
  background: rgba(228, 244, 255, 1);
  
}
.onsheifF{
  color:#0096FF ;
}
.borrowC {
  background-color: #FFF0D8;
  
}
.borrowF{
  color: #FF9C00;
}
.returnC {
  background-color: #CDFFEE;
  
}
.returnF{
  color: #00DA90;
}
.damageC {
  background-color: rgba(255,229,229,1);
  
}
.damageF{
  color:#FF6060;
}
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
    .card-panel {
      height: 150px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .card-panel-icon-wrapper {
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: all 0.38s ease-out;
        text-align: center;
      }

      .card-panel-description {
        float: right;
        .card-panel-text {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          
          text-align: right;
          padding-right: 6px;
        }
        .card-panel-num {
          font-size: 50px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          
          margin-bottom: 20px;
          
        }
      }
    }
  }
}
</style>
