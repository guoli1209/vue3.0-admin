import router from './index'
import store from '@/store/index'
import { getToKen, removeToKen, removeUserName } from "@/utils/cookie.js"
/**
 * 白名单 indexOf方法，判断数组中是否存在指定的某个对象，
 * 如果不存在，返回-1
 */
const whiteRouter = ["/login"]
//路由前置守卫
router.beforeEach((to, from, next) => {
        if (getToKen()) {
                if (to.path === "/login") {
                        removeToKen()
                        removeUserName()
                        store.commit("app/SET_TOKEN", '')
                        store.commit("app/SET_USERNAME", '')
                        next()
                } else {
                        next()
                }

                console.log("token存在")
        } else {
                console.log("token不存在")
                if (whiteRouter.indexOf(to.path) !== -1) {
                        console.log("路由存在")
                        next()
                } else {
                        console.log("路由不存在")
                        next("/login")//路由指向
                }
                /**
                  * 1、直接进入index的时候，参数to被改变成了 "/index"，触发路由指向，就会跑beforeEach
                  * 2、再一次 next 指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
                  * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次beforeEach。
                  */
        }

})