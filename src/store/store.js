import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  userInfo: null, //用户信息
  login: false,//是否登录
}

let store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition(state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
});
store.registerModule('piclist', {
  state: {
    checkAll: false,
    del: false,
    showBottom: false,
    delCount:0
  },
  mutations: {
    updateCheckAll(state, status) {
      state.checkAll = status.checkAll;
    },
    updateDel(state, status) {
      state.del = status.del;
    },
    updateShowBottom(state, status) {
      state.showBottom = status.showBottom;
    }
  },
});

export default store
