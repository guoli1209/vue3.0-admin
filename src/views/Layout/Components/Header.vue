<template>
  <div id="header-warp">
    <div class="pull-left header-icon" @click="navMenuStatus">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info  pull-left">
        <img src="@/assets/images/face.jpg" alt="" />
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'headers',
  setup(props, { root }) {
    /**
     * 声明函数
     */
    const navMenuStatus = () => {
      return root.$store.commit('app/SET_COLLAPSE')
    }
    const username = computed(() => {
      return root.$store.state.app.username
    })
    //退出
    const exit = () => {
      return root.$store.dispatch('app/exit').then(() => {
        root.$router.push('/login')
      })
    }

    return {
      navMenuStatus,
      username,
      exit
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/config.css';
#header-warp {
  position: fixed;
  top: 0;
  left: @navMenu;
  right: 0;
  height: 75px;
  background-color: #fff;
  .webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  line-height: 75px;
  .webkit(transition, all 0.3s ease 0s);
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: solid 1px #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
.close {
  #header-warp {
    left: @navMenuMin;
  }
}
.open {
  #header-warp {
    left: @navMenu;
  }
}
</style>
