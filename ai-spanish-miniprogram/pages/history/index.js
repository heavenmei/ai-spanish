import { addHistory, getHistoryList, historyDelete } from "../../apis/index";

Page({
  data: {
    pageLoading: false,
    historyList: [],
    loadMoreStatus: 0,
    hasLoaded: false,
    total: 0,
    page: 0,
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
    this.init(true);
  },
  onLoad() {
    // this.init(true);
  },
  onPullDownRefresh() {
    this.init();
  },
  async init(reset = true) {
    const { loadMoreStatus, historyList = [] } = this.data;
    const params = {
      page: reset ? 1 : page + 1,
      pageSize: 10,
    };

    // 在加载中或者无更多数据，直接返回
    if (!reset && loadMoreStatus !== 0) return;

    this.setData({
      loadMoreStatus: 1,
    });

    try {
      const data = await getHistoryList(params);
      console.log("🚀 getHistoryList ==>", data);

      // if (data.success) {
      const { list, total } = data;

      if (total === 0 && reset) {
        this.setData({
          historyList: [],
          hasLoaded: true,
          total: total,
          loadMoreStatus: 2,
        });
        return;
      }
      const _historyList = reset ? list : historyList.concat(list);
      const _loadMoreStatus = _historyList.length === total ? 2 : 0;

      console.log("🚨====", _historyList);

      this.setData({
        historyList: _historyList,
        page: data.page || 1,
        total: Number(total),
        loadMoreStatus: _loadMoreStatus,
      });
      // }
    } catch (error) {}

    this.setData({
      hasLoaded: true,
      loadMoreStatus: 2,
    });
  },

  async goChatStart() {
    try {
      const { data } = await addHistory();
      wx.navigateTo({
        url: `/pages/chat/index?id=${data.id}`,
      });
    } catch (e) {}
  },

  async onDeleteHistory(event) {
    console.log("🚨== delete history", event);

    const res = await historyDelete({ id: event.detail });
    wx.showToast({
      title: res.message,
      icon: "none",
    });

    if (res.success) {
      this.init();
    }
  },
});
