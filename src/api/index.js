/*
 * @Author: Jonny
 * @Date: 2024-08-28 15:13:53
 * @LastEditors: Jonny
 * @LastEditTime: 2024-08-28 15:42:14
 * @FilePath: \alarm-h5\src\api\index.js
 */
import { _post, _download } from "@/server/http";
const basePath = "undefined";
// 报警数据列表 
export function queryList(data) {
  return _post({
    url: `/h5/api/task/query-list`,
    method: 'post',
    data
  })
}
// 详情 
export function detail(data) {
  return _post({
    url: `/h5/api/task/detail`,
    method: 'post',
    data
  })
}
// 日志 
export function log(data) {
  return _post({
    url: `/h5/api/task/log`,
    method: 'post',
    data
  })
}
// 日质控 
export function qa(data) {
  return _post({
    url: `/h5/api/task/qa`,
    method: 'post',
    data
  })
}
// 监控数据 
export function taskData(data) {
  return _post({
    url: `/h5/api/task/data`,
    method: 'post',
    data
  })
}
// 响应 
export function claim(data) {
  return _post({
    url: `/h5/api/task/claim`,
    method: 'post',
    data
  })
}
// 转移 
export function transfer(data) {
  return _post({
    url: `/h5/api/task/transfer`,
    method: 'post',
    data
  })
}
// 完成 
export function complete(data) {
  return _post({
    url: `/h5/api/task/complete`,
    method: 'post',
    data
  })
}
// 因子列表 
export function factor(data) {
  return _post({
    url: `/h5/api/task/factor`,
    method: 'post',
    data
  })
}

// 字典列表 
export function dict(data) {
  return _post({
    url: `/h5/api/common/dict/data`,
    method: 'post',
    data
  })
}
// 字典列表 
export function transferUser(data) {
  return _post({
    url: `/h5/api/task/transfer/user`,
    method: 'post',
    data
  })
}