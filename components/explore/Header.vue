<template>
  <div class="eh-container">
    <div class="h-banner">
      <Banner :banners="banners" />
    </div>
    <div class="h-btn-box">
      <Button icon="icon-search"/>
      <Button type="primary" />
    </div>
  </div>
</template>

<script>
import Banner from '~/components/explore/Banner.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'Header',
  props: {
    banners: Array
  },
  components: {
    Banner,
    Button
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.eh-container {
  position: relative;
  padding-top: 12px;

  .h-btn-box {
    position: absolute;
    display: flex;
    margin: 30px 48px 0 0;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
</style>
