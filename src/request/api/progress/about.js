import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

const wxUrl = {
  search: `${url}authmodule/wx/aboutus/select`,
  revise: `${url}authmodule/wx/aboutus/edit`
}
export const wxInt = {
  search,
  revise,
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
