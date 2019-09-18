import axios from 'axios'
/*--- 获取按钮权限 ---*/


//测试环境
/*  var url = 'http://192.168.2.54:8088/'
var imgurl='http://192.168.2.54:8090/'
let fileUrl = 'http://192.168.2.54:8090/'*/

// 用来管理接口的域名相关
//var url='http://127.0.0.1:8088/'
/* var url = 'http://192.168.2.250:8088/';
var imgurl='http://192.168.2.250:8090/';
let fileUrl = 'http://192.168.2.250:8090/';*/

/*var url = 'http://192.168.2.31:8088/';
var imgurl='http://192.168.2.31:8090/';
let fileUrl = 'http://192.168.2.31:8090/';*/
/* var url = 'http://192.168.2.121:8088/';
var imgurl='http://192.168.2.121:8090/';
var fileUrl = 'http://192.168.2.121:8090/';*/

var url = window.glob.url;
var imgurl = window.glob.imgurl;
var fileUrl = window.glob.fileUrl;
/*------ 文件上传模块 ------*/
export const buttonInt = `${url}authmodule/currency/selectElements`;
export function getPower (value){

  return axios.get(buttonInt,{
    params:{
      menuCode:value
    }
  }).then((res)=>{
    return Promise.resolve(res)
  })
}
/*--- 文件导出 财务管理 ---*/
export const outputExcelInt = {
  recharge:`${url}financemodule/depositRecord/export`,
  logout:`${url}financemodule/readerTbCardLogout/export`,
  overdue:`${url}financemodule/readetTbOverdueExpensesLog/export`
};
export const uploadInt = {
  bakFile:`${fileUrl}filemodule/uploadBak/upload`,
  headImg:`${fileUrl}filemodule/uploadImg/addHead`,
  backImg:`${fileUrl}filemodule/uploadImg/addBackage`,
  menuImg:`${fileUrl}filemodule/uploadImg/addMenu`,
  editorImg:`${fileUrl}filemodule/uploadImg/addEditorImg`,
  editorFile:`${fileUrl}filemodule/uploadFile/addEnclosure`,
  editorVideo:`${fileUrl}filemodule/uploadVideo/addShortVideo`,
  preimg:`${fileUrl}filemodule/showFile/getShow`,
  showFile:`${fileUrl}filemodule/showFile/getFile`,
  excelFile:`${fileUrl}filemodule/uploadFile/addDataFile`
};
//书籍编目
export const catalog ={
  select:`${url}data/cata/book/bookcata/select`,
  add:`${url}data/cata/book/bookcata/add`,
  delete:`${url}data/cata/book/bookcata/delete`,
  edit:`${url}data/cata/book/bookcata/edit`,
  typeTree:`${url}data/cata/book/bookcata/currency/selectAllBookType`,
  publishTree:`${url}data/cata/book/bookcata/currency/selectPressTree`,
  language:`${url}data/cata/book/bookcata/currency/getLanguage`,
  remoteCataloging:`${url}data/cata/book/bookcata/getBookInfoByLongRange`,//远程编目的数据
  localCataloging:`${url}data/cata/book/bookcata/selectFromCata`,//本地编目的数据
  getFields:`${url}data/cata/book/bookcata/currency/getFields`,//获取映射框数据
  start:`${url}data/cata/book/bookcata/start`,//导入
  getCountByConditon:`${url}data/cata/book/bookcata/getCountByConditon`,//获取对应条件的数据总数
  getFileUrlByConditon:`${url}data/cata/book/bookcata/getFileUrlByConditon`,//开始导出
};
/*--- 批量导入书籍编目 ---*/
export const bookUploadInt ={
  getFields:`${url}data/cata/book/bookcata/currency/getFields`,
  add:`${url}data/cata/book/bookcata/start`
};


/*--- 批量导入期刊编目 ---*/
export const indexloadInt ={
  getFields:`${url}data/cata/periodical/periodicalcata/currency/getFields`, // 期刊编目上传映射
  add:`${url}data/cata/periodical/periodicalcata/start` // 期刊编目开始上传
};
/*--- 损坏清点 ---*/
export const damageInt = {
  outline:`${url}data/cata/book/bookcount/getFristPage`,
  detail:`${url}data/cata/book/bookcount/getSecondPage`
};
/*------ 流通管理模块 ------*/
/*--- 流通记录 ---*/
// 报损记录与历史记录与处理操作
export const damageCotInt = {
  search:`${url}circulate/circulatelog/damagelog/select`,
  deal:`${url}circulate/circulatelog/damagelog/deal`,
  searchHis:`${url}circulate/circulatelog/damagehis/select`
};
/*--- 借阅管理 ---*/
// 借书页面

