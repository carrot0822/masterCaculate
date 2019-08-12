// 标准增删查改Api一套
// 图书馆 post黄鑫版本
import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const libraryUrl = {
    add:`${url}bookcollectionmodule/booklib/add`, 
    remove:`${url}bookcollectionmodule/booklib/delete`, // 函数命名为delete会报错
    search:`${url}bookcollectionmodule/booklib/select`,
    revise:`${url}bookcollectionmodule/booklib/edit` //修改 edit是编辑
}

export const libraryInt ={
    add,
    remove,
    search,
    revise
}

function search(obj) {
    return axios.get(libraryUrl.search, {
      params: obj
    }).then((res) => {
      return Promise.resolve(res)
    })
  }
  
  function add(data) {
    return axios.post(libraryUrl.add, data).then((res) => {
      return Promise.resolve(res)
    })
  }
  
  function revise(data) {
    return axios.post(libraryUrl.revise, data).then((res) => {
      return Promise.resolve(res)
    })
  }
  
  function remove(data) {
    return axios.post(libraryUrl.remove, data).then((res) => {
      return Promise.resolve(res)
    })
  }