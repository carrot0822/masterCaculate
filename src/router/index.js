import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/components/home'
import UserManage from '../components/Power/userManage.vue'
import UserRole from '../components/Power/userRole.vue'
import PowerControl from '../components/Power/powerControl.vue'
import Menu from '../components/Power/menu.vue'
import LoginRecord from '../components/Power/loginrecord.vue'




import StoneRoomInfo from '../components/Area/areaManage/stoneroomaInfo.vue'


import GetCard from '../components/Reader/ReaderManagement/getAcard.vue'




import ReaderCardManagement from '../components/Reader/ReaderCardManagement/readerCardmanagement.vue'

import ReaderCardGrade from '../components/Reader/ReaderCardManagement/readerCardgrade'
import LoanRecorde from '../components/Circulate/loanRecords.vue'
import LoanHistory from '../components/Circulate/loanHistory.vue'
import BorrowingBooks from '../components/Circulate/borrowingBooks.vue'




import OverdueHistory from '../components/Reader/OverdueManagement/overduehistory.vue'

import DishonestyRecords from '../components/Reader/DishonestyManagement/dishonestyRecords'
import DishonestyHistory from '../components/Reader/DishonestyManagement/dishonestyHistory'
import Login from '@/components/login.vue'


import Not from '../components/error.vue'

import IndexTest from '../common/indexTest.vue'


import {
  resolve
} from 'upath';
Vue.use(Router)
// 暴露一个router对象
/*导航守卫 */

