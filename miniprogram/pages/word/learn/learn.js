import {
  toggleAddToNB,
  getLearningData,
  addLearningRecord,
} from "../../../apis/word";
import { WORD_VOICE_URL } from "../../../config/index.js";

import { randNumList, randArr, batchHandleWordDetail } from "../word_utils";

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

const queNameList = [
  "unLearnedList",
  "repeatOnce",
  "repeatTwice",
  "repeatThree",
  "learnedList",
];
const insertIndex = 4;
const listMinLength = 4;

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
  // 学习队列
  unLearnedList: undefined,
  repeatOnce: undefined,
  repeatTwice: undefined,
  repeatThree: undefined,
  learnedList: undefined,
  queNameList: queNameList,

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
  },

  settings: {},
  wordDetailList: [], // 后端数据
  wordLearningRecord: [],
  control: initControl,

  onLoad: function () {
    this.init();
    this.initLearningData();
  },

  init() {
    wx.enableAlertBeforeUnload({
      message: "现在退出将导致学习数据丢失哦",
    });

    // 初始化设置
    const userSettings = app.globalData.userInfo.wordSetting;
    const settings = { ...userSettings };
    console.log(" 📚 userSetting", settings);

    settings.second_mode =
      settings.learn_repeat_t >= 2 && !userSettings.learn_second_m
        ? "recallTrans"
        : userSettings.learn_second_m;
    settings.third_mode =
      settings.learn_repeat_t >= 3 && !userSettings.learn_third_m
        ? "recallWord"
        : userSettings.learn_third_m;
    settings.fourth_mode =
      settings.learn_repeat_t == 4 && !userSettings.learn_fourth_m
        ? "recallTrans"
        : userSettings.learn_fourth_m;

    this.settings = settings;

    for (let i = settings.learn_repeat_t; i < 4; i++)
      queNameList[i] = "learnedList";
    this.control.queNameList = queNameList;

    // 初始化显示内容组合
    const modeList = [];
    modeList.push(settings.learn_first_m);
    if (settings.learn_repeat_t >= 2) modeList.push(settings.second_mode);
    if (settings.learn_repeat_t >= 3) modeList.push(settings.third_mode);
    if (settings.learn_repeat_t == 4) modeList.push(settings.fourth_mode);
    this.control.modeList = modeList;

    // 检查题型是否包含“选义”题，包含则需要获取混淆选项
    const chooseTransIndex = modeList.indexOf("chooseTrans");
    this.settings.sample = chooseTransIndex != -1;

    this.setData({
      repeatTimes: settings.learn_repeat_t,
    });
  },

  async initLearningData() {
    const learnDataRes = await getLearningData({
      userId: app.globalData.userInfo.id,
      bookId: app.globalData.userInfo.l_book_id,
      groupSize: this.settings.groupSize,
      sample: this.settings.sample,
    });

    let wordDetailList = learnDataRes.list;
    wordDetailList = batchHandleWordDetail(wordDetailList, {
      getShortTrans: false,
    });
    console.log(wordDetailList);

    const unLearnedList = [];
    const wordLearningRecord = [];
    const repeatOnce = this.settings.learn_repeat_t >= 2 ? [] : undefined;
    const repeatTwice = this.settings.learn_repeat_t >= 3 ? [] : undefined;
    const repeatThree = this.settings.learn_repeat_t == 4 ? [] : undefined;
    for (let i = 0; i < wordDetailList.length; i++) {
      wordDetailList[i].innerAudioContext = wx.createInnerAudioContext({
        useWebAudioImplement: true,
      });

      wordDetailList[i].innerAudioContext.src =
        WORD_VOICE_URL + wordDetailList[i].voiceUrl;
      wordLearningRecord.push({
        word: wordDetailList[i].word,
        word_id: wordDetailList[i].word_id,
        repeatTimes: 0,
        reStartTimes: 0,
        master: false,
      });

      // 云端会将有学习过的记录一起返回，下面将已经学习过的词在词汇数组中的索引根据上次学习的重复次数添加到对应学习队列
      // 并将学习时重复次数添加入当前页面的记录，而reStartTimes等则重置
      if (
        !wordDetailList[i].learning_record ||
        JSON.stringify(wordDetailList[i].learning_record) == "{}" ||
        this.settings.learn_repeat_t == 1
      ) {
        unLearnedList.push(i);
      } else if (wordDetailList[i].learning_record.repeatTimes == 1) {
        // 要求重复次数不为1的话，则至少为2，这里无需再判断
        wordLearningRecord[i].repeatTimes = 1;
        repeatOnce.push(i);
      } else if (wordDetailList[i].learning_record.repeatTimes == 2) {
        if (this.settings.learn_repeat_t == 2) {
          wordLearningRecord[i].repeatTimes = 1;
          repeatOnce.push(i);
        } else {
          wordLearningRecord[i].repeatTimes = 2;
          repeatTwice.push(i);
        }
      } else if (wordDetailList[i].learning_record.repeatTimes == 3) {
        if (this.settings.learn_repeat_t == 2) {
          wordLearningRecord[i].repeatTimes = 1;
          repeatOnce.push(i);
        } else if (this.settings.learn_repeat_t == 3) {
          wordLearningRecord[i].repeatTimes = 2;
          repeatTwice.push(i);
        } else {
          wordLearningRecord[i].repeatTimes = 3;
          repeatThree.push(i);
        }
      }
    }
    this.wordDetailList = wordDetailList;
    this.wordLearningRecord = wordLearningRecord;
    this.control.unLearnedList = unLearnedList;

    this.control.repeatOnce = repeatOnce;
    this.control.repeatTwice = repeatTwice;
    this.control.repeatThree = repeatThree;
    this.control.learnedList = [];
    this.setData({
      learnNum:
        wordDetailList.length < this.settings.groupSize
          ? wordDetailList.length
          : this.settings.groupSize,
    });

    // console.log(
    //   " 📚 learnDataRes",
    //   this.data,
    //   this.wordDetailList,
    //   this.wordLearningRecord,
    //   this.control
    // );

    // 将未学习的队列的第一项“放出来”学习
    const nowIndex = this.control.unLearnedList.shift();
    this.showNextWord(nowIndex);
  },

  // * 下一个
  showNextWord(nextIndex) {
    if (this.checkDone()) return;
    // 获取单词索引后，根据该单词的学习记录设置显示内容
    if (!nextIndex && nextIndex != 0) nextIndex = this.control.nextIndex;
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

    // 播放音频
    if (this.control.innerAudioContext) this.control.innerAudioContext.stop();
    this.control.innerAudioContext =
      this.wordDetailList[nextIndex].innerAudioContext;
    if (this.settings.autoplay && modeDetail.wordMode == 0)
      this.control.innerAudioContext.play();
  },

  getNextIndex(thisWordRepeatTime) {
    // 获取下一个单词的索引，单词顺序是 未学过的->学过一次的->(学过两次的->学过三次的->)未学过的

    // 先检查该轮到的队列的长度是不是超过listMinLength（如果是1的话，就会出现刚学完第一次又从学过一次的队列中取出来学第二次的情况），小于listMinLength则要暂时跳过该队列，循环repeat_times次
    // 最后一次不满足相当于所有队列都不满足，且没有break的话出来的i会再加一次1，相加一取余，相当于又回到第一次检测的队列（即没人救得了(length>listMinLength)就还是自己硬扛）
    let i = 0;
    for (i; i < this.settings.learn_repeat_t; i++) {
      if (
        this.control[
          this.control.queNameList[
            (thisWordRepeatTime + i + 1) % this.settings.learn_repeat_t
          ]
        ].length > listMinLength
      ) {
        break;
      }
    }
    thisWordRepeatTime =
      (thisWordRepeatTime + i) % this.settings.learn_repeat_t;

    let nextIndex = -1;
    if (thisWordRepeatTime == 0) {
      if (
        this.settings.learn_repeat_t >= 2 &&
        this.control.repeatOnce.length > 0
      ) {
        nextIndex = this.control.repeatOnce.shift();
      } else if (
        this.settings.learn_repeat_t >= 3 &&
        this.control.repeatTwice.length > 0
      ) {
        nextIndex = this.control.repeatTwice.shift();
      } else if (
        this.settings.learn_repeat_t == 4 &&
        this.control.repeatThree.length > 0
      ) {
        nextIndex = this.control.repeatThree.shift();
      } else if (this.control.unLearnedList.length > 0) {
        nextIndex = this.control.unLearnedList.shift();
      }
    } else if (thisWordRepeatTime == 1) {
      if (
        this.settings.learn_repeat_t >= 3 &&
        this.control.repeatTwice.length > 0
      ) {
        nextIndex = this.control.repeatTwice.shift();
      } else if (
        this.settings.learn_repeat_t == 4 &&
        this.control.repeatThree.length > 0
      ) {
        nextIndex = this.control.repeatThree.shift();
      } else if (this.control.unLearnedList.length > 0) {
        nextIndex = this.control.unLearnedList.shift();
      } else if (
        this.settings.learn_repeat_t >= 2 &&
        this.control.repeatOnce.length > 0
      ) {
        nextIndex = this.control.repeatOnce.shift();
      }
    } else if (thisWordRepeatTime == 2) {
      if (
        this.settings.learn_repeat_t == 4 &&
        this.control.repeatThree.length > 0
      ) {
        nextIndex = this.control.repeatThree.shift();
      } else if (this.control.unLearnedList.length > 0) {
        nextIndex = this.control.unLearnedList.shift();
      } else if (
        this.settings.learn_repeat_t >= 2 &&
        this.control.repeatOnce.length > 0
      ) {
        nextIndex = this.control.repeatOnce.shift();
      } else if (
        this.settings.learn_repeat_t >= 3 &&
        this.control.repeatTwice.length > 0
      ) {
        nextIndex = this.control.repeatTwice.shift();
      }
    } else if (thisWordRepeatTime == 3) {
      if (this.control.unLearnedList.length > 0) {
        nextIndex = this.control.unLearnedList.shift();
      } else if (
        this.settings.learn_repeat_t == 2 &&
        this.control.repeatOnce.length > 0
      ) {
        nextIndex = this.control.repeatOnce.shift();
      } else if (
        this.settings.learn_repeat_t == 3 &&
        this.control.repeatTwice.length > 0
      ) {
        nextIndex = this.control.repeatTwice.shift();
      } else if (
        this.settings.learn_repeat_t == 4 &&
        this.control.repeatThree.length > 0
      ) {
        nextIndex = this.control.repeatThree.shift();
      }
    }
    if (nextIndex == -1) console.log("GetNextIndex Err!");
    return nextIndex;
  },

  checkChoice(e) {
    this.setData({ isBtnActive: false });
    const thisChoice = e.currentTarget.dataset.index;
    const { rightIndex, nowIndex } = this.control;
    const choiceBgList = ["", "", "", ""];
    choiceBgList[rightIndex] = "rightChoice";
    const nowRepeatTimes = this.wordLearningRecord[nowIndex].repeatTimes;

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
      this.wordLearningRecord[nowIndex].repeatTimes += 1;
      const newRepeatTimes = this.wordLearningRecord[nowIndex].repeatTimes;
      // todo
      this.control[this.control.queNameList[newRepeatTimes]].push(nowIndex);
      if (newRepeatTimes >= this.settings.learn_repeat_t) this.updateLearned();
    } else {
      choiceBgList[thisChoice] = "falseChoice";
      if (this.wordLearningRecord[nowIndex].reStartTimes >= 3) {
        this.control[
          this.control.queNameList[
            this.wordLearningRecord[nowIndex].repeatTimes
          ]
        ].splice(insertIndex, 0, nowIndex);
      } else {
        this.wordLearningRecord[nowIndex].reStartTimes += 1;
        this.wordLearningRecord[nowIndex].repeatTimes = 0;
        this.control.unLearnedList.splice(insertIndex, 0, nowIndex);
      }
    }
    this.setData({
      choiceBgList,
      thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
    });

    this.control.nextIndex = this.getNextIndex(nowRepeatTimes);

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
    const nowRepeatTimes = this.wordLearningRecord[nowIndex].repeatTimes;
    const choiceBgList = ["", "", "", ""];
    choiceBgList[rightIndex] = "rightChoice";

    if (this.wordLearningRecord[nowIndex].reStartTimes >= 3) {
      this.control[
        this.control.queNameList[this.wordLearningRecord[nowIndex].repeatTimes]
      ].splice(insertIndex, 0, nowIndex);
    } else {
      this.wordLearningRecord[nowIndex].reStartTimes += 1;
      this.wordLearningRecord[nowIndex].repeatTimes = 0;
      this.control.unLearnedList.splice(insertIndex, 0, nowIndex);
    }
    this.setData({
      choiceBgList,
      thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
    });

    this.control.nextIndex = this.getNextIndex(nowRepeatTimes);

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

  setAsKnown() {
    this.setData({ isBtnActive: false });
    // 正常标记为认识
    const { nowIndex } = this.control;
    this.wordLearningRecord[nowIndex].repeatTimes += 1;

    this.control[
      this.control.queNameList[this.wordLearningRecord[nowIndex].repeatTimes]
    ].push(nowIndex);
    if (
      this.wordLearningRecord[nowIndex].repeatTimes >=
      this.settings.learn_repeat_t
    )
      this.updateLearned();
    this.control.nextIndex = this.getNextIndex(
      this.wordLearningRecord[nowIndex].repeatTimes - 1
    );

    // 更改显示
    if (this.data.contentMode != 1) {
      this.setData({
        contentTimingStop: true,
        controlMode: 2,
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
        controlMode: 2,
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

  setAsUnknown() {
    this.setData({ isBtnActive: false });
    const { nowIndex } = this.control;
    const nowRepeatTimes = this.wordLearningRecord[nowIndex].repeatTimes;

    if (this.wordLearningRecord[nowIndex].reStartTimes >= 3) {
      this.control[
        this.control.queNameList[this.wordLearningRecord[nowIndex].repeatTimes]
      ].splice(insertIndex, 0, nowIndex);
    } else {
      this.wordLearningRecord[nowIndex].reStartTimes += 1;
      this.wordLearningRecord[nowIndex].repeatTimes = 0;
      this.control.unLearnedList.splice(insertIndex, 0, nowIndex);
    }
    this.control.nextIndex = this.getNextIndex(nowRepeatTimes);

    // 更改显示
    if (this.data.contentMode != 1) {
      this.setData({
        contentTimingStop: true,
        controlMode: 3,
        thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
      });
      this.setData({
        contentMode: 1,
        isBtnActive: true,
      });
    } else if (this.data.wordMode != 0) {
      this.setData({
        wordTimingStop: true,
        controlMode: 3,
        thisWordRepeatTime: this.wordLearningRecord[nowIndex].repeatTimes,
      });
      this.setData({
        wordMode: 0,
        isBtnActive: true,
      });
    } else {
      this.showNextWord();
    }
  },

  changeToUnknown() {
    wx.showToast({
      title: "已标记为不认识",
      icon: "none",
      duration: 1000,
    });
    const { nowIndex } = this.control;
    // 现在repeatTimes是加过1后的，也在加过1后对应次数的队列里，在对应列队中找到该单词（索引）并删除加到未学习队列中/次数太多就只退一级
    // let queNameList = ['unLearnedList', 'repeatOnce', 'repeatTwice', 'repeatThree', 'learnedList']
    // for (let i = this.settings.learn_repeat_t; i < 4; i++) queNameList[i] = 'learnedList'
    const nowRepeatTimes = this.wordLearningRecord[nowIndex].repeatTimes;
    const wrongPlaceIndex =
      this.control[this.control.queNameList[nowRepeatTimes]].indexOf(nowIndex);
    let removedWord = -1;
    if (wrongPlaceIndex != -1)
      removedWord = this.control[
        this.control.queNameList[nowRepeatTimes]
      ].splice(wrongPlaceIndex, 1);
    if (removedWord != nowIndex && removedWord != -1)
      this.control[this.control.queNameList[nowRepeatTimes]].splice(
        wrongPlaceIndex,
        0,
        removedWord
      );
    if (this.wordLearningRecord[nowIndex].reStartTimes >= 3) {
      this.wordLearningRecord[nowIndex].repeatTimes -= 1;
      this.control[
        this.control.queNameList[this.wordLearningRecord[nowIndex].repeatTimes]
      ].splice(insertIndex, 0, nowIndex);
    } else {
      this.wordLearningRecord[nowIndex].reStartTimes += 1;
      this.wordLearningRecord[nowIndex].repeatTimes = 0;
      this.control.unLearnedList.splice(insertIndex, 0, nowIndex);
    }
    this.showNextWord();
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
  updateLearned() {
    const learnedNum = this.control.learnedList.length;
    this.setData({ learnedNum });
  },

  checkDone() {
    const learnedNum = this.control.learnedList.length;
    if (learnedNum != this.data.learnedNum) this.setData({ learnedNum });
    if (learnedNum >= this.data.learnNum) {
      console.log("本组单词学习完毕啦~");
      this.setData({
        isBtnActive: false,
        learnDone: true,
      });
      this.sendLearningData();
      return true;
    }
    return false;
  },

  // * 上传学习数据
  async sendLearningData() {
    wx.showLoading({
      title: "学习数据上传中...",
      mask: true,
    });

    // 生成已完成的单词学习记录
    const learnedList = [];
    for (let i = 0; i < this.control.learnedList.length; i++) {
      learnedList.push({
        word: this.wordLearningRecord[this.control.learnedList[i]].word,
        word_id: this.wordLearningRecord[this.control.learnedList[i]].word_id,
        master: this.wordLearningRecord[this.control.learnedList[i]].master,
      });
    }

    // 生成正在学习的单词队列学习记录
    const learningList = [];
    for (let j = 1; j < this.settings.learn_repeat_t; j++) {
      const queName = this.control.queNameList[j];
      for (let k = 0; k < this.control[queName].length; k++) {
        learningList.push({
          word: this.wordLearningRecord[this.control.queName[k]].word,
          word_id: this.wordLearningRecord[this.control[queName][k]].word_id,
          learn_time: new Date(),
          repeatTimes: k,
        });
      }
    }

    const res = await addLearningRecord({
      learnedList,
      learningList,
    });
    console.log("addLearningRecord res", res);

    // todo delete
    app.globalData.updatedForIndex = true;
    app.globalData.updatedForOverview = true;

    wx.hideLoading();
    wx.disableAlertBeforeUnload();
  },

  playVoice() {
    this.control.innerAudioContext.stop();
    this.control.innerAudioContext.play();
  },

  // * 生成干扰项数组（最后一项为正确答案），生成用于打乱和标记背景颜色的数组以及正确选项索引
  getWrongTrans(nowIndex) {
    if (!nowIndex) nowIndex = this.control.nowIndex;
    const numList = randNumList(
      this.wordDetailList[nowIndex].sample_list.length - 2,
      3
    );
    const wrongTransWordList = [];
    for (let j = 0; j < numList.length; j++) {
      wrongTransWordList.push(
        this.wordDetailList[nowIndex].sample_list[numList[j]]
      );
    }
    // 插入正确的选项 最后一个
    wrongTransWordList.push(this.wordDetailList[nowIndex].sample_list[9]);

    let choiceOrder = [0, 1, 2, 3];
    choiceOrder = randArr(choiceOrder);
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
    this.control.learnedList.push(this.control.nowIndex);
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
    if (this.updateLearned()) return;
    this.setData({ isBtnActive: true });
  },

  // 调整是否添加到生词本
  async toggleAddToNB() {
    this.setData({ isBtnActive: false });
    const add = this.data.isInNotebook;
    const res = await toggleAddToNB({
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
    const userSettings = app.globalData.userInfo.wordSetting;
    this.settings = { ...userSettings };
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
    this.initLearningData();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.disableAlertBeforeUnload();
  },
});
