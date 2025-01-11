import {
  getAudio,
  getMessageList,
  sendChat,
  uploadRecord,
  getOSSUrl,
} from "../../apis/index";

const recorder = wx.getRecorderManager();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputText: "",
    chatOutput: "",
    isStop: false,
    messageList: [],
    messageListLoadStatus: 0,
    pagination: {
      page: 1,
      pageSize: 10,
    },
    autosize: {
      minRows: 1,
      maxRows: 5,
    },
    scrollIntoViewId: "",
    audioCtx: null,
    isPause: false,
    speechIcon: "/images/speech0.png",

    isSpeech: false,
    speechText: "按住 说话",
    speechOptions: {
      format: "mp3",
      duration: 60000,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const historyId = options.id;
    this.setData({
      historyId: historyId,
    });
    console.log("🚀 History ID:", historyId);

    this.initRecord();
    this.initAudio();
    this.init();
  },
  onUnload() {
    // const { recorder, audioCtx } = this.data;
    // recorder.destroy();
    // audioCtx.destroy();
  },

  async init() {
    const res = await getMessageList({ historyId: this.data.historyId });
    console.log("🚀 getMessageList:", res);
    if (res.success) {
      this.setData({
        messageList: res.list,
        pagination: res.pagination,
      });

      this.scrollToBottom();
      return;
    }
    return;
  },
  initRecord() {
    //事件监听
    recorder.onStart(() => {
      this.setData({
        speechText: "松开 发送",
      });
    });
    recorder.onPause(() => {
      console.log("暂停录音");
      this.stopRecord();
    });
    //结束获取录取文件
    recorder.onStop((res) => {
      console.log("🚀 ==> stop record");

      this.setData({
        speechText: "按住 说话",
      });
      this.recordSuccess(res);
    });
  },
  initAudio() {
    const that = this;
    const audioCtx = wx.createInnerAudioContext();

    audioCtx.onPlay(() => {
      // that.selectComponent(`#${that.data.previousSrc}`).speechIconStart();
      that.setData({
        isPause: false,
      });
    });

    audioCtx.onPause(() => {
      console.log("暂停播放", that.data.previousSrc);
      // that.selectComponent(`#${that.data.previousSrc}`).speechIconClear();

      that.setData({
        isPause: true,
      });
    });

    audioCtx.onEnded(() => {
      console.log("结束播放");
      // that.selectComponent(`#${that.data.previousSrc}`).speechIconClear();

      that.setData({
        isPause: true,
        previousSrc: "",
        speechIcon: "/images/speech0.png",
      });
    });

    this.setData({
      audioCtx,
    });
  },

  scrollToBottom() {
    this.setData({ scrollIntoViewId: "lastItem" });
  },

  changeType: function () {
    if (this.data.isSpeech) {
      this.setData({
        isSpeech: false,
      });
    } else {
      this.setData({
        isSpeech: true,
      });
    }
  },

  handleInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  async sendText() {
    const that = this;
    const { messageList, inputText } = this.data;
    messageList.push(
      ...[
        {
          content: inputText,
          isAiRes: false,
          updatedAt: new Date().toISOString(),
        },
        {
          content: "",
          isAiRes: true,
          updatedAt: new Date().toISOString(),
        },
      ]
    );
    this.setData({
      messageList: messageList,
    });

    this.scrollToBottom();

    // * AI Chat
    await that.handleSend("text");
  },
  // * 发送聊天
  async handleSend(sendType = "text") {
    const that = this;
    const { messageList, inputText, historyId } = that.data;
    console.log("🚀 handleSend", inputText, sendType);

    this.setData({
      isStop: true,
      inputText: "",
      chatOutput: "",
    });

    await sendChat(
      { content: inputText, historyId: historyId, type: sendType },
      (response) => {
        response.map((res) => {
          if (res.event === "done") {
            that.handleSendDone(res.data);
            return;
          }

          const content = res.data;
          const lastMes = messageList[messageList.length - 1];
          const output = content;
          const newMes = {
            ...lastMes,
            content: output,
            updatedAt: new Date().toISOString(),
          };
          console.log("response===", content, newMes);

          content &&
            this.setData({
              chatOutput: output,
              messageList: [...messageList.slice(0, -1), newMes],
            });

          this.scrollToBottom();
        });
      }
    );
  },

  async handleSendDone(res) {
    console.log("🚀 handleSend done ===", this.data.chatOutput, res);
    this.setData({
      isStop: false,
    });
    // setTimeout(() => {
    //   this.init();
    // }, 1000);

    // * text 2 audio
    if (this.data.chatOutput && res) {
      await getAudio({
        content: this.data.chatOutput,
        messageId: res,
      });
    }

    setTimeout(() => {
      this.init();
    }, 1000);
  },

  //* Record
  onClickStartRecord: function () {
    console.log("🚀 ==> start record", this.data.speechOptions);

    recorder.start(this.data.speechOptions);
  },
  onClickStopRecord: function () {
    recorder.stop();
  },
  recordSuccess: async function (res) {
    const that = this;
    const { messageList } = that.data;

    var { tempFilePath, duration, fileSize } = res;
    that.scrollToBottom();
    console.log("🚀 === new speech file", res);
    const response = await uploadRecord(tempFilePath, "file", {
      historyId: that.data.historyId,
      seconds: duration,
      fileSize: fileSize,
      userid: wx.getStorageSync("userInfo").id,
      username: wx.getStorageSync("userInfo").name,
    });
    const resData = JSON.parse(response).data;

    // * Add new message
    const id = `id_${Date.parse(new Date()) / 1000}`;
    messageList.push(
      ...[
        {
          id: id,
          isAiRes: false,
          seconds: duration,
          filename: resData.name,
          content: resData.content,
          updatedAt: new Date().toISOString(),
        },
        {
          content: "",
          isAiRes: true,
          updatedAt: new Date().toISOString(),
        },
      ]
    );
    that.setData({
      messageList: messageList,
      inputText: resData.content,
    });
    that.scrollToBottom();
    console.log("🚨 ==> recordSuccess", that.data);

    // * AI Chat
    await that.handleSend("audio");
  },

  //* 播放音频
  async playAudio(event) {
    const { isPause, audioCtx, previousSrc } = this.data;

    var { filename, cardId } = event.detail;
    const res = await getOSSUrl({
      filename,
    });
    const src = res.data.url;
    // console.log("🚨 === playAudio", isPause, previousSrc === filename);
    if (!previousSrc) {
      this.data.previousSrc = cardId;
      audioCtx.src = src;
      audioCtx.stop();
      audioCtx.play();
      console.log("开始播放");
    } else {
      if (isPause) {
        //在暂停状态
        if (previousSrc === cardId) {
          audioCtx.play();
          console.log("继续播放");
        } else {
          console.log("another 播放");
          audioCtx.stop();
          audioCtx.src = src;
          this.setData({
            previousSrc: cardId,
          });
          audioCtx.play();
        }
      } else {
        //不在暂停状态
        if (previousSrc === cardId) {
          audioCtx.pause();
          this.setData({
            isPause: true,
          });
        } else {
          console.log("restart 播放");
          audioCtx.stop();
          audioCtx.src = src;
          this.setData({
            previousSrc: cardId,
          });
          audioCtx.play();
        }
      }
    }
  },
});
