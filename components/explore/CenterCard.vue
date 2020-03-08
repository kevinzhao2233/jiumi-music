<template>
  <div class="ec-container">
    <div class="header">
      <h3 class="tit">推荐歌单</h3>
      <div class="btn-box">
        <Button
          :type="hasPrev ? 'primary' : ''"
          @has-click="handleClickSwiper('prev')"
        />
        <Button
          :type="hasNext ? 'primary' : ''"
          @has-click="handleClickSwiper('next')"
        />
      </div>
    </div>
    <div class="slide-box">
      <EcSlider ref="ecSlider" @judge-swiper-state="judgeSiperState($event)" />
    </div>
  </div>
</template>

<script>
import EcSlider from '~/components/explore/EcSlider.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'CenterCard',
  data() {
    return {
      hasNext: true,
      hasPrev: false
    }
  },
  methods: {
    // 点击左右按钮
    handleClickSwiper(direction) {
      if (direction === 'prev') {
        this.$refs.ecSlider.handleSwiper(direction)
      } else if (direction === 'next') {
        this.$refs.ecSlider.handleSwiper(direction)
      }
    },
    // 改变左右切换小按钮的状态
    judgeSiperState({ isBeginning, isEnd }) {
      isBeginning ? (this.hasPrev = false) : (this.hasPrev = true)
      isEnd ? (this.hasNext = false) : (this.hasNext = true)
    }
  },
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
