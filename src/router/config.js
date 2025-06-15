/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:05
 * @LastEditors: Jonny
 * @LastEditTime: 2024-09-02 15:25:04
 * @FilePath: \alarm-h5\src\router\config.js
 */
import * as React from "react";



const Login = React.lazy(() => import("@Pages/login"));
const BodyLayout = React.lazy(() => import("../containers/layout-body"));
const Home = React.lazy(() => import("@Pages/home"));
const ParkDetail = React.lazy(() => import("@Pages/park-detail"));
const Staff = React.lazy(() => import("@Pages/staff"));
const OverForm = React.lazy(() => import("@Pages/overForm"));
const RentForm = React.lazy(() => import("@Pages/rentForm"));
const SaleForm = React.lazy(() => import("@Pages/saleForm"));
// 状态
const Nopage = React.lazy(() => import("@Pages/404"));
const NetErr = React.lazy(() => import("@Pages/504"));
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
    path: "/404",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Nopage />,
      </React.Suspense>
    ),
  },
  {
    path: "/504",
    element: (
      <React.Suspense fallback={<>...</>}>
        <NetErr />,
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
        path: "park/:id",
        element: (
          <React.Suspense fallback={<>...</>}>
            <ParkDetail />,
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
        path: "rentForm",
        element: (
          <React.Suspense fallback={<>...</>}>
            <RentForm />,
          </React.Suspense>
        ),
      },

      {
        path: "saleForm",
        element: (
          <React.Suspense fallback={<>...</>}>
            <SaleForm />,
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
