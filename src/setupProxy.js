/*
 * @Author: Jonny
 * @Date: 2022-06-27 10:44:49
 * @LastEditors: Jonny
 * @LastEditTime: 2025-04-03 10:08:20
 * @FilePath: \park-h5\src\setupProxy.js
 */
const { createProxyMiddleware } = require("http-proxy-middleware");


module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://43.136.76.214:8080/api", // 只需设置目标服务器的基础地址
      // target: "http://192.168.188.6:3429/api", // 只需设置目标服务器的基础地址
      changeOrigin: true,
      // logger: console,
      // on: {
      //   error: (err, req, res) => {
      //     console.error(`Proxy error: ${err.message} ${req.originalUrl}`);

      //   },   
      //   proxyReq: (proxyReq, req, res) => {
      //     console.log(`Proxying request: ${req.method} ${req.originalUrl}`);

      //   },
      //   proxyRes: (proxyRes, req, res) => {
      //     console.log(`Received response from target: ${proxyRes.statusCode} ${req.originalUrl}`);

      //   },
      //   proxyReqWs: () => { },
      //   open: () => { },
      //   close: () => { },
      // },

    })
  );
};