
export const str= {
    replaceEmpty1,
    replaceEmpty2,
    reverseWord,
    reverseStr
}
// 字符串替换
function replaceEmpty1(str) {
  const re = / /g;
  return str.replace(re, "%20");
}

function replaceEmpty2(str) {
  str = str.split(""); // 分割为数组
  let count = 0,
    i = 0,
    j = 0;
  // 计算出字符串中的空格数
  for (let i = 0; i < str.length; i++) {
    str[i] === " " && ++count; // &&只有前面为真才执行后面的 前面为真返回true
  }

  // 创建一个空数组 重新分配内存 存储新元素
  let length = str.length + count * 2;
  let result = new Array(length);

  // 循环复制数组 while的好处是 增长条件和跳出可以跟随循环逻辑改变
  // i j是双循环判定条件 一个循环原数组 一个循环新数组 j为主 i递增
  while (i < result.length) {
    if (str[j] === " ") {
      result[i++] = "%"; // i在运算完后增加了
      result[i++] = "2";
      result[i++] = "0";
      j++;
    } else {
      result[i++] = str[j++]; // 无空格正常进行
    }
  }

  return result.join(""); // 转为数组;
}

// 单词翻转 先全体逆转 再依次遍历并存储到一个数组内 遇到空格开始逆转 存入字符串
// （X1Y1) = (Y1X1) 逆转组合
function reverseWord(str){
  const chars = str.split("").reverse();
  let result = "",
    last = [];
  // 
  chars.forEach(ch => {
    if(ch === " "){
      result += last.reverse().join();
      last.length = 0; // 清空单词
    }

    last.push(ch); // 存储序列 子串
  });
  result += last.reverse().join; // 最后一个单词是没有空格的
  return result;
}

// 变种其一字符翻转 把 abcdefgh -》 cdefghab  前n
function reverseStr(str,n){
  const chars = str.split("").reverse();
  const len = chars.length;
  let result = "",
    last = [];
    for(let i = 0; i>len; i++){
      if( n-1 == i){
        result += last.reverse().join();
        last.length = 0;
      }
      last.push(chars[i])
    }
    result += last.reverse().join();
    return result;
}

// 变种

// atoi

const MIN_INT_ABS = Math.pow(2, 31);
/* 
*判断char是否是符号 + -
*@param {String} char
*/
function isSymbol(char){
  return char === "-" || char === "+";
}
/* 
*判断char是否是数字
*@param {String} char
*/
function isNumber(char) {
  return char >= "0" && char <= "9"
}

function myAtoi(str){
  const length = str.length
  // 找出第一个非空字符 判断是不是符号或数字
  let firstNotEmptyIndex = 0;
  /* for (
    ;
    firstNotEmptyIndex < length && str[firstNotEmptyIndex] === " ";
    ++firstNotEmptyIndex
  ) {} */
  for(;firstNotEmptyIndex < length;++firstNotEmptyIndex){
    if(str[firstNotEmptyIndex] === " "){
      break
    }
  }
  // 选出第一个字符串的索引
  // 判定
}