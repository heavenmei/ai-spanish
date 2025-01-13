export function getEnv() {
  // develop trial release
  const {
    miniProgram: { envVersion },
  } = wx.getAccountInfoSync();
  return envVersion;
}

// const dev = "http://127.0.0.1:8000";
const dev = "http://192.168.1.103:8000";

const pro = "https://ai-spanish.cn";

export const HOST = getEnv() === "develop" ? dev : pro;
// export const HOST = pro;

export const WORD_VOICE_URL = `${HOST}/public/`;

export const config = {
  /** 是否使用mock代替api返回 */
  useMock: true,
};
