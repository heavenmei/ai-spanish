import Toast from "tdesign-miniprogram/toast";
import { updateUser, logout } from "../../../apis/index";
import { updateDuration } from "../../../common/recordStudyDuration";
import { phoneEncryption } from "../../../utils/util";

const app = getApp();

const cellList = [
  {
    type: "name",
    title: "昵称",
    value: "nickName",
  },
  {
    type: "gender",
    title: "性别",
    value: "gender",
  },
  {
    type: "phoneNumber",
    title: "手机号",
    value: "phoneNumber",
  },
];

Page({
  data: {
    defaultAvatarUrl:
      "https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png",
    cellList: cellList,
    userInfo: {
      avatarUrl: "",
      nickName: "",
      phoneNumber: "去绑定手机号",
    },
    hasUserInfo: false,
    showUnbindConfirm: false,
    pickerOptions: [
      {
        name: "男",
        code: 1,
      },
      {
        name: "女",
        code: 2,
      },
    ],
    typeVisible: false,
    genderMap: ["", "男", "女"],

    showWithInput: false,
  },
  onLoad() {
    // const userinfo = wx.getStorageSync("userInfo");
    // if (userinfo.id) {
    //   this.setData({
    //     userInfo: {
    //       ...userinfo,
    //       phoneNumber: userinfo.phoneNumber
    //         ? phoneEncryption(userinfo.phoneNumber)
    //         : "去绑定手机号",
    //     },
    //     hasUserInfo: true,
    //   });
    // }
  },
  onShow() {
    const userinfo = wx.getStorageSync("userInfo");
    if (userinfo.id) {
      this.setData({
        userInfo: {
          ...userinfo,
          phoneNumber: userinfo.phoneNumber
            ? phoneEncryption(userinfo.phoneNumber)
            : "去绑定手机号",
        },
        hasUserInfo: true,
      });
    }
  },
  async onUnload() {
    const { nickName } = this.data.userInfo;
    await updateUser(this.data.userInfo);
    app.globalData.userInfo.nickName = nickName;
    wx.setStorageSync("userInfo", app.globalData.userInfo);
    console.log(app.globalData.userInfo);
  },

  onClickCell({ currentTarget }) {
    const { dataset } = currentTarget;

    switch (dataset.type) {
      case "gender":
        this.setData({
          typeVisible: true,
        });
        break;
      case "name":
        this.setData({
          showWithInput: true,
        });
        break;
      case "avatarUrl":
        // this.toModifyAvatar();
        break;
      default: {
        break;
      }
    }
  },
  onClose() {
    this.setData({
      typeVisible: false,
      showWithInput: false,
    });
  },
  onConfirm(e) {
    const { value } = e.detail;
    console.log(e.detail);

    this.setData(
      {
        typeVisible: false,
        "userInfo.gender": value,
      },
      () => {
        // Toast({
        //   context: this,
        //   selector: "#t-toast",
        //   message: "设置成功",
        //   theme: "success",
        // });
      }
    );
  },

  onInput(e) {
    const nickName = e.detail.value;
    this.setData({
      "userInfo.nickName": nickName,
    });
  },

  async onConfirmDialog() {
    this.setData({
      typeVisible: false,
      showWithInput: false,
    });

    const { nickName } = this.data.userInfo;
    await updateUser({
      nickName: nickName,
    });
    app.globalData.userInfo.nickName = nickName;
    wx.setStorageSync("userInfo", app.globalData.userInfo);
    console.log(app.globalData.userInfo);
  },
  async toModifyAvatar() {
    try {
      const tempFilePath = await new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success: (res) => {
            const { path, size } = res.tempFiles[0];
            if (size <= 10485760) {
              resolve(path);
            } else {
              reject({ errMsg: "图片大小超出限制，请重新上传" });
            }
          },
          fail: (err) => reject(err),
        });
      });
      const tempUrlArr = tempFilePath.split("/");
      const tempFileName = tempUrlArr[tempUrlArr.length - 1];
      Toast({
        context: this,
        selector: "#t-toast",
        message: `已选择图片-${tempFileName}`,
        theme: "success",
      });
    } catch (error) {
      if (error.errMsg === "chooseImage:fail cancel") return;
      Toast({
        context: this,
        selector: "#t-toast",
        message: error.errMsg || error.msg || "修改头像出错了",
        theme: "error",
      });
    }
  },

  async logout() {
    const res = await logout();
    if (res.success) {
      wx.showToast({
        title: "退出成功",
        icon: "success",
      });

      const userId = wx.getStorageSync("userInfo").id;
      wx.removeStorageSync("userInfo");
      app && updateDuration(app, userId);

      this.setData({
        userInfo: {},
        hasUserInfo: false,
      });
      wx.navigateTo({
        url: `/pages/login/login`,
      });
    } else {
      wx.showToast({
        title: "退出失败",
        icon: "error",
      });
    }
  },
});
