import axios from 'axios'
import {LOGOUT} from '../store/mutation-types'
import store from '../store/store'
import router from '../router/router'

var axiosIns = axios.create({
  baseURL: 'http://localhost:9090/',
  withCredentials: true
});

// axiosIns.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

// // http request 拦截器
// axiosIns.interceptors.request.use(
//     config => {
//         if (store.state.login && store.state.userinfo) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `token ${store.state.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// http response 拦截器
axiosIns.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        // 返回 401 清除token信息并跳转到登录页面
        case 403:
          store.commit(LOGOUT)
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })

export default axiosIns
