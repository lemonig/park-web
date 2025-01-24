/*
 * @Author: Jonny
 * @Date: 2024-08-28 14:26:53
 * @LastEditors: Jonny
 * @LastEditTime: 2024-09-03 10:08:06
 * @FilePath: \alarm-h5\src\store\features\tokenSlice.js
 */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("token") ?? "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialState.token,
  reducers: {
    SET_TOKEN: (state, { payload }) => {
      return (state = {
        ...state,
        token: payload,
      });
    },
  },
});

const { actions, reducer } = tokenSlice;

export const { SET_TOKEN } = tokenSlice.actions;
export default reducer;
