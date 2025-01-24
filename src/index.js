/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:04
 * @LastEditors: Jonny
 * @LastEditTime: 2024-09-12 16:14:27
 * @FilePath: \alarm-h5\src\index.js
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import { Provider } from "react-redux";
import { store } from "./store/index";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
