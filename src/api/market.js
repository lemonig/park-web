
import { _post, _download } from "@/server/http";
// 市场列表 
export function list(data) {
  return _post({
    url: `/api/market/list`,
    method: 'post',
    data
  })
}
// 删除 
export function deleted(data) {
  return _post({
    url: `/api/market/delete`,
    method: 'post',
    data
  })
}
// 添加 
export function add(data) {
  return _post({
    url: `/api/market/add`,
    method: 'post',
    data
  })
}
// 更新 
export function update(data) {
  return _post({
    url: `/api/market/update`,
    method: 'post',
    data
  })
}