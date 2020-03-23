/**
 * 使用 Promise 封装 Ajax
 *
 * @param {String} url 请求地址
 * @param {String} method 请求方法 默认 get
 * @param {Object} params 请求参数 默认 {}
 * @param {Boolean} async 是否异步 默认 true
 */

const ajax = (url, method = "get", params = {}, async = true) =>
  new Promise((resolve, reject) => {
    const getParamString = params => {
      let dataString = "";
      for (const key in params) {
        dataString += `${key}=${params[key]}&`;
      }
      return dataString;
    };
    const paramString = getParamString(params);
    if (["get", "GET"].includes(method) && paramString) {
      url.indexOf("?") > -1 ? (url += paramString) : (url += `?${paramString}`);
    }
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open(method, url, async);
    xhr.onload = function() {
      const result = {
        status: this.status,
        statusText: this.statusText,
        headers: this.getAllResponseHeaders(),
        data: this.response || this.responseText
      };
      if ((this.status >= 200 && this.status < 300) || this.status === 304) {
        resolve(result);
      } else {
        reject(result);
      }
    };
    xhr.setRequestHeader(
      "Content-type",
      params.contentType || "application/x-www-form-urlencoded"
    );
    xhr.responseType = params.responseType || "json";
    xhr.withCredentials = params.withCredentials || true;
    xhr.onerror = function() {
      reject(new TypeError("Request error"));
    };
    xhr.timeout = function() {
      reject(new TypeError("Request timeout"));
    };
    xhr.onabort = function() {
      reject(new TypeError("Request terminated"));
    };
    if (["post", "POST"].includes(method)) {
      xhr.send(paramString);
    } else {
      xhr.send();
    }
  });
