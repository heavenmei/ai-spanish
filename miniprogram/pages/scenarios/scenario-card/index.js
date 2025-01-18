// pages/scenarios/components/scenarios-card/index.js

import { addHistory } from "../../../apis/index";

Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    model: {
      type: String,
      value: "",
    },
    id: {
      type: String,
      value: "",
      observer(id) {
        this.genIndependentID(id);
      },
    },
    data: {
      type: Object,
      observer(data) {
        if (!data) {
          return;
        }
        this.setData({ scenario: data });
      },
    },
  },

  data: {
    independentID: "",
    scenario: { id: "" },
  },
  lifetimes: {
    ready() {
      // this.init();
    },
    // detached() {
    //   this.clear();
    // },
  },

  methods: {
    genIndependentID(id) {
      let independentID;
      if (id) {
        independentID = id;
      } else {
        independentID = `scenario-card-${~~(Math.random() * 10 ** 8)}`;
      }
      this.setData({ independentID });
    },

    init() {
      const { id } = this.properties;
      console.log("🚨 ==> ", this.properties);
      this.genIndependentID(id);
    },

    async goChatStart() {
      try {
        const { data } = await addHistory();
        wx.navigateTo({
          url: `/pages/chat/index?id=${data.id}&model=${this.data.scenario.model}&scenarioId=${this.data.scenario.id}`,
        });
      } catch (e) {}
    },
  },
});
