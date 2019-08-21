<template>
  <div id="pagation">
    <div class="Cx-pagation">
     <div class="">
         
     </div>
      <div class="buttonBox">
        <button @click="frist">
          <span>首页</span>
        </button>
        <button @click="prev">
          <span>上一页</span>
        </button>
        <button @click="next">
          <span>下一页</span>
        </button>
        <button>
          <span @click="last">尾页</span>
        </button>
      </div>
      <div class="jump">
        <input v-model.number="pageInput" class="inputBox" type="text" />
        <span>当前第{{currentPage}}页</span>
         <span>共{{pageMax}}页</span>
        <button @click="jumpBtn">跳转</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        allData:{
            type:Number,
            default:105
        },
        pageSize:{
            type:Number,
            default:10
        },
        current:{
          type:Number,
          default:1
        }
    },
    data(){
        return{
            pageInput:1,
            currentPage:this.current,
            SonPageSize:this.pageSize // 每页显示的个数
        }
    },
    computed:{
        pageMax(){
             let end = Math.ceil(this.allData / this.SonPageSize)
             end  = end?end:1;
            return  end
        } 

    },
    methods:{
        frist(){
            this.currentPage = 1
            console.log('回到首页',this.currentPage)
            this.emitBtn()
        },
        prev(){
            if(this.currentPage > 1){
                --this.currentPage
            } else{
                this.currentPage = 1
            }
            this.emitBtn()
            console.log('上一页',this.currentPage)
        },
        next(){
            if(this.currentPage < this.pageMax){
                ++this.currentPage
            } else{
                this.currentPage = 1
            }
            this.emitBtn()
            console.log('下一页',this.currentPage)
            console.log('最大页码',this.pageMax)
        },
        last(){
          this.currentPage = this.pageMax
          this.emitBtn()
        },
        jumpBtn() {
            if(typeof(this.pageInput) != 'number'){
                this.pageInput =1
            } else {
                this.pageInput = Math.floor(this.pageInput)
                if(this.pageInput < 1){
                  this.pageInput = 1
                }
            }
            this.currentPage = this.pageInput
            this.emitBtn()
            console.log('八成自动转换',this.pageInput,typeof(this.pageInput))
        },
        emitBtn() {
            this.$emit('pageChange',this.currentPage)
        }
    }
};
</script>

<style lang="scss" scoped>

#pagation {
  .Cx-pagation {
    display: flex;
    flex-direction: row;
    .buttonBox {
    }
    .jump {
      .inputBox {
        border: 1px solid #123;
        border-radius: 2px;
        width: 40px;
        margin: 0px 10px 0px 10px;
        text-align: center;
        height: 16px;
      }
    }
    button {
      padding: 1px 10px;
      border: 1px solid #123;
      border-radius: 2px;
      height: 20px;
      margin: 0 5px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: none;
      font-size: 14px;
      &:hover span{
        color: aqua;
      }
    }
  }
}
</style>


