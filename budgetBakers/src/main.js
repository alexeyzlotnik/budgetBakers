import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import VueMyToasts from 'vue-my-toasts'
import ToastNotification from './components/ToastNotification.vue'

import './assets/main.css'

const app = createApp(App)
import store from './store/authStore'

app.use(router)
app.use(store)
app.use(VueMyToasts, {
  component: ToastNotification,
  options: {
    width: '400px',
    position: 'bottom-right',
    padding: '1rem'
  }
})
app.mount('#app')
