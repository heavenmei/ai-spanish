// pages/user_settings/user_settings.js
import { updateUser } from "../../../apis/index";

const app = getApp();

const groupSizeRange = [
  { label: 10, value: 10 },
  { label: 15, value: 15 },
  { label: 20, value: 20 },
  { label: 25, value: 25 },
  { label: 30, value: 30 },
  { label: 35, value: 35 },
  { label: 40, value: 40 },
];

const modeRange = [
  {
    label: "看词选义",
    value: "chooseTrans",
  },
  {
    label: "看词识义",
    value: "recallTrans",
  },
  {
    label: "看义识词",
    value: "recallWord",
  },
];

const taskLoadRange = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
  { label: 8, value: 8 },
  { label: 9, value: 9 },
  { label: 10, value: 10 },
];

const lRepeatRange = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
];

const rRepeatRange = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
];

const pickerType = {
  groupSize: {
    title: "每组单词数量",
    options: groupSizeRange,
    dataType: "groupSize",
  },
  learn_repeat_t: {
    title: "学习重复次数",
    options: lRepeatRange,
    dataType: "learn_repeat_t",
  },
  learn_first_m: {
    title: "第一次重复题型",
    options: modeRange,
    dataType: "learn_first_m",
  },
  learn_second_m: {
    title: "第二次重复题型",
    options: modeRange,
    dataType: "learn_second_m",
  },
  learn_third_m: {
    title: "第三次重复题型",
    options: modeRange,
    dataType: "learn_third_m",
  },

  review_repeat_t: {
    title: "复习重复次数",
    options: rRepeatRange,
    dataType: "review_repeat_t",
  },
  review_first_m: {
    title: "第一次重复题型",
    options: modeRange,
    dataType: "review_first_m",
  },
  review_second_m: {
    title: "重复/错误后第二次题型",
    options: modeRange,
    dataType: "review_second_m",
  },
  review_third_m: {
    title: "重复/错误后第三次题型",
    options: modeRange,
    dataType: "review_third_m",
  },

  dailyLearn: {
    title: "每日学习量(每组词量倍数)",
    options: taskLoadRange,
    dataType: "dailyLearn",
  },
  dailyReview: {
    title: "每日复习量(每组词量倍数)",
    options: taskLoadRange,
    dataType: "dailyReview",
  },
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    customValue: {},
    mode: {
      chooseTrans: "看词选义",
      recallTrans: "看词识义",
      recallWord: "看义识词",
    },
    // 当前picker信息
    picker: {},
    pickerVisible: false,
  },
  settings: {},
  isChange: false,
  customObj: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const customValue = {
      ...app.globalData.userInfo.wordSetting,
      ...this.data.customValue,
    };

    this.setData({
      customValue,
    });
  },

  // 为拥有进入过渡动画用，实际可不做处理
  onEnter() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: async function () {
    const oldSettings = JSON.stringify(app.globalData.userInfo.wordSetting);
    const newSettings = this.data.customValue;

    // 由于可能出现反复更改又改回原来的情况，为减少请求次数，在此检查是否真的进行更改
    const isChange = JSON.stringify(newSettings) === oldSettings;
    if (isChange) return;

    const res = await updateUser({
      wordSetting: newSettings,
    });
    app.globalData.userInfo.wordSetting = res.data;
  },

  onPicker(e) {
    const type = e.currentTarget.dataset.type;
    if (type === "dailyLearn" || type === "dailyReview") {
      let options = pickerType[type].options;
      options = options.map((item) => ({
        label: item.label * this.data.customValue.groupSize,
        value: item.value,
      }));

      this.setData({
        pickerVisible: true,
        picker: {
          ...pickerType[type],
          options,
        },
      });

      return;
    }

    this.setData({
      pickerVisible: true,
      picker: pickerType[type],
    });
    console.log("onPicker", type, this.data.picker);
  },

  onPickerConfirm(e) {
    const type = e.currentTarget.dataset.type;
    const value = e.detail.value[0] ?? e.detail.value;
    this.setData({
      [`customValue.${type}`]: value,
    });
    console.log("onPickerConfirm", type, value, this.data.customValue);
  },
});
