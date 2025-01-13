// pages/word/detail/detail.js
import { getWordDetail, toggleAddToNB } from "../apis/word";
import { WORD_VOICE_URL } from "../../../config/index.js";
// import word_utils from "../../../utils/word_utils.js";

// const app = getApp();
const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: true,
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    colorType: 16,
    word_id: 0,
    wordDetail: {},
    voiceUrl: "",
    isInNotebook: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const word_id = options.word_id;
    this.getDetail(word_id);
  },

  async getDetail(word_id) {
    const res = await getWordDetail({
      word_id,
    });
    const wordDetail = JSON.parse(JSON.stringify(res.data));
    console.log(wordDetail);

    this.setData({
      wordDetail,
      isInNotebook: wordDetail.in_notebook ?? false,
    });
    const voiceUrl = WORD_VOICE_URL + wordDetail.voiceUrl;
    // const voiceUrl = word_utils.getWordVoiceUrl(wordDetail.word);
    innerAudioContext.src = voiceUrl;
  },

  playVoice() {
    innerAudioContext.stop();
    innerAudioContext.play();
  },

  // 调整是否添加到生词本
  toggleAddToNB: async function () {
    const add = this.data.isInNotebook;
    const res = await toggleAddToNB({
      word_id: this.data.wordDetail.id,
      add: !add,
    });
    console.log(res);
    if (res.data) {
      this.setData({
        isInNotebook: !add,
      });
    } else {
      wx.showToast({
        title: "操作出错，请重试",
        icon: "none",
        duration: 1000,
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // if (this.data.wordDetail.in_notebook != this.data.isInNotebook)
    //   app.globalData.updatedForOverview = true;
  },
});
