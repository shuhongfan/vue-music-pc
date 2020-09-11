import Vue from 'vue'
import {
  Button,
  container,
  header,
  main,
  footer,
  menu,
  menuItem,
  submenu,
  input,
  row,
  col,
  carousel,
  carouselItem,
  tabs,
  tabPane,
  card,
  pagination,
  table,
  tableColumn,
  Loading,
  tag,
  MessageBox,
  divider,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(container)
Vue.use(header)
Vue.use(main)
Vue.use(footer)
Vue.use(menu)
Vue.use(menuItem)
Vue.use(submenu)
Vue.use(input)
Vue.use(row)
Vue.use(col)
Vue.use(carousel)
Vue.use(carouselItem)
Vue.use(tabs)
Vue.use(tabPane)
Vue.use(card)
Vue.use(pagination)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(Loading)
Vue.use(tag)
Vue.use(divider)

// 将 MessageBox 直接挂在 Vue 实例上
Vue.prototype.$messagebox = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
