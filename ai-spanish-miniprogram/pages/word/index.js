import {
  changeWordBook,
  getAllWBData,
  getSingleWBData,
  getWBLearnData,
  getAllLearnData,
  getTodayLearnData,
  getBasicLearningData,
  getDailySum,
  getNoteBookWord,
} from "../../apis/word";

const app = getApp();

Page({
  data: {
    needToLearn: 0,
    needToReview: 0,
    // calendar
    value: new Date().getTime(),
    minDate: new Date().getTime() - 6 * 30 * 24 * 60 * 60 * 1000, // 半年前
    maxDate: new Date().getTime(),
    format(day) {
      return day;
    },
    // book
    bookListVisible: false, // todo
    bkDetail: {
      name: "请选择",
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

  onShow() {
    this.init();
  },

  async init() {
    this.getSingleWBData();
    this.initLearnData();
    this.initDailySum();
  },

  checkLogin() {
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

  async getSingleWBData() {
    if (!app.globalData.userInfo.l_book_id) return;
    const res = await getSingleWBData({
      bookId: app.globalData.userInfo.l_book_id,
    });
    const basicData = await getBasicLearningData({
      userId: app.globalData.userInfo.id,
      bookId: app.globalData.userInfo.l_book_id,
    });
    this.setData({
      bkDetail: res.data,
      needToLearn: basicData.data.needToLearn,
      needToReview: basicData.data.needToReview,
    });
  },

  async initLearnData(needUpdateDailySum = false) {
    const promise1 = getWBLearnData({
      userId: app.globalData.userInfo.id,
      bookId: app.globalData.userInfo.l_book_id,
    });
    const promise2 = getAllLearnData({
      userId: app.globalData.userInfo.id,
    });
    const promise3 = getTodayLearnData({
      userId: app.globalData.userInfo.id,
    });
    const promise4 = getNoteBookWord();

    const resList = await Promise.all([promise1, promise2, promise3, promise4]);

    this.setData({
      bkLearnData: resList[0].data,
      allLearnData: resList[1].data,
      todayLearnData: resList[2].data,
      notebookWord: resList[3].list,
    });
    this.updateDailyTaskPercentage();

    if (needUpdateDailySum) this.updateTodayDailySum();
  },

  async initDailySum() {
    const res = await getDailySum();
    const dailySumData = res.list;
    this.setData({
      format: (day) => {
        const { date } = day;
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const curDate = date.getDate();
        const dateStr = `${year}-${month}-${curDate}`;
        const dayRes = dailySumData[dateStr];

        if (dayRes) {
          day.suffix = dayRes.learn + dayRes.review;
          day.className = "is-active";
        }
        return day;
      },
    });
  },

  // ! 更新今日学习数据
  updateDailyTaskPercentage() {
    const { dailyLearn, dailyReview, groupSize } =
      app.globalData.userInfo.wordSetting;
    const dailyTask = {};
    dailyTask.dailyLearn = dailyLearn * groupSize;
    dailyTask.dailyReview = dailyReview * groupSize;

    let learnPercentage =
      (this.data.todayLearnData.learn / dailyTask.dailyLearn) * 100;
    let reviewPercentage =
      (this.data.todayLearnData.review / dailyTask.dailyReview) * 100;
    if (learnPercentage > 100) learnPercentage = 100;
    if (reviewPercentage > 100) reviewPercentage = 100;

    this.setData({
      dailyTask,
      learnPercentage,
      reviewPercentage,
    });
    return;
  },

  // ! 切换单词本
  async showBookList() {
    if (!this.checkLogin()) return;
    this.setData({
      bookListVisible: true,
    });
    let { allBkData } = this.data;
    if (!allBkData || allBkData.length == 0) {
      allBkData = (await getAllWBData()).list;
    }

    this.setData({
      allBkData: allBkData,
    });
  },
  onBookListVisible(e) {
    this.setData({
      bookListVisible: e.detail.visible,
    });
  },

  async changeWordBook(e) {
    const { index } = e.currentTarget.dataset;
    const bkInfo = this.data.allBkData[index];

    if (bkInfo.id != app.globalData.userInfo.l_book_id) {
      const res = await changeWordBook({
        userId: app.globalData.userInfo.id,
        bookId: bkInfo.id,
      });

      if (res.success) {
        app.globalData.userInfo.l_book_id = bkInfo.id;
        this.setData({
          bkDetail: bkInfo,
          bkLearnData: res.data,
          bookListVisible: false,
        });
        this.init();
      } else {
        wx.showToast({
          title: "更换失败，请重试~",
          icon: "none",
          duration: 1500,
        });
      }
    }
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
    if (
      !app.globalData.userInfo.l_book_id ||
      app.globalData.userInfo.l_book_id == -1
    ) {
      wx.showToast({
        title: "您还未设置词书，请先设置词书哦",
        icon: "none",
        duration: 1000,
      });
      this.showBookList();
      return;
    }

    const { type } = e.currentTarget.dataset;

    if (type == "learn") {
      if (this.data.needToLearn == 0) {
        wx.showToast({
          title: "已完成本书的学习啦，可以选新的词书哦",
          icon: "none",
          duration: 1000,
        });
        return;
      }
    } else if (type == "review") {
      if (this.data.needToReview == 0) {
        wx.showToast({
          title: "今日复习任务已完成啦~",
          icon: "none",
          duration: 1000,
        });
        return;
      }
    }
    wx.navigateTo({
      url: `/pages/word/${type}/${type}`,
    });
  },

  gotoWordDetail(e) {
    const { word_id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/word/detail/detail?word_id=${word_id}`,
    });
  },
});
