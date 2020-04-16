<template>
  <div class="main-container">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="main">
      <nuxt />
    </div>
    <div class="bottom">
      <Player />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/sidebar';
import Player from '~/components/player/index.vue';

export default {
  components: {
    Sidebar,
    Player
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.main-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  overflow: hidden;

  .sidebar {
    flex: 0 0 240px;
    width: 240px;
    height: 100vh;
    background-color: $mid-1;
  }

  .main {
    // 页面总宽大于1240，则铺满，小于1240不进行缩小（保证绝大多数屏幕可用即可）
    flex: 0 0 1000px;
    background-color: $aux-1;
    overflow: hidden;

    @include respond-to(lg) {
      flex: 1;
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 1240px;
    height: 80px;
    background-color: $mid-1;
    box-shadow: 0 4px 24px $mid-5;
    z-index: 100;

    @include respond-to(lg) {
      width: 100%;
    }
  }
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 3px;
}
</style>
