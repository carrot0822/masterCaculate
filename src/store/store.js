import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const state= {
    token:null,
    user:{},
    menu:{},
    logo:{},
}
const getters={
    userInfo: state =>{
        return state.user
    },
    menu: state => {
        return state.menu
    },
    logo: state =>{
        return state.logo
    }
}
const mutations={
    setToken:(state,data) =>{
        state.token = data
    },
    removeToken:(state) =>{
        sessionStorage.removeItem('token')
        state.token = null
    },
    setUserInfo:(state,data) => {
        state.user = data
    },
    deleteUserInfo:(state) => {
        sessionStorage.removeItem('userInfo')
        state.user = {} // 清空数组
    },
    setMenu:(state,data) =>{
        state.menu = data
    },
    deleteMenu:(state) => {
        sessionStorage.removeItem('menu')
        state.menu = {}
    },
    setLogo:(state,data) =>{
        
        state.logo = data
    },
    loginOut:() =>{
        
    }
}
const actions= {
    userInfo({commit},data){
        commit('setUserInfo',data)
    }
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})