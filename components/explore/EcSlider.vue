<template>
  <swiper class="swiper-box" :options="swiperOption" ref="ecSwiper">
    <swiper-slide v-for="slide in recommendRes" :key="slide.id">
      <nuxt-link
        class="img"
        :to="{ name: 'playlist-id', params: { id: slide.id } }"
        :style="{
          background: `center / cover url(${
            slide.picUrl
              ? slide.picUrl.replace(/^http:/,'https:')
              : slide.coverImgUrl.replace(/^http:/,'https:')
          }?param=120y132) no-repeat`
        }"
      ></nuxt-link>
      <div
        class="img-bg"
        :style="{
          background: `center / cover url(${
            slide.picUrl
              ? slide.picUrl.replace(/^http:/,'https:')
              : slide.coverImgUrl.replace(/^http:/,'https:')
          }?param=120y132) no-repeat`
        }"
      ></div>
      <nuxt-link
        class="message"
        :title="slide.name"
        :to="{ name: 'playlist-id', params: { id: slide.id } }"
        >{{ slide.name }}</nuxt-link
      >
    </swiper-slide>
    <swiper-slide>
      <nuxt-link :to="{ name: 'playlist' }" class="img more"></nuxt-link>
      <div class="img-bg more"></div>
      <nuxt-link :to="{ name: 'playlist' }" class="message">更多歌单…</nuxt-link>
    </swiper-slide>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'EcSlider',
  props: {
    recommendRes: Array
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 0,
        allowTouchMove: false,
        slidesPerView: 'auto',
        slidesPerGroup: 7,
        loopFillGroupWithBlank: true
      },
      resizeTimer: null // 计时器(函数防抖用)
    };
  },
  methods: {
    /**
     * 点击左右按钮
     */
    handleSwiper(direction) {
      if (direction === 'prev') {
        this.$refs.ecSwiper.swiper.slidePrev();
      } else if (direction === 'next') {
        this.$refs.ecSwiper.swiper.slideNext();
      }
      this.updateSwiperState();
    },
    /**
     * 更新轮播状态
     */
    updateSwiperState() {
      if (this.$refs.ecSwiper.swiper) {
        const swiper = this.$refs.ecSwiper.swiper;
        const isBeginning = swiper.isBeginning;
        const isEnd = swiper.isEnd;
        this.$emit('judge-swiper-state', { isBeginning, isEnd });
      }
    },
    // resize 的时候，函数防抖
    resizeWin() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.updateSwiperState();
      }, 400);
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    this.updateSwiperState();
    window.addEventListener('resize', this.resizeWin);
  },
  updated() {
    this.updateSwiperState();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeWin);
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.swiper-box {
  width: 1000px - 96px;
  height: 184px;

  @include respond-to(lg) {
    width: calc(100vw - 240px - 96px);
  }

  .swiper-slide {
    margin-right: 24px;
    width: 120px;
    height: 100%;
    text-align: center;
    cursor: pointer;

    .img {
      position: relative;
      display: block;
      width: 120px;
      height: 132px;
      border-radius: 8px;
      z-index: 10;

      &.more {
        background: 100% / cover url('~static/img/moreThing.png') no-repeat;
      }
    }

    .img-bg {
      position: absolute;
      margin: 0 20px;
      width: 80px;
      height: 100px;
      top: 36px;
      border-radius: 20%;
      filter: blur(20px);

      &.more {
        background: 100% / cover url('~static/img/moreThing.png') no-repeat;
      }
    }

    .message {
      display: inline-block;
      margin: 8px 0 0 0;
      font-size: 14px;
      color: $mid-8;
      transition: color 0.2s ease;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
    }

    &:hover {
      .message {
        color: $main-6;
      }
    }
  }
}
</style>
