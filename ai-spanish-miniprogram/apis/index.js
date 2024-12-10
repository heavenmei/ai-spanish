import { get, post, streamRequest, uploadFile } from "./request";
export const test = (payload) => {
  return get("/", payload);
};

export const getUserInfo = (payload) => {
  return get("/api/user/info", payload);
};
export const login = (payload) => {
  return post("/api/user/login", payload);
};
export const logout = (payload) => {
  return get("/api/user/logout", payload);
};

export const getMessageList = (payload) => {
  return get("/api/message/getMessageList", payload);
};

export const getHistoryList = (payload) => {
  return get("/api/history/getHistory", payload);
};

export const addHistory = (payload) => {
  return post("/api/history/insertHistory", payload);
};

export const historyDelete = (payload) => {
  return post("/api/history/deleteHistory", payload);
};

export const sendChat = (payload, callback) => {
  return streamRequest("/api/chat/chat", payload, callback);
};

// 获取OSS 文件url
export const getOSSUrl = (payload) => {
  return get("/api/audio/getOssUrl", payload);
};

// 上传录音
export const uploadRecord = (fileLocalUri, keyname, data) => {
  return uploadFile("/api/audio/audio2text", fileLocalUri, keyname, data);
};

export const getAudio = (payload) => {
  return post("/api/audio/text2audio", payload);
};

// 场景
export const getScenarioList = (payload) => {
  return get("/api/scenario/getScenarios", payload);
};

// 更新学习时长
export const updateStudyDuration = (payload) => {
  return post("/api/user/updateStudyDuration", payload);
};

// 获取学习时长图
export const getStudyDuration = (payload) => {
  return get("/api/user/getStudyDuration", payload);
};
