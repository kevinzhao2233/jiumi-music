<template>
  <div class="ec-container">
    <Card>
      <h3 class="tit" slot="title">推荐歌单</h3>
      <div class="btn-box" slot="controls">
        <Button
          :type="hasPrev ? 'primary' : ''"
          @has-click="handleClickSwiper('prev')"
          icon="icon-chevron_left"
        />
        <Button
          :type="hasNext ? 'primary' : ''"
          @has-click="handleClickSwiper('next')"
          icon="icon-chevron_right"
        />
      </div>
      <div class="slide-box">
        <EcSlider
          :recommendRes="recommendRes"
          ref="ecSlider"
          @judge-swiper-state="judgeSiperState($event)"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import EcSlider from '~/components/explore/EcSlider.vue';
import Button from '~/components/common/Button.vue';
import Card from '~/components/common/Card.vue';

export default {
  name: 'CenterCard',
  props: {
    recommendRes: Array
  },
  data() {
    return {
      hasNext: true,
      hasPrev: false
    };
  },
  methods: {
    // 点击左右按钮
    handleClickSwiper(direction) {
      if (direction === 'prev') {
        this.$refs.ecSlider.handleSwiper(direction);
      } else if (direction === 'next') {
        this.$refs.ecSlider.handleSwiper(direction);
      }
    },
    // 改变左右切换小按钮的状态
    judgeSiperState({ isBeginning, isEnd }) {
      isBeginning ? (this.hasPrev = false) : (this.hasPrev = true);
      isEnd ? (this.hasNext = false) : (this.hasNext = true);
    }
  },
  components: {
    Button,
    EcSlider,
    Card
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.ec-container {
  margin: 8px auto;
  padding: 0 48px;

  .btn-box {
    display: flex;
  }

  .slide-box {
    width: 100%;
    height: 200px;
  }
}
</style>