export default new Router({
  //mode:history,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '/',
      redirect: '/indexTest'
    },
    {
      path: '/test',
      component: () => import('../common/markText/markText.vue')
    },

    {
      path: '/login',
      component: Login
    },
    {
      path: '/userInfo',
      meta: {
        title: '个人中心'
      },
      component: resolve => require(['../components/userInfo.vue'], resolve)
    },


    {
      path: '/indexTest',
      meta: {
        title: '测试首页'
      },
      component: IndexTest,

      children: [
        /*------ 资料管理 ------*/
        // 书籍管理
        {
          path: '/BookCataloging',
          meta: {
            title: '书籍编目',
            Mode: '1'
          },
          component: resolve => require(['../components/Book/BookCataloging.vue'], resolve)
        },
        {
          path: '/uploadBook',
          meta: {
            title: '书籍编目导入',
            Mode: '1'
          },
          component: resolve => require(['../common/upload/uploadBook.vue'], resolve)
        },
        {
          path: '/BookCollection',
          meta: {
            title: '书籍典藏',
            Mode: '1'
          },
          component: resolve => require(['../components/Book/BookCollection.vue'], resolve)
        },
        {
          path: '/damageCount',
          meta: {
            title: '书籍清点',
            Mode: '1'
          },
          component: resolve => require(['../components/Book/damageCount.vue'], resolve)
        },
        {
          path: '/checkDetails/:id',
          meta: {
            title: '书籍损坏清点详情',
            Mode: '1'
          },
          component: resolve => require(['../components/Book/DamageIinventoryDetails.vue'], resolve)
        },
        {
          path: '/BookLocationInformation',
          meta: {
            title: '图书位置信息',
            Mode: '1'
          },
          component: resolve => require(['../components/Reader/libraryManage/BookLocationInformation.vue'], resolve)
        },
        // 期刊管理
        {
          path: '/magazineLog',
          meta: {
            title: '期刊编目',
            Mode: '1'
          },
          component: () => import('@/components/magazine/indexCatalog.vue')
        },
        {
          path: '/uploadCataLog',
          meta: {
            title: '期刊编目导入',
            Mode: '1'
          },
          component: () => import("@/components/magazine/uploadCataLog.vue")
        },
        {
          path: '/magazineReserve',
          meta: {
            title: '期刊典藏',
            Mode: '1'
          },
          component: () => import('@/components/magazine/indexcataAdd.vue')
        },
        {
          path: '/magazineMerge',
          meta: {
            title: '过刊合订',
            Mode: '1'
          },
          component: () => import('@/components/magazine/merge.vue')
        },
        {
          path: '/indexNumber/:id',
          meta: {
            title: '期刊号',
            Mode: '1'
          },
          component: () => import('../components/magazine/indexNum.vue')
        },
        {
          path: '/indexDamageCount',
          meta: {
            title: '期刊清点',
            Mode: '1'
          },
          component: () => import('@/components/magazine/indexDamege.vue')
        },
        {
          path: '/indexCheckDetails/:id',
          meta: {
            title: '期刊清点详情',
            Mode: '1'
          },
          component: () => import("@/components/magazine/damageDatail.vue")
        },
        {
          path: '/magazinePos',
          meta: {
            title: '期刊位置信息',
            Mode: '1'
          },
          component: resolve => require(['../components/magazine/positionMes.vue'], resolve)
        },
        // 数据字典
        {
          path: '/publishhouse',
          meta: {
            title: '图书出版社',
            Mode: '1'
          },
          component: resolve => require(['../components/Book/Bookpublish.vue'], resolve)
        },
        {
          path: '/vacationSet',
          meta: {
            title: '假期设置',
            Mode: '1'
          },
          component: resolve => require(['../components/System/vacation.vue'], resolve)
        },
        {
          path: '/damageSet',
          meta: {
            title: '损坏设置',
            Mode: '1'
          },
          component: resolve => require(['../components/System/damage.vue'], resolve)
        },
        {
          path: '/library',
          meta: {
            title: '馆藏地',
            Mode: '1',
          },
          component: () => import('../components/magazine/library.vue')
        },
        {
          path: '/stoneroomInfo',
          meta: {
            title: '区域管理',
            Mode: '1'
          },
          component: StoneRoomInfo
        },
        {
          path: '/baseData',
          meta: {
            title: '初始参数',
            Mode: '1'
          },
          component: resolve => require(['../components/System/baseData.vue'], resolve)
        },
        /*------ 流通管理 ------*/
        {
          path: "/borrowingbooks",
          name: 'borrow',
          meta: {
            title: '书籍借阅',
            Mode: '2',
            isAlive: true
          },
          component: BorrowingBooks,
        },
        {
          path: "/returnbooks",
          name: 'return',
          meta: {
            title: '书籍归还',
            Mode: '2',
            isAlive: true
          },
          component: () => import('../components/Circulate/returnBooks.vue')
        },
        {
          path: "/returnstatus",
          meta: {
            title: '还书结果',
            Mode: '2',
            isAlive: true
          },
          component: () => import('../components/Circulate/returnStatus.vue')
        },
        {
          path: '/renew',
          name: 'renew',
          meta: {
            title: '书籍续借',
            Mode: '2',
            isAlive: true
          },
          component: resolve => require(['@/components/Circulate/renew.vue'], resolve)
        },
        {
          path: '/bookDamage',
          name: 'damage',
          meta: {
            title: '书籍报损',
            Mode: '2',
            isAlive: true
          },
          component: resolve => require(['@/components/Circulate/bookDamage.vue'], resolve)
        },

        {
          path: '/loanrecorde',
          meta: {
            title: '借书记录',
            Mode: '2'
          },
          component: LoanRecorde,
        },
        {
          path: '/loanhistory',
          meta: {
            title: '还书记录',
            Mode: '2'
          },
          component: LoanHistory,
        },
        {
          path: '/reimburse',
          meta: {
            title: '报损记录',
            Mode: '2'
          },
          component: resolve => require(['@/components/Circulate/damageCount'], resolve)
        },
        {
          path: '/reimburseHistory',
          meta: {
            title: '报损历史记录',
            Mode: '2'
          },
          component: resolve => require(['@/components/Circulate/damageCotHis.vue'], resolve)
        },
        {
          path: '/overduerecords',
          component: resolve => require(['@/components/Reader/OverdueManagement/overdueRecords.vue'], resolve),
          meta: {
            title: '逾期记录',
            Mode: '2'
          }
        },
        {
          path: "/overduehistory",
          component: OverdueHistory,
          meta: {
            title: '逾期历史记录',
            Mode: '2'
          }
        },
        {
          path: '/appoinment',
          meta: {
            title: '预约记录',
            Mode: '2'
          },
          component: () => import('@/components/Opac/appoinment.vue')
        },
        {
          path: '/appoinmentHis',
          meta: {
            title: '预约历史记录',
            Mode: '2'
          },
          component: () => import('@/components/Opac/appointedHis.vue')
        },
        
        /*------ 读者管理 ------*/
        {
          path: '/readerInfo',
          meta: {
            title: '读者信息',
            Mode: '3'
          },
          component: () => import('../components/Opac/readInfo.vue')
        },
        {
          path: '/readercardmanagement',
          meta: {
            title: '读者卡管理',
            Mode: '3'
          },
          component: ReaderCardManagement,
        },
        {
          path: '/readercardgrade',
          component: ReaderCardGrade,
          meta: {
            title: '读者卡等级',
            Mode: '3'
          }
        },
        {
          path: '/DishonestyRecords',
          component: DishonestyRecords,
          meta: {
            title: '失信记录',
            Mode: '3'
          }
        },
        {
          path: '/DishonestyHistory',
          component: DishonestyHistory,
          meta: {
            title: '失信历史记录',
            Mode: '3'
          }
        },
        {
          path: '/recommendationLog',
          meta: {
            title: '荐购审核',
            Mode: '3',
          },
          component: () => import('../components/System/recommendedPurchase.vue')
        },
        {
          path: '/recommendationHis',
          meta: {
            title: '荐购历史记录',
            Mode: '3',
          },
          component: () => import('../components/System/recommendedHis.vue')
        },
        {
          path: '/getcard',
          name: "GetCard",
          component: GetCard,
          meta: {
            title: '办卡'
          },
        },

        /*------ 财务管理 ------*/
        {
          path: '/rechargeSet',
          meta: {
            title: '充值管理',
            Mode: '4'
          },
          component: resolve => require(['../components/Finance/recharge.vue'], resolve)
        },
        {
          path: '/orderNum',
          meta: {
            title: "异常订单",
            Mode: "4"
          },
          component: () => import("../components/Finance/orderNum.vue")
        },
        {
          path: '/orderNumHis',
          meta: {
            title: "订单记录",
            Mode: "4"
          },
          component: () => import("../components/Finance/orderNumHis.vue")
        },
        {
          path: '/OverdueCostCirculation',
          meta: {
            title: '逾期费用记录',
            Mode: '4'
          },
          component: resolve => require(['../components/System/OverdueCostCirculation.vue'], resolve)
        },
        {
          path: '/logOut',
          meta: {
            title: '注销记录',
            Mode: '4'
          },
          component: resolve => require(['../components/System/logOut.vue'], resolve)
        },

        {
          path: '/refunds',
          meta: {
            title: '押金充值',
            Mode: '4'
          },
          component: resolve => require(['../components/Finance/refunds.vue'], resolve)
        },
        {
          path: '/logoff',
          meta: {
            title: '注销页面',
            Mode: '4'
          },
          component: resolve => require(['../components/Finance/logoff.vue'], resolve)
        },
        {
          path: '/logoffEnd',
          meta: {
            title: '注销结果',
            details: true
          },
          component: resolve => require(['../components/Finance/logoffEnd.vue'], resolve)
        },
        {
          path: '/refundsEnd/:card',
          meta: {
            juge: false,
            title: '充值结果'
          },
          component: resolve => require(['../components/Finance/refundsEnd.vue'], resolve)
        },
        /*------ 系统管理 ------*/
        {
          path: '/sysSet',
          meta: {
            title: '系统设置',
            Mode: '5',
          },
          component: () => import('../components/System/systemSet.vue')
        },
        {
          path: '/recommandBook',
          meta: {
            title: '图书推荐',
            Mode: '5',
          },
          component: () => import('../components/System/DataSetting.vue')
        },
        {
          path: '/recommandVideo',
          meta: {
            title: '馆内视频设置',
            Mode: '5',
          },
          component: () => import('../components/System/videoSetting.vue')
        },
        {
          path: '/recommandNotice',
          meta: {
            title: '馆内公告设置',
            Mode: '5',
          },
          component: () => import('../components/System/noticeSetting.vue')
        },



        {
          path: '/ActiveList',
          meta: {
            title: '公告列表',

          },
          component: () => import('../components/System/ArticeList.vue')
        },
        // 备份模块
        {
          path: '/backLog',
          meta: {
            title: '备份日志',
            Mode: "5"
          },
          component: () => import('../components/Opac/backLog.vue')
        },
        {
          path: '/backlogEdit',
          meta: {
            title: '备份管理',
            Mode: "5"
          },
          component: () => import('../components/Opac/backlogEdit.vue')
        },
        {
          path: '/indexTest',
          meta: {
            title: '首页'
          },
          component: Home
        },
        {
          path: '/guideTest',
          meta: {
            title: '系统管理引导页',
            Mode: '5',

          },
          component: resolve => require(['../common/guide/guide.vue'], resolve)
        },
        {
          path: '/menuInformation',
          meta: {
            title: '菜单管理',
            Mode: '5'
          },
          component: Menu
        },
        {
          path: '/roleMenuElement',
          meta: {
            title: '权限管理',
            Mode: '5'
          },
          component: PowerControl
        },
        {
          path: '/roleInformation',
          meta: {
            title: '角色管理',
            Mode: '5'
          },
          component: UserRole
        },
        {
          path: '/managerInformation',
          meta: {
            title: '用户管理',
            Mode: '5',
            menuCode: 'managerInformation'
          },
          component: UserManage
        },
        {
          path: '/authTbManagerLoginLog',
          meta: {
            title: '登录记录',
            Mode: '5'
          },
          component: LoginRecord
        },
        {
          path: '/noticeSet',
          meta: {
            title: '公告管理',
            Mode: '5'
          },
          component: resolve => require(['../components/System/notice.vue'], resolve)
        },
      
        
        {
          path: '/publisher',
          meta: {
            title: '文章发布'
          },
          component: resolve => require(['../common/test/editor.vue'], resolve)
        },
        {
          path: '/editor/:id',
          meta: {
            title: '文章编辑'
          },
          component: resolve => require(['../common/test/editorFix.vue'], resolve)
        },
        {
          path: '/article/:id',
          meta: {
            title: '文章详情'
          },
          component: resolve => require(['../components/System/article.vue'], resolve)
        },
        

          /*废弃 */

          {
            path: '/bookLocation',
            meta: {
              title: '图书位置绑定',
              Mode: '2'
            },
            component: resolve => require(['../components/Reader/libraryManage/bookLocation.vue'], resolve)
          },
  
  
          {
            path: '/purchasingManagement',
            meta: {
              title: '采购管理',
              Mode: '1'
            },
            component: resolve => require(['../components/Book/purchasingManagement.vue'], resolve)
          },

      ]
    },
    {
      path: '*',
      component: Not
    }
  ]
})
