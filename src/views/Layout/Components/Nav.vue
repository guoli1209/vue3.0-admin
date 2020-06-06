<template>
  <div id="nav-warp">
    <h1 class="logo">
      <img src="@/assets/images/logo.png" alt="" />
    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu :key="item.id" :index="index + ''" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >
            {{ subItem.meta.name }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  isRef,
  toRefs,
  computed
} from '@vue/composition-api'
export default {
  name: 'navMenu',
  setup(props, { root }) {
    /**
     * data数据
     */
    // const isCollapse = ref(false)
    const routers = reactive(root.$router.options.routes)
    console.log(routers)
    /**
     * computed 监听计算属性
     */
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse
    })

    return {
      isCollapse,
      routers,
      computed
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/config.css';
#nav-warp {
  position: fixed;
  top: 0;
  left: 0;
  width: @navMenu;
  height: 100vh;
  background-color: #344a5f;
  .webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .logo {
    img {
      margin: auto;
      widows: 92px;
      .webkit(transition, all 0.3s ease 0s);
    }
  }
}
.el-menu {
  border-right: none;
}
.close {
  #nav-warp {
    width: @navMenuMin;
  }
  .logo {
    img {
      margin: auto;
      width: 70%;
    }
  }
}
.open {
  #nav-warp {
    width: @navMenu;
  }
}
</style>
