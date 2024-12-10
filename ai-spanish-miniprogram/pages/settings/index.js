import Toast from "tdesign-miniprogram/toast";
import * as echarts from "../../components/ec-canvas/echarts";
import { getStudyDuration } from "../../apis/index";

import { MenuData, getBarOption } from "./constants";
import { loginProfile, logoutProfile } from "../../common/login";

const app = getApp();

Page({
  data: {
    showMakePhone: false,
    userInfo: {},
    hasUserInfo: false,
    menuData: MenuData,
    customerServiceInfo: {},
    showKefu: true,
    versionNo: "",

    ecBar: {
      lazyLoad: true,
    },
  },

  onReady() {
    this.setChartData();
  },
  onLoad() {
    this.getVersionInfo();

    const userinfo = wx.getStorageSync("userInfo");
    if (userinfo.name) {
      this.setData({
        userInfo: userinfo,
        hasUserInfo: true,
      });
    }
  },

  onShow() {
    this.getTabBar().init();

    const userinfo = wx.getStorageSync("userInfo");
    if (userinfo.id) {
      this.setData({
        userInfo: userinfo,
        hasUserInfo: true,
      });

      this.setChartData();
    }
  },
  onPullDownRefresh() {
    this.setChartData();
  },

  initBarChart(chartData) {
    this.ecComponent.init((canvas, width, height, dpr) => {
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr,
      });
      canvas.setChart(barChart);
      const options = getBarOption(chartData);
      barChart.setOption(options);
      this.barChart = barChart;
      return barChart;
    });
  },

  async setChartData() {
    if (!wx.getStorageSync("userInfo").id) return;

    this.ecComponent = this.selectComponent("#study-chart");
    if (!this.ecComponent) {
      console.log("this.ecComponent is not ready");
      return;
    }

    const { data } = await getStudyDuration();
    this.initBarChart(data);
  },

  onClickCell({ currentTarget }) {
    const { type } = currentTarget.dataset;

    switch (type) {
      case "coupon": {
        // wx.navigateTo({
        //   url: "/pages/coupon/coupon-list/index",
        // });
        break;
      }
      case "statistics": {
        Toast({
          context: this,
          selector: "#t-toast",
          message: "你点击了对话统计",
          icon: "",
          duration: 1000,
        });
        break;
      }
      case "word": {
        wx.navigateTo({
          url: "/pages/settings/word-settings/wsetting",
        });
        break;
      }
      case "help-center": {
        Toast({
          context: this,
          selector: "#t-toast",
          message: "你点击了帮助中心",
          icon: "",
          duration: 1000,
        });
        break;
      }
      // case "service": {
      //   this.openMakePhone();
      //   break;
      // }

      default: {
        Toast({
          context: this,
          selector: "#t-toast",
          message: "未知跳转",
          icon: "",
          duration: 1000,
        });
        break;
      }
    }
  },

  openMakePhone() {
    this.setData({
      showMakePhone: true,
    });
  },
  closeMakePhone() {
    this.setData({
      showMakePhone: false,
    });
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const { hasUserInfo } = this.data;
    if (hasUserInfo) {
      // wx.navigateTo({
      //   url: "/pages/settings/person-info/index",
      // });
    } else {
      this.getUserProfile();
    }
  },

  async login() {
    if (wx.getStorageSync("userInfo").id) return;

    await loginProfile(app);
    this.setChartData();
    this.setData({
      userInfo: wx.getStorageSync("userInfo"),
      hasUserInfo: true,
    });
  },

  async logout() {
    await logoutProfile(app);
    this.barChart && this.barChart.dispose();

    this.setData({
      userInfo: {},
      hasUserInfo: false,
    });
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === "release" ? version : envVersion,
    });
  },
});
