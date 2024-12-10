export const MenuData = [
  [
    {
      title: "会员升级",
      tit: "",
      url: "",
      type: "coupon",
    },
    {
      title: "对话统计",
      tit: "",
      url: "",
      type: "statistics",
    },
    {
      title: "单词设置",
      tit: "",
      url: "",
      type: "word",
    },
  ],
  [
    {
      title: "技术支持",
      tit: "",
      url: "",
      type: "help-center",
    },
    // {
    //   title: "客服热线",
    //   tit: "",
    //   url: "",
    //   type: "service",
    //   icon: "service",
    // },
  ],
];

export function getBarOption(data) {
  return {
    color: "#FFA31A",
    // tooltip: {
    //   trigger: "axis",
    // },
    grid: {
      top: 20,
      bottom: 0,
      left: 10,
      right: 10,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisTick: { show: false },
      data: data.x,
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
      axisLabel: {
        color: "#666",
      },
    },
    yAxis: [
      {
        type: "value",
        minInterval: 1,
      },
    ],
    series: [
      {
        name: "学习时长",
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "inside",
          },
        },
        data: data.y,
      },
    ],
  };
}
