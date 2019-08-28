
export const str= {
    replaceEmpty1,
    replaceEmpty2,
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

