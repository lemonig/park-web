
import { _post, _download } from "@/server/http";
// 文件上传 
export function uploadFile(data) {
  return _post({
    url: `/api/cos/upload`,
    method: 'post',
    data
  })
}