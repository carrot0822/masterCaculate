// 备份日志
// 标准增删查改Api一套
// 图书馆 post黄鑫版本
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const backLog = {
  search: `${url}authmodule/bak/select`, // 日志搜索
  add: `${url}authmodule/bak/createBak`, // 创建备份
  remove: `${url}authmodule/bak/delete`, // 删除备份
  apply: `${url}authmodule/bak/useBak`, // 应用备份
  upload: `${url}authmodule/bak/upload`, // 上传备份
  download: `${url}authmodule/bak/downLoad`, // 下载备份
  getLog: `${url}authmodule/bakLog/select`, // 备份查询
  output: `${url}authmodule/bakLog/getFileFormTable` // 导出备份日志
}
export const backUrl = `${url}authmodule/bakLog/getFileFormTable`
export const bakFile = `${fileUrl}filemodule/uploadBak/upload` // 上传文件
export const backLogInt = {
  search,
  getLog,
  add,
  remove,
  apply,
  upload,
  download,
  getLog,
  output
}

function search(obj) {
  return axios.get(backLog.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function add(data) {
  return axios.post(backLog.add, data
  ).then((res) => {
    return Promise.resolve(res)
  })
}

function remove(data) {
  return axios.post(backLog.remove, data
  ).then((res) => {
    return Promise.resolve(res)
  })
}

function apply(data) {
  return axios.post(backLog.apply,  data
  ).then((res) => {
    return Promise.resolve(res)
  })
}

function upload(data) {
  return axios.post(backLog.upload,data
  ).then((res) => {
    return Promise.resolve(res)
  })
}

function download(data) {
  return axios.post(backLog.download,data
  ).then((res) => {
    return Promise.resolve(res)
  })
}



function output(obj) {
  return axios.get(backLog.output, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function getLog(obj) {
  return axios.get(backLog.getLog, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}