/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:05
 * @LastEditors: Jonny
 * @LastEditTime: 2024-09-04 17:24:29
 * @FilePath: \alarm-h5\src\router\config.jsx
 */
import * as React from "react";
const Login = React.lazy(() => import("@Pages/login"));
const BodyLayout = React.lazy(() => import("../containers/layout-body"));
const Home = React.lazy(() => import("@Pages/home"));
const Alarm = React.lazy(() => import("@Pages/alarm-detail"));
const Staff = React.lazy(() => import("@Pages/staff"));
const OverForm = React.lazy(() => import("@Pages/overForm"));

const pages = require.context("@Pages/", true, /\.jsx?$/);

const filterFiles = (key) => {
  return !key.includes("components") && /index.jsx?$/.test(key);
};

// 懒加载组件的函数
const loadComponent = (context, key) => {
  return React.lazy(() => context(key));
};

const routes = pages
  .keys()
  .map((key) => {
    if (filterFiles(key)) {
      const Component = loadComponent(pages, key);
      return {
        path: key.replace("./", "/").replace(/\/index.jsx?$/, ""),
        element: Component,
      };
    }
  })
  .filter(Boolean);

// 状态
const NotFound = React.lazy(() => import("@Pages/404"));
/**
 * index: true 默认主路由不需要path
 * **/
const config = [
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Login />,
      </React.Suspense>
    ),
  },

  {
    path: "/",
    element: (
      <React.Suspense fallback={<>...</>}>
        <BodyLayout />
      </React.Suspense>
    ),
    children: [
      {
        element: (
          <React.Suspense fallback={<>...</>}>
            <Home />,
          </React.Suspense>
        ),
        index: true,
      },
      {
        path: "alarm/:id",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Alarm />,
          </React.Suspense>
        ),
      },
      {
        path: "staff",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Staff />,
          </React.Suspense>
        ),
      },
      {
        path: "form",
        element: (
          <React.Suspense fallback={<>...</>}>
            <OverForm />,
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default config;
