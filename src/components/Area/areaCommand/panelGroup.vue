<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper onShelfC">
          <img src="../../../base/img/areaRemaker/onSheif.png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">在架数据</div>
          <div class="card-panel-num">
            <count :end="1000"></count>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper borrowC">
          <img src="../../../base/img/areaRemaker/borrow.png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">借出书籍</div>
          <div class="card-panel-num">
            <count :end="borrowNum"></count>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper returnC">
          <img src="../../../base/img/areaRemaker/return.png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">归还书籍</div>
          <div class="card-panel-num">
            <count :end="returnNum"></count>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper damageC">
          <img src="../../../base/img/areaRemaker/damage.png">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">报损书籍</div>
          <div class="card-panel-num">
            <count :end="damageNum"></count>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import count from "./count";
export default {
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      endVal: 1000, // 如果数据是异步的话 需要v-if处理

    };
  },
  components: {
    count
  },
  computed:{
    onshelf(){
      
    },
    borrowNum(){
      let result = this.options.borrowNum
      return result?result:0
    },
    returnNum(){
      let result = this.options.returnNum
      return result?result:0
    },
    damageNum(){
      let result = this.options.damageNum
      return result?result:0
    },

  },
  mounted(){
    console.log(this.options)
  }
};
</script>

<style lang="scss" scoped>
.onShelfC {
  background-color: #0096ff;

}
.borrowC {
  background-color: #ffae00;
}
.returnC {
  background-color: #0eebaf;
}
.damageC {
  background-color: #fd6b6b;
}
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
