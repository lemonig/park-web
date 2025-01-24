// 存储首页数据
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  form: {
    alarmStatus: [undefined],
    alarmLevel: [undefined],
    type: [undefined],
  },
  position: 0,
  mode: 'list'
};

export const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    SET_FORM: (state, { payload }) => {
      return (state = {
        ...state,
        form: payload,
      });
    },
    SET_MODE: (state, { payload }) => {
      return (state = {
        ...state,
        mode: payload,
      });
    },
  },
});


const { actions, reducer } = memorySlice;

export const { SET_FORM, SET_MODE } = memorySlice.actions;
export default reducer;
