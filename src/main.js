import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

// 热更新相关配置
if (import.meta.hot) {
  import.meta.hot.accept()
  
  // 当Vue组件更新时
  import.meta.hot.accept(['./App.vue', './router/index.js'], (modules) => {
    if (modules) {
      modules.forEach(module => {
        if (module) {
          app.unmount()
          app.mount('#app')
        }
      })
    }
  })
  
  // 记录热更新状态
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.log('vite hot update...')
  })
}
