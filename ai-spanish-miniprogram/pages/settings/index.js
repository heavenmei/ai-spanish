import Toast from "tdesign-miniprogram/toast";
import { logout } from "../../apis/index";

import { MenuData } from "./constants";

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

    // option: {},
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

      // this.setChartData();
    }
  },
  onPullDownRefresh() {
    // this.setChartData();
  },

  // async setChartData() {
  //   if (!wx.getStorageSync("userInfo").id) return;

  //   const { data } = await getStudyDuration();
  //   const option = getBarOption(data);
  //   this.setData({
  //     option,
  //   });
  // },

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

  async login() {
    console.log("login", wx.getStorageSync("userInfo").id);

    if (wx.getStorageSync("userInfo").id) {
      wx.navigateTo({
        url: "/pages/settings/person-info/index",
      });
    }

    wx.navigateTo({
      url: "/pages/login/login",
    });
    return;
  },

  async logout() {
    const res = await logout();
    if (res.success) {
      wx.showToast({
        title: "退出成功",
        icon: "success",
      });

      const userId = wx.getStorageSync("userInfo").id;
      wx.removeStorageSync("userInfo");
      app && updateDuration(app, userId);
    } else {
      wx.showToast({
        title: "退出失败",
        icon: "error",
      });
    }

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
