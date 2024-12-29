import {
  toggleAddToNB,
  getReviewData,
  updateLearningRecord,
} from "../../../apis/word";
import word_utils from "../../../utils/word_utils.js";

const app = getApp();

// const innerAudioContext = wx.createInnerAudioContext({ useWebAudioImplement: true })

const mode = {
  // 看词选义
  chooseTrans: { wordMode: 0, contentMode: 0, controlMode: 0 },
  // 看词识义
  recallTrans: { wordMode: 0, contentMode: 2, controlMode: 1 },
  // 看义识词
  recallWord: { wordMode: 1, contentMode: 1, controlMode: 1 },
  // 不做遮挡
  all: { wordMode: 0, contentMode: 1, controlMode: 3 },
};

const initSettings = {
  learn_repeat_t: 1,
  group_size: 1,
  timing: true,
  timing_duration: 1500,
  autoplay: true,
};

const initControl = {
  // 当前&下一个词汇在原数组中下标
  nowIndex: -1,
  nextIndex: -1,
  // 正确选项的下标
  rightIndex: -1,
  // 单词音频播放器
  innerAudioContext: undefined,
  // 选择题显示答案后停留计时器
  isShowAllTimerSet: false,
  showAllTimer: -1,
  // 复习队列
  reviewingList: undefined,
  reviewedList: undefined,
  // queNameList: queNameList,
  modeList: undefined,
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    learnedNum: 0,
    learnNum: 0,
    wordDetail: {},

    repeatTimes: 0,
    thisWordRepeatTime: 1,
    // mode
    wordMode: 2,
    contentMode: 3,
    controlMode: 2,
    // 选择题相关
    wrongTransWordList: [],
    choiceOrder: [],
    choiceBgList: [],

    isInNotebook: false,
    isBtnActive: false,
    learnDone: false,
    reviewRes: [],
  },

  settings: initSettings,
  wordDetailList: [], // 后端数据
  wordLearningRecord: [],
  control: initControl,

  onLoad: function () {
    this.init();
    this.initData();
  },

  init() {
    wx.enableAlertBeforeUnload({
      message: "现在退出将导致学习数据丢失哦",
    });

    // 初始化设置
    const userSettings = app.globalData.userInfo.wordSetting;
    const settings = {
      ...this.settings,
      ...userSettings,
    };

    // 初始化显示内容组合
    const modeList = [];
    modeList.push(settings.review_first_m);
    modeList.push(settings.review_second_m);
    modeList.push(settings.review_third_m);
    this.control.modeList = modeList;

    // 检查题型是否包含“选义”题，包含则需要获取混淆选项
    const chooseTransIndex = modeList.indexOf("chooseTrans");
    this.settings.sample = chooseTransIndex != -1;

    this.setData({
      repeatTimes: settings.learn_repeat_t,
    });
  },

  async initData() {
    const learnDataRes = await getReviewData({
      userId: app.globalData.userInfo.id,
      bookId: app.globalData.userInfo.l_book_id,
      groupSize: this.settings.group_size,
      sample: this.settings.sample,
    });

    const wordDetailList = learnDataRes.list;

    const reviewingList = [];
    const wordLearningRecord = [];

    for (let i = 0; i < wordDetailList.length; i++) {
      wordDetailList[i].innerAudioContext = wx.createInnerAudioContext({
        useWebAudioImplement: true,
      });
      wordDetailList[i].innerAudioContext.src = wordDetailList[i].voiceUrl;
      wordLearningRecord.push({
        word_id: wordDetailList[i].word_id,
        repeatTimes: 0,
        // reStartTimes: 0,
        master: false,

        wrongTimes: 0,
        uncertainTimes: 0,
        master: false,
        q: -1,
      });

      reviewingList.push(i);
    }
    this.wordDetailList = wordDetailList;
    this.wordLearningRecord = wordLearningRecord;
    this.control.reviewingList = reviewingList;
    this.control.reviewedList = [];
    this.setData({
      learnNum:
        wordDetailList.length < this.settings.group_size
          ? wordDetailList.length
          : this.settings.group_size,
    });

    console.log(
      " 📚 reviewDataRes",
      this.data,
      this.wordDetailList,
      this.wordLearningRecord,
      this.control
    );

    // 将未学习的队列的第一项“放出来”学习
    this.showNextWord();
  },

  // * 下一个
  showNextWord() {
    if (this.checkDone()) return;
    // 获取单词索引后，根据该单词的学习记录设置显示内容
    const nextIndex = this.control.reviewingList.shift();
    if (nextIndex == -1) console.log("学完本组单词啦~");
    this.control.nowIndex = nextIndex;

    const { repeatTimes } = this.wordLearningRecord[nextIndex];
    const modeDetail = mode[this.control.modeList[repeatTimes]];

    if (modeDetail.contentMode == 0) this.getWrongTrans(nextIndex);

    this.setData({
      ...modeDetail,
      wordDetail: this.wordDetailList[nextIndex],
      thisWordRepeatTime: repeatTimes,
      isInNotebook: !!this.wordDetailList[nextIndex].in_notebook,
      isBtnActive: true,
    });

    if (
      this.wordLearningRecord[nextIndex].repeatTimes == 0 &&
      this.wordLearningRecord[nextIndex].wrongTimes == 0 &&
      this.wordLearningRecord[nextIndex].uncertainTimes == 0
    ) {
      const _this = this;
      this.control.isQuickTimer = true;
      this.control.quickTimer = setTimeout(function () {
        _this.control.isQuickTimer = false;
      }, 2000);
    }

    // 播放音频
    if (this.control.innerAudioContext) this.control.innerAudioContext.stop();
    this.control.innerAudioContext =
      this.wordDetailList[nextIndex].innerAudioContext;
    if (this.settings.autoplay && modeDetail.wordMode == 0)
      this.control.innerAudioContext.play();
  },

  checkChoice(e) {
    this.setData({ isBtnActive: false });
    const thisChoice = e.currentTarget.dataset.index;
    const { rightIndex, nowIndex } = this.control;
    const choiceBgList = ["", "", "", ""];
    choiceBgList[rightIndex] = "rightChoice";

    // 如果显示答案的倒计时已经设置了，则“加速”，同时进行错误选项的检测
    if (this.control.isShowAllTimerSet) {
      if (thisChoice != rightIndex) choiceBgList[thisChoice] = "falseChoice";
      this.setData({
        contentMode: 1,
        controlMode: 3,
        choiceBgList,
        isBtnActive: true,
      });
      clearTimeout(this.control.showAllTimer);
      this.control.isShowAllTimerSet = false;
      this.checkDone();
      return;
    }

    if (thisChoice == rightIndex) {
      // 如果是第一次，则作为recall质量的判定
      if (
        this.wordLearningRecord[nowIndex].wrongTimes == 0 &&
        this.wordLearningRecord[nowIndex].repeatTimes == 0 &&
        this.wordLearningRecord[nowIndex].uncertainTimes == 0
      ) {
        if (this.control.isQuickTimer) {
          this.wordLearningRecord[nowIndex].q = 5;
          clearTimeout(this.control.quickTimer);
          this.control.isQuickTimer = false;
        } else {
          this.wordLearningRecord[nowIndex].q = 4;
        }
      }
      this.wordLearningRecord[nowIndex].repeatTimes += 1;
      if (this.wordLearningRecord[nowIndex].repeatTimes >= 3) {
        this.updateCount();
      } else if (
        this.wordLearningRecord[nowIndex].wrongTimes == 0 &&
        this.wordLearningRecord[nowIndex].uncertainTimes == 0 &&
        this.wordLearningRecord[nowIndex].repeatTimes >=
          this.settings.repeat_times
      ) {
        this.updateCount();
      } else {
        this.control.reviewingList.push(nowIndex);
      }
    } else {
      choiceBgList[thisChoice] = "falseChoice";
      if (this.wordLearningRecord[nowIndex].wrongTimes <= 3) {
        this.wordLearningRecord[nowIndex].repeatTimes = 0;
      }
      this.wordLearningRecord[nowIndex].q = 3;
      this.wordLearningRecord[nowIndex].wrongTimes += 1;
      this.control.reviewingList.push(nowIndex);
    }

    this.setData({
      choiceBgList,
      thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
    });

    // this.control.nextIndex = this.getNextIndex(nowRepeatTimes);

    // 设置1s之后显示详情
    const _this = this;
    this.control.isShowAllTimerSet = true;
    this.control.showAllTimer = setTimeout(function () {
      _this.setData({
        contentMode: 1,
        controlMode: 3,
      });
      _this.control.isShowAllTimerSet = false;
      _this.checkDone();
    }, 1000);
    this.setData({ isBtnActive: true });
  },

  showAnswer() {
    this.setData({ isBtnActive: false });
    // 如果显示答案的倒计时已经设置了，则“加速”
    if (this.control.isShowAllTimerSet) {
      clearTimeout(this.control.showAllTimer);
      this.setData({
        contentMode: 1,
        controlMode: 3,
        isBtnActive: true,
      });
      this.control.isShowAllTimerSet = false;
      this.checkDone();
      return;
    }

    const { nowIndex, rightIndex } = this.control;
    const choiceBgList = ["", "", "", ""];
    choiceBgList[rightIndex] = "rightChoice";

    // 按照错误处理
    if (this.wordLearningRecord[nowIndex].wrongTimes <= 3) {
      this.wordLearningRecord[nowIndex].repeatTimes = 0;
    }
    this.wordLearningRecord[nowIndex].q = 3;
    this.wordLearningRecord[nowIndex].wrongTimes += 1;
    this.control.reviewingList.push(nowIndex);
    this.setData({
      choiceBgList,
      thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
    });

    // 设置1s之后显示详情
    const _this = this;
    this.control.isShowAllTimerSet = true;
    this.control.showAllTimer = setTimeout(function () {
      _this.setData({
        contentMode: 1,
        controlMode: 3,
      });
      _this.control.isShowAllTimerSet = false;
    }, 1000);
    this.setData({ isBtnActive: true });
  },

  setAsType(e) {
    this.setData({ isBtnActive: false });
    const { type } = e.currentTarget.dataset;
    const { nowIndex } = this.control;

    if (type == "known") {
      // 如果是第一次，则作为recall质量的判定
      if (
        this.wordLearningRecord[nowIndex].wrongTimes == 0 &&
        this.wordLearningRecord[nowIndex].repeatTimes == 0 &&
        this.wordLearningRecord[nowIndex].uncertainTimes == 0
      ) {
        if (this.control.isQuickTimer) {
          this.wordLearningRecord[nowIndex].q = 5;
          clearTimeout(this.control.quickTimer);
          this.control.isQuickTimer = false;
        } else {
          this.wordLearningRecord[nowIndex].q = 4;
        }
      }
      this.wordLearningRecord[nowIndex].repeatTimes += 1;
      if (this.wordLearningRecord[nowIndex].repeatTimes >= 3) {
        this.updateCount();
      } else if (
        this.wordLearningRecord[nowIndex].wrongTimes == 0 &&
        this.wordLearningRecord[nowIndex].uncertainTimes == 0 &&
        this.wordLearningRecord[nowIndex].repeatTimes >=
          this.settings.repeat_times
      ) {
        this.updateCount();
      } else {
        this.control.reviewingList.push(nowIndex);
      }
    } else if (type == "uncertain") {
      // 模糊按照错误的方法处理，但增加不确定次数，若是第一次则判定相应质量为4
      if (
        this.wordLearningRecord[nowIndex].wrongTimes == 0 &&
        this.wordLearningRecord[nowIndex].repeatTimes == 0 &&
        this.wordLearningRecord[nowIndex].uncertainTimes == 0
      ) {
        this.wordLearningRecord[nowIndex].q = 4;
        clearTimeout(this.control.quickTimer);
        this.control.isQuickTimer = false;
      }
      if (this.wordLearningRecord[nowIndex].q == 5)
        this.wordLearningRecord[nowIndex].q = 4;
      if (this.wordLearningRecord[nowIndex].wrongTimes <= 3) {
        this.wordLearningRecord[nowIndex].repeatTimes = 0;
      }
      this.wordLearningRecord[nowIndex].uncertainTimes += 1;
      this.control.reviewingList.push(nowIndex);
    } else if (type == "unknown") {
      // 不认识/错误则在错误次数不大于3次时重置学习次数
      if (
        this.wordLearningRecord[nowIndex].wrongTimes == 0 &&
        this.wordLearningRecord[nowIndex].repeatTimes == 0 &&
        this.wordLearningRecord[nowIndex].uncertainTimes == 0
      ) {
        clearTimeout(this.control.quickTimer);
        this.control.isQuickTimer = false;
      }
      if (this.wordLearningRecord[nowIndex].wrongTimes <= 3) {
        this.wordLearningRecord[nowIndex].repeatTimes = 0;
      }
      this.wordLearningRecord[nowIndex].q = 3;
      this.wordLearningRecord[nowIndex].wrongTimes += 1;
      this.control.reviewingList.push(nowIndex);
    } else if (type == "changeToUnknown") {
      wx.showToast({
        title: "已标记为不认识",
        icon: "none",
        duration: 1000,
      });
      // 从认识/模糊转成忘记时，一样按照错误处理一次，若复习队列最后一项不是该词的话，将之添加进学习队列
      if (this.wordLearningRecord[nowIndex].wrongTimes <= 3) {
        this.wordLearningRecord[nowIndex].repeatTimes = 0;
      }
      this.wordLearningRecord[nowIndex].q = 3;
      this.wordLearningRecord[nowIndex].wrongTimes += 1;
      if (this.control.reviewedList.indexOf(nowIndex) >= 0)
        this.control.reviewingList.push(nowIndex);
    }

    const control_m = {
      known: 2,
      uncertain: 2,
      unknown: 3,
    };

    // 更改显示
    if (this.data.contentMode != 1) {
      this.setData({
        contentTimingStop: true,
        controlMode: control_m[type],
        thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
      });
      this.setData({
        contentMode: 1,
        isBtnActive: true,
      });
      this.checkDone();
    } else if (this.data.wordMode != 0) {
      this.setData({
        wordTimingStop: true,
        controlMode: control_m[type],
        thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
      });
      this.setData({
        wordMode: 0,
        isBtnActive: true,
      });
      this.checkDone();
    } else {
      this.showNextWord();
    }
  },

  toNextWord() {
    // 由于页面事件的第一个参数默认是event，与showNextWord默认参数有冲突，故用此函数间接调用
    this.setData({ isBtnActive: false });
    this.showNextWord();
  },

  showTrans() {
    this.setData({
      contentTimingStop: true,
    });
    this.setData({
      contentMode: 1,
    });
  },

  showWord() {
    this.setData({
      wordTimingStop: true,
    });
    if (this.settings.autoplay) this.control.innerAudioContext.play();
    this.setData({
      wordMode: 0,
    });
  },

  // * 更新顶部学习数量
  updateCount() {
    this.control.reviewedList.push(this.control.nowIndex);
    const learnedNum = this.control.reviewedList.length;
    this.setData({ learnedNum });
  },

  checkDone() {
    const learnedNum = this.control.reviewedList.length;
    if (learnedNum != this.data.learnedNum) this.setData({ learnedNum });
    if (learnedNum >= this.data.learnNum) {
      console.log("本组单词复习完毕啦~");
      this.setData({
        isBtnActive: false,
        learnDone: true,
      });
      this.sendLearningData();
      return true;
    }
    return false;
  },

  // * 上传数据
  async sendLearningData() {
    wx.showLoading({
      title: "复习数据上传中...",
      mask: true,
    });

    const wordLearningRecord = [];
    for (let i = 0; i < this.control.reviewedList.length; i++) {
      let record = this.wordDetailList[i].record;
      let q = this.wordLearningRecord[this.control.reviewedList[i]].q;
      // 只要错q就为3，每多错两次q-1，即>0则q=3, >2则q=2, >4则q=1, >6则q=0
      const wrongTimes = this.wordLearningRecord[this.control.reviewedList[i]];
      if (wrongTimes > 0) {
        q = 3;
        q = q + 1 - Math.ceil(wrongTimes / 2);
        if (q < 0) q = 0;
      }

      record = {
        ...record,
        q: q,
        master: this.wordLearningRecord[this.control.reviewedList[i]].master,
      };
      wordLearningRecord.push(record);
    }
    console.log("upload wordLearningRecord", wordLearningRecord);

    const res = await updateLearningRecord({
      wordLearningRecord: wordLearningRecord,
    });
    console.log("updateLearningRecord res", res);

    // todo delete
    app.globalData.updatedForIndex = true;
    app.globalData.updatedForOverview = true;

    wx.hideLoading();
    wx.disableAlertBeforeUnload();

    const reviewData = JSON.parse(JSON.stringify(res.list));

    reviewData.sort(function (a, b) {
      return a.NOI - b.NOI;
    });

    let temp = 0;
    for (let i = 0; i < reviewData.length; i++) {
      for (let j = 0; j < this.wordDetailList.length; j++) {
        const innerTemp = (temp + j) % this.wordDetailList.length;
        if (reviewData[i].word_id == this.wordDetailList[innerTemp].word_id) {
          reviewData[i].word = this.wordDetailList[innerTemp].word;
          temp = innerTemp;
          break;
        }
      }
    }
    this.setData({
      reviewRes: reviewData,
    });
  },

  playVoice() {
    this.control.innerAudioContext.stop();
    this.control.innerAudioContext.play();
  },

  // * 生成干扰项数组（最后一项为正确答案），生成用于打乱和标记背景颜色的数组以及正确选项索引
  getWrongTrans(nowIndex) {
    if (!nowIndex) nowIndex = this.control.nowIndex;
    const numList = word_utils.randNumList(
      this.wordDetailList[nowIndex].sample_list.length - 1,
      3
    );
    const wrongTransWordList = [];
    for (let j = 0; j < numList.length; j++) {
      wrongTransWordList.push(
        this.wordDetailList[nowIndex].sample_list[numList[j]]
      );
    }
    // 插入正确的选项
    wrongTransWordList.push(this.wordDetailList[nowIndex]);

    let choiceOrder = [0, 1, 2, 3];
    choiceOrder = word_utils.randArr(choiceOrder);
    const rightIndex = choiceOrder.indexOf(3);
    const choiceBgList = ["", "", "", ""];

    // console.log("getWrongTrans", numList, wrongTransWordList);

    this.control.rightIndex = rightIndex;
    this.setData({
      wrongTransWordList,
      choiceOrder,
      choiceBgList,
    });
  },

  // ! bottom Buttons
  toDetail() {
    wx.navigateTo({
      url: `/pages/word/detail/detail?word_id=${this.data.wordDetail.word_id}`,
    });
  },

  // * 跳过当前环节/设置为已掌握
  skip(e) {
    this.setData({ isBtnActive: false });
    const { type } = e.currentTarget.dataset;
    const { nowIndex } = this.control;
    const { repeatTimes } = this.wordLearningRecord[nowIndex];
    if (repeatTimes == this.settings.learn_repeat_t) {
      wx.showToast({
        title: "该词已完成学习啦",
        icon: "none",
        duration: 1000,
      });
      if (type == "master") this.wordLearningRecord[nowIndex].master = true;
      this.setData({ isBtnActive: true });
      return;
    }
    const index =
      this.control[this.control.queNameList[repeatTimes]].indexOf(nowIndex);
    if (index != -1)
      this.control[this.control.queNameList[repeatTimes]].splice(index, 1);
    this.control.reviewedList.push(this.control.nowIndex);
    this.wordLearningRecord[nowIndex].repeatTimes =
      this.settings.learn_repeat_t;
    if (type == "master") this.wordLearningRecord[nowIndex].master = true;
    this.control.nextIndex = this.getNextIndex(repeatTimes);
    this.setData({
      thisWordRepeatTime: this.settings.learn_repeat_t,
      ...mode.all,
      isBtnActive: true,
    });
    const tips = type == "master" ? "已掌握" : "跳过该轮学习";
    wx.showToast({
      title: `已将该词设置为${tips}`,
      icon: "none",
      duration: 1000,
    });
    if (this.updateCount()) return;
    this.setData({ isBtnActive: true });
  },

  // todo 调整是否添加到生词本
  async toggleAddToNB() {
    this.setData({ isBtnActive: false });
    const add = this.data.isInNotebook;
    const res = await toggleAddToNB({
      user_id: app.globalData.userInfo.id,
      word_id: this.wordDetailList[this.control.nowIndex].word_id,
      add: !add,
    });
    console.log(res);
    if (res.data) {
      this.wordDetailList[this.control.nowIndex].in_notebook = !add;
      this.setData({
        isInNotebook: !add,
        isBtnActive: true,
      });
    } else {
      wx.showToast({
        title: "操作出错，请重试",
        icon: "none",
        duration: 1000,
      });
      this.setData({ isBtnActive: true });
    }
  },

  // ! learnDone
  goBack() {
    wx.navigateBack({
      delta: 1,
    });
  },

  reInit() {
    // 数据恢复初始状态
    this.settings = initSettings;
    this.wordDetailList = [];
    this.wordLearningRecord = [];
    this.control = initControl;

    this.setData({
      learnedNum: 0,
      learnNum: 0,
      wordDetail: {},
      repeatTimes: 0,
      thisWordRepeatTime: 1,
      wordMode: 2,
      contentMode: 3,
      controlMode: 2,
      learnDone: false,
    });
    this.init();
    this.initData();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.disableAlertBeforeUnload();
  },
});
