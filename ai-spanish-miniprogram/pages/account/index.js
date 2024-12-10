import Toast from "tdesign-miniprogram/toast";
import * as echarts from "../../ec-canvas/echarts";
import { promisify } from "../../apis/request";
import { login, logout, getStudyDuration } from "../../apis/index";
import {
  startDuration,
  updateDuration,
} from "../../common/recordStudyDuration";
import { MenuData, getBarOption } from "./constants";

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
      case "point": {
        Toast({
          context: this,
          selector: "#t-toast",
          message: "你点击了积分菜单",
          icon: "",
          duration: 1000,
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
      case "service": {
        this.openMakePhone();
        break;
      }

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
      //   url: "/pages/account/person-info/index",
      // });
    } else {
      this.getUserProfile();
    }
  },
  async getUserProfile() {
    const res = await promisify(wx.getUserProfile)({
      desc: "用于完善会员资料",
    });
    console.log("getUserProfile", res);

    const { code } = await promisify(wx.login)();
    console.log("code", code);

    const { data } = await login({
      code,
      ...res.userInfo,
    });

    wx.setStorageSync("userInfo", data);

    const userId = data.id;
    startDuration(app, userId);
    this.setChartData();

    this.setData({
      userInfo: data,
      hasUserInfo: true,
    });
  },

  async logout() {
    const res = await logout();
    if (res.success) {
      wx.showToast({
        title: "退出成功",
        icon: "success",
      });

      const userId = wx.getStorageSync("userInfo").id;
      updateDuration(app, userId);
      this.barChart && this.barChart.dispose();

      wx.removeStorageSync("userInfo");
      this.setData({
        userInfo: {},
        hasUserInfo: false,
      });
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === "release" ? version : envVersion,
    });
  },
});
