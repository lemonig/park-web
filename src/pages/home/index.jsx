/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:05
 * @LastEditors: Jonny
 * @LastEditTime: 2024-09-12 17:20:08
 * @FilePath: \alarm-h5\src\pages\home\index.jsx
 */
/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:05
 * @LastEditors: Jonny
 * @LastEditTime: 2024-09-12 17:07:36
 * @FilePath: \alarm-h5\src\pages\home\index.jsx
 */
/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:05
 * @LastEditors: Jonny
 * @LastEditTime: 2024-08-30 09:13:36
 * @FilePath: \alarm-h5\src\pages\home\index.jsx
 */

import React, { useEffect, useRef, useState } from "react";
import {
  Swiper,
  Divider,
  Grid,
  Modal,
  Form,
  Tabs,
  NavBar,
  List as AList,
  Image,
  CheckList,
  Dropdown,
} from "antd-mobile";
import { TABS as tabItems, levelList, statusList, typeList } from "./constant";
import { SwiperRef } from "antd-mobile/es/components/swiper";
import GetPullToRefreshlData from "./components/GetPullToRefreshlData";
import { SET_FORM, SET_MODE } from "@Store/features/memorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UnorderedListOutline,
  AppstoreOutline,
  UserOutline,
} from "antd-mobile-icons";
import { IconFont } from "@Components";
import "./index.less";

import sale_btn from "@Assets/img/sale_btn.svg";

function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { form: formmemo, mode } = useSelector((state) => state.memory);
  const childRef = useRef(null);

  useEffect(() => {
    childRef.current.sortData();
  }, []);

  const sortChange1 = (val) => {
    if (!val.length) return;
    dispatch(
      SET_FORM({
        ...formmemo,
        type: val,
      })
    );
    setTimeout(() => {
      childRef.current.sortData();
    });
  };

  const sortChange2 = (val) => {
    if (!val.length) return;

    dispatch(
      SET_FORM({
        ...formmemo,
        alarmStatus: val,
      })
    );
    setTimeout(() => {
      childRef.current.sortData();
    });
  };

  const sortChange3 = (val) => {
    if (!val.length) return;

    dispatch(
      SET_FORM({
        ...formmemo,
        alarmLevel: val,
      })
    );
    setTimeout(() => {
      childRef.current.sortData();
    });
  };
  const back = () => {
    Modal.confirm({
      title: "提示",
      content: "确认更换当前登录",
      cancelText: "取消",
      confirmText: "确认",
      onConfirm: () => {
        localStorage.clear();
        navigate("/login");
      },
      onCancel: () => {
        // console.log("Confirmed");
      },
    });
  };
  const gotoSale = () => {
    navigate("/rentForm");

  };



  return (
    <div className="home-wrap">
      {/* <NavBar back="" backIcon={<IconFont iconName="tuichu" />} onBack={back}>
        首页
      </NavBar> */}
      <div className="top-main">

        <div className="top-main-item">
          <img src={sale_btn} alt="" onClick={gotoSale} />
        </div>

        <div className="top-main-item">
          <img src={sale_btn} alt="" />
        </div>

      </div>



      <div>
        <div className="ontent">
          <GetPullToRefreshlData ref={childRef} />
        </div>
      </div>
    </div>
  );
}

export default Home;
