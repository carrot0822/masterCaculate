<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true // 必须吗
    }
  },
  data() {
    return {
      chart: null //
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose(); // 销毁实例
    this.chart = null;
  },
  methods: {
    // 两条折线 多折线图
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      console.log(this.$el, "这个父节点肯定是这个父组件");
      this.setOptions(this.chartData); // 传入数据
    },
    /**
     * 双折线图
     */
    setOptions(expectedData = {}) {
      this.chart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "6%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["不在架", "在架", "借出", "剔除", "损坏"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            boundaryGap: ["20%", "20%"],
            min:0,
          }
        ],
        series: [
          {
            data: expectedData,
            name: "访问量",
            itemStyle: {
              barBorderRadius: [50, 50, 0, 0],
              color: function(params) {
                var colorList = [
                  "#3A97FF",
                  "#9ECEFB",
                  "#3A97FF",
                  "#9ECEFB",
                  "#3A97FF",
                ];
                return colorList[params.dataIndex];
              }
            },
            smooth: true,
            type: "bar",
            barWidth: "40%",

            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>