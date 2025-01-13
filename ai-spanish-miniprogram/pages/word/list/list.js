// pages/word_list/word_list.js
import {
  getBookRecordWord,
  getNoteBookWord,
  getUserRecordWord,
} from "../apis/word";

const app = getApp();

const typeParameter = {
  getBkLearnedWord: {
    navTitle: "本书已学",
    api: getBookRecordWord,
  },
  getBkMasteredWord: {
    navTitle: "本书已掌握",
    api: getBookRecordWord,
  },
  getBkUnlearnedWord: {
    navTitle: "本书未学",
    api: getBookRecordWord,
  },
  getBkWord: {
    navTitle: "本书全部单词",
    api: getBookRecordWord,
  },
  getLearnedWord: { navTitle: "已学单词", api: getUserRecordWord },
  getMasteredWord: { navTitle: "已掌握单词", api: getUserRecordWord },
  getReviewWord: { navTitle: "复习中单词", api: getUserRecordWord },

  getNoteBookWord: { navTitle: "收藏夹", api: getNoteBookWord },
  today: { navTitle: "今日学习&复习" },
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true,
    learnHasMore: true,
    reviewHasMore: true,

    wordList: [],
    todayLearn: [],
    todayReview: [],
    todayType: -1,
  },
  page: 1,
  learnPage: 1,
  reviewPage: 1,
  type: "",

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const { type } = this.options;
    console.log("type", type, typeParameter[type].navTitle);

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

    const res = await typeParameter[type].api({
      wb_id: app.globalData.userInfo.l_book_id,
      subType: type,
      page: this.page,
      pageSize: 20,
    });
    const data = res.list;
    console.log("res", type, data);

    const wordList = this.data.wordList.concat(data);
    this.page += 1;
    this.setData({
      wordList,
      hasMore: res.pagination.page < res.pagination.totalPages,
    });
    wx.hideLoading();
  },

  async getTodayWord(todayType) {
    todayType = todayType ?? this.data.todayType;
    const hasMoreType = ["learnHasMore", "reviewHasMore"];
    const pageType = ["learnPage", "learnPage"];
    const wordListType = ["todayLearn", "todayReview"];

    if (!this.data[hasMoreType[todayType]]) return;
    wx.showLoading({
      title: "加载中...",
    });

    const res = await getUserRecordWord({
      subType: wordListType[todayType],
      page: this[pageType[todayType]],
    });
    const data = res.list;
    console.log("res ===", wordListType[todayType], data);

    const wordList = this.data[wordListType[todayType]].concat(data);
    this[pageType[todayType]] = res.pagination.page + 1;

    const updateData = {};
    updateData[wordListType[todayType]] = wordList;
    updateData[hasMoreType[todayType]] =
      res.pagination.page < res.pagination.totalPages;

    this.setData(updateData);
    wx.hideLoading();
  },

  getWordDetail(e) {
    let wordListName = "wordList";
    if (this.data.todayType != -1) {
      const wordListType = ["todayLearn", "todayReview"];
      wordListName = wordListType[this.data.todayType];
    }

    const index = e.currentTarget.dataset.index;
    const word_id = this.data[wordListName][index].id;
    wx.navigateTo({
      url: `/pages/word/detail/detail?word_id=${word_id}`,
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
