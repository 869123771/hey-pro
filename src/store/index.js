import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './module/app'
import user from './module/user'
import permission from "./module/permission";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  getters,
  actions: {
  },
  modules: {
    app,
    user,
    permission
  }
})
