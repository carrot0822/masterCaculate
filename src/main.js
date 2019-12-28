import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/base/css/reset.css'
import '../src/base/css/zyf.css'
import '../src/base/css/common.css'
import '../src/base/css/spReset.css'
import axios from 'axios'
import '../src/base/js/yf/jquery'
import '../src/base/js/yf/jquery.flot'
import '../src/base/js/yf/validate'
import "./zTree_v3/js/jquery.ztree.core.min"
import "./zTree_v3/js/jquery.ztree.excheck.min.js"
import './zTree_v3/js/jquery.ztree.exedit.min'
import './zTree_v3/js/jquery.ztree.exhide.min'
//css
import '../src/base/css/video-js.min.css'
import '../src/base/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Message
} from 'element-ui'
import './base/iconfont/iconfont.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '../src/base/css/font.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import messageFix from './mess'
Vue.config.productionTip = false
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = sessionStorage.getItem('token')
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  let menu = JSON.parse(sessionStorage.getItem('menu'))
  let logo = JSON.parse(sessionStorage.getItem('logo'))
  if(to.path === '/login'){
    if(token&&userInfo&&menu){ // token存在的话 如果是刷新的话 应该去本地或者session里面取 这里应该提提示
      if(store.state.token == null){ // 还有个bug
        store.commit('setUserInfo', userInfo)// 刷新后拉取用户信息
        store.commit('setMenu', menu)
        store.commit('setLogo', logo)
        console.log('去往',to.path)
        console.log('来源',from.path)
      }
      next(from.path)
      NProgress.done()
    } else { // token不存在
      next()
    }
  } else{
    if(token&&userInfo&&menu) {
      if(store.state.token == null) {
        store.commit('setToken', token) // 刷新后再次给予token
        store.commit('setUserInfo', userInfo)// 刷新后拉取用户信息
        store.commit('setMenu', menu)
      }
      if(store.state.user == null) {
        store.commit('setUserInfo', userInfo)// 刷新后拉取用户信息
      }
      if(store.state.menu == null){
        store.commit('setMenu', menu)
      }
      store.commit('setLogo', logo)
      next()

    }else{
      Message.error("请先登录");
      next('/login')
      NProgress.done()
    }

  }
})
router.afterEach(() => {

  NProgress.done()
})

Vue.use(ElementUI) // 注册插件
// vuerouter会自动调用 这就是可以直接this.$router.push的根本？
Vue.prototype.axios = axios // 挂载到vue实例 注册到vue实例中
Vue.prototype.messageFix = messageFix
/* eslint-disable no-new */
// 这里挂载的原因是？
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
