import TextDecoder from "../utils/miniprogram-text-decoder";
import { HOST } from "../config/index";
import http from "@chunpu/http";

http.init({
  baseURL: HOST,
  wx: wx,
});

const promisify = (original) => {
  return function (opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign(
        {
          success: resolve,
          fail: reject,
        },
        opt
      );
      original(opt);
    });
  };
};

http.interceptors.response.use((response) => {
  // 种 cookie
  var { headers } = response;
  var cookies = headers["set-cookie"] || "";

  cookies = cookies.split(/, */).reduce((prev, item) => {
    item = item.split(/; */)[0];
    var obj = http.qs.parse(item);
    return Object.assign(prev, obj);
  }, {});
  if (cookies) {
    return promisify(wx.getStorage)({
      key: "cookie",
    })
      .catch(() => {})
      .then((res) => {
        res = res || {};

        var allCookies = res.data || {};
        Object.assign(allCookies, cookies);
        return promisify(wx.setStorage)({
          key: "cookie",
          data: allCookies,
        });
      })
      .then(() => {
        return response;
      });
  }
  return response;
});

http.interceptors.request.use((config) => {
  // 给请求带上 cookie
  return promisify(wx.getStorage)({
    key: "cookie",
  })
    .catch(() => {})
    .then((res) => {
      if (res && res.data) {
        Object.assign(config.headers, {
          Cookie: http.qs.stringify(res.data, ";", "="),
        });
      }
      return config;
    });
});

// const request = (url, options) => {
//   return new Promise((resolve) => {
//     options.isLoading &&
//       wx.showLoading({
//         title: "正在加载",
//       });
//     const URL = `${HOST}${url}`;
//     wx.request({
//       url: URL,
//       method: options.method,
//       data: options.data,
//       header: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       success(res) {
//         resolve(res.data);
//         options.isLoading && wx.hideLoading();
//       },
//       fail(error) {
//         options.isLoading && wx.hideLoading();
//         wx.showToast({
//           icon: "none",
//           title: `请求失败 ${error}`,
//           duration: 1400,
//         });
//       },
//     });
//   });
// };

function formatGetParams(params) {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
}
const get = (url, options, isLoading = true) => {
  isLoading &&
    wx.showLoading({
      title: "正在加载",
    });

  let URL = url;
  if (options) {
    const params = options && formatGetParams(options);
    URL = `${url}?${params}`;
  }

  return http
    .get(URL, {
      data: options,
    })
    .then(({ data }) => {
      isLoading && wx.hideLoading();
      return data.success ? data : Promise.reject(data.message);
    })
    .catch((error) => {
      isLoading && wx.hideLoading();
      wx.showToast({
        icon: "none",
        title: `${error ?? "请求失败"}`,
        duration: 1400,
      });
    });
};

const post = (url, options = {}, isLoading = true) => {
  return http
    .post(url, options)
    .then(({ data }) => {
      isLoading && wx.hideLoading();
      return data.success ? data : Promise.reject(data.message);
    })
    .catch((error) => {
      isLoading && wx.hideLoading();
      wx.showToast({
        icon: "none",
        title: `${error}`,
        duration: 1400,
      });
    });
};

const convertStringToArr = (str) => {
  var arr = str
    .trim()
    .split("\n\n")
    .map((item) => {
      const data = item.split("data: ")[1];
      return data && data != "" ? JSON.parse(data) : undefined;
    })
    .filter((item) => Boolean(item));
  return arr;
};

const streamRequest = (url, params = {}, callback) => {
  const URL = `${HOST}${url}`;
  const requestTask = wx.request({
    url: URL,
    method: "POST",
    responseType: "arraybuffer",
    enableChunked: true, //关键！开启流式传输模式
    header: {
      "content-type": "application/json",
    },
    data: params,
    success: (res) => {
      console.log("request success", res);
      requestTask.abort();
    },
    fail: (err) => {
      console.log("request fail", err);
    },
  });

  requestTask.onHeadersReceived(function (res) {
    console.log("onHeadersReceived===", res.header);
  });
  requestTask.onChunkReceived((response) => {
    const arrayBuffer = new Uint8Array(response.data);
    const text = new TextDecoder().decode(arrayBuffer);
    const textArr = convertStringToArr(text);
    // console.log("text", text);
    // console.log("textArr", textArr);
    callback && callback(textArr);
  });
  return requestTask;
};

/**
 *
 * @param {*} fileLocalUri 要上传文件资源的路径
 * @param {*} keyname 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
 * @param {*} remotePath 开发者服务器地址
 * @param {*} data 想要传输的其它form参数，json格式
 */
export function uploadFile(url, fileLocalUri, keyname, data) {
  const URL = `${HOST}${url}`;

  var excutor = (resolve, reject) => {
    wx.uploadFile({
      filePath: fileLocalUri,
      name: keyname,
      url: URL,
      header: {
        "Content-Type": "multipart/form-data",
        token: wx.getStorageSync("token"),
      },
      method: "post",
      formData: {
        ...data,
      },
      success(res) {
        resolve(res.data);
      },
      catch(err) {
        reject(err);
      },
    });
  };
  return new Promise(excutor);
}

module.exports = {
  get,
  post,
  streamRequest,
  uploadFile,
  promisify,
};
