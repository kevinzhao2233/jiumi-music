<template>
  <div class="ec-container">
    <div class="header">
      <h3 class="tit">推荐歌单</h3>
      <div class="btn-box">
        <Button/>
        <Button type="primary"/>
      </div>
    </div>
    <div class="slide-box">
      <EcSlider />
    </div>
  </div>
</template>

<script>
import EcSlider from '~/components/explore/EcSlider.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'CenterCard',
  components: {
    Button,
    EcSlider
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.ec-container {
  margin: 8px auto;
  padding: 0 48px;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 18px 0;
    width: 100%;

    .tit {
      font-weight: 600;
      letter-spacing: 2px;
    }

    .btn-box {
      display: flex;
    }
  }

  .slide-box {
    width: 100%;
    height: 200px;
  }
}
</style>
