import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import login from '../components/login/login'
import home from '../components/home/home'
import piclist from '../components/pic/piclist'
import anonymous from '../components/pic/anonymous'
import uploadpic from '../components/pic/uploadpic'
import {getStore} from "../util/util";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: login
  }, {
    path: '/anonymous',
    component: anonymous
  }, {
    path: '/home',
    component: home,
    meta: {
      title: '主页',
      requiresAuth: true
    },
    children: [{
      path: 'piclist',
      component: piclist,
      meta: {
        title: '图片列表',
        requiresAuth: true,
      }
    }, {
      path: 'uploadpic',
      component: uploadpic,
      meta: {
        title: '上传图片',
        requiresAuth: true
      }
    }]
  }
]

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  let user = getStore('user');
  if (user) {
    store.state.userInfo = user;
    store.state.login = !!user;
  }
  //获取store里面的token
  let state = store.state;
  if (to.path == '/') {
    if (state.userInfo && state.login) {
      next('/home');
    } else {
      next();
      return;
    }
  }
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (state.userInfo && state.login) {
      next();
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
});

export default router

