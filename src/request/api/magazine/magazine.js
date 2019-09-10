import axios from 'axios'

var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// s（search）查询类接口 a（add） 增加类接口 d（delete）删除接口  r（revise）修改接口
// 期刊编目
export const logUrl = {
  // 增删查改一套 编目数据
  sLog: `${url}periodicalmodule/marcPeriodical/select`,
  aLog: `${url}periodicalmodule/marcPeriodical/add`,
  dLog: `${url}periodicalmodule/marcPeriodical/delete`,
  rLog: `${url}periodicalmodule/marcPeriodical/edit`,
  // 弹框内的接口
  sRemotelog: `${url}periodicalmodule/marcPeriodical/getPeriodicalInfoByLongRange`, // 远程编目获取
  sLocalSearch: `${url}periodicalmodule/marcPeriodical/selectLocal`, // 本地获取数据
  sBookType: `${url}periodicalmodule/marcPeriodical/selectAllBookType`, // 查询图书类型
  sPublisher: `${url}periodicalmodule/marcPeriodical/selectPressTree`, // 查询出版社树
  sLanguage: `${url}periodicalmodule/marcPeriodical/getLanguage`, // 查询语言
  sMagazineType: `${url}periodicalmodule/marcPeriodical/periodicalType`, //  查询期刊类型
  outPut:`${url}/periodicalmodule/marcPeriodical/getFileUrlByConditon`, // 期刊编目导出
}

// 期刊典藏
const reserveUrl = {
  search: `${url}periodicalmodule/periodicalTbCollectionInfo/select`,
  add: `${url}periodicalmodule/periodicalTbCollectionInfo/add`,
  revise: `${url}periodicalmodule/periodicalTbCollectionInfo/edit`,
  delete: `${url}periodicalmodule/periodicalTbCollectionInfo/delete`,
  getFront:`${url}periodicalmodule/periodicalTbCollectionInfo/selectOne`, // 获取修改回显信息
  // other接口
  reject: `${url}periodicalmodule/periodicalTbCollectionInfo/ridOf`, // 剔除
  getLocal: `${url}periodicalmodule/periodicalTbCollectionInfo/selectLocal`, // 获取本地issn
  getIndex: `${url}periodicalmodule/periodicalTbCollectionInfo/getPN`, // 获取所有期刊号
  getNumber: `${url}bookcollectionmodule/collection/currency/getCode`, // 获取索书号等
  getSearchNum:`${url}/bookcollectionmodule/collection/currency/getBopSearchNumber`, // 通用接口 获取索取号*2
  getCity:`${url}periodicalmodule/periodicalTbCollectionInfo/getLB`, // 查询所有藏馆
  closeIndex:`${url}periodicalmodule/periodicalTbCollectionInfo/stopUs`, // 停用
  openIndex:`${url}periodicalmodule/periodicalTbCollectionInfo/startUs`, // 启用
  translate:`${url}periodicalmodule/periodicalTbCollectionInfo/transferLibrary`, // 调馆
  damage:`${url}periodicalmodule/periodicalTbCollectionInfo/breakage`,  // 典藏期刊报损
  getDamegeOp:`${url}periodicalmodule/periodicalTbCollectionInfo/getDamageBox` // 查询损坏列表下拉框
}
export const reserveInt = {
  search,
  add,
  revise,
  remove,
  reject,
  getIndex,
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
  return axios.put(reserveUrl.revise, data).then((res) => {
    return Promise.resolve(res)
  })
}

function remove(data) {
  return axios.delete(reserveUrl.delete, {data}).then((res) => {
    return Promise.resolve(res)
  })
}

function reject(data) {
  return axios.put(reserveUrl.reject, data).then((res) => {
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

function getIndex(obj) {
  return axios.get(reserveUrl.getIndex, {
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
  return axios.put(reserveUrl.openIndex, data).then((res) => {
    return Promise.resolve(res)
  })
}
function closeIndex(data) {
  return axios.put(reserveUrl.closeIndex, data).then((res) => {
    return Promise.resolve(res)
  })
}
function translate(data) {
  return axios.put(reserveUrl.translate, data).then((res) => {
    return Promise.resolve(res)
  })
}
function damage(data) {
  return axios.put(reserveUrl.damage, data).then((res) => {
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