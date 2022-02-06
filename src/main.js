import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import music from 'vue-music-notation'
import { note, interval, distance, Scale } from "@tonaljs/tonal"

Vue.config.productionTip = false
Vue.use(music)

Vue.prototype.$note = note
Vue.prototype.$nointervalte = interval
Vue.prototype.$distance = distance
Vue.prototype.$Scale = Scale

new Vue({
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
