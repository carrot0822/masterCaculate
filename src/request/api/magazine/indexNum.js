// 标准增删查改Api一套
// 图书馆 delete超版本 标准restful
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const indexNumUrl = {
    add:`${url}periodicalmodule/marcPeriodical/addPN`, 
    remove:`${url}periodicalmodule/marcPeriodical/deletePN`, // 函数命名为delete会报错
    search:`${url}periodicalmodule/marcPeriodical/getPN`,
    revise:`${url}periodicalmodule/marcPeriodical/editPN`, //修改 edit是编辑
    // other
    getPrev:`${url}periodicalmodule/marcPeriodical/getPNLast` // 获取上一次期刊
}

export const indexNumInt ={
    add,
    remove,
    search,
    revise,
    getPrev
}

function search(obj) {
    return axios.get(indexNumUrl.search, {
      params: obj
    }).then((res) => {
      return Promise.resolve(res)
    })
  }
  
  function add(data) {
    return axios.post(indexNumUrl.add, data).then((res) => {
      return Promise.resolve(res)
    })
  }
  
  function revise(data) {
    return axios.put(indexNumUrl.revise, data).then((res) => {
      return Promise.resolve(res)
    })
  }
  // delete源码里没有第三个参数 data
  function remove(data) {
    return axios.delete(indexNumUrl.remove, {data}).then((res) => {
      return Promise.resolve(res)
    })
  }

  function getPrev(data) {
    return axios.get(indexNumUrl.getPrev, data).then((res) => {
        return Promise.resolve(res)
      })
  }