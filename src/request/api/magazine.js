import axios from 'axios'
var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// s（search）查询类接口 a（add） 增加类接口 d（delete）删除接口  r（revise）修改接口
export const logUrl = {
    // 增删查改一套 编目数据
    sLog:`${url}periodicalmodule/marcPeriodical/select`,
    aLog:`${url}periodicalmodule/marcPeriodical/add`,
    dLog:`${url}periodicalmodule/marcPeriodical/delete`,
    rLog:`${url}periodicalmodule/marcPeriodical/edit`,
    // 弹框内的接口
    sRemotelog:`${url}periodicalmodule/marcPeriodical/getPeriodicalInfoByLongRange`, // 远程编目获取
    sLocalSearch:`${url}periodicalmodule/marcPeriodical/selectLocal`, // 本地获取数据
    sBookType:`${url}periodicalmodule/marcPeriodical/selectAllBookType`, // 查询图书类型
    sPublisher:`${url}periodicalmodule/marcPeriodical/selectPressTree`, // 查询出版社树
    sLanguage:`${url}periodicalmodule/marcPeriodical/getLanguage`, // 查询语言
    sMagazineType:`${url}periodicalmodule/marcPeriodical/periodicalType`, //  查询期刊类型

}




