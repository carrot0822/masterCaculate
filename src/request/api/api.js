// 引用使用的模块 可以按照文件页面分块封装
import axios from 'axios'

var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

/* 书籍推荐 */
const recommendInt = {
    search:`${url}authmodule/bigData/bookTbBigDataReferr/select`,
    add:`${url}authmodule/bigData/noticeTbBigDataReferr/add`,
    delete:`${url}authmodule/bigData/bookTbBigDataReferr/delete`,
    imgUpload:`${fileUrl}filemodule/uploadImg/addBookCover`
}
export const imgUpload = `${fileUrl}filemodule/uploadImg/addBookCover`
export const preImg=`${fileUrl}filemodule/showFile/getShow`
export function dataSearch() {
   return axios.get(recommendInt.search).then((res) =>{
        return Promise.resolve(res)
    })
}

export function dataAdd(data) {
  return  axios.post(recommendInt.add,data).then((res) =>{
        
            return Promise.resolve(res)
        
    })
}

export function dataDelete(obj) {
  return  axios({
      method:'delete',
      url:recommendInt.delete,
      
      data:obj
  }).then((res) => {
        
            return Promise.resolve(res)
       
          
    })
}