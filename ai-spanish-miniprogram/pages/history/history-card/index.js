import { formatTime } from "../../../utils/util";

Component({
  options: {
    multipleSlots: true,
  },

  properties: {
    item: {
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  methods: {
    getFormattedDate(dateStr) {
      console.log("getFormattedDate", dateStr);

      return formatTime(dateStr);
    },
    async onDelete() {
      const { id } = this.properties.item;
      // this.onDeleteHistory(this.properties.item.id);
      this.triggerEvent("onDeleteHistory", id);
    },
    goChat() {
      wx.navigateTo({
        url: `/pages/chat/index?id=${this.properties.item.id}`,
      });
    },
  },
});
