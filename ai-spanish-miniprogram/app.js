import updateManager from "./common/updateManager";
import { startDuration, updateDuration } from "./common/recordStudyDuration";
import { getUserInfo } from "./apis/index";

App({
  globalData: {
    userInfo: {},
    wordSettings: {
      groupSize: 10,
      dailyLearn: 1,
      dailyReview: 1,

      learn_repeat_t: 3,
      learn_first_m: "chooseTrans",
      learn_second_m: "recallTrans",
      learn_third_m: "recallWord",
      learn_fourth_m: "recallTrans",
      timing: true,
      timing_duration: 1000,
      autoplay: false,
      type: 1,
      review_repeat_t: 2,
      review_first_m: "recallTrans",
      review_second_m: "chooseTrans",
      review_second_m: "recallWord",
      review_third_m: "recallTrans",
    },

    // 学习时长
    onlineStartTime: 0,
    onlineTime: 0,
    onlineId: undefined,
    onlineInterval: undefined,
  },
  onLaunch: async function () {
    const res = await getUserInfo();
    res && wx.setStorageSync("userInfo", res.data);
    this.globalData.userInfo = res.data;
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
