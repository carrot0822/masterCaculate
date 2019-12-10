import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// 公告
const wxUrl = {
  search: `${url}authmodule/wx/wxNoticeInfo/select`, // 查询全部
  selectOne:`${url}authmodule/wx/wxNoticeInfo/selectOne`, // 查询详情
  add:`${url}authmodule/wx/wxNoticeInfo/add`, // 添加
  revise: `${url}authmodule/wx/wxNoticeInfo/edit`, // 修改
  remove:`${url}authmodule/wx/wxNoticeInfo/delete`, // 删除
  open:`${url}authmodule/wx/wxNoticeInfo/disable`, // 启用
  close:`${url}authmodule/wx/wxNoticeInfo/undisable`, // 禁用
}
export const wxInt = wxUrl
export const wxInterface = {
  search,
  add,
  selectOne,
  revise
}
function selectOne(obj){
  return axios.get(wxUrl.selectOne, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}
function search(obj) {
  return axios.get(wxUrl.search, {
    params: obj
  }).then((res) => {
    return Promise.resolve(res)
  })
}

function revise(data) {
  return axios.put(wxUrl.revise, data).then((res) => {
    return Promise.resolve(res)
  })
}

function add(data) {
  return axios.post(wxUrl.add, data).then((res) => {
    return Promise.resolve(res)
  })
}