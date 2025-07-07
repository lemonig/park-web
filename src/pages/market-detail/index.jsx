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
import { useNavigate, useParams } from "react-router-dom";
import { List as DList, Statistic } from "@Components";
import { detailMarket as detailApi } from "@Api/market";
import "./index.less";

const tagColorList = ["#7B8597", "#7B8597", "#F1C40F", "#E67E22", "#E53935"];

function MarketDetail() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { success, data } = await detailApi({ id });
    if (success) setData(data);
  };

  const onBack = () => {
    navigate("/", { replace: true });
  };

  const formatBoolean = (val) => {
    if (typeof val !== "boolean") return "--";
    return val ? "是" : "否";
  };

  const getTagColor = (alarmLevel) => {
    const index = Number(alarmLevel) / 10 - 1;
    return tagColorList[index] || "#7B8597";
  };

  const renderSwiper = () => {
    return (data?.images || []).map((item, index) => (
      <Swiper.Item key={index}>
        <div className="s-i-content">
          <Image src={item.url} fit="cover" width="100%" height={180} />
        </div>
      </Swiper.Item>
    ));
  };

  return (
    <div className="park-wrap">
      <NavBar back="返回" onBack={onBack}>
        详情
      </NavBar>

      <PullToRefresh onRefresh={fetchData}>
        <div className="content">
          <Swiper
            indicator={() => null}
            ref={swiperRef}
            defaultIndex={activeIndex}
            onIndexChange={setActiveIndex}
          >
            {renderSwiper()}
          </Swiper>

          <div className="main">
            <span className="title-one">{data?.number || "--"}</span>

            <div className="tag-wrap">
              {["1幢", "10幢", "9幢", "出售", "出租"].map((tag, i) => (
                <Tag key={i} fill="outline">
                  {tag}
                </Tag>
              ))}
            </div>

            <Grid columns={3} gap={8}>
              <Grid.Item span={2}>
                <Card bordered={false}>
                  <Statistic
                    title="待出租"
                    value={data?.rentCount || 0}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Grid.Item>
              <Grid.Item>
                <Card bordered={false}>
                  <Statistic
                    title="待出售"
                    value={data?.saleCount || 0}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Grid.Item>
            </Grid>

            <div className="details">
              <h2>商品详情</h2>
              <p>
                新鲜羽衣甘蓝，含有丰富膳食纤维等营养元素，加入苹果与橙子的清甜、融合雪梨、香水柠檬、黄柠檬多种新鲜水果的清新，金奖茉莉初雪回甘让味觉更丰富充盈。100%甜味来自水果，每日500瓶果瓶，瘦度更轻盈。
              </p>
              <p>*产品甜味来自水果糖分，糖尿病患者及控糖需求人士慎重饮用。</p>
              <p>*瘦度、轻盈指数为形瓶型更瘦更轻便，不消化功效性。</p>
              <p>*杯型：中杯500mL，指杯型容量，内盛饮品量请以门店出品为准。</p>
            </div>
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
}

export default MarketDetail;
