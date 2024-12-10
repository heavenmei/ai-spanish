Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    hasUserInfo: {
      type: Boolean,
      value: false,
    },
    userInfo: {
      type: Object,
      value: {},
    },
  },
  data: {
    defaultAvatarUrl:
      "https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png",
  },
  methods: {
    gotoUserEditPage() {
      this.triggerEvent("gotoUserEditPage");
    },
  },
});
