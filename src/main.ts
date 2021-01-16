import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入element
import element from './plugins/element'
// 导入request
import request from '@/utils/request'

const app = createApp(App)
element(app)
app.config.globalProperties.$axios = request

app
  .use(store)
  .use(router)
  .mount('#app')
