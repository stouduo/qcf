import {
  RECORD_USERINFO,
  GET_USERINFO,
  LOGOUT
} from './mutation-types.js'

import {setStore, getStore, removeStore} from '../util/util'


export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('user', info);
  },
  //获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    }
    ;
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info};
    } else {
      state.userInfo = null;
    }
  },
  //退出登录
  [LOGOUT](state) {
    removeStore('user');
    state.userInfo = {};
    state.login = false;
  }

}
