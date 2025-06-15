import axios from "axios";
import { Button, Space, Toast } from "antd-mobile";

axios.defaults.timeout = 10000;
axios.interceptors.request.use(
  (config) => {
    config.headers = {
      // "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    };
    if (localStorage.getItem("token") || !!localStorage.getItem("token")) {
      config.headers["token"] = localStorage.getItem("token");
      // config.headers["token"] = "a0347583ef5e14675b59739b0c6a8f78d";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.data && response.status === 200) {
      if (response.data.error == "UNAUTHENTICATED" || response.data.code == 401) {
        // window.history.pushState('', null, '/login')
        window.location.href = window.location.origin + "/login";
      } else if (response.data.code === 403) {
      }
      // else if (response.data.code !== 200) {
      //   return Promise.reject(response);
      // }
      return Promise.resolve(response);
    } else {
      if (response.status) {
        handStatus(response.status)
      }
      Toast.show('error code:' + response.data.code + '   ' + response.data.message)
      return Promise.reject(response);
    }
  },

  (error) => {
    console.log(error);
    
    if (error.response?.status) {
      handStatus(error.response?.status)
      return Promise.reject(error.response);
    }
  }
);

const handStatus = (status) => {
  switch (status) {
    case 401:
      break;
    case 403:
      Toast.show("403");
      localStorage.removeItem("token");
      setTimeout(() => { }, 1000);
      break;
    case 404:
      Toast.show("404");
      window.location.href = window.location.origin + "/404";
      // message.error("404");
      break;
    case 504:
      Toast.show("504");
      // message.error("504");
      break;
    // 其他错误，直接抛出错误提示
    default:
      Toast.show('error:' + status);
    // message.error(error.response.statusText);
  }
}

/**
 * get
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 * @private
 */
export const _get = ({ url, params }) => {
  return new Promise((rlv, rej) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        rlv(res);
      })
      .catch((err) => {
        Toast.show(err.message)
        rej(err);
      });
  });
};


/**
 * post
 * @param url
 * @param data
 * @returns {Promise<unknown>}
 * @private
 */
export const _post = ({ url, data }) => {
  return new Promise((rlv, rej) => {
    axios
      .post(url, data, {})
      .then((res) => {
        rlv(res.data);
      })
      .catch((err) => {
        if (err.data) {
          Toast.show('error code:' + err.data.code + '   ' + err.data.message)
          rej(err.data)

        } else {
          Toast.show('error code:' + err.code + '   ' + err.message)
          rej(err)
        }
      });
  });
};

export const _download = ({ url, data, title }) => {
  let nowDate = new Date();
  let day = nowDate.getDate();
  let month = nowDate.getMonth() + 1;
  let year = nowDate.getFullYear();
  return axios({
    method: "post",
    url: url,
    data: data,
    responseType: "blob",
  }).then((res) => {
    let result = res.data;
    var blob = new Blob([result], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    var objectUrl = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");
    a.setAttribute("href", objectUrl);
    a.setAttribute("download", `${title}-${year}-${month}-${day}.xls`);
    a.click();
    URL.revokeObjectURL(objectUrl);
  });
};
export const _downloadPdf = ({ url, data, title }) => {
  let nowDate = new Date();
  let day = nowDate.getDate();
  let month = nowDate.getMonth() + 1;
  let year = nowDate.getFullYear();
  return axios({
    method: "post",
    url: url,
    data: data,
    responseType: "blob",
  }).then((res) => {
    let result = res.data;
    var blob = new Blob([result], {
      type: "application/pdf",
    });
    var objectUrl = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");
    a.setAttribute("href", objectUrl);
    a.setAttribute("download", `${title}-${year}-${month}-${day}.pdf`);
    a.click();
    URL.revokeObjectURL(objectUrl);
  });
};