import axios from 'axios'

var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

// 期刊典藏
const reserveUrl = {
  search: `${url}bookcollectionmodule/collection/select`,
  add: `${url}bookcollectionmodule/collection/add`,
  revise: `${url}bookcollectionmodule/collection/edit`,
  remove: `${url}bookcollectionmodule/collection/delete`,
  getFront:`${url}bookcollectionmodule/collection/currency/selectOne`, // 获取修改回显信息
  // other接口
  reject: `${url}bookcollectionmodule/collection/letRemove`, // 剔除
  getLocal: `${url}catamodule/editing/cataTbBookInfo/selectFromCata`, // 获取本地issn
  getbackTab:`${url}bookcollectionmodule/collection/selectFromCataID`, // issn搜剔除
  getNumber: `${url}bookcollectionmodule/collection/currency/getCode`, // 获馆内码
  getSearchNum:`${url}/bookcollectionmodule/collection/currency/getBopSearchNumber`, // 通用接口 获取索取号*2
	
  getCity:`${url}bookcollectionmodule/collection/currency/getLibName`, // 查询所有藏馆
  closeIndex:`${url}bookcollectionmodule/collection/stopUs`, // 停用
  openIndex:`${url}bookcollectionmodule/collection/startUs`, // 启用
  translate:`${url}bookcollectionmodule/collection/letLeave`, // 调馆
  damage:`${url}bookcollectionmodule/collection/bookDamage`,  // 典藏期刊报损
  getDamegeOp:`${url}bookcollectionmodule/collection/getDamage` // 查询损坏列表下拉框
}
export const reserveInt = {
  search,
  add,
  revise,
  remove,
  reject,
  getbackTab,
  getLocal,
  getNumber,
  getCity,
  getFront,
  closeIndex,
  openIndex,
  translate,
  damage,
  getDamegeOp,
  getSearchNum
}

function search(obj) {
  return axios.get(reserveUrl.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function add(data) {
  return axios.post(reserveUrl.add, data).then((res) => {
    return Promise.resolve(res)
  })
}

function revise(data) {
  return axios.post(reserveUrl.revise, data).then((res) => {
    return Promise.resolve(res)
  })
}

function remove(data) {
  return axios.post(reserveUrl.remove, data).then((res) => {
    return Promise.resolve(res)
  })
}

function reject(data) {
  return axios.post(reserveUrl.reject, data).then((res) => {
    return Promise.resolve(res)
  })
}

function getLocal(obj) {
  return axios.get(reserveUrl.getLocal, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getbackTab(obj) {
  return axios.get(reserveUrl.getbackTab, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getNumber(obj) {
  return axios.get(reserveUrl.getNumber, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getCity(obj) {
  return axios.get(reserveUrl.getCity, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getFront(obj) {
  return axios.get(reserveUrl.getFront, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}
function openIndex(data) {
  return axios.post(reserveUrl.openIndex, data).then((res) => {
    return Promise.resolve(res)
  })
}
function closeIndex(data) {
  return axios.post(reserveUrl.closeIndex, data).then((res) => {
    return Promise.resolve(res)
  })
}
function translate(data) {
  return axios.post(reserveUrl.translate, data).then((res) => {
    return Promise.resolve(res)
  })
}
function damage(data) {
  return axios.post(reserveUrl.damage, data).then((res) => {
    return Promise.resolve(res)
  })
}
function getDamegeOp(obj) {
  return axios.get(reserveUrl.getDamegeOp, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}


function getSearchNum(obj) {
  return axios.get(reserveUrl.getSearchNum, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}