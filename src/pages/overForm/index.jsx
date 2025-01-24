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
import { useNavigate, useLocation } from "react-router-dom";
import {
  demoSrc,
  mockUpload,
  mockUploadFail,
  beforeUpload,
} from "../../utils/imgUpload";
import {
  complete as completeApi,
  dict as dictApi,
  detail as detailApi,
} from "@Api";

function OverForm() {
  const location = useLocation();
  let navigate = useNavigate();
  const { id } = location.state || {};
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([
    {
      url: demoSrc,
    },
  ]);

  const [contactPopupVis, setContactPopupVis] = useState(false);
  const [concated, setConcated] = useState({}); //已选择的联系人
  const [resonType, setResonType] = useState([]);
  const [resonList, setResonList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDict("diagnosticEventType").then((res) => {
      setResonType(res);
      featchData();
    });
  }, []);

  const featchData = async () => {
    let params = {};
    let { success, data } = await detailApi({ id });
    if (success) {
      if (data.form) {
        getDict(data.form.diagnosticEventType).then((res) => {
          setResonList(res);
          form.setFieldsValue({
            ...data.form,
            isWaterNormal: [data.form.isWaterNormal],
            isValid: [data.form.isValid],
            isArriveScene: [data.form.isArriveScene],
            diagnosticEventType: [data.form.diagnosticEventType],
            specificReason: [data.form.specificReason],
          });
        });
      }
    }
  };

  const getDict = async (key) => {
    let { success, data } = await dictApi({ type: key });
    if (success) {
      return data.map((item) => {
        return {
          label: item.name,
          value: item.value,
        };
      });
    }
  };

  const back = () => {
    navigate(-1, { replace: true });
  };

  const onSubmit = async (flag) => {
    await form.validateFields();
    const values = form.getFieldsValue();
    values.isWaterNormal = values.isWaterNormal[0];
    values.isValid = values.isValid[0];
    values.isArriveScene = values.isArriveScene[0];
    values.diagnosticEventType = values.diagnosticEventType[0];
    values.specificReason = values.specificReason[0];
    values.saveOnly = flag;

    setLoading(true);
    let { success } = await completeApi({
      id,
      form: values,
    });
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

  const changeResonType = (val) => {
    getDict(val[0]).then((res) => {
      setResonList(res);
    });
  };

  return (
    <>
      <NavBar back="返回" onBack={back}>
        完结
      </NavBar>
      <div
        style={{
          overflow: "auto",
          height: window.innerHeight,
          padding: "2px 0 50px",
          boxSizing: "border-box",
        }}
      >
        <Form
          layout="horizontal"
          // mode="card"
          form={form}
          footer={
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                color="primary"
                onClick={() => onSubmit(false)}
                size="large"
                loading={loading}
                block
                style={{ margin: "0 8px" }}
              >
                提交
              </Button>
              <Button
                onClick={() => onSubmit(true)}
                size="large"
                loading={loading}
                block
                style={{ margin: "0 8px" }}
              >
                保存
              </Button>
            </div>
          }
        >
          <Form.Item
            label="水质是否异常"
            name="isWaterNormal"
            rules={[{ required: true }]}
            onClick={(e, isWaterNormalPickerRef) => {
              isWaterNormalPickerRef.current?.open();
            }}
            trigger="onConfirm"
          >
            <Picker
              columns={[
                [
                  { label: "是", value: true },
                  { label: "否", value: false },
                ],
              ]}
            >
              {([value]) =>
                value ? (
                  value.label
                ) : (
                  <span className="placer-hoder-text">请选择</span>
                )
              }
            </Picker>
          </Form.Item>

          <Form.Item
            label="数据是否有效 "
            name="isValid"
            rules={[{ required: true }]}
            onClick={(e, isWaterNormalPickerRef) => {
              isWaterNormalPickerRef.current?.open();
            }}
            trigger="onConfirm"
          >
            <Picker
              columns={[
                [
                  { label: "是", value: true },
                  { label: "否", value: false },
                ],
              ]}
            >
              {([value]) =>
                value ? (
                  value.label
                ) : (
                  <span className="placer-hoder-text">请选择</span>
                )
              }
            </Picker>
          </Form.Item>

          <Form.Item
            label="是否前往现场核实 "
            name="isArriveScene"
            rules={[{ required: true }]}
            onClick={(e, isWaterNormalPickerRef) => {
              isWaterNormalPickerRef.current?.open();
            }}
            trigger="onConfirm"
          >
            <Picker
              columns={[
                [
                  { label: "是", value: true },
                  { label: "否", value: false },
                ],
              ]}
            >
              {([value]) =>
                value ? (
                  value.label
                ) : (
                  <span className="placer-hoder-text">请选择</span>
                )
              }
            </Picker>
          </Form.Item>

          <Form.Item
            label="诊断分类"
            name="diagnosticEventType"
            rules={[{ required: true }]}
            onClick={(e, diagnosticEventTypePickerRef) => {
              diagnosticEventTypePickerRef.current?.open();
            }}
            trigger="onConfirm"
          >
            <Picker columns={[resonType]} onConfirm={changeResonType}>
              {([value]) =>
                value ? (
                  value.label
                ) : (
                  <span className="placer-hoder-text">请选择</span>
                )
              }
            </Picker>
          </Form.Item>
          <Form.Item
            label="具体原因"
            name="specificReason"
            rules={[{ required: true }]}
            onClick={(e, diagnosticEventTypePickerRef) => {
              diagnosticEventTypePickerRef.current?.open();
            }}
            trigger="onConfirm"
          >
            <Picker columns={[resonList]}>
              {([value]) =>
                value ? (
                  value.label
                ) : (
                  <span className="placer-hoder-text">请选择</span>
                )
              }
            </Picker>
          </Form.Item>

          <Form.Item
            label="处理措施"
            layout="vertical"
            name="treatment"
            rules={[{ required: true }]}
          >
            <TextArea placeholder="请输入内容" rows={3} />
          </Form.Item>

          <Form.Item label="备注" layout="vertical" name="diagnosticRemark">
            <TextArea placeholder="请输入内容" rows={3} />
          </Form.Item>

          <Form.Item label="照片" layout="vertical" name="fileList">
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
      </div>
    </>
  );
}

export default OverForm;
