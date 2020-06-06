const state = {
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
}
const mutations = {
        SET_COLLAPSE(state) {
                state.isCollapse = !state.isCollapse
                //html5存储
                sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
        }
}

const actions = {
        login(content, requestData) {
                return new Promise((resolve, reject) => {
                        //接口
                        Login(resolve).then((response) => {
                                resolve(response)
                        }).catch((error) => {
                                reject(error)
                        })
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