<template>
  <div :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader></LayoutHeader>
    <LayoutNav></LayoutNav>
    <LayoutMain></LayoutMain>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from '@vue/composition-api'
import LayoutHeader from '../Layout/Components/Header'
import LayoutNav from '../Layout/Components/Nav'
import LayoutMain from '../Layout/Components/Main'
export default {
  name: 'layout',
  components: {
    LayoutHeader,
    LayoutNav,
    LayoutMain
  },
  setup(props, { root }) {
    const menuStatus = computed(() => {
      return root.$store.state.app.isCollapse
    })
    return {
      menuStatus
    }
  }
}
</script>

<style lang="less" scoped></style>