var borrow = url + 'tibetmuseummodule/bookRFID/';
export const borrowInt = {
  selectCode: `${url}circulate/borrowmgr/borrow/currency/selectByCode`,
  selectRfid: `${url}circulate/borrowmgr/borrow/currency/selectByrfid`
};
// 还书页面
export const returnInt = {
  selectCode: `${url}circulate/borrowmgr/return/currency/selectByCode`,
  selectRfid: `${url}circulate/borrowmgr/return/currency/selectByrfid`,
  sell:`${url}circulate/borrowmgr/return/in`
};
// 借书
export const bookOperateInt = {
  borrow: `${url}circulate/borrowmgr/borrow/out`,
  userInfo:`${url}circulate/borrowmgr/borrow/currency/getReaderInfo`,
  return:`${url}circulate/borrowmgr/borrow/currency/getReaderLog`,
  history:`${url}circulate/borrowmgr/borrow/currency/getReaderHis`
};
// 续借
export const renewInt = {
  renew:`${url}circulate/borrowmgr/renew/currency/getReaderLog`,
  userInfo:`${url}circulate/borrowmgr/renew/currency/getReaderInfo`,
  return:`${url}circulate/borrowmgr/renew/currency/getReaderLog`,
  history:`${url}circulate/borrowmgr/renew/currency/getReaderHis`
};
// 书籍报损
export const bookDamageInt = {
  search:`${url}circulate/borrowmgr/letdamage/currency/getDamage`,
  damage:`${url}circulate/borrowmgr/letdamage/bookDamage`,
  userInfo:`${url}circulate/borrowmgr/letdamage/currency/getReaderInfo`,
  return:`${url}circulate/borrowmgr/letdamage/currency/getReaderLog`,
};

/*------ 读者管理模块 ------*/
// 押金充值和判断
export const rechargeInt = {
  juge:`${url}financemodule/depositRecord/currency/vMoney`,
  deposit:`${url}financemodule/depositRecord/add`,
  logout:`${url}readermodule/cardManagement/readerTbCardInfo/Logout`, // 注销
  lose:`${url}readermodule/cardManagement/readerTbCardInfo/cardReport`, // 挂失
  cancelLost:`${url}readermodule/cardManagement/readerTbCardInfo/cardReportCancel`, // 取消挂失
  supply:`${url}readermodule/cardManagement/readerTbCardInfo/cardReissue`,
  option:`${url}readermodule/cardManagement/readerTbCardGradeinfo/currency/selectEffectiveDropBoxAll`
};

//读者卡信息
var cardInfo = url + 'tibetmuseummodule/readerTbCardInfo/';
export const cardInfoInt = {
  select: `${url}readermodule/cardManagement/readerTbCardInfo/select`,
  cardReport: `${cardInfo}currency/cardReport`, // 挂失/取办
  cardReissue: `${url}readermodule/cardManagement/readerTbCardInfo/cardReissue`,// 补办
  cogradient: `${cardInfo}synchronizationReader`, // 登记读者卡
  add: `${url}readermodule/cardManagement/readerTbCardInfo/add`, // 办卡
  selectUser: `${cardInfo}selectUserInfoByCard`,
  option:`${url}readermodule/cardManagement/readerTbCardGradeinfo/currency/selectEffectiveDropBoxAll`,
  verifyPhone:`${url}readrmodule/readerTbUserInfo/currency/verifyPhone`,//电话验证
  verifyEmail:`${url}readrmodule/readerTbUserInfo/currency/verifyEmail`,//邮箱验证
  verifyCard:`${url}readermodule/readerTbCardBase/currency/verifyBaseCard` //读者卡验证
};
export const getCardInt = url + 'tibetmuseummodule/readerTbCardGradeinfo/currency/selectAllDropBox';
export const idCardType = url + 'readermodule/currency/PapersType';//办卡页面证件类型
//读者卡等级

