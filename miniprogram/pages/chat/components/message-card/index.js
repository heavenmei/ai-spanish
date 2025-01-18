// import { getOSSUrl } from "../../../../apis/index";
let interval;

Component({
  properties: {
    cardId: {
      type: String,
    },
    text: {
      type: String,
      default: "",
    },
    filename: {
      type: String,
      default: "",
    },
    updatedAt: {
      type: String,
      default: "",
    },
    isAiRes: {
      type: Boolean, //true: AI false: user
      default: false,
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    speechIcon: "/images/speech0.png",
  },

  // lifetimes: {
  //   attached() {
  //     this.initAudio();
  //   },
  // },
  methods: {
    playAudio(event) {
      this.triggerEvent("playAudio", {
        filename: event.currentTarget.dataset.filename,
        cardId: this.properties.cardId,
      });
    },
    speechIconStart() {
      const that = this;
      var num = 1;
      interval = setInterval(function () {
        that.setData({
          speechIcon: `/images/speech${num % 3}.png`,
        });

        num++;
      }, 500);
    },
    speechIconClear() {
      clearInterval(interval);
    },
  },
});
