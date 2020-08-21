import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'

import 'buefy/dist/buefy.css'
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-balham.css"

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  render: function (h) { 
    return h(App) 
  },
}).$mount('#app')