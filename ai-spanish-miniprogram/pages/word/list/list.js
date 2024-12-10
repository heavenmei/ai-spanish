// pages/word_list/word_list.js
import WordApi from "../../../apis/word";

const app = getApp();

const typeParameter = {
  getBkLearnedWord: { navTitle: "本书已学", user_id: true, wd_bk_id: true },
  getBkMasteredWord: { navTitle: "本书已掌握", user_id: true, wd_bk_id: true },
  getBkUnlearnedWord: { navTitle: "本书未学", user_id: true, wd_bk_id: true },
  getBkWord: { navTitle: "本书全部单词", user_id: false, wd_bk_id: true },
  getLearnedWord: { navTitle: "已学单词", user_id: true, wd_bk_id: false },
  getMasteredWord: { navTitle: "已掌握单词", user_id: true, wd_bk_id: false },
  getReviewWord: { navTitle: "复习中单词", user_id: true, wd_bk_id: false },
  getNoteBookWord: { navTitle: "收藏夹", user_id: true, wd_bk_id: false },
  today: { navTitle: "今日学习&复习", user_id: true, wd_bk_id: false },
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    wordList: [],
    hasMore: true,
    learnHasMore: true,
    reviewHasMore: true,
    isToday: false,
    todayLearn: undefined,
    todayReview: undefined,
    todayType: -1,
  },
  skip: 0,
  learnSkip: undefined,
  reviewSkip: undefined,
  type: "",

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const { type } = this.options;
    console.log("type", type);

    wx.setNavigationBarTitle({
      title: typeParameter[type].navTitle,
    });
    this.type = type;

    if (type != "today") {
      this.getData();
    } else {
      this.setData({
        todayType: 0,
      });
      this.getTodayWord(0);
      this.getTodayWord(1);
    }
  },

  async getData() {
    const { type } = this;
    if (!this.data.hasMore) return;
    wx.showLoading({
      title: "加载中...",
    });
    const parameters = {};
    if (typeParameter[type].user_id)
      parameters.user_id = wx.getStorageSync("userInfo").id;
    if (typeParameter[type].wd_bk_id)
      parameters.wd_bk_id = app.globalData.userInfo.l_book_id;
    parameters.skip = this.skip;
    let { wordList } = this.data;
    console.log("parameters", parameters);
    const res = await WordApi[type](parameters);

    console.log("res", res);

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].translation.indexOf("\n") != -1) {
        res.data[i].translation = res.data[i].translation.substring(
          0,
          res.data[i].translation.indexOf("\n")
        );
      }
      // console.log('rect length of:', directres[i], word_utils.getResObjRectLength(directres[i]))
    }

    wordList = wordList.concat(res.data);
    this.skip = wordList.length;
    let hasMore = true;
    if (res.data.length < 20) hasMore = false;

    this.setData({
      wordList,
      hasMore,
    });
    wx.hideLoading();
  },

  async getTodayWord(todayType) {
    if (todayType === undefined) todayType = this.data.todayType;
    const hasMoreType = ["learnHasMore", "reviewHasMore"];
    if (!this.data[hasMoreType[todayType]]) return;
    wx.showLoading({
      title: "加载中...",
    });
    const apiNameType = ["getTodayLearnWord", "getTodayReviewWord"];
    const skipType = ["getTodayLearnWord", "getTodayReviewWord"];
    const wordListType = ["todayLearn", "todayReview"];
    const type = apiNameType[todayType];
    const parameters = {};
    parameters.user_id = wx.getStorageSync("userInfo").id;
    if (this[skipType[todayType]] === undefined) this[skipType[todayType]] = 0;
    parameters.skip = this[skipType[todayType]];
    if (this.data[wordListType[todayType]] === undefined)
      this.data[wordListType[todayType]] = [];
    let wordList = this.data[wordListType[todayType]];

    console.log("parameters", parameters);
    const res = await WordApi[type](parameters);

    console.log("res", res);

    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].translation.indexOf("\n") != -1) {
        res.data[i].translation = res.data[i].translation.substring(
          0,
          res.data[i].translation.indexOf("\n")
        );
      }
      // console.log('rect length of:', directres[i], word_utils.getResObjRectLength(directres[i]))
    }

    wordList = wordList.concat(res.data);
    this[skipType[todayType]] = wordList.length;
    let hasMore = true;
    if (res.data.length < 20) hasMore = false;

    const updateData = {};
    updateData[wordListType[todayType]] = wordList;
    updateData[hasMoreType[todayType]] = hasMore;

    this.setData(updateData);
    wx.hideLoading();
  },

  getWordDetail(e) {
    let wordListName = "wordList";
    if (this.data.todayType != -1) {
      const wordListType = ["todayLearn", "todayReview"];
      wordListName = wordListType[this.data.todayType];
    }
    const { index } = e.currentTarget.dataset;
    const { word_id } = this.data[wordListName][index];
    wx.navigateTo({
      url: `/pages/word/detail?word_id=${word_id}`,
    });
  },

  changeType() {
    this.setData({
      todayType: (this.data.todayType + 1) % 2,
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
    if (this.data.todayType == -1) {
      this.getData();
    } else {
      this.getTodayWord();
    }
  },
});
