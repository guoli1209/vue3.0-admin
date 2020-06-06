<template>
  <svg :class="svgClass" aria-hidder="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { reactive, ref, onMounted, computed } from '@vue/composition-api'
export default {
  name: 'svgIcon',
  //   props: ['iconClass', 'className'],简单的写法
  props: {
    iconClass: {
      type: String, //定义接收值的类型
      default: ''
    },
    className: {
      type: String, //定义接收值的类型
      default: ''
    }
  },
  setup(props, { root }) {
    const msg = ref('手把手撸码前端')
    /**
     * 计算属性，得出最终结果，并返回
     */
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`
    })
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return `svg-icon`
      }
    })
    return {
      msg,
      iconName,
      svgClass
    }
  }
}
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
