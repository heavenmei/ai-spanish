// import { get, post } from "./request";
import { get, post } from "../../../apis/request";

// 更换词书
export const changeWordBook = (payload) => {
  return post("/api/word/changeWordBook", payload);
};

export const getAllWBData = (payload) => {
  return get("/api/word/getAllWBData", payload);
};

// export const getDailySentence = (payload) => {
//   return get("/api/word/getDailySentence", payload);
// };

export const getSearchResult = (payload) => {
  return get("/api/word/getSearchResult", payload);
};

export const getWordDetail = (payload) => {
  return get("/api/word/getWordDetail", payload);
};

export const getBasicLearningData = (payload) => {
  return get("/api/word/getBasicLearningData", payload);
};

export const getLearningData = (payload) => {
  return get("/api/word/getLearningData", payload);
};

export const getReviewData = (payload) => {
  return get("/api/word/getReviewData", payload);
};

export const toggleAddToNB = (payload) => {
  return post("/api/word/toggleAddToNB", payload);
};

export const addLearningRecord = (payload) => {
  return post("/api/word/addLearningRecord", payload);
};

export const updateLearningRecord = (payload) => {
  return post("/api/word/updateLearningRecord", payload);
};

export const getWBLearnData = (payload) => {
  return get("/api/word/getWBLearnData", payload);
};

export const getSingleWBData = (payload) => {
  return get("/api/word/getSingleWBData", payload);
};

export const getAllLearnData = (payload) => {
  return get("/api/word/getAllLearnData", payload);
};

export const getDailySum = (payload) => {
  return get("/api/word/getDailySum", payload);
};

export const getTodayLearnData = (payload) => {
  return get("/api/word/getTodayLearnData", payload);
};

export const getNoteBookWord = (payload) => {
  return get("/api/word/getNoteBookWord", payload);
};

export const getBookRecordWord = (payload) => {
  return get("/api/word/getBookRecordWord", payload);
};

export const getUserRecordWord = (payload) => {
  return get("/api/word/getUserRecordWord", payload);
};

const WordApi = {
  getAllWBData: getAllWBData,
  // getDailySentence: getDailySentence,
  // getSearchResult: getSearchResult,
  getWordDetail: getWordDetail,
  getBasicLearningData: getBasicLearningData,
  getLearningData: getLearningData,
  getReviewData: getReviewData,
  toggleAddToNB: toggleAddToNB,
  addLearningRecord: addLearningRecord,
  updateLearningRecord: updateLearningRecord,
  getWBLearnData: getWBLearnData,
  getSingleWBData: getSingleWBData,
  getAllLearnData: getAllLearnData,
  getTodayLearnData: getTodayLearnData,
  getNoteBookWord: getNoteBookWord,
  getBookRecordWord: getBookRecordWord,
  getUserRecordWord: getUserRecordWord,
  getDailySum: getDailySum,
};

export default WordApi;
