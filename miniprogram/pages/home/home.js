import { addHistory, getStudyDuration } from "../../apis/index";

function getBarOption(data) {
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

Page({
  data: {
    // navigationBarHeight: wx.getWindowInfo().statusBarHeight + 44,
    hasUserInfo: false,
    option: {},
  },

  onShow() {
    this.getTabBar().init();
    const userinfo = wx.getStorageSync("userInfo");
    this.setData({
      hasUserInfo: userinfo.id ? true : false,
    });
    this.setChartData();
  },

  onLoad() {
    // const windowInfo = wx.getWindowInfo();
    // this.setData({
    //   navigationBarHeight: windowInfo.statusBarHeight + 44,
    // });
    this.init();
  },

  async init() {},

  async setChartData() {
    if (!this.data.hasUserInfo) return;

    const { data } = await getStudyDuration();
    const option = getBarOption(data);
    this.setData({
      option,
    });
  },

  async checkLogin() {
    if (!this.data.hasUserInfo) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
      return false;
    }
    return true;
  },

  async goChatStart() {
    if (!(await this.checkLogin())) return;

    try {
      const { data } = await addHistory();
      wx.navigateTo({
        url: `/pages/chat/index?id=${data.id}`,
      });
    } catch (e) {}
  },

  async gotoWord() {
    if (!(await this.checkLogin())) return;
    wx.navigateTo({
      url: `/pages/word/index`,
    });
  },

  onPullDownRefresh() {
    this.setChartData();
  },
});
