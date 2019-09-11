var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;

//书籍编目
export const catalog = {
  select: `${url}data/cata/book/bookcata/select`,
  add: `${url}data/cata/book/bookcata/add`,
  delete: `${url}data/cata/book/bookcata/delete`,
  edit: `${url}data/cata/book/bookcata/edit`,
  typeTree: `${url}data/cata/book/bookcata/currency/selectAllBookType`,
  publishTree: `${url}data/cata/book/bookcata/currency/selectPressTree`,
  language: `${url}data/cata/book/bookcata/currency/getLanguage`,
  remoteCataloging: `${url}data/cata/book/bookcata/getBookInfoByLongRange`, //远程编目的数据
  localCataloging: `${url}data/cata/book/bookcata/selectFromCata`, //本地编目的数据
  getFields: `${url}data/cata/book/bookcata/currency/getFields`, //获取映射框数据
  start: `${url}data/cata/book/bookcata/start`, //导入
  getCountByConditon: `${url}data/cata/book/bookcata/getCountByConditon`, //获取对应条件的数据总数
  getFileUrlByConditon: `${url}data/cata/book/bookcata/getFileUrlByConditon`, //开始导出
};
/*--- 批量导入书籍编目 ---*/
export const bookUploadInt = {
  getFields: `${url}data/cata/book/bookcata/currency/getFields`,
  add: `${url}data/cata/book/bookcata/start`
};

//图书位置信息
export const bookLocationInfo = {
  LendState:`${url}data/cata/book/booklocation/editLendState`, //上架修改
  select:`${url}data/cata/book/booklocation/select`,//分页查询
};

/*--- 书籍清点 ---*/
export const damageInt = {
  outline:`${url}data/cata/book/bookcount/getFristPage`,
  detail:`${url}data/cata/book/bookcount/getSecondPage`
};