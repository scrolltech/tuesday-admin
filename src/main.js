/* eslint-disable */

import Vue from 'vue'

import './plugins/vuetify'

import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'
import { getCookie } from './utils'

import Config from './config'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const sessionCookie = getCookie(Config.SessionCookieName)
  if (to.path === '/login' && sessionCookie) {
    next({
      path: '/publication'
    })
  } else {
    if (to.matched.some(route => route.meta.protected)) {
      if (!sessionCookie) {
        next({
          path: '/login'
        });
      } else {
        next()
      }
    } else {
      next();
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
