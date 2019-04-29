 url='http://192.168.2.31:8088/'
//url='http://192.168.2.121:8088/';
//
/*登陆页面接口*/
  loginurl=url+'authmodule/index/login' ;//登陆接口
  yzmurl=url+'authmodule/index/imgVerification?' ;//验证码接口
  rowurl=url+'authmodule/index/getRow' ;//登陆次数接口
/*菜单页面接口*/
  menuselecturl=url+'authmodule/menuInformation/select' ;//菜单查询接口
  menuaddurl=url+'authmodule/menuInformation/add' ;//菜单添加接口
  menudeleteurl=url+'authmodule/menuInformation/delete' ;//菜单删除接口
  menuediturl=url+'authmodule/menuInformation/edit' //菜单修改接口
  menutypeurl=url+'basemodule/currency/sysTbDictCode/select' //菜单类型接口
  menuimg=url+'filemodule/currency/uploadFile/addHead' //图片上传接口
  menugetimg=url+'authmodule/menuInformation/currency/getImg?id='//图片显示
  menubutton=url+'authmodule/menuInformation/currency/selectMenuById' //点击节点发请求
/*角色页面接口*/
  userroleselect=url+'authmodule/roleInformation/select' //角色管理查询
  userroleadd=url+'authmodule/roleInformation/add' //角色添加接口
  userrole=url+'authmodule/roleInformation/currency/addSelectRole'//上级下拉框查询接口
  userroleedit=url+'authmodule/roleInformation/edit' //角色修改接口
  userroledelete=url+'authmodule/roleInformation/delete' //角色批量删除接口


/*图书出版社页面接口*/
  bookurlselect=url+'bookmodule/bookTbPress/select'//图书出版社初始化查询接口
  bookurlcity=url+'bookmodule/bookTbPress/selectCity ' //图书出版社城市信息
  bookpublishhouse=url+'bookmodule/bookTbPress/add' //图书出版社添加信息
  cityselect=url+'bookmodule/bookTbPress/select' //城市信息查询表格
/*图书类型接口*/
  bookurltype=url+'bookmodule/bookTbType/select' //图书类型表格接口
/*图书信息页面接口*/
  bookurlmessage=url+'bookmodule/bookTbInfo/select' //图书信息表格接口
  bookurltypemes=url+'bookmodule/bookTbType/selectAllBookType' //图书信息类型名称下拉接口
  bookurlimg=url+'filemodule/currency/uploadFile/addBackage' //图书封面上传
  bookurladd=url+'bookmodule/bookTbInfo/add' //图书添加接口
/*馆内图书信息*/
  libbook=url+'tibetmuseummodule/TbookTbInfo/select' //馆内图书信息查询
  libbookadd=url+'tibetmuseummodule/TbookTbInfo/add' //馆内图书信息添加
  libbookedit=url+'tibetmuseummodule/TbookTbInfo/edit' //馆内图书信息修改下架状态
  libbooktype=url+'tibetmuseummodule/TbookTbType/select' //馆内图书类型查询
/*图书登记*/
  bookRegist=url+'tibetmuseummodule/TbookTbInfo/selectOne' //图书登记ISBN接口查详情
  bookRegistadd=url+'tibetmuseummodule/TbookTbInfo/add' //图书登记添加
  bookRegistlib=url+'tibetmuseummodule/TbookTbPress/select' //图书登记出版社
  bookRegisttype=url+'tibetmuseummodule/TbookTbType/selectAllBookType' //图书登记书籍类型
/*权限页面*/
  controlurl=url+'authmodule/currency/getAllMenuAndElement'
  controladd=url+'authmodule/roleMenuElement/edit' //权限添加
/*层架绑定*/
  layerFramezTree=url+'regionmodule/location/selectTree' //层架绑定树
  layerFrameSave=url+'regionmodule/location/edit' //层架绑定修改
/*图书位置绑定*/
  booklocation=url+'tibetmuseummodule/bookRFID/add' //图书位置绑定
  booklocationbarcode=url+'tibetmuseummodule/TbookTbInfo/selectOneT'//图书位置条码
  booklocationztree=url+'regionmodule/location/selectTree' //图书位置树
/*藏馆信息*/
  libinfo=url+'bookmodule/booklib/add' //藏馆信息
  libinfotable=url+'bookmodule/booklib/select' //藏馆表格信息
/*押金记录*/
  depositRecord=url+'tibetmuseummodule/currency/depositRecord/select'//查询表格
  depositDetails=url+'tibetmuseummodule/currency/depositRecord/selectDetails'//押金记录详情
  depositMoney=url+'tibetmuseummodule/currency/depositRecord/add' //押金充值
/*逾期记录*/
  overdueRecords=url+'tibetmuseummodule/currency/expectLog/select' //逾期查询表格
  overduePhone=url+'tibetmuseummodule/currency/expectLog/selectUserPhone' //逾期催还电话
  overdueHistory=url+'tibetmuseummodule/currency/expectHistoryLog/select' //逾期历史记录查询表格
  overdueMoney=url+'tibetmuseummodule/currency/expectLog/overdueMon' //逾期金额查询
  overduemake=url+'tibetmuseummodule/currency/expectLog/handle' //逾期金额处理
/*借阅记录*/
  loanrecord=url+'borrowmodule/log/select' //借阅记录表格查询
  loanHistory=url+'borrowmodule/history/select' //借阅历史记录
/*借书*/
  borrowBook=url+'borrowmodule/InAndOut/out'//借书
