/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:05
 * @LastEditors: Jonny
 * @LastEditTime: 2025-07-04 15:37:35
 * @FilePath: \park-h5\src\store\index.js
 */
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import tokenSlice from "./features/tokenSlice";
import memorySlice from './features/memorySlice';
import logger from 'redux-logger';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    user: userSlice,
    memory: memorySlice

  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(middleware),
  // // enhancers: (getDefaultEnhancers) =>
  // //   getDefaultEnhancers().concat(monitorReducersEnhancer),
  devTools: process.env.NODE_ENV !== 'production',
});
