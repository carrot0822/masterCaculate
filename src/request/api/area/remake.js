var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
// 基础参数设置
export const baseInt = {
  search: `${url}data/cata/dictionaries/areaManagementPage/selectByLocationAndTime`,
  topSearch: `${url}data/cata/dictionaries/areaManagementPage/getBorrowHot`,
  classify: `${url}data/cata/dictionaries/areaManagementPage/getStateMums`,
  storeSearch: `${url}`
}

export const storeInt = {
  select: `${url}data/cata/dictionaries/areaManagementPage/storeselect`,
  add: `${url}data/cata/dictionaries/areaManagementPage/storeadd`,
  edit: `${url}data/cata/dictionaries/areaManagementPage/storeedit`,
  delete: `${url}data/cata/dictionaries/areaManagementPage/storedelete`
};
export const regionInt = {
  select: `${url}data/cata/dictionaries/areaManagementPage/regionselect`,
  add: `${url}data/cata/dictionaries/areaManagementPage/regionadd`,
  edit: `${url}data/cata/dictionaries/areaManagementPage/regionedit`,
  delete: `${url}data/cata/dictionaries/areaManagementPage/regiondelete`,
  selectBind: `${url}bookcollectionmodule/areaManagementPage/regionselectBind`,
  bind: `${url}bookcollectionmodule/areaManagementPage/regioneditBind`
};
