/*element-ui表单电话格式验证*/
export function isvalidPhone(str) {
  const reg =  /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
  return reg.test(str)
}
export function isvalidNumber(str) {
  const reg =/^[-\\+]?[\\d]*$/
  return reg.test(str)
}
export function isvalidNumber_english(str) {
  const reg =/^[A-Za-z0-9]+$/
  return reg.test(str)
}
