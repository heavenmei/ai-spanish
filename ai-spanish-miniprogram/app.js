import updateManager from "./common/updateManager";
import { startDuration, updateDuration } from "./common/recordStudyDuration";
import { getUserInfo } from "./apis/index";

App({
  globalData: {
    host: "https://homolo.top",

    // 学习时长
    onlineStartTime: 0,
    onlineTime: 0,
    onlineId: undefined,
    onlineInterval: undefined,
  },
  onLaunch: async function () {
    const res = await getUserInfo();
    res && wx.setStorageSync("userInfo", res.data);
  },
  onShow: function () {
    updateManager();
    const userId = wx.getStorageSync("userInfo").id;
    startDuration(this, userId);
  },
  onHide: async function () {
    const userId = wx.getStorageSync("userInfo").id;
    updateDuration(this, userId);
  },
});
