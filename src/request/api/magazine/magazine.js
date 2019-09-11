import axios from 'axios'

var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// s（search）查询类接口 a（add） 增加类接口 d（delete）删除接口  r（revise）修改接口
// 期刊编目
export const logUrl = {
  // 增删查改一套 编目数据
  sLog: `${url}data/cata/periodical/periodicalcata/select`,
  aLog: `${url}data/cata/periodical/periodicalcata/add`,
  dLog: `${url}data/cata/periodical/periodicalcata/delete`,
  rLog: `${url}data/cata/periodical/periodicalcata/edit`,
  // 弹框内的接口
  sRemotelog: `${url}data/cata/periodical/periodicalcata/getPeriodicalInfoByLongRange`, // 远程编目获取
  sLocalSearch: `${url}data/cata/periodical/periodicalcata/selectLocal`, // 本地获取数据
  sBookType: `${url}data/cata/periodical/periodicalcata/currency/selectAllBookType`, // 查询图书类型
  sPublisher: `${url}data/cata/periodical/periodicalcata/currency/selectPressTree`, // 查询出版社树
  sLanguage: `${url}data/cata/periodical/periodicalcata/currency/getLanguage`, // 查询语言
  sMagazineType: `${url}data/cata/periodical/periodicalcata/currency/periodicalType`, //  查询期刊类型
  outPut:`${url}data/cata/periodical/periodicalcata/getFileUrlByConditon`, // 期刊编目导出
}
/*--- 批量导入期刊编目 ---*/
export const indexloadInt ={
  getFields:`${url}periodicalmodule/marcPeriodical/getFields`, // 期刊编目上传映射
  add:`${url}periodicalmodule/marcPeriodical/start` // 期刊编目开始上传
};
// 期刊典藏
const reserveUrl = {
  search: `${url}data/cata/periodical/collection/select`,
  add: `${url}data/cata/periodical/collection/add`,
  revise: `${url}data/cata/periodical/collection/edit`,
  delete: `${url}data/cata/periodical/collection/delete`,
  getFront:`${url}data/cata/periodical/collection/selectOne`, // 获取修改回显信息
  // other接口
  reject: `${url}data/cata/periodical/collection/ridOf`, // 剔除
  getLocal: `${url}data/cata/periodical/collection/selectLocal`, // 获取本地issn
  getIndex: `${url}data/cata/periodical/collection/getPN`, // 获取所有期刊号
  getNumber: `${url}data/cata/book/bookcollection/currency/getCode`, // 获取索书号等
  getSearchNum:`${url}data/cata/book/bookcollection/currency/getBopSearchNumber`, // 通用接口 获取索取号*2
  getCity:`${url}data/cata/book/bookcollection/currency/getLibName`, // 查询所有藏馆
  closeIndex:`${url}data/cata/periodical/collection/stopUs`, // 停用
  openIndex:`${url}data/cata/periodical/collection/startUs`, // 启用
  translate:`${url}data/cata/periodical/collection/transferLibrary`, // 调馆
  damage:`${url}data/cata/periodical/collection/breakage`,  // 典藏期刊报损
  getDamegeOp:`${url}data/cata/book/bookcollection/currency/getDamage` // 查询损坏列表下拉框
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