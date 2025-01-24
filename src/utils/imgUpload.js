import { uploadFile } from "@Api/public";
import { compressImage } from "./public";
import { ImageUploader, Space, Toast, Dialog } from "antd-mobile";

function sleep(time) {
  setTimeout(() => { }, time);
}
export const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";

export async function mockUpload(file) {
  let res = await compressImage(file);  // 压缩图片

  // 确保 `res` 是 `compressImage` 返回的有效文件对象
  let formData = new FormData();
  formData.append("file", res);  // 将压缩后的文件添加到 FormData

  let { data, success } = await uploadFile(formData);
  if (success) {
    return data;
  } else {
    Toast.show("图片上传失败");

  }
}

export async function mockUploadFail() {
  await sleep(3000);
  throw new Error("Fail to upload");
}

export async function beforeUpload(file) {
  if (file.size > 10 * 1024 * 1024) {
    Toast.show("请选择小于 10M 的图片");
    return null;
  }
  return file;
}
