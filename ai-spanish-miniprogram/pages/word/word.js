import { getAllWBData } from "../../apis/word";

Page({
  data: {
    needToLearn: 0,
    needToReview: 0,
    // canlendar
    value: new Date().getTime(),
    minDate: new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000, // 1年前
    maxDate: new Date().getTime(),
    format(day) {
      const { date } = day;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const curDate = date.getDate();

      day.suffix = "*";

      if (year === 2022) {
        if (month === 2) {
          const map = {
            1: "初一",
            2: "初二",
            3: "初三",
            14: "情人节",
            15: "元宵节",
          };
          if (curDate in map) {
            // day.prefix = map[curDate];
            day.suffix = "--";
            day.className = "is-active";
          }
        }
      }

      return day;
    },
    // book
    isChangingBook: false,
    bkDetail: {
      name: "新概念",
      total: 0,
    },
    bkLearnData: {
      learn: 0,
      master: 0,
      notLearn: 0,
    },
    allLearnData: {
      learn: 0,
      master: 0,
      notLearn: 0,
    },
    // task
    learnPercentage: 1,
    reviewPercentage: 1,
    todayLearnData: {
      review: 0,
      learn: 0,
    },
    dailyTask: {
      dailyLearn: 0,
      dailyReview: 0,
    },

    // favorite
    notebookWord: [],
  },

  /**
   * 生命周期函数--监听页面加载 options
   */
  onLoad() {
    // this.init();
  },

  onShow() {},

  async init() {},

  async checkLogin() {
    if (!wx.getStorageSync("userInfo").id) {
      wx.showToast({
        title: "登录后才可以查看哦~",
        icon: "none",
        duration: 1500,
      });
      return false;
    }
    return true;
  },

  handleConfirm(e) {
    console.log(e.detail.value);
  },

  async showBookList() {
    if (!this.checkLogin()) return;
    this.setData({
      isChangingBook: true,
    });
    let { allBkData } = this.data;
    if (!allBkData || allBkData.length == 0)
      allBkData = (await getAllWBData()).data;
    this.setData({
      allBkData: allBkData,
    });
  },

  onBack() {
    wx.navigateBack();
  },

  gotoWordSearch() {
    wx.navigateTo({
      url: `/pages/word/search/search`,
    });
  },

  getWordList(e) {
    if (!this.checkLogin()) return;
    const { type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/word/list/list?type=${type}`,
    });
  },

  gotoLearn(e) {
    const { type } = e.currentTarget.dataset;

    // if (type == "learn") {
    //   if (app.globalData.userInfo.l_book_id == -1) {
    //     wx.showToast({
    //       title: "请选择词书后再进行学习哦",
    //       icon: "none",
    //       duration: 1000,
    //     });
    //     return;
    //   }
    //   if (this.data.needToLearn == 0) {
    //     wx.showToast({
    //       title: "已完成本书的学习啦，可以选新的词书哦",
    //       icon: "none",
    //       duration: 1000,
    //     });
    //     return;
    //   }
    // } else if (type == "review") {
    //   if (this.data.needToReview == 0) {
    //     wx.showToast({
    //       title: "今日复习任务已完成啦~",
    //       icon: "none",
    //       duration: 1000,
    //     });
    //     return;
    //   }
    // }
    wx.navigateTo({
      url: `/pages/word/${type}/${type}`,
    });
  },
});
