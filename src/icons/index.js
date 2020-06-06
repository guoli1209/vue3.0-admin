import Vue from 'vue'
import svgicon from '../icons/SvgIcon'
Vue.component("svg-icon", svgicon)

/**
 * require.context,读取指定目录的所有文件
 * 第一个目录
 * 第二个目录是否遍历子级目录
 * 第三个目录定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
        return requireContext.keys().map(requireContext)
}
requireAll(req)