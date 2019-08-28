// 标准增删查改Api一套
// 图书馆 post黄鑫版本
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const appointment = {
  search: `${url}borrowmodule/borrowLog/bookTbSubscribeLog/select`, // 预约记录查询
  rescind: `${url}borrowmodule/borrowLog/bookTbSubscribeLog/handle`, // 预约记录处理
  getHistory: `${url}borrowmodule/borrowLog/bookTbSubscribeHistoryLog/select` // 预约历史记录查询
}

export const appointmentInt = {
  search,
  rescind,
  getHistory
}

function search(obj) {
  return axios.get(appointment.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}



function rescind(data) {
  return axios.post(appointment.rescind, data).then((res) => {
    return Promise.resolve(res)
  })
}

function getHistory(obj) {
    return axios.get(appointment.getHistory, {
      params: obj
    }).then((res) => {
      return Promise.resolve(res)
    })
  }
