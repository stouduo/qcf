import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import login from '../components/login/login'
import home from '../components/home/home'
import piclist from '../components/pic/piclist'
import uploadpic from '../components/pic/uploadpic'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: login
  }, {
    path: '/home',
    component: home,
    meta: {
      title: '主页',
    },
    children: [{
      path: 'piclist',
      component: piclist,
      meta: {
        title: '图片列表'
      }
    }, {
      path: 'uploadpic',
      component: uploadpic,
      meta: {
        title: '上传图片'
      }
    }]
  }
]

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next();
    return;
  }
  //获取store里面的token
  let state = store.state;
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

