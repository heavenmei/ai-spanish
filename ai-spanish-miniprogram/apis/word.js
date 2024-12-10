import { get, post, uploadFile } from "./request";

export const getAllWBData = (payload) => {
  return get("/api/book/getAllWBData", payload);
};

export const getDailySentence = (payload) => {
  return get("/api/book/getDailySentence", payload);
};

export const getSearchResult = (payload) => {
  return get("/api/book/getSearchResult", payload);
};

export const getWordDetail = (payload) => {
  return get("/api/book/getWordDetail", payload);
};

export const getBasicLearningData = (payload) => {
  return get("/api/book/getBasicLearningData", payload);
};

export const getLearningData = (payload) => {
  return get("/api/book/getLearningData", payload);
};

export const getReviewData = (payload) => {
  return get("/api/book/getReviewData", payload);
};

export const toggleAddToNB = (payload) => {
  return post("/api/book/toggleAddToNB", payload);
};

export const addLearningRecord = (payload) => {
  return post("/api/book/addLearningRecord", payload);
};

export const updateLearningRecord = (payload) => {
  return post("/api/book/updateLearningRecord", payload);
};

export const getWBLearnData = (payload) => {
  return get("/api/book/getWBLearnData", payload);
};

export const getSingleWBData = (payload) => {
  return get("/api/book/getSingleWBData", payload);
};

export const getAllLearnData = (payload) => {
  return get("/api/book/getAllLearnData", payload);
};

export const getDailySum = (payload) => {
  return get("/api/book/getDailySum", payload);
};

export const getTodayLearnData = (payload) => {
  return get("/api/book/getTodayLearnData", payload);
};

export const getNoteBookWord = (payload) => {
  return get("/api/book/getNoteBookWord", payload);
};

export const getBkLearnedWord = (payload) => {
  return get("/api/book/getBkLearnedWord", payload);
};

export const getBkMasteredWord = (payload) => {
  return get("/api/book/getBkMasteredWord", payload);
};

export const getBkUnlearnedWord = (payload) => {
  return get("/api/book/getBkUnlearnedWord", payload);
};

export const getBkWord = (payload) => {
  return get("/api/book/getBkWord", payload);
};

export const getLearnedWord = (payload) => {
  return get("/api/book/getLearnedWord", payload);
};

export const getMasteredWord = (payload) => {
  return get("/api/book/getMasteredWord", payload);
};

export const getReviewWord = (payload) => {
  return get("/api/book/getReviewWord", payload);
};

export const getTodayLearnWord = (payload) => {
  return get("/api/book/getTodayLearnWord", payload);
};

export const getTodayReviewWord = (payload) => {
  return get("/api/book/getTodayReviewWord", payload);
};

const WordApi = {
  getAllWBData: getAllWBData,
  getDailySentence: getDailySentence,
  getSearchResult: getSearchResult,
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
  getDailySum: getDailySum,
  getTodayLearnData: getTodayLearnData,
  getNoteBookWord: getNoteBookWord,
  getBkLearnedWord: getBkLearnedWord,
  getBkMasteredWord: getBkMasteredWord,
  getBkUnlearnedWord: getBkUnlearnedWord,
  getBkWord: getBkWord,
  getLearnedWord: getLearnedWord,
  getMasteredWord: getMasteredWord,
  getReviewWord: getReviewWord,
  getTodayLearnWord: getTodayLearnWord,
  getTodayReviewWord: getTodayReviewWord,
};

export default WordApi;
