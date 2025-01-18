import { promisify } from "../../apis/request";
import { login } from "../../apis/index";
import { startDuration } from "../../common/recordStudyDuration";

const error_message = [
  "",
  "请完成填写再重试",
  "账号或密码错误",
  "该账号已被注册",
  "两次输入密码不同",
  "用户名仅能包含数字、中英文和下划线",
  "用户名不能以下划线开头或结尾",
  "密码仅能包含数字、英文字母和下划线",
  "密码不能以下划线开头或结尾",
];
const app = getApp();

Page({
  data: {
    isregister: false,
    errmsg: error_message,
    errtype: 0,
  },
  user: {
    username: "",
    pwd: "",
    confirm_pwd: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  changeType() {
    this.setData({
      isregister: !this.data.isregister,
      errtype: 0,
    });
    this.user = {
      username: "",
      pwd: "",
      confirm_pwd: "",
    };
  },

  handleInput(e) {
    const inputtype = e.target.dataset.inputtype;
    const value = e.detail.value;
    this.user[inputtype] = value;
  },

  checkUsernameVaild(register = true) {
    // 用户名合法性判断，只能包含字母、数字、中文、下划线且不能以下划线开头或结尾
    const username = this.user.username;
    const exp1 = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
    const exp2 = /^(?!_)(?!.*?_$).+$/;
    if (!exp1.test(username)) {
      this.setErrType(register ? 5 : 2);
      return false;
    }
    if (!exp2.test(username)) {
      this.setErrType(register ? 6 : 2);
      return false;
    }
    return true;
  },
  checkPwd(register = true) {
    // 密码合法性判断，只能包含字母、数字、下划线且不能以下划线开头或结尾
    const pwd = this.user.pwd;
    const exp1 = /^[a-zA-Z0-9_]+$/;
    const exp2 = /^(?!_)(?!.*?_$).+$/;
    if (!exp1.test(pwd)) {
      this.setErrType(register ? 7 : 2);
      return false;
    }
    if (!exp2.test(pwd)) {
      this.setErrType(register ? 8 : 2);
      return false;
    }
    return true;
  },
  checkTwoPwd() {
    const pwd = this.user.pwd;
    const confirm_pwd = this.user.confirm_pwd;
    if (pwd != confirm_pwd) {
      this.setErrType(4);
      return false;
    }
    return true;
  },
  checkEmptyField() {
    if (this.user.username != "" && this.user.pwd != "") {
      if (this.data.isregister) {
        if (this.user.confirm_pwd != "") {
          return true;
        }
      } else {
        return true;
      }
    }
    this.setErrType(1);
    return false;
  },
  setErrType(errtype) {
    const _this = this;
    this.setData({ errtype });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      _this.setData({ errtype: 0 });
    }, 1500);
  },

  async login(e) {
    const type = e.target.dataset.type;

    if (
      !this.checkEmptyField() ||
      !this.checkUsernameVaild(false) ||
      !this.checkPwd(false)
    ) {
      return;
    }

    if (type === "register" && !this.checkTwoPwd()) return;

    const { username, pwd } = this.user;
    const res = await login({ type: type, username, pwd });
    this.afterLogin(res);
  },

  async wxLogin() {
    const userProfile = await promisify(wx.getUserProfile)({
      desc: "用于完善会员资料",
    });
    const { code } = await promisify(wx.login)();

    console.log("wxLogin", userProfile);

    const res = await login({
      code,
      ...userProfile.userInfo,
    });

    this.afterLogin(res);
  },

  afterLogin(res) {
    if (!res.success) {
      return;
    }
    const data = res.data;

    wx.setStorageSync("userInfo", data);
    app.globalData.userInfo = data;

    const userId = data.id;
    startDuration(app, userId);

    console.log("login success", data);

    wx.navigateBack({
      delta: 1,
      complete: (res) => {
        console.log("navigate back complete", res);
      },
    });
  },
});
