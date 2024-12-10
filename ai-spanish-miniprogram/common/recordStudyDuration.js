import { updateStudyDuration } from "../apis/index";
const DELAY = 60000;
const showToast = [1, 2, 3, 10, 20, 60];

// 开始计时学习时长
export const startDuration = (app, userId, callback) => {
  if (!userId) return;

  if (app.globalData.onlineInterval) {
    clearInterval(app.globalData.onlineInterval);
  }

  // 记录初始时间
  app.globalData.onlineStartTime = Date.parse(new Date());

  const onlineInterval = setInterval(async () => {
    const onlineTime =
      (Date.parse(new Date()) - app.globalData.onlineStartTime) / 1000;

    const { data } = await updateStudyDuration({
      id: app.globalData.onlineId,
      userId: userId,
      duration: onlineTime,
    });
    callback && callback();

    app.globalData = {
      ...app.globalData,
      onlineTime: onlineTime,
      onlineId: data.id,
    };

    // 学习提醒
    for (const time of showToast.reverse()) {
      if (onlineTime === 60 * time) {
        wx.showToast({
          title: `您已学习${time}分钟`,
          duration: 2000,
        });
        break;
      }
    }

    // console.log(app.globalData.onlineId, onlineTime);
  }, DELAY);

  app.globalData.onlineInterval = onlineInterval;
};

// 退出程序/退出登录 刷新计时
export const updateDuration = async (app, userId) => {
  if (!userId) return;

  app.globalData.onlineTime =
    (Date.parse(new Date()) - app.globalData.onlineStartTime) / 1000;
  await updateStudyDuration({
    id: app.globalData.onlineId,
    userId: userId,
    duration: app.globalData.onlineTime,
  });
};