export const cardLevelInt = {
  select: `${url}readermodule/cardManagement/readerTbCardGradeinfo/select`,
  add: `${url}readermodule/cardManagement/readerTbCardGradeinfo/add`,
  edit: `${url}readermodule/cardManagement/readerTbCardGradeinfo/edit`,
  delete: `${url}readermodule/cardManagement/readerTbCardGradeinfo/delete`,
  verifyGrade:`${url}readermodule/cardManagement/readerTbCardGradeinfo/currency/verifyName`,//验证读者卡等级名称
  verifyDeposit:`${url}readermodule/cardManagement/readerTbCardGradeinfo/currency/verifyDeposit` //验证押金金额
};

/*------ 财务管理模块 ------*/
export const finnaceInt = {
  userInfo:`${url}financemodule/depositRecord/getReaderInfo`,
  deposit:`${url}financemodule/depositRecord/add`,
  juge:`${url}financemodule/depositRecord/currency/vMoney`,
  logout:`${url}financemodule/depositRecord/Logout`
};
/*------ 系统设置模块  ------*/

// 发布公告
export const editorInt = {
  add:`${url}authmodule/sysTbNoticeInfo/add`,
  select: `${url}authmodule/sysTbNoticeInfo/selectPage`,
  edit:`${url}authmodule/sysTbNoticeInfo/edit`,
  delete:`${url}authmodule/sysTbNoticeInfo/delete`,
  detail:`${url}authmodule/sysTbNoticeInfo/currency/selectOne`,
  moreDetail:`${url}systemmodule/sysTbNoticeInfo/selectMore`,
  revoke:`${url}authmodule/sysTbNoticeInfo/revoke`, //公告撤销
  cancelRevoke:`${url}authmodule/sysTbNoticeInfo/cancelRevoke`,//公告取消撤销
  place:`${url}authmodule/sysTbNoticeInfo/place`,//公告置顶
  cancelPlace:`${url}authmodule/sysTbNoticeInfo/cancelPlace`,//公告取消置顶
};
// 数据字典
export const bookWordInt = {
  search:`${url}authmodule/sysTbParamInfo/select`,
  edit:`${url}authmodule/sysTbParamInfo/edit`,
  select:`${url}readermodule/cardManagement/readerTbCardGradeinfo/currency/selectEffectiveDropBoxAll`,
};
//登陆页
export const login = {
  yzm:`${url}authmodule/index/imgVerification?`,//验证码接口
};
export const powerControl=url+'authmodule/roleMenuElement/select';//权限表格查询
//菜单页面
export const menu = {
  select:`${url}authmodule/menuInformation/select`,//菜单查询接口
  add:`${url}authmodule/menuInformation/add`,//菜单添加接口
  delete:`${url}authmodule/menuInformation/delete`,//菜单删除接口
  type:`${url}basemodule/currency/sysTbDictCode/select`, //菜单类型接口
  img:`${imgurl}filemodule/uploadImg/addMenu`, //图片上传接口
  button:`${url}authmodule/menuInformation/currency/selectMenuById`, //点击节点发请求
};
// 首页
export const indexInt = {
  borrow:`${url}borrowmodule/index/selectTodayBorrow`,
  return:`${url}borrowmodule/index/selectTodayReturn`,
  book:`${url}tibetmuseummodule/index/selectCount`,
  record:`${url}borrowmodule/index/getNewLog`,
  fan:`${url}tibetmuseummodule/index/getHotType`,
  pillar:`${url}borrowmodule/index/selectNearBorrowInfo`,
  cardOn:`${url}readermodule/cardManagement/readerTbCardInfo/currency/handleCardByOneDay`,
  notice:`${url}authmodule/sysTbNoticeInfo/currency/selectLittle`
};

// 权限模块的API
// 权限管理模块
export const control = {
  tree:`${url}authmodule/currency/getAllMenuAndElement`,
  add:`${url}authmodule/roleInformation/editMenuRole`, //权限添加
};

