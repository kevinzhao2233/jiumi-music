<template>
  <div class="box">
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.box {
  // 页面总宽大于1240，则铺满，小于1240不进行缩小（保证绝大多数屏幕可用即可）
  width: 1240px;
  min-height: 100vh;
  background-color: $aux-1;

  @include respond-to(lg) {
    width: 100%;
  }
}
</style>
