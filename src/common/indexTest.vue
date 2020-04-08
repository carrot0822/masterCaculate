<template>
  <div id="index" class="index">
    <section style="height:100%">
      <!-- 头部组件 -->
      <!-- 1.0头部模块 -->
      <el-header class="headmode" style="font-size: 12px">
        <!-- logo模块 logo图片载入 附加路由调转至首页 -->
        <div class="logoNav">
          <div v-if="!logo" id="logoBox" class="logoBox">
            <img class="logo" :src="logoNomalUrl" />
            <span @click="skip" class="Logotext">{{nomalName}}</span>
          </div>
          <div v-if="logo" id="logoBox" class="logoBox">
            <img class="logo" :src="logoUrl" />
            <span @click="skip" class="Logotext">{{systemName}}</span>
          </div>
          <!-- 头部导航模块 路由添加尚未完成 active驻留模块未完成 -->
          <div id="navBar" class="navBar" style="overflow: hidden">
            <el-menu
              text-color="#fff"
              mode="horizontal"
              @select="handleSelect"
              background-color="#0096ff"
              :default-active="Mode"
              v-if="menuLo.length"
            >
              <el-menu-item
                v-for="(item,index) of menuLo"
                :index="'' + item.priority"
                :id="item.menuCode"
                :key="index"
              >{{item.menuName}}</el-menu-item>
            </el-menu>
          </div>
        </div>

        <!-- 用户头像模块 点击交互功能尚未完成 小图标添加及相应功能 -->
        <div id="userName" class="headBox">
          <div class="headiconBox">
            <img :src="headSrc" class="avatarImg" />
          </div>
          <div class="userBox">
            <div class="username">
              <span class="nameText" v-if="!userLo">...</span>
              <span class="nameText" v-if="userLo">{{userLo.username}}</span>

              <!-- 下拉点击路由跳转 -->
              <div class="userDrop">
                <span @click="toCenter" class="dropItem">个人中心</span>
                <router-link to="/borrowingbooks" tag="span" class="dropItem">书籍借阅</router-link>
                <router-link to="/returnbooks" tag="span" class="dropItem">书籍归还</router-link>
                <span @click="rechargeBtn" class="dropItem">押金充值</span>
                <span @click="cardBtn" class="dropItem">卡号注销</span>
                <router-link to="/getCard" tag="span" class="dropItem">用户办卡</router-link>
                <span @click="loginOut" class="dropItem">账号退出</span>
              </div>
            </div>
            <!-- <i class="notice"></i>
            <i class="set"></i>-->
          </div>
        </div>
      </el-header>
      <!-- 2.0 二层路由 导航模块 -->
      <el-container>
        <section class="nav" style="background-color: #343B4A;">
          <!-- 侧边栏主体 -->
          <el-menu
            @select="routerBox"
            class="content"
            router
            :default-active="this.$route.path"
            background-color="#343B4A"
            text-color="#fff"
            :collapse="isCollapse"
            v-if="menuLo.length"
            :unique-opened="true"
          >
            <el-menu-item index="/indexTest">
              <i class="indexIcon indexIconMax iconxiazai45"></i>
              <span style="lineHeight:21px;">首页</span>
            </el-menu-item>
            <!--采编管理 -->
            <NavMenu
              v-for="(item,index) of menuLo"
              v-show="Mode==item.priority"
              :key="index"
              :navMenus="item.roleModularMenus"
            ></NavMenu>
          </el-menu>
        </section>
        <el-main>
           <div class="mb_10 tagsBox">
            <Tags></Tags>
          </div>
          <!-- <div class="space"></div> -->
          <div class="scrollBox">
            <el-scrollbar style="height:100%;">
				<!--
              <transition name="fade-transform" mode="out-in">
                <router-view></router-view>

              </transition>
			  -->
			  <transition name="fade-transform" mode="out-in">
			      <keep-alive>
			        <router-view v-if="$route.meta.isAlive"></router-view>
			      </keep-alive>
			  </transition>
			  <transition name="fade-transform" mode="out-in">
			        <router-view v-if="!$route.meta.isAlive"></router-view>
			  </transition>
            </el-scrollbar>


          </div>

          <!-- <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <router-view v-if="$route.meta.isAlive"></router-view>
              </keep-alive>
          </transition>
          <transition name="fade-transform" mode="out-in">
                <router-view v-if="!$route.meta.isAlive"></router-view>
          </transition>-->
        </el-main>
      </el-container>
    </section>
  </div>
</template>

