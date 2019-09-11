// 标准增删查改Api一套
// 图书馆 post黄鑫版本
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const readerInfo = {
  search: `${url}readermodule/cardManagement/readerInfo/select`, // 用户信息查询
  deal: `${url}readermodule/cardManagement/readerInfo/resetPasswordByid`, // 重置密码
}

export const readerInfoInt = {
  search,
  deal,
}

function search(obj) {
  return axios.get(readerInfo.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}



function deal(data) {
  return axios.put(readerInfo.deal, data).then((res) => {
    return Promise.resolve(res)
  })
}

