// 标准增删查改Api一套
// 摄像头管理
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const interUrl = {
  searchAll:`${url}authmodule/camera/set/selectAll`,
  search: `${url}authmodule/camera/set/select`, // 搜索
  add: `${url}authmodule/camera/set/add`, // 添加
  remove: `${url}authmodule/camera/set/del`, // 移除
  revise: `${url}authmodule/camera/set/upd`
}

export const monitorlInt = {
  searchAll,
  search,
  add,
  remove,
  revise,
}
function searchAll(obj) {
  return axios.get(interUrl.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function search(obj) {
  return axios.get(interUrl.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function add(obj) {
  return axios.post(interUrl.add,  obj
  ).then((res) => {
    return Promise.resolve(res)
  })
}

function revise(data) {
  return axios.put(interUrl.revise, data).then((res) => {
    return Promise.resolve(res)
  })
}

function remove(obj) {
  return axios({
    method: 'delete',
    url: interUrl.remove,
    data: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}
