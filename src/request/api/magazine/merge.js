// 过刊合订
import axios from 'axios'

var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// s（search）查询类接口 a（add） 增加类接口 d（delete）删除接口  r（revise）修改接口


// 过刊合订
const mergeUrl = {
  search: `${url}periodicalmodule/itemHad/selectPage`,
  add: `${url}periodicalmodule/itemHad/add`,
  revise: `${url}periodicalmodule/itemHad/edit`,
  remove: `${url}periodicalmodule/itemHad/delete`,
  getFront:`${url}periodicalmodule/itemHad/selectOne`, // 获取编辑回显信息其一 子刊
  getMore:`${url}periodicalmodule/itemHad/getDCQK`, // 获取典藏期刊信息（添加修改合刊）
  // other接口
  reject: `${url}periodicalmodule/itemHad/ridOf`, // 剔除
  getLocal: `${url}periodicalmodule/itemHad/selectLocal`, // 获取本地issn
  getIndex: `${url}periodicalmodule/itemHad/getPN`, // 获取所有期刊号
  getNumber: `${url}periodicalmodule/itemHad/getcs`, // 获取索书号等
  getCity:`${url}periodicalmodule/itemHad/getLB`, // 查询所有藏馆
  closeIndex:`${url}periodicalmodule/itemHad/stopUs`, // 停用
  openIndex:`${url}periodicalmodule/itemHad/startUs` // 启用
}
export const mergeInt = {
  search,
  add,
  revise,
  remove,
  reject,
  getMore,
  
  getLocal,
  getNumber,
  getCity,
  getFront,
  closeIndex,
  openIndex
}

function search(obj) {
  return axios.get(mergeUrl.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function add(data) {
  return axios.post(mergeUrl.add, data).then((res) => {
    return Promise.resolve(res)
  })
}

function revise(data) {
  return axios.put(mergeUrl.revise, data).then((res) => {
    return Promise.resolve(res)
  })
}

function remove(data) {
  return axios.delete(mergeUrl.remove, {data}).then((res) => {
    return Promise.resolve(res)
  })
}

function reject(data) {
  return axios.put(mergeUrl.reject, data).then((res) => {
    return Promise.resolve(res)
  })
}

function getLocal(obj) {
  return axios.get(mergeUrl.getLocal, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getMore(obj) {
  return axios.get(mergeUrl.getMore, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getNumber(obj) {
  return axios.get(mergeUrl.getNumber, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getCity(obj) {
  return axios.get(mergeUrl.getCity, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getFront(obj) {
  return axios.get(mergeUrl.getFront, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}
function openIndex(data) {
  return axios.put(mergeUrl.openIndex, data).then((res) => {
    return Promise.resolve(res)
  })
}
function closeIndex(data) {
  return axios.put(mergeUrl.closeIndex, data).then((res) => {
    return Promise.resolve(res)
  })
}