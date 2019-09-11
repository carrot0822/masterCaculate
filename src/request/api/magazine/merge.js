// 过刊合订
import axios from 'axios'

var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// s（search）查询类接口 a（add） 增加类接口 d（delete）删除接口  r（revise）修改接口


// 过刊合订
const mergeUrl = {
  search: `${url}data/cata/periodical/itemHad/selectPage`,
  add: `${url}data/cata/periodical/itemHad/add`,
  revise: `${url}data/cata/periodical/itemHad/edit`,
  remove: `${url}data/cata/periodical/itemHad/delete`,
  getFront:`${url}data/cata/periodical/itemHad/currency/selectOne`, // 获取编辑回显信息其一 子刊
  getMore:`${url}data/cata/periodical/itemHad/getDCQK`, // 获取典藏期刊信息（添加修改合刊）
  // other接口
  reject: `${url}data/cata/periodical/itemHad/ridOf`, // 剔除
  getLocal: `${url}data/cata/periodical/itemHad/selectLoca`, // 获取本地issn
  getNumber: `${url}data/cata/book/bookcollection/currency/getCode`, // 获取索书号等
  getCity:`${url}data/cata/periodical/itemHad/currency/getLB`, // 查询所有藏馆
  closeIndex:`${url}data/cata/periodical/itemHad/stopUs`, // 停用
  openIndex:`${url}data/cata/periodical/itemHad/startUs`, // 启用
  translate:`${url}data/cata/periodical/itemHad/transferLibrary`, // 调馆
  damage:`${url}data/cata/periodical/itemHad/breakage`,  // 典藏期刊报损
  getDamegeOp:`${url}data/cata/periodical/itemHad/currency/getDamageBox` // 查询损坏列表下拉框
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
  openIndex,
  translate,
  damage,
  getDamegeOp
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
function translate(data) {
  return axios.put(mergeUrl.translate, data).then((res) => {
    return Promise.resolve(res)
  })
}
function damage(data) {
  return axios.put(mergeUrl.damage, data).then((res) => {
    return Promise.resolve(res)
  })
}
function getDamegeOp(obj) {
  return axios.get(mergeUrl.getDamegeOp, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}