import Vue from 'vue'
{{#isEnabled plugins 'axios'}}
import axios from 'axios'
{{/isEnabled}}

import App from './App'
{{#isEnabled plugins 'vue-router'}}
import router from './router'
{{/isEnabled}}
{{#isEnabled plugins 'vuex'}}
import store from './store'
{{/isEnabled}}

import ElementUI from 'element-ui'
import 'basscss/css/basscss.min.css'
import 'colors.css/css/colors.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import 'assets/style/tables.css'
import 'assets/style/base.css'

{{#isEnabled plugins 'vue-electron'}}
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
{{/isEnabled}}
{{#isEnabled plugins 'axios'}}

Vue.http = Vue.prototype.$http = axios
{{/isEnabled}}
Vue.config.productionTip = false

Vue.use(ElementUI, {})
window.ondragover = (e) => { e.preventDefault(); return false }
window.ondrop = (e) => { e.preventDefault(); return false }
/* eslint-disable no-new */
new Vue({
  components: { App },
  {{#isEnabled plugins 'vue-router'}}
  router,
  {{/isEnabled}}
  {{#isEnabled plugins 'vuex'}}
  store,
  {{/isEnabled}}
  template: '<App/>'
}).$mount('#app')
