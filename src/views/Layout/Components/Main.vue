<template>
  <div id="main-warp">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '../../../styles/config.css';
#main-warp {
  height: 100vh;
  // position: fixed;
  // top: 75px;
  // left: @navMenu;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // -webkit-box-sizing: border;
  // border-bottom: none;
  // background-color: #fff;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-right: 30px;
  padding-top: @layoutHeader+30;
  padding-left: @navMenu+30;
  .webkit(box-sizing,border-box);
  .webkit(transition,all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
.close {
  .main-content {
    padding-left: @navMenuMin+30;
  }
}
.open {
  .main-content {
    padding-left: @navMenu+30;
  }
}
</style>
