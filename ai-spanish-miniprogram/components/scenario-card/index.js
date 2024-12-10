// pages/scenarios/components/scenarios-card/index.js
Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
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
      this.init();
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
  },
});
