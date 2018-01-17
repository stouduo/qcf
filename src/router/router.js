import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import login from '../components/login/login'

Vue.use(VueRouter);

const routes = [
  {
    path:'/login',
    component:login
  },
]

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
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
        path: '/login',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
});

export default router

