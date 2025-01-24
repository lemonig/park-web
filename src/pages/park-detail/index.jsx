/*
 * @Author: Jonny
 * @Date: 2024-08-28 13:22:05
 * @LastEditors: Jonny
 * @LastEditTime: 2025-01-15 18:12:22
 * @FilePath: \park-h5\src\pages\park-detail\index.jsx
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
  Card,
  Tag,
  PullToRefresh,
} from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { List as DList, Statistic } from "@Components";
import { detailCarport as detailApi } from "@Api/car";

import {
  UnorderedListOutline,
  AppstoreOutline,
  UserOutline,
} from "antd-mobile-icons";
import "./index.less";

const pageSize = 20;
function Home() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  let navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    featchData();
  }, []);

  const featchData = async () => {
    let params = {};
    let { success, data } = await detailApi({ id });
    if (success) {
      setData(data);
    }
  };
  const back = () => {
    navigate("/", { replace: true });
  };
  const booleanturnToChinese = (val) => {
    if (typeof val !== "boolean") return "--";
    if (val) return "是";
    if (!val) return "否";
  };

  const getTagColor = ({ alarmLevel }) => {
    const colorList = ["#7B8597", "#7B8597", "#F1C40F", "#E67E22", "#E53935 "];
    if (!alarmLevel) return;
    let index = Number(alarmLevel) / 10 - 1;
    return colorList[index];
  };

  const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div className="s-i-content" style={{ background: color }}>
        {index + 1}
      </div>
    </Swiper.Item>
  ));

  return (
    <div className="park-wrap">
      <NavBar back="返回" onBack={back}>
        详情
      </NavBar>

      <PullToRefresh
        onRefresh={async () => {
          featchData();
        }}
      >
        <div className="content">
          <div>
            <Swiper
              indicator={() => null}
              ref={swiperRef}
              defaultIndex={activeIndex}
              onIndexChange={(index) => {
                setActiveIndex(index);
              }}
            >
              {items}
            </Swiper>
          </div>
          <div className="main">
            <span className="title-one" style={{ fontSize: "bold" }}>
              {/* {{data.number}} */}
            </span>
            <div className="tag-wrap">
              <Tag fill="outline">1幢</Tag>
              <Tag fill="outline">10幢</Tag>
              <Tag fill="outline">9幢</Tag>
              <Tag fill="outline">出售</Tag>
              <Tag fill="outline">出租</Tag>
            </div>
            <Grid columns={3} gap={8}>
              <Grid.Item Item span={2}>
                <Card bordered={false}>
                  <Statistic
                    title="待出租"
                    value={3000}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Grid.Item>
              <Grid.Item>
                <Card bordered={false}>
                  <Statistic
                    title="待出售"
                    value={12000}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Grid.Item>
            </Grid>
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
}

export default Home;
