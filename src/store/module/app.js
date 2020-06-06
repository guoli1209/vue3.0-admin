import { Login } from "@/api/login.js"
import { setToKen, removeToKen, removeUserName, setUserName, getUserName } from "@/utils/cookie.js";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  token: '',
  username: getUserName() || ''
}
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    //html5存储
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state, value) {
    state.token = value
  },
  SET_USERNAME(state, value) {
    state.username = value
  }
}

const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      //接口
      Login(requestData).then((response) => {
        let data = response.data.data
        content.commit('SET_TOKEN', data.token)
        content.commit('SET_USERNAME', data.username)
        setToKen(data.token)
        setUserName(data.username)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  exit({ commit }) {
    return new Promise((resolve, reject) => {
      removeToKen()
      removeUserName()
      commit('SET_TOKEN', '')
      commit('SET_USERNAME', '')
      resolve()
    })

  }
}

const getters = {
  isCollapse: (state) => {
    return state.isCollapse
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}