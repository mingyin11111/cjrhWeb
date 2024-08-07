import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Student from '@/components/Student'
import config from '@/components/config'
import Login from '@/components/Login'
import VueXStore from '@/components/VueXStore'
import "babel-polyfill"

import loading from '@//components/CustomComponets/Organize_Choose.js'   // 自定义组件 选择人员组件
Vue.use(loading);                             // 自定义组件 选择人员组件

Vue.prototype.$IsWebIndex = '0';
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/Web/indexFrame'),
      children: [
        {
          path: '/Web/Index',
          component: () => import('@/components/Web/index'),
        },
        {
          path: '/Web/Login',
          component: () => import('@/components/Web/Login'),
        },
        {
          path: '/Web/ChangePWD',
          component: () => import('@/components/Web/ChangePWD'),
        },
        {
          path: '/Web/Need/NeedList',
          component: () => import('@/components/Web/Need/NeedList'),
        },
        {
          path: '/Web/Need/Publish',
          component: () => import('@/components/Web/Need/Publish'),
        },
        {
          path: '/Web/MyCenter/MyCenter',
          component: () => import('@/components/Web/MyCenter/MyCenter'),
        },
        {
          path: '/Web/MyCenter/MySubmit',
          component: () => import('@/components/Web/MyCenter/MySubmit'),
        },
        {
          path: '/Web/MyCenter/ViewMyNeed',
          component: () => import('@/components/Web/MyCenter/ViewMyNeed'),
        },
        {
          path: '/Web/MyCenter/EditMyNeed',
          component: () => import('@/components/Web/MyCenter/EditMyNeed'),
        },
        {
          path: '/Web/Need/NeedSubmit',
          component: () => import('@/components/Web/Need/NeedSubmit'),
        },
        {
          path: '/Web/InformationPublish/InformationShow',
          component: () => import('@/components/Web/InformationPublish/InformationShow'),
        },
        {
          path: '/Web/InformationPublish/InformationDetail',
          component: () => import('@/components/Web/InformationPublish/InformationDetail'),
        },
        {
          path: '/Web/InformationPublish/InformationDetail_School',
          component: () => import('@/components/Web/InformationPublish/InformationDetail_School'),
        },
        {
          path: '/Web/InformationPublish/InformationDetail_Company',
          component: () => import('@/components/Web/InformationPublish/InformationDetail_Company'),
        },
        
        {
          path: '/Web/Resource/ResourceList',
          component: () => import('@/components/Web/Resource/ResourceList'),
        },
        {
          path: '/Web/Resource/ResourceView',
          component: () => import('@/components/Web/Resource/ResourceView'),
        },
        {
          path: '/Web/Resource/ReourceAdd',
          component: () => import('@/components/Web/Resource/ReourceAdd'),
        },
        {
          path: '/Web/Register/Register_Choose',
          component: () => import('@/components/Web/Register/Register_Choose'),
        },
        {
          path: '/Web/Register/Register_School',
          component: () => import('@/components/Web/Register/Register_School'),
        },
        {
          path: '/Web/Register/Register_Company',
          component: () => import('@/components/Web/Register/Register_Company'),
        },
        {
          path: '/Web/Competition/CompetitionList',
          component: () => import('@/components/Web/Competition/CompetitionList'),
        },
        {
          path: '/Web/Competition/ShowContent',
          component: () => import('@/components/Web/Competition/ShowContent'),
        },
        
        
      ]
    },

    {
      path: '/Login',
      component: Login
    },
    {
      path: '/main',
      component: () => import('@/components/main'),
    }
    , {
      path: '/ManagerIndex',
      component: Index,
      children: [
        {
          path: '/student',
          component: Student
        },
        {
          path: '/config',
          component: config
        }, {
          path: '/home',
          component: () => import('@/components/home')
        }, {
          path: '/VueXStore',
          component: VueXStore
        }
        , {
          path: '/Manager/RoleManager',
          component: () => import('@/components/Manager/RoleManager'),
        },
        {
          path: '/Manager/RoleConfig/:RoleID',
          component: () => import('@/components/Manager/RoleConfig'),
        },
        {
          path: '/Manager/RoleMemberManager/:RoleID/:RoleName',
          component: () => import('@/components/Manager/RoleMemberManager'),
        },
        {
          path: '/Manager/Organize',
          component: () => import('@/components/Manager/Organize'),
        },
        {
          path: '/Manager/Module',
          component: () => import('@/components/Manager/Module'),
        }, {
          path: '/Manager/Module',
          component: () => import('@/components/Manager/Module'),
        },
        {
          path: '/Manager/UnitManager/UnitSchool',
          component: () => import('@/components/Manager/UnitManager/Unit_School'),
        },
        {
          path: '/Manager/UnitManager/UnitCompany',
          component: () => import('@/components/Manager/UnitManager/Unit_Company'),
        },
        {
          path: '/Manager/MemberManager',
          component: () => import('@/components/Manager/MemberManager'),
        },
        {
          path: '/Manager/InformationPublish/InformationPublish',
          component: () => import('@/components/Manager/InformationPublish/InformationPublish'),
        },
        {
          path: '/Manager/InformationPublish/InformationPublishDetail',
          component: () => import('@/components/Manager/InformationPublish/InformationPublishDetail'),
        },
        {
          path: '/Manager/NeedManager/NeedList',
          component: () => import('@/components/Manager/NeedManager/NeedList'),
        },
        {
          path: '/Manager/NeedManager/NeedDetail',
          component: () => import('@/components/Manager/NeedManager/NeedDetail'),
        },
        {
          path: '/Manager/ResourceManager/ResourceList',
          component: () => import('@/components/Manager/ResourceManager/ResourceList'),
        },
        {
          path: '/Manager/Competition/CompetitionList',
          component: () => import('@/components/Manager/Competition/CompetitionList'),
        },
        {
          path: '/Manager/Competition/Add',
          component: () => import('@/components/Manager/Competition/Add'),
        },
       
        
        
      ]
    }

  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {

    if(to.path.startsWith('/Web/inde'))
    {
      Vue.prototype.$IsWebIndex='1'; // 标记是否为首页
    }
    else
    {
      Vue.prototype.$IsWebIndex='0';
    }

  if (to.path.startsWith('/Web/')) {
    next();
  }
  else if (to.path === '/static') {
    next();
  } 
 else if (to.path === '/Login') {
    next();
  } else {
    let token = localStorage.getItem('Token') + "";
    if (token === null || token == '' || token.length < 5) {
      next('/Login');
    } else {
      next();
    }
  }
});


export default router;
