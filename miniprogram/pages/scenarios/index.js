import { getScenarioList } from "../../apis/index";

Page({
  data: {
    modelListLoadStatus: 0,
    scenarioList: {},
    tabList: [
      {
        id: "all",
        title: "全部",
      },
    ],
  },

  onLoad() {
    this.init();
  },
  async init() {
    const res = await getScenarioList();
    const allList = res.list.map((item) => item.children);

    this.setData({
      scenarioList: [
        {
          id: "all",
          title: "全部",
          children: allList.flat(),
        },
        ...res.list,
      ],
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  onTabsChange(event) {
    // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },
});
