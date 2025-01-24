
import { _post, _download } from "@/server/http";
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