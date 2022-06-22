import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入网络配置的文件
import { request } from '@/utils/request.js'
// 导入 store 文件（首字母不能大写，会报错）
import store from '@/store/store.js'
// 导入 Element-ui 文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入公共文件
import '@/common/common.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = request

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