var userManage = url + 'authmodule/managerInformation/';
var roleManage = url + 'authmodule/roleInformation/';
var powerMangae = url + 'authmodule/roleMenuElement/';
/*--- 用户管理 ---*/
export const userManageInterface = {
  select: `${userManage}select`,
  add: `${userManage}add`,
  edit: `${userManage}edit`,
  delete: `${userManage}delete`,
  reset:`${url}authmodule/managerInformation/resetPassword`,
  verifyidCard:`${url}authmodule/managerInformation/currency/verifyIdCrad`,//身份证验证接口
  verifyPhone:`${url}authmodule/managerInformation/currency/verifyPhone`,//电话号码验证
  verifyEmail:`${url}authmodule/managerInformation/currency/verifyEmail` //邮箱验证
};
export const roleManageInt = {
  select: `${roleManage}select`,
  add: `${roleManage}add`,
  edit: `${roleManage}edit`,
  delete: `${roleManage}delete`,
};
export const powerMangaeInt = {
  select: `${powerMangae}select`,
  add: `${powerMangae}add`,
  edit: `${powerMangae}edit`,
  delete: `${powerMangae}delete`,
  prohibit:`${powerMangae}prohibit`
};
export const login_record = url + "authmodule/authTbManagerLoginLog/select"; //登录记录接口
export const role_name = url + 'authmodule/roleInformation/currency/select';//角色名称查询
export const command_list = url + 'authmodule/roleMenuElement/select';//权限管理列表
export const prohibit = url + 'authmodule/roleMenuElement/edit';//权限管理禁用
export const batch_Prohibit = url + 'authmodule/roleMenuElement/delete';//权限管理批量禁用


// 图书模块
var bookMode = url + 'tibetmuseummodule/libraryInformationManagementPage/';
export const bookModeInt = {
  selectOne:`${bookMode}selectOne`,
  select:`${bookMode}select`
};
//图书出版社页面
export const bookpublish = {
  select:`${url}data/cata/dictionaries/press/select`,//图书出版社初始化查询接口
  city:`${url}data/cata/dictionaries/press/selectCity`, //图书出版社城市信息
  add:`${url}data/cata/dictionaries/press/add`, //图书出版社添加信息
  edit:`${url}data/cata/dictionaries/press/edit`, //修改图书出版社
  delete:`${url}data/cata/dictionaries/press/delete`, //删除图书出版社
};
//图书类型查询
export const booktype = url + 'bookmodule/bookTbType/select'; // 预览图片前缀
//图书信息
export const booknews = {
  table:`${url}bookmodule/bookTbInfo/select`, //图书信息表格接口
  grade:`${url}bookmodule/bookTbType/selectAllBookType`, //图书信息类型名称下拉接口
};
//馆内图书信息
export const libbooknews = {
  table:`${url}tibetmuseummodule/libraryInformationManagementPage/select`, //馆内图书信息查询
  add:`${url}tibetmuseummodule/TbookTbInfo/add' //馆内图书信息添加`,
  edit:`${url}tibetmuseummodule/libraryInformationManagementPage/edit`, //馆内图书信息修改下架状态
  type:`${url}tibetmuseummodule/libraryBookTypeManagementPage/select`, //馆内图书类型查询
};
//图书登记
export const libbookRegist = {
  barcode:`${url}tibetmuseummodule/libraryBookRegistrationPage/selectOne`, //图书登记条码接口查详情
  add:`${url}tibetmuseummodule/libraryBookRegistrationPage/add`, //图书登记添加
  publish:`${url}tibetmuseummodule/libraryBookRegistrationPage/selectPressTree`, //图书登记出版社
  type:`${url}tibetmuseummodule/libraryBookRegistrationPage/selectAllBookType`, //图书登记书籍类型
};
//图书位置绑定
export const bookLocation = {
  location:`${url}bookcollectionmodule/collectionBing/setBing`, //图书位置绑定
  barcode:`${url}bookcollectionmodule/collectionBing/selectByCode`,//图书位置条码
  tree:`${url}bookcollectionmodule/collectionBing/selectLocationTree`, //图书位置树
};
//图书位置信息
export const bookLocationInfo = {
  LendState:`${url}data/cata/book/booklocation/editLendState`, //上架修改
  select:`${url}data/cata/book/booklocation/select`,//分页查询
};
//藏馆信息
export const libnews = {
  add:`${url}bookmodule/booklib/add`, //藏馆信息
  select:`${url}bookmodule/booklib/select`, //藏馆表格信息
};
//押金记录
export const deposit = {
  table:`${url}tibetmuseummodule/currency/depositRecord/select`,//查询表格
  details:`${url}tibetmuseummodule/currency/depositRecord/selectDetails`,//押金记录详情
  money:`${url}tibetmuseummodule/currency/depositRecord/add`, //押金充值
};
//逾期管路
export const overdue = {
  table:`${url}circulate/circulatelog/expectLog/select`, //逾期查询表格
  phone:`${url}tibetmuseummodule/currency/expectLog/selectUserPhone`, //逾期催还电话
  history:`${url}circulate/circulatelog/expectHistoryLog/select`, //逾期历史记录查询表格
  make:`${url}circulate/circulatelog/expectLog/handle`, //逾期金额处理
  setSelect:`${url}borrowmodule/borrowLog/overdueFunctionSet/select`,//逾期设置查询
  setEdit:`${url}borrowmodule/borrowLog/overdueFunctionSet/edit`//逾期设置修改
};
//借阅记录
export const loan = {
  table:`${url}circulate/circulatelog/borrowlog/select`, //借阅记录表格查询
  history:`${url}circulate/circulatelog/returnlog/select`, //借阅历史记录
};
//失信记录
export const dishonesty = {
  table:`${url}readermodule/loseManagement/loseLog/select`,//失信记录表格查询
  revoke:`${url}readermodule/loseManagement/loseLog/revoke`, //失信撤销操作
  history:`${url}readermodule/loseManagement/loseHistoryLog/select`//失信历史记录
};
//馆内图书类型
/*------ 区域模块 ------*/
//库房模块
var store = url + 'regionmodule/areaManagementPage/store';
export const storeInt = {
  select: `${url}data/cata/dictionaries/areaManagementPage/storeselect`,
  add: `${url}data/cata/dictionaries/areaManagementPage/storead`,
  edit: `${url}data/cata/dictionaries/areaManagementPage/storeedit`,
  delete: `${url}data/cata/dictionaries/areaManagementPage/storedelete`
};
//区模块
var region = url + 'bookcollectionmodule/areaManagementPage/';
export const regionInt = {
  select: `${url}data/cata/dictionaries/areaManagementPage/regionselect`,
  add: `${url}data/cata/dictionaries/areaManagementPage/regionadd`,
  edit: `${url}data/cata/dictionaries/areaManagementPage/regionedit`,
  delete: `${url}data/cata/dictionaries/areaManagementPage/regiondelete`,
  selectBind: `${url}bookcollectionmodule/areaManagementPage/regionselectBind`,
  bind: `${url}bookcollectionmodule/areaManagementPage/regioneditBind`
};
//层架绑定
export const layerFrame = {
  tree:`${url}bookcollectionmodule/layerKidnappingBindingPage/selectTree`, //层架绑定树
  save:`${url}bookcollectionmodule/layerKidnappingBindingPage/edit`, //层架绑定修改
};