<script>
import { uploadInt, PersonalCentre } from "@request/api/base.js";
import axios from "axios";
import NavMenu from "../common/test/NavMenu";
import Tags from "../common/test/tags";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Mode: "",
      navRouter: [],
      menuLo: [],
      userLo: null,
      nomalHeader: require("../base/img/normalHead.jpg"), // 默认头像
      logoNomalUrl: require("../base/img/logo.png"),
      nomalName: "图书馆管理平台",
      settingHead: "",
      isCollapse: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.Mode = key;
      sessionStorage.setItem("headIndex", key);
      console.log(key, keyPath);
    },
    routerBox(index, indexPath) {
      console.log(index);
      console.log(indexPath);
    },
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    skip() {
      this.$router.push({ path: "/" });
    },
    toCenter() {
      this.$router.push({ path: "/userInfo" });
    },
    loginOut() {
      this.$store.commit("removeToken");
      this.$store.commit("deleteUserInfo");
      this.$store.commit("deleteMenu");
      this.$router.push("/login");
    },
    rechargeBtn() {
      this.$router.push("/refunds");
    },
    cardBtn() {
      this.$router.push("/logoff");
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", ""); // 把斜杠都替换为空白
    },
    headSrc() {
      let src =
        this.settingHead === "" || this.settingHead === null
          ? this.nomalHeader
          : this.settingHead;
      return src;
    },
    ...mapGetters(["logo"]),
    logoUrl() {
      return this.logo.manageSystemLogoAddress;
    },
    systemName() {
      return this.logo.manageSystemName;
    }
  },
  components: {
    NavMenu,
    Tags
  },
  mounted() {
    console.log("头像", this.logo);
  },
  created() {
    axios.get(PersonalCentre.userInfo).then(res => {
      console.log("看看bug到底在哪里", res);

      if (res.data.state == true) {
        this.userLo = res.data.row;
        if (res.data.row.headerAddress) {
          this.settingHead = uploadInt.preimg + res.data.row.headerAddress;
        }
      } else {
        this.$message.error(res.data.msg);
      }
    });
    //this._getLogo();
    let menu = JSON.parse(sessionStorage.getItem("menu"));
    this.menuLo = menu;
    this.Mode = sessionStorage.getItem("headIndex");
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.fullPath == "/indexTest") {
        return;
      }
      if (!newValue.meta.Mode) {
        console.log("????");
      } else {
        this.Mode = newValue.meta.Mode;
        sessionStorage.setItem("headIndex", newValue.meta.Mode);
      }

      console.log("现在的路由", newValue.meta.Mode);
    }
  }
};
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
}
#index {
  height: 100vh;
  overflow: hidden;
}
.scrollBox {
  height: calc(100vh - 180px);
}
.index {
  height: 100%;
}
.index .title {
  font-size: 14px;
  text-align: center;
  background-color: #545c64;
  padding: 20px 0;
  color: #fff;
}
.index .el-container {
  /*vh好用 100%不行*/
  min-height: 100vh;
}
.content {
  width: 260px;
}
/*====== 头部区域Column  ======*/
.index .headmode {
  background: #0096ff;
  color: #333;
  height: 70px !important;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding-right: 20px !important;
  padding-left: 0px !important;
}
.headmode .logoNav {
  display: flex;
  flex-direction: row;
}
/*logo区域*/
/* 应该可以点击回到首页 */
.headmode .logoBox {
  width: 260px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #fff;
  font-size: 20px;
  font-family: MicrosoftYaHei;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 78px;
  cursor: pointer;
  background-color: #0096ff;
}
.headmode .logoBox .logo {
  width: 34px;
  height: 34px;
}
/*头部nav区域*/
.nav {
  max-width: 260px;
}
.block {
  height: 20px;
  background-color: #343b4a;
  width: 260px;
}
.headmode .navBar {
  display: flex;
  align-items: center;
}
.headmode .navBar .el-menu-item {
  width: 140px;
  height: 36px;
  background: #2bcbff;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;
}

/*修改默认样式 傻逼样式*/

/* 头像区域 */

.headmode .headBox {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0096ff;
}
.headBox .headiconBox {
  width: 40px;
  height: 40px;
  border-radius: 50%;

  margin-right: 10px;
  cursor: pointer;
}
.headBox .headiconBox img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.headBox .userBox {
  display: flex;
  align-items: center;
}
.headBox .username {
  font-size: 18px;
  color: #ffffff;
  margin-right: 10px;
  padding-right: 25px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 65px;
}
/* 下拉框 */
.headBox .username .userDrop {
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  top: 60px;
  right: 0px;
  display: none;
  z-index: 6666;
}
.headBox .username:hover .userDrop {
  display: block;
}
.username .userDrop .dropItem {
  display: block;
  color: #878787;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  padding: 0 17px;
  min-width: 90px;
  box-sizing: border-box;
}
.username .userDrop .dropItem:last-child {
  border-radius: 0 0 10px 10px;
}
.username .userDrop .dropItem:hover {
  background-color: #0096ff;
  color: #fff;
}
.headBox .username::before {
  content: "";
  position: absolute;
  right: 0px;
  top: 28px;
  border: 8px solid transparent;
  border-top: 8px solid #fff;
  cursor: pointer;
}
/*====== body部分 ======*/
/*侧边导航部分*/
.navMenu {
}
.nav .iconpath {
  margin-right: 15px;
}
.nav .activeMenu::after {
  content: "";
  position: absolute;
  transition: all 0.5s;
}

.el-menu-item.activeMenu.is-active::after {
  content: "";
  position: absolute;
  top: 0px;
  right: -8px;
  width: 8px;
  height: 55px;
  background: #ffba00;
}
/*待定 改成动画移动效果*/
.nav .activeMenu:hover::after {
  content: "";
  position: absolute;
  top: 0px;
  right: -8px;
  width: 8px;
  height: 55px;
  background: #ffba00;
}

/*====== 图标类 可能后期需要更换 ======*/

.Logotext {
  line-height: 26px;
  margin-left: 10px;
  max-width: 230px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.notice {
  background-image: url("../base/img/normal/email-icon.png");
  background-repeat: no-repeat;
  background-position-y: 0px;
  width: 28px;
  height: 22px;
  display: inline-block;
  margin-right: 15px;
}
.set {
  background-image: url("../base/img/normal/Layer.png");
  background-repeat: no-repeat;
  width: 28px;
  height: 22px;
  display: inline-block;
}
.space {
  background-color: #ebf7ff;
  height: 30px;
}

.move-enter-active,
.move-leave-active {
  transition: opacity 0.5s;
}

.move-enter,
.move-leave {
  opacity: 0;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.nameText {
  display: inline-block;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

<style>
#navBar .el-menu-item {
  margin: 0 10px;
}
#index .el-scrollbar__wrap{
  overflow-x: hidden!important;
}
</style>
