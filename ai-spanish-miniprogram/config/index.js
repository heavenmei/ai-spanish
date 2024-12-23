export function getEnv() {
  // develop trial release
  const {
    miniProgram: { envVersion },
  } = wx.getAccountInfoSync();
  return envVersion;
}

const dev = "http://192.168.1.111:8000";
// const dev = "http://127.0.0.1:8000";
// const HOST = "http://116.62.78.22:9000/";
// const pro = "http://118.31.74.178:8000";
const pro = "https://ai-spanish.cn";

export const HOST = getEnv() === "develop" ? dev : pro;
// export const HOST = pro;

export const config = {
  /** 是否使用mock代替api返回 */
  useMock: true,
};

export const MOCK_SCENE = [
  {
    id: 1,
    name: "场景1",
    desc: "场景1描述",
    thumb: "https://s2.loli.net/2024/09/21/xCGHfZsIKmPn4LQ.png",
  },
  {
    id: 2,
    name: "场景2",
    desc: "场景2描述",
    thumb: "https://s2.loli.net/2024/09/21/odOqEjZTr4hy7vC.png",
  },
  {
    id: 3,
    name: "场景2",
    desc: "场景2描述",
    thumb: "https://s2.loli.net/2024/09/21/odOqEjZTr4hy7vC.png",
  },
];
