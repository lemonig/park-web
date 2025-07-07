/*
 * @Author: Jonny
 * @Date: 2024-08-30 09:12:21
 * @LastEditors: Jonny
 * @LastEditTime: 2025-01-24 09:41:26
 * @FilePath: \park-h5\src\pages\home\components\GetPullToRefreshlData.jsx
 */
import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  InfiniteScroll,
  PullToRefresh,
  List,
  Tag,
  Ellipsis,
  Card,
  Image,
} from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import { List as DList } from "@Components";
import { listMarket as queryListApi } from "@Api/market";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UnorderedListOutline,
  AppstoreOutline,
  UserOutline,
} from "antd-mobile-icons";
import "./index.less";
import parkSvg from "@Assets/img/park.svg";

function GetPullToRefreshlData(props, ref) {
  const dispatch = useDispatch();
  const {
    position: scrollPosition,
    form: formmemo,
    mode,
  } = useSelector((state) => state.memory);
  let navigate = useNavigate();

  const containerRef = useRef(null);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 组件挂载时恢复滚动位置
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  useImperativeHandle(ref, () => ({
    sortData,
  }));
  // useEffect(() => {
  //   const calculateItemsPerPage = () => {
  //     if (!mode) return;
  //     const itemHeight = mode == "list" ? 80 : 351;
  //     const viewportHeight = window.innerHeight;
  //     const newItemsPerPage = Math.ceil(viewportHeight / itemHeight) * 2;
  //     console.log(newItemsPerPage);
  //     setPageSize(newItemsPerPage);
  //   };

  //   calculateItemsPerPage();
  //   window.addEventListener("resize", calculateItemsPerPage);

  //   return () => {
  //     window.removeEventListener("resize", calculateItemsPerPage);
  //   };
  // }, [mode]);

  const sortData = () => {
    setData([]);
    setPage(1);
    let { alarmStatus, alarmLevel, type } = formmemo;
    let params = {
      page: 1,
      size: 10,
      data: {
        alarmStatus: alarmStatus[0],
        alarmLevel: alarmLevel[0],
        type: type[0],
      },
    };
    loadMore(params);
  };

  const loadMore = async (params) => {
    if (loading) return;
    setLoading(true);
    try {
      const append = await getNextData(params);
      console.log(append);
      setLoading(false);
      setData((val) => [...val, ...append]);
      setPage((pageIndex) => pageIndex + 1);
    } catch (error) {}
  };

  const getNextData = async (params) => {
    try {
      let { success, data, additional_data } = await queryListApi(params);

      if (success) {
        setHasMore(data.length < additional_data.pagination);
        return data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const goDetail = (id) => {
    const scrollPosition = containerRef.current.scrollTop; // 获取当前滚动位置

    navigate({
      pathname: `/market/${id}`,
    });
  };
  const style = {
    height: `${window.innerHeight - 45 - 42}px`,
    overflowY: "scroll",
    boxSizing: "border-box",
  };

  //   #E53935  严重
  // #E67E22  高
  // #F1C40F  中
  // #E67E22  低
  // #F1C40F  提示
  const getTagColor = ({ alarmLevel }) => {
    const colorList = ["#7B8597", "#7B8597", "#F1C40F", "#E67E22", "#E53935 "];
    if (!alarmLevel) return;
    let index = Number(alarmLevel) / 10 - 1;
    return colorList[index];
  };

  const booleanturnToChinese = (val) => {
    if (typeof val !== "boolean") return "--";
    if (val) return "有效";
    if (!val) return "无效";
  };
  const demoSrc =
    "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60";
  const $ItemList = () => {
    return (
      <List>
        {data.map((item, index) => {
          return item ? (
            <DList
              key={item.code + "l" + index}
              prefix={
                <Image
                  src={item.images[0]?.url ?? parkSvg}
                  style={{ borderRadius: 4 }}
                  fit="cover"
                  width={80}
                  height={80}
                />
              }
              head={item.number}
              body={
                <Tag
                  color="#000000A6"
                  style={{
                    "--text-color": "#000000A6",
                    "--background-color": "#D9D9D9FF",
                    "--border-radius": "0px",
                    "--border-color": "none",
                  }}
                >
                  实惠
                </Tag>
              }
              foot={
                <div className="footer">
                  <span>￥</span>
                  <span>{item.price}</span>
                </div>
              }
              // headL={
              //   <Ellipsis
              //     direction="end"
              //     style={{ fontWeight: "bold", fontSize: "14px" }}
              //     content={item.description}
              //   />
              // }
              headR={<Tag color={getTagColor(item)}>{item.alarmLevelName}</Tag>}
              footerL={item.stationName}
              footerR={
                item.alarmTime +
                (item.createByName ? `(${item.createByName})` : "")
              }
              onClick={() => goDetail(item.id)}
            />
          ) : (
            "Loading..."
          );
        })}
      </List>
    );
  };

  return (
    <div style={style} id="scrollWrap" ref={containerRef}>
      <PullToRefresh
        onRefresh={async () => {
          await sleep(1000);
          // setData([...getNextData(), ...data]);
          // loadMore();
        }}
      >
        {$ItemList()}
        {pageSize ? (
          <InfiniteScroll
            loadMore={() =>
              loadMore({
                page: page,
                size: pageSize,
                data: {
                  alarmStatus: formmemo.alarmStatus[0],
                  alarmLevel: formmemo.alarmLevel[0],
                  type: formmemo.type[0],
                },
              })
            }
            hasMore={hasMore}
          />
        ) : null}
      </PullToRefresh>
    </div>
  );
}

const ChildComponent = forwardRef((props, ref) =>
  GetPullToRefreshlData(props, ref)
);

export default ChildComponent;
