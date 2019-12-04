// 标准增删查改Api一套
// 广告管理
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const cover = {
  search: `${url}authmodule/small/smallAdvertisement/select`, // 搜索
  add: `${url}authmodule/small/smallAdvertisement/add`, // 添加
  remove: `${url}authmodule/small/smallAdvertisement/delete`, // 移除
  adjust: `${url}authmodule/small/smallAdvertisement/updorder`
}

export const coverInt = {
  search,
  add,
  remove,
  adjust
}

function search(obj) {
  return axios.get(cover.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function add(obj) {
  return axios.post(cover.add,  obj
  ).then((res) => {
    return Promise.resolve(res)
  })
}

function adjust(data) {
  return axios.put(cover.adjust, data).then((res) => {
    return Promise.resolve(res)
  })
}

function remove(obj) {
  return axios({
    method: 'delete',
    url: cover.remove,
    data: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}
