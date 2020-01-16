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
