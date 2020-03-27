<template>
  <swiper class="swiper-box" :options="swiperOption" ref="ecSwiper">
    <swiper-slide v-for="slide in recommendRes" :key="slide.id">
      <div
        class="img"
        :style="{
          background: `url(${slide.picUrl}?param=120y132)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
        @click="goPlaylistDetail(slide.id)"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `url(${slide.picUrl}?param=120y132)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <span class="message" :title="slide.name" @click="goPlaylistDetail(slide.id)">{{
        slide.name
      }}</span>
    </swiper-slide>
    <swiper-slide>
      <nuxt-link :to="{ name: 'playlist' }" class="img more"></nuxt-link>
      <div class="img-bg more"></div>
      <nuxt-link :to="{ name: 'playlist' }" class="message">更多歌单…</nuxt-link>
    </swiper-slide>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'EcSlider',
  props: {
    recommendRes: Array
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 16,
        allowTouchMove: false,
        slidesPerView: 'auto',
        slidesPerGroup: 7,
        loopFillGroupWithBlank: true,
        breakpoints: {
          1240: {
            slidesPerView: 7,
            spaceBetween: 16
          }
        }
      },
      resizeTimer: null // 计时器
    }
  },
  methods: {
    handleSwiper(direction) {
      if (direction === 'prev') {
        this.$refs.ecSwiper.swiper.slidePrev()
      } else if (direction === 'next') {
        this.$refs.ecSwiper.swiper.slideNext()
      }
      this.updateSwiperState()
    },
    // 更新轮播状态
    updateSwiperState() {
      if (this.$refs.ecSwiper.swiper) {
        const swiper = this.$refs.ecSwiper.swiper
        const isBeginning = swiper.isBeginning
        const isEnd = swiper.isEnd
        this.$emit('judge-swiper-state', { isBeginning, isEnd })
      }
    },
    goPlaylistDetail(id) {
      this.$router.push({ name: 'playlist-id', params: { id: id } })
    },
    // resize 的时候，函数防抖
    resizeWin() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
      }
      this.resizeTimer = setTimeout(() => {
        this.updateSwiperState()
      }, 400)
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    this.updateSwiperState()
    window.addEventListener('resize', this.resizeWin)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeWin)
  }
}
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
    width: 116px;
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
      top: 40px;
      border-radius: 20%;
      filter: blur(22px) brightness(105%);

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
