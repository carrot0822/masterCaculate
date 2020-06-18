    
<template>
  <span ref="countup"></span>
</template>

<script>
import { CountUp } from "countup.js";
export default {
  name: "countup-demo",
  props: {
    end: {
      type: Number,
      default: 0
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      numAnim: null,
      endNum: this.end
    };
  },
  watch: {
    end(newVal, oldVal) {
      console.log(newVal, "数据传递过来了吗");
      this.numAnim.update(newVal)
    }
  },
  mounted() {
    this.initCountUp();
  },
  methods: {
    initCountUp() {
      this.numAnim = new CountUp(this.$refs.countup, this.end, this.options);
      this.numAnim.start();
    }
  }
};
</script>
