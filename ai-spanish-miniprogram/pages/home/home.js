import { addHistory } from "../../apis/index";
import { loginProfile } from "../../common/login";

const app = getApp();
Page({
  data: {
    // navigationBarHeight: wx.getWindowInfo().statusBarHeight + 44,
  },
  onShow() {
    this.getTabBar().init();
  },
  async onLoad() {
    // const windowInfo = wx.getWindowInfo();
    // this.setData({
    //   navigationBarHeight: windowInfo.statusBarHeight + 44,
    // });
    this.init();
  },

  async init() {},

  async checkLogin() {
    if (!wx.getStorageSync("userInfo").id) {
      const data = await loginProfile(app);
      if (!data) return false;
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
      url: `/pages/word/word`,
    });
  },

  async testPage() {
    wx.navigateTo({
      url: `/pages/list/index`,
    });
  },
});
