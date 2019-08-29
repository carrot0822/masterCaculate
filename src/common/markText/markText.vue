<template>
  <div class="test">
    <a :class="className" class="link--mallki" href="#">
      {{text}}
      <span :data-letters="text"></span>
      <span :data-letters="text" />
    </a>
    <div class>
      <input type="text" v-model="input" />
      <button @click="open(input)">开启</button>
      <p>结果:{{output}}</p>
    </div>
  </div>
</template>
<script>
import {str} from "./string"
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
  data() {
    return {
      input: "",
      output: "",
      count:0,
    };
  },
  methods: {
    open(str) {
      let data = str;
      this.output = data;
    },
    
    // 字符串全排列

    // 1. 交换置顶索引的两个值
    swap(arr, i, j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    },
    // 2. 检测 arr[start, end] 是否有和arr[end]相等的元素
    check(arr, start, end) {
      for (let i = start; i < end; ++i) {
        if (arr[end] === arr[i]) {
          return false;
        }
      }
      return true; // 
    },
    // 开始全排列
    perm(arr = [], n = 0) {
      
      const length = arr.length;
      // 递归出口条件
      if (length === n) {
        console.log(arr.join(" "));
        this.count++;
        return;
      }

      for (let i = n; i < length; ++i) {
        console.log('递归',i,'结尾',n,'此时的arr',arr);
        if (this.check(arr, n, i)) {
          
          this.swap(arr, n, i);
          this.perm(arr, n + 1);
          this.swap(arr, n, i);
        }
      }
      
    }
  },
  created() {
    //this.perm(["a", "b", "c"], 0);
    console.log("*".repeat(10));
    console.log(str.reverseWord("I am a student."))
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



