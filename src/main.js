// 导入vue
import Vue from 'vue'
// 导入app根组件
import App from './App.vue'
// 导入路由
import router from './router'
// 导入elementui
import './plugins/element.js'
// 导入vuex
import store from './store'
// 重置css样式
import 'normalize.css/normalize.css'
// 导入通用样式
import './assets/css/common.css'
// 导入字体图标
import './assets/icon/iconfont.css'
// 导入moment
import moment from 'moment'

// 全局导入axios
import axios from 'axios'
axios.defaults.baseURL = 'https://autumnfish.cn/'
Vue.prototype.axios = axios

// 定义时间过滤器
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})
Vue.filter('timeformat', (dataStr, pattern = 'mm:ss') => {
  return moment(dataStr).format(pattern)
})

// vue全局注册加载
Vue.prototype.openLoading = function () {
  const loading = this.$loading({
    lock: true,
    text: '正在加载...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.3)',
    target: '.sub-main',
    body: true,
    customClass: 'mask'
  })
  return loading
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
