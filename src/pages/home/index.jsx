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
  return (
    <div className="home-wrap">
      <NavBar back="" backIcon={<IconFont iconName="tuichu" />} onBack={back}>
        首页
      </NavBar>
      {/* <div className="head-wrap">
        <Dropdown>
          <Dropdown.Item key="sorter" title="类型">
            <div style={{ padding: 12, maxHeight: "270px", overflow: "auto" }}>
              <CheckList value={formmemo.type} onChange={sortChange1}>
                {typeList.map((item) => (
                  <CheckList.Item key={"type" + item.value} value={item.value}>
                    {item.label}
                  </CheckList.Item>
                ))}
              </CheckList>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="timeType" title="处理状态 ">
            <div style={{ padding: 12 }}>
              <CheckList value={formmemo.alarmStatus} onChange={sortChange2}>
                {statusList.map((item) => (
                  <CheckList.Item
                    key={"status" + item.value}
                    value={item.value}
                  >
                    {item.label}
                  </CheckList.Item>
                ))}
              </CheckList>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="time" title="严重程度">
            <div style={{ padding: 12 }}>
              <CheckList value={formmemo.alarmLevel} onChange={sortChange3}>
                {levelList.map((item) => (
                  <CheckList.Item key={"level" + item.value} value={item.value}>
                    {item.label}
                  </CheckList.Item>
                ))}
              </CheckList>
            </div>
          </Dropdown.Item>
        </Dropdown>
        <div>
          {mode == "list" ? (
            <AppstoreOutline
              style={{ fontSize: "20px" }}
              onClick={() => dispatch(SET_MODE("card"))}
            ></AppstoreOutline>
          ) : (
            <UnorderedListOutline
              onClick={() => dispatch(SET_MODE("list"))}
              style={{ fontSize: "20px" }}
            ></UnorderedListOutline>
          )}
        </div>
      </div> */}
      <div>
        <div className="ontent">
          <GetPullToRefreshlData ref={childRef} />
        </div>
      </div>
    </div>
  );
}

export default Home;
