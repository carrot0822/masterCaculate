  export function filterStr(str, number) {
    if(!str){
      let str = ''
      return str
    }
    let len = str.length
    let result = str
    let limit = number - 4
    if (len > limit) {
      result = str.slice(0, limit) + '...'
    }
    return result
  }

  export function objClear(obj) {
    for (let key in obj) {
      obj[key] = ''
    }
  }



  export function format(obj,fmt){
    var o = {
        "M+" : obj.getMonth()+1,                 //月份
        "d+" : obj.getDate(),                    //日
        "h+" : obj.getHours(),                   //小时
        "m+" : obj.getMinutes(),                 //分
        "s+" : obj.getSeconds(),                 //秒
        "q+" : Math.floor((obj.getMonth()+3)/3), //季度
        "S"  : obj.getMilliseconds()             //毫秒
      };
    
      if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (obj.getFullYear()+"").substr(4 - RegExp.$1.length));
      }
            
      for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(
            RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
        }       
      }
    
      return fmt;
}
var testData = new Date('2020-05-02T16:00:00.000Z')
console.log(format(testData,'yyyy-MM-dd'))