// 标准增删查改Api一套
// 图书馆 post黄鑫版本
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const orderNum = {
  search: `${url}authmodule/equipmentTbOrders/select`, // 订单查询查询
  deal: `${url}authmodule/equipmentTbOrders/dealEquipmentTbOrder`, // 订单退款
  getHistory:`${url}authmodule/equipmentTbOrders/selectHis` // 历史订单
}

export const orderNumInt = {
  search,
  deal,
  getHistory
}

function search(obj) {
  return axios.get(orderNum.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}



function deal(data) {
  return axios.put(orderNum.deal, data).then((res) => {
    return Promise.resolve(res)
  })
}

function getHistory(obj) {
  return axios.get(orderNum.getHistory, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}