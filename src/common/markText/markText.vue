<template>
  <div class="test">
    <a :class="className" class="link--mallki" href="#">
      {{text}}
      <span :data-letters="text"></span>
      <span :data-letters="text" />
    </a>
    <div class="">
      <input type="text" v-model="input" />
      <button @click="open(input)">开启</button>
      <p>结果:{{output}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: "就是测试一下"
    }
  },
  data(){
    return{
      input:"",
      output:'',
    }
  },
  methods:{
    open(str){
      let data = str
      data = this.replaceEmpty2(data);
      this.output = data;

    },
    // 字符串替换
    replaceEmpty1(str){
      const re = / /g
      return str.replace(re,"%20");
    },
    replaceEmpty2(str){
      str = str.split("") // 分割为数组
      let count = 0,i=0,j=0;
      // 计算出字符串中的空格数
      for(let i =0; i<str.length; i++){
        str[i] === " " && ++count; // &&只有前面为真才执行后面的 前面为真返回true
        
      }

      // 创建一个空数组 重新分配内存 存储新元素
      let length = str.length + count * 2;
      let result = new Array(length);
      
      // 循环复制数组 while的好处是 增长条件和跳出可以跟随循环逻辑改变
      // i j是双循环判定条件 一个循环原数组 一个循环新数组 j为主 i递增
     while( i < result.length){
        if(str[j] === " "){
          result[i++] = "%"; // i在运算完后增加了
          result[i++] = "2";
          result[i++] = "0";
          j++;
        } else {
          result[i++] = str[j++]; // 无空格正常进行
        }
      }
      
      return result.join("") // 转为数组;
    },
    // 字符串全排列 

    // 1. 交换置顶索引的两个值
    swap(arr, i, j,) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    },
    // 2. 检测 arr[start, end] 是否有和arr[end]相等的元素
    check(arr, start, end){
      for( let i=start; i<end; ++i){
        if(arr[end] === arr[i] ){
          return false;
        }
      }
      return true; // f返回值为相反怎么回事
    },
    // 开始全排列
    perm(arr=[], n=0){
      const length = arr.length;
      // 递归出口条件
      if(length === n ){
        console.log(arr.join(" "));
        return
      }
    }
  },
  created(){
    console.log(this.replaceEmpty2("we are "))
  }
};
/*
:data-letters 自定义属性 后面可以获取到
*/
</script>
<style scoped>
.link--mallki {
  font-weight: 800;
  font-family: "Dosis", sans-serif;
  line-height: 1;
  outline: none;
  text-decoration: none;
  color: #4dd9d5;
  overflow: hidden;
  position: relative;
  display: inline-block;
  -webkit-transition: color 0.5s 0.25s;
  transition: color 0.5s 0.25s;
}
.link--mallki:hover {
  -webkit-transition: none;
  transition: none;
  color: transparent;
}
.link--mallki::before {
  content: "";
  width: 100%;
  height: 6px;
  margin: -3px 0 0 0;
  background: #3888fa;
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  -webkit-transition: -webkit-transform 0.4s;
  transition: transform 0.4s;
  -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}
.link--mallki:hover::before {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.link--mallki span {
  position: absolute;
  height: 50%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
}
.link--mallki span::before {
  content: attr(data-letters); /*???*/
  color: red;
  position: absolute;
  left: 0;
  width: 100%;
  color: #3888fa;
  -webkit-transition: -webkit-transform 0.5s;
  transition: transform 0.5s;
}
.link--mallki span:nth-child(2) {
  top: 50%;
}

.link--mallki span:first-child::before {
  top: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.link--mallki span:nth-child(2)::before {
  bottom: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

.link--mallki:hover span::before {
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
</style>



