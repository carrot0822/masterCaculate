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

}

// 期刊典藏
const reserveUrl = {
  search: `${url}periodicalmodule/periodicalTbCollectionInfo/select`,
  add: `${url}periodicalmodule/periodicalTbCollectionInfo/add`,
  revise: `${url}periodicalmodule/periodicalTbCollectionInfo/edit`,
  delete: `${url}periodicalmodule/periodicalTbCollectionInfo/delete`,
  // other接口
  reject: `${url}periodicalmodule/periodicalTbCollectionInfo/ridOf`, // 剔除
  getLocal: `${url}periodicalmodule/periodicalTbCollectionInfo/selectLocal`, // 获取本地issn
  getIndex: `${url}periodicalmodule/periodicalTbCollectionInfo/getPN`, // 获取所有期刊号
  getNumber: `${url}periodicalmodule/periodicalTbCollectionInfo/getcs`, // 获取索书号等

}
export const reserveInt = {
  search,
  add,
  revise,
  del,
  reject,
  getIndex,
  getLocal,
  getNumber
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

function del(data) {
  return axios.delete(reserveUrl.delete, data).then((res) => {
    return Promise.resolve(res)
  })
}

function reject(data) {
  return axios.delete(reserveUrl.reject, data).then((res) => {
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
