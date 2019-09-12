import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// 基础参数设置
export const baseInt = {
    search:`${url}data/cata/dictionaries/baseData/select`,
    revise:`${url}data/cata/dictionaries/baseData/edit`
}
// 系统参数设置
export const systemInt = {
    search:`${url}authmodule/sysSet/select`,
    revise:`${url}authmodule/sysSet/edit`
}