<template>
  <div class="box">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="main">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.box {
  width: 100%;
  min-height: 100vh;
  display: flex;

  .sidebar {
    flex: 0 0 240px;
    background-color: $mid-1;
  }

  .main {
    // 页面总宽大于1240，则铺满，小于1240不进行缩小（保证绝大多数屏幕可用即可）
    flex: 0 0 1000px;
    background-color: $aux-1;

    @include respond-to(lg) {
      flex: 1;
    }
  }
}
</style>
