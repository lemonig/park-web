/*
 * @Author: Jonny
 * @Date: 2024-09-02 14:42:02
 * @LastEditors: Jonny
 * @LastEditTime: 2024-09-11 15:08:00
 * @FilePath: \alarm-h5\src\pages\staff\index.jsx
 */
import React, { useEffect, useRef, useState } from "react";
import { IndexBar, List, NavBar, Dialog, Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";

import { grouped } from "./public";

import {
  claim as claimApi,
  transfer as transferApi,
  transferUser as transferUserApi,
} from "@Api";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const [data, setData] = useState([]);

  useEffect(() => {
    if (id) {
      featchData();
    }
  }, []);

  const featchData = async () => {
    let params = {};
    let { success, data } = await transferUserApi({ id });
    if (success) {
      let temp = grouped(data, "firstLetter", "nickName");
      setData(temp);
    }
  };

  const transfer = (transferId) => {
    Dialog.confirm({
      content: "是否转交",
      onConfirm: async () => {
        let { success, message } = await transferApi({ id, transferId });
        if (success) {
          Toast.show({
            icon: "success",
            content: message,
            position: "bottom",
          });
          back();
        } else {
          Toast.show({
            icon: "error",
            content: message,
            position: "bottom",
          });
        }
      },
    });
  };
  const back = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <NavBar back="返回" onBack={back}>
        用户列表
      </NavBar>

      <div style={{ height: window.innerHeight }}>
        <IndexBar>
          {data.map((group) => {
            const { title, items } = group;
            return (
              <IndexBar.Panel index={title} title={`${title}`} key={`${title}`}>
                <List>
                  {items.map((item, index) => (
                    <List.Item
                      key={item.nickName}
                      onClick={() => transfer(item.userId)}
                    >
                      {item.nickName}
                    </List.Item>
                  ))}
                </List>
              </IndexBar.Panel>
            );
          })}
        </IndexBar>
      </div>
    </div>
  );
};
