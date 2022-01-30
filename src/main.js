import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import music from 'vue-music-notation'

Vue.config.productionTip = false
Vue.use(music)

new Vue({
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
