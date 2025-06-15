import React, { useEffect, useState } from "react";
import { Form, Input, Button, Toast } from "antd-mobile";
import {
  sms as smsAPI,
  send as sendApi,
  pwd as pwdApi,
  login as loginApi,
} from "@Api/login";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import "./index.less";

function Login() {
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [sendCoded, setSendCoded] = useState(false); // 是否已发送验证码
  let [count, setCount] = useState(60); // 倒计时
  const [loading, setLoading] = useState(false);
  const [isSmsType, setIsSmsType] = useState(false);

  const fadeTransition = useSpring({
    opacity: isSmsType ? 1 : 0,
    transform: isSmsType ? "translateX(0%)" : "translateX(-100%)",
  });

  const slideTransition = useSpring({
    opacity: !isSmsType ? 1 : 0,
    transform: !isSmsType ? "translateX(0%)" : "translateX(100%)",
  });

  useEffect(() => {}, []);

  let codeTimer = null;
  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    setLoading(true);
    try {
      let { success, data } = await smsAPI(values);
      if (success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        Toast.show(data);
      }
    } catch (error) {}finally{
      setLoading(false);

    }

  };

  const onSubmit1 = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    setLoading(true);
    try {
      let { success, data } = await loginApi(values);
      if (success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        Toast.show(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const sendCode = async () => {
    let phone = form.getFieldsValue("phone");
    try {
      let { data, success } = await sendApi(phone);
      if (success) {
        setSendCoded(true);
        countDown();
        Toast.show(data);
      } else {
        Toast.show(data);
      }
    } catch (error) {}
  };

  const countDown = () => {
    codeTimer = setInterval(() => {
      setCount(count--);
      if (count === 0) {
        clearInterval(codeTimer);
        codeTimer = null;
        setSendCoded(false);
        setCount(60);
      }
    }, 1000);
  };

  const handleChangeLoginType = (flag) => {
    if (!flag) {
      codeTimer = null;
      setCount(60);
    }
    setIsSmsType(flag);
  };

  return (
    <div className="login-contain">
      <header className="title">车位租售</header>

      <animated.div style={fadeTransition}>
        {isSmsType && (
          <Form
            layout="horizontal"
            mode="card"
            form={form}
            footer={
              <Button
                block
                color="primary"
                onClick={onSubmit}
                size="large"
                loading={loading}
              >
                登录
              </Button>
            }
          >
            <Form.Item name="phone">
              <Input placeholder="请输入手机号码" type="number" />
            </Form.Item>
            <Form.Item
              name="code"
              extra={
                sendCoded ? (
                  <span>{count}秒后重试</span>
                ) : (
                  <Button color="primary" fill="none" onClick={sendCode}>
                    发送验证码
                  </Button>
                )
              }
            >
              <Input placeholder="请输入短信验证码" type="number" />
            </Form.Item>
          </Form>
        )}
      </animated.div>

      <animated.div style={slideTransition}>
        {!isSmsType && (
          <Form
            layout="horizontal"
            mode="card"
            form={form}
            footer={
              <Button
                block
                color="primary"
                onClick={onSubmit1}
                size="large"
                loading={loading}
              >
                登录
              </Button>
            }
          >
            <Form.Item name="account" rules={[{ required: true }]}>
              <Input placeholder="请输入用户名" type="string" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true }]}>
              <Input placeholder="请输入密码" type="password" />
            </Form.Item>
          </Form>
        )}
      </animated.div>

      <footer style={{ padding: "20px 12px" }}>
        {!isSmsType ? (
          <span onClick={() => handleChangeLoginType(true)}>
            短信验证码登录
          </span>
        ) : (
          <span onClick={() => handleChangeLoginType(false)}>密码登录</span>
        )}
      </footer>
    </div>
  );
}

export default Login;
