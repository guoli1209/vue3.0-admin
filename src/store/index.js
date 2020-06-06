import Vue from 'vue'
import Vuex from 'vuex'
import app from '../store/module/app'
import login from '../store/module/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    login
  }
})
