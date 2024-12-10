import { getScenarioList } from "../../apis/index";
import { MOCK_SCENE } from "../../config/index";

Page({
  data: {
    modelList: MOCK_SCENE,
    modelListLoadStatus: 0,
    tabList: [
      {
        id: 0,
        title: "全部",
      },
      {
        id: 1,
        title: "Tab 1",
      },
      {
        id: 2,
        title: "Tab 2",
      },
    ],
  },

  onLoad() {
    this.init();
  },
  async init() {
    // const res = await getScenarioList();
    // this.setData({ modelList: res.list });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
