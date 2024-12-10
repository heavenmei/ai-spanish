import { promisify } from "../apis/request";
import { login, logout } from "../apis/index";
import { startDuration, updateDuration } from "./recordStudyDuration";

export const loginProfile = async (app) => {
  const res = await promisify(wx.getUserProfile)({
    desc: "用于完善会员资料",
  });
  const { code } = await promisify(wx.login)();

  console.log("loginProfile", res);

  const { data } = await login({
    code,
    ...res.userInfo,
  });

  wx.setStorageSync("userInfo", { id: data.id, ...res.userInfo });

  const userId = data.id;
  startDuration(app, userId);
  return { id: data.id, ...res.userInfo };
};

export const logoutProfile = async (app) => {
  const res = await logout();
  if (res.success) {
    wx.showToast({
      title: "退出成功",
      icon: "success",
    });

    const userId = wx.getStorageSync("userInfo").id;
    wx.removeStorageSync("userInfo");
    app && updateDuration(app, userId);
  } else {
    wx.showToast({
      title: "退出失败",
      icon: "error",
    });
  }
};
