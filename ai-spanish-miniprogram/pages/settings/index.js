import Toast from "tdesign-miniprogram/toast";
// import { getStudyDuration } from "../../apis/index";

import { MenuData } from "./constants";
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
    console.log("login", wx.getStorageSync("userInfo").id);

    if (wx.getStorageSync("userInfo").id) {
      wx.navigateTo({
        url: "/pages/settings/person-info/index",
      });
    }

    await loginProfile(app);
    // this.setChartData();
    this.setData({
      userInfo: wx.getStorageSync("userInfo"),
      hasUserInfo: true,
    });
  },

  async logout() {
    await logoutProfile(app);
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
