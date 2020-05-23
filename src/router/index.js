import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      components: Login
    }
  ]
})
