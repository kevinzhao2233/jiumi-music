<template>
  <div class="container">
    <div class="h-banner">
      <Banner />
    </div>
    <div class="h-btn-box">
      <Button />
      <Button type="primary"/>
    </div>
  </div>
</template>

<script>
import Banner from '~/components/explore/Banner.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'Header',
  components: {
    Banner,
    Button,
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.container {
  position: relative;

  .h-btn-box {
    position: absolute;
    display: flex;
    margin: 5px;
    width: 200px;
    height: 32px;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
</style>
