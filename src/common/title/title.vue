<template>
  <div id="commonTitle">
    <div class="Re-title">
      <span class="Re-titleName">{{value}}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "请填入标题"
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#commonTitle {
    height: 100%;
  .Re-title {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 10px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(135, 135, 135, 1);
    .Re-titleName {
      border-left: 4px solid #0096ff;
      padding-left: 10px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(135, 135, 135, 1);
      margin-right: 10px;
      display: inline-block;
    }
  }
}
</style>