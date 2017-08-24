import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 定义数据源，应用初始状态，不能直接改变 store 中的状态
const state = {
  loginUser: JSON.parse(sessionStorage.getItem('loginUser')),
  count: 1
}

// 定义所需的 mutations，用来改变状态的值
const mutations = {
  login(state, data) {
    state.loginUser = data.loginUser;
    sessionStorage.loginUser = JSON.stringify(data.loginUser);
    sessionStorage.userToken = data.userToken;
  },
  logout(state) {
    state.loginUser = null;
    sessionStorage.clear();
  },
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
}

// 创建 store 实例，https://vuex.vuejs.org/zh-cn/state.html
// https://segmentfault.com/a/1190000009404727
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
