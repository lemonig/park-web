import React, { useState, useEffect, RefObject } from "react";
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch,
  NavBar,
  Space,
  Picker,
  ImageUploader,
  Popup,
  Toast,
} from "antd-mobile";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  demoSrc,
  mockUpload,
  mockUploadFail,
  beforeUpload,
} from "../../utils/imgUpload";
import { addMarket } from "@Api/market";



function RentForm() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([
    {
      url: demoSrc,
    },
  ]);

  const [contactPopupVis, setContactPopupVis] = useState(false);
  const [concated, setConcated] = useState({}); //已选择的联系人
  const [loading, setLoading] = useState(false);

  useEffect(() => { }, []);

  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    if (Array.isArray(values.photo)) {
      values.photo = values?.photo.map((item) => {
        return item.url;
      });
    }
    //TOTO 去掉写死的参数
    values.owner_id = 1
    values["type"] = 1
    setLoading(true);
    let { success } = await addMarket(values);
    if (success) {
      Toast.show({
        icon: "success",
        content: "提交成功",
      });
      back();
    } else {
      Toast.show({
        icon: "fail",
        content: "失败",
      });
    }
    setLoading(false);
  };

  // 选择联系人
  const selectConcate = (val) => {
    setConcated(val);
    setContactPopupVis(false);
    form.setFieldsValue({
      linkman_id: val.id,
    });
  };
  return (
    <>
      <NavBar back="返回" onBack={back}>
        我要出租
      </NavBar>
      <Form
        layout="horizontal"
        // mode="card"
        form={form}
        footer={
          <Button
            block
            color="primary"
            onClick={onSubmit}
            size="large"
            loading={loading}
          >
            提交
          </Button>
        }
      >

        {/* <Form.Item
          label="选择省份"
          name="cityCode"
          rules={[{ required: true }]}
          onClick={(e, provincePickerRef) => {
            provincePickerRef.current?.open();
          }}
          trigger="onConfirm"
        >
          <Picker columns={[provinceList]}>
            {([value]) =>
              value ? (
                value.label
              ) : (
                <span className="placer-hoder-text">请选择</span>
              )
            }
          </Picker>
        </Form.Item> */}


        <Form.Item
          label="车位号"
          layout="vertical"
          name="number"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="价格"
          layout="vertical"
          name="price"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="描述"
          layout="vertical"
          name="describe"
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入内容" rows={3} />
        </Form.Item>

        <Form.Item label="照片" layout="vertical" name="photo">
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            showFailed={false}
            maxCount={3}
            beforeUpload={beforeUpload}
          />
        </Form.Item>
        <Form.Header />
      </Form>
      {/* <Popup
        visible={contactPopupVis}
        onMaskClick={() => {
          setContactPopupVis(false);
        }}
        bodyStyle={{ height: "80vh" }}
      >
        <ContactList selectConcate={selectConcate}></ContactList>
      </Popup> */}
    </>
  );
}

export default RentForm;
