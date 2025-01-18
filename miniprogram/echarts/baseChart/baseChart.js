import * as echarts from "../ec-canvas/echarts";

Component({
  properties: {
    height: {
      type: String,
    },
    option: {
      type: Object,
    },
  },
  observers: {
    option: function (val) {
      setTimeout(() => {
        this.initChart(val || {});
      }, 0);
    },
  },
  data: {
    chartId: "",
    canvasId: "",
    ec: {
      lazyload: true,
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        chartId: `chart_${this.__wxExparserNodeId__}`,
        canvasId: `canvas_${this.__wxExparserNodeId__}`,
      });
      this.chartComp = this.selectComponent(`#${this.data.chartId}`);
    },
  },
  methods: {
    initChart(option) {
      this.chartComp &&
        this.chartComp.init((canvas, width, height, dpr) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr,
          });
          if (option.tooltip) {
            Object.assign(option.tooltip, {
              confine: true,
              shadowBlur: 0,
              shadowColor: "#e7e8e8",
              shadowOffsetY: 0,
              shadowOffsetX: 0,
              borderColor: "#e7e8e8",
              padding: [
                5, // 上
                20, // 右
                5, // 下
                20, // 左
              ],
            });
          }

          chart.setOption(option);
          this.chart = chart;
          return chart;
        });
    },
  },
});