/*====== 藏馆系统 ======*/

// 读者卡类型
var cardType = url + 'tibetmuseummodule/readerTbCardTypeinfo/';
export const cardTypeInt = {
  select: `${cardType}select`,
  add: `${cardType}add`,
  edit: `${cardType}edit`,
  delete: `${cardType}delete`
};

/*------ 通用接口 ------*/
// 办卡接口
export const addCardInt = {
  searchId:`${url}readermodule/cardManagement/readerTbCardInfo/currency/selectUserInfoByCard`,
  validateId:`${url}readermodule/cardManagement/readerTbCardInfo/currency/reissueCost`,
  addCard:`${url}readermodule/cardManagement/readerTbCardInfo/add`
};
//通用接口
export const photoUrl = 'http://192.168.2.31'; // 预览图片前缀
export const loginInter = url + 'authmodule/index/login';
export const logoInter = `${url}authmodule/sysSet/select` // 查询系统参数
export const headUpload = imgurl + 'filemodule/uploadImg/addHead'; //
export const roleType = url + 'authmodule/roleInformation/currency/addSelectRole';// 添加权限管理下拉
export const selectRoleType = url + 'authmodule/roleInformation/currency/selectRole'; // 角色管理下拉

// 读者卡信息
export const cardReport = url + 'tibetmuseummodule/readerTbCardInfo/currency/cardReport'; // 挂失
export const cardReissue = url + 'tibetmuseummodule/readerTbCardInfo/currency/cardReissue'; // 补办
// 读者卡等级模块
export const selectEffect = url + 'tibetmuseummodule/readerTbCardGradeinfo/currency/selectEffectiveDropBox'; // 获取未被禁用的 没有被使用的 读者卡等级类型下拉框
export const selectAllDrop = url + 'tibetmuseummodule/readerTbCardGradeinfo/currency/selectAllDropBox'; // 获取所有读者卡等级类型列表下拉框

// 读者卡类型模块
export const readerType = url + 'tibetmuseummodule/readerTbCardTypeinfo/currency/selectEffectiveDropBox'; // 类型 部分
export const levelOption = url + 'tibetmuseummodule/readerTbCardTypeinfo/currency/selectAllDropBox'; //  全部类型
export const unBanOption = url + 'tibetmuseummodule/readerTbCardGradeinfo/currency/selectEffectiveDropBoxAll';  // 所有的 没被禁用的 等级下拉框

