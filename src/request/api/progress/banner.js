// 标准增删查改Api一套
// 广告管理
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const cover = {
  search: `${url}authmodule/wx/WxAdvertisement/select`, // 搜索
  selectOne:`${url}authmodule/wx/WxAdvertisement//selectOne`, // 查询单个
  add: `${url}authmodule/wx/WxAdvertisement/add`, // 添加
  remove: `${url}authmodule/wx/WxAdvertisement/delete`, // 移除
  revise: `${url}authmodule/wx/WxAdvertisement/edit`, // 调整
  article:`${url}authmodule/wx/WxAdvertisement/selectNotice`,// 下拉框查询
}

export const coverInt = {
  search,
  add,
  remove,
  revise,
  article,
  selectOne
}
function article(obj) {
  return axios.get(cover.article, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function selectOne(obj) {
  return axios.get(cover.selectOne, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
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

function revise(data) {
  return axios.put(cover.revise, data).then((res) => {
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
