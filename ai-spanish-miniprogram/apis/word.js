import { get, post, streamRequest, uploadFile } from "./request";

export const getAllWBData = (payload) => {
  return get("/api/book/getAllWBData", payload);
};

const WordApi = {
  getAllWBData: getAllWBData,
  // getDailySentence: getDailySentence,
  // getSearchResult: getSearchResult,
  // getWordDetail: getWordDetail,
  // getBasicLearningData: getBasicLearningData,
  // getLearningData: getLearningData,
  // getReviewData: getReviewData,
  // toggleAddToNB: toggleAddToNB,
  // addLearningRecord: addLearningRecord,
  // updateLearningRecord: updateLearningRecord,
  // getWBLearnData: getWBLearnData,
  // getSingleWBData: getSingleWBData,
  // getAllLearnData: getAllLearnData,
  // getDailySum: getDailySum,
  // getTodayLearnData: getTodayLearnData,
  // getNoteBookWord: getNoteBookWord,
  // getBkLearnedWord: getBkLearnedWord,
  // getBkMasteredWord: getBkMasteredWord,
  // getBkUnlearnedWord: getBkUnlearnedWord,
  // getBkWord: getBkWord,
  // getLearnedWord: getLearnedWord,
  // getMasteredWord: getMasteredWord,
  // getReviewWord: getReviewWord,
  // getTodayLearnWord: getTodayLearnWord,
  // getTodayReviewWord: getTodayReviewWord,
};

export default WordApi;
