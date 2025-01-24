/*
 * @Author: Jonny
 * @Date: 2024-08-28 15:12:38
 * @LastEditors: Jonny
 * @LastEditTime: 2024-08-29 10:17:57
 * @FilePath: \alarm-h5\src\api\login.js
 */

import { _post, _download } from "@/server/http";
const basePath = "undefined";
// 短信登录 
export function sms(data) {
  return _post({
    url: `/h5/api/login/sms`,
    method: 'post',
    data
  })
}
// 密码登录 
export function pwd(data) {
  return _post({
    url: `/h5/api/login/pwd`,
    method: 'post',
    data
  })
}
// 发送短信 
export function send(data) {
  return _post({
    url: `/h5/api/sms/send`,
    method: 'post',
    data
  })
}

// 用户列表 
export function list(data) {
  return _post({
    url: `/api/user/list`,
    method: 'post',
    data
  })
}
// 用户全部 
export function all(data) {
  return _post({
    url: `/api/user/all`,
    method: 'post',
    data
  })
}
// 登录 
export function login(data) {
  return _post({
    url: `/api/login`,
    method: 'post',
    data
  })
}