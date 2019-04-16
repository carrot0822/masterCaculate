// 用来管理接口的域名相关
// var url = 'http://192.168.2.31:8099/';
var url = 'http://192.168.2.121:8088/'
var userManage = url + 'authmodule/managerInformation/'
export const headimg = url + 'authmodule/menuInformation/currency/getImg'
export const headUpload = url + 'filemodule/currency/uploadFile/addHead'
export const roleType = url + 'authmodule/roleInformation/currency/addSelectRole'
export const selectRoleType = url + 'authmodule/roleInformation/currency/selectRole'
export const userManageInterface={
    select:`${userManage}select`,
    add:`${userManage}add`,
    edit:`${userManage}edit`,
    delete:`${userManage}delete`,
}

export const login_record = url + "authmodule/authTbManagerLoginLog/select"
export const role_name = url + 'authmodule/roleInformation/currency/select'//角色名称查询
export const command_list = url + 'authmodule/roleMenuElement/select'//权限管理列表
export const prohibit = url + 'authmodule/roleMenuElement/edit'//权限管理禁用
export const batch_Prohibit = url + 'authmodule/roleMenuElement/delete'//权限管理批量禁用