//系统管理损坏管理
export const damage={
  select: `${url}data/cata/dictionaries/damage/select`,
  add: `${url}data/cata/dictionaries/damage/add`,
  edit: `${url}data/cata/dictionaries/damage/edit`,
  delete: `${url}data/cata/dictionaries/damage/delete`
};
//寒暑假设置
export const vacation={
  select:`${url}data/cata/dictionaries/holiday/select`,
  add:`${url}data/cata/dictionaries/holiday/add`,
  edit:`${url}data/cata/dictionaries/holiday/edit`,
  delete:`${url}data/cata/dictionaries/holiday/delete`,
};

//充值设置
export const recharge ={
  select:`${url}financemodule/depositRecord/select`,
  add:`${url}financemodule/depositRecord/add`,
  edit:`${url}systemmodule/holiday/edit`,
  logout:`${url}financemodule/readerTbCardLogout/Logout`
};

//书籍典藏
export const collection ={
  select:`${url}bookcollectionmodule/collection/select`,
  add:`${url}bookcollectionmodule/collection/add`,
  edit:`${url}bookcollectionmodule/collection/edit`,
  isbn:`${url}bookcollectionmodule/collection/selectFromCata`,
  state:`${url}bookcollectionmodule/collection/editState`,
  delete:`${url}bookcollectionmodule/collection/delete`,
  letLeave:`${url}bookcollectionmodule/collection/letLeave`,
  harm:`${url}bookcollectionmodule/collection/letLeave`,
  letRemove:`${url}bookcollectionmodule/collection/letRemove`,
  harmSelect:`${url}bookcollectionmodule/collection/getDamage`,
  damage:`${url}bookcollectionmodule/collection/bookDamage`,
  selectFromCataID:`${url}bookcollectionmodule/collection/selectFromCataID`,
  selectCataOrderByID:`${url}bookcollectionmodule/collection/selectCataOrderByID`,
  getAllOrder:`${url}bookcollectionmodule/collection/getAllOrder`,
  getLibName:`${url}bookcollectionmodule/collection/getLibName`,
};

//采购管理
export const purchasing ={
  select:`${url}catamodule/editing/procuremen/select`,
  add:`${url}catamodule/editing/procuremen/add`,
  delete:`${url}catamodule/editing/procuremen/delete`,
  edit:`${url}catamodule/editing/procuremen/edit`,
};


//个人中心
export const PersonalCentre={
  userInfo:`${url}authmodule/personalCore/getNowUser`,
  editPassword:`${url}authmodule/personalCore/editPassword`,
  editUsername:`${url}authmodule/personalCore/editPersonalCenterName`,
  resetPassword:`${url}authmodule/managerInformation/resetPassword`,
  powerZtree:`${url}authmodule/personalCore/getNowUserMenuRole`,
};

//注销记录
export const logOut=url+'financemodule/readerTbCardLogout/select';

//逾期费用记录
export const overdueCostCirculation=url+'financemodule/readetTbOverdueExpensesLog/select';

//个人中心头像修改
export const editHeadPortrait=url+'authmodule/personalCore/editPersonalCenterHeade';
export const editimgFile='http://192.168.2.54:8090/filemodule/showFile/getShow';
// 导出接口
export const deriveInt = {
  select:`${url}data/cata/book/bookcata/getCountByConditon`,
  derive:`${url}data/cata/book/bookcata/getFileUrlByConditon`,
  recommend:`${url}readermodule/recommend/recommendationHis/getFileFormTable`, // 荐购导出
  backlog:`${url}authmodule/bakLog/getFileFormTable`
};
//馆内公告设置
export const libNotice = {
  select:`${url}authmodule/bigData/noticeTbBigDataReferr/select`,
  delete:`${url}authmodule/bigData/noticeTbBigDataReferr/delete`,
  add:`${url}authmodule/bigData/noticeTbBigDataReferr/add`,
};
//书籍审核
export const recommPurchase={
  select:`${url}readermodule/recommend/recommendationLog/select`,//列表查询
  check:`${url}readermodule/recommend/recommendationLog/examin`,//审核
};
//荐购历史记录
export const recommHis=url+'readermodule/recommend/recommendationHis/select';

//数据字典的logo上传接口
export const logoImg=imgurl+'filemodule/uploadImg/addLogo'
