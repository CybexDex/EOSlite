import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Element, { size: 'small' })
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'cn',
  fallbackLocale: 'cn',
  messages: {
    'en': require('../locales/en.json'),
    'cn': require('../locales/cn.json')
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')
