import Vue from 'vue'
import VueRouter from 'vue-router'
import {constantRouterMap} from './router'

Vue.use(VueRouter)

export default new VueRouter({
  routes : constantRouterMap
})

