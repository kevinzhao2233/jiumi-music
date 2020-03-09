<template>
  <swiper class="swiper-box" :options="swiperOption" ref="ecSwiper">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <div
        class="img"
        :style="{
          background: `url(${slide})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `url(${slide})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <span class="message" :title="message">{{ message }}</span>
    </swiper-slide>
    <swiper-slide>
      <div
        class="img"
        :style="{
          background: `url()`,
          backgroundColor: '#FFFFFF',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `url()`,
          backgroundColor: '#FFFFFF',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <span class="message">更多歌单…</span>
    </swiper-slide>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'EcSlider',
  data() {
    return {
      swiperSlides: [
        'http://p1.music.126.net/xwSifVHltSiAnPWRUx5M9g==/109951164774509762.jpg?param=124y132',
        'http://p1.music.126.net/vitEGAfsRMKSxSmmSOxaQA==/109951164599819207.jpg?param=124y132',
        'http://p2.music.126.net/j8q43R7jytZnlMtpLeQS6g==/109951164638158913.jpg?param=124y132',
        'http://p2.music.126.net/gsxXUOYDLNj3kbUMY47UTg==/109951164600485943.jpg?param=124y132',
        'http://p2.music.126.net/2OnIs7XHNchCi4MTxSnNCQ==/109951164774767679.jpg?param=124y132',
        'http://p2.music.126.net/j8q43R7jytZnlMtpLeQS6g==/109951164638158913.jpg?param=124y132',
        'http://p2.music.126.net/gsxXUOYDLNj3kbUMY47UTg==/109951164600485943.jpg?param=124y132',
        'http://p2.music.126.net/2OnIs7XHNchCi4MTxSnNCQ==/109951164774767679.jpg?param=124y132',
        'http://p2.music.126.net/gsxXUOYDLNj3kbUMY47UTg==/109951164600485943.jpg?param=124y132',
        'http://p1.music.126.net/xwSifVHltSiAnPWRUx5M9g==/109951164774509762.jpg?param=124y132',
        'http://p1.music.126.net/vitEGAfsRMKSxSmmSOxaQA==/109951164599819207.jpg?param=124y132',
        'http://p2.music.126.net/j8q43R7jytZnlMtpLeQS6g==/109951164638158913.jpg?param=124y132',
        'http://p2.music.126.net/gsxXUOYDLNj3kbUMY47UTg==/109951164600485943.jpg?param=124y132',
        'http://p2.music.126.net/2OnIs7XHNchCi4MTxSnNCQ==/109951164774767679.jpg?param=124y132',
        'http://p2.music.126.net/j8q43R7jytZnlMtpLeQS6g==/109951164638158913.jpg?param=124y132',
        'http://p2.music.126.net/gsxXUOYDLNj3kbUMY47UTg==/109951164600485943.jpg?param=124y132',
        'http://p2.music.126.net/2OnIs7XHNchCi4MTxSnNCQ==/109951164774767679.jpg?param=124y132',
        'http://p2.music.126.net/gsxXUOYDLNj3kbUMY47UTg==/109951164600485943.jpg?param=124y132',
        'http://p1.music.126.net/xwSifVHltSiAnPWRUx5M9g==/109951164774509762.jpg?param=124y132'
      ],
      message: '♪总有一个人，是你耿耿于怀的青春',
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
      }
    }
  },
  methods: {
    handleSwiper(direction) {
      if (direction === 'prev') {
        this.$refs.ecSwiper.swiper.slidePrev()
      } else if (direction === 'next') {
        this.$refs.ecSwiper.swiper.slideNext()
      }
      const swiper = this.$refs.ecSwiper.swiper
      const isBeginning = swiper.isBeginning
      const isEnd = swiper.isEnd
      this.$emit('judge-swiper-state', { isBeginning, isEnd })
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

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
      width: 120px;
      height: 132px;
      border-radius: 8px;
      z-index: 10;
    }

    .img-bg {
      position: absolute;
      margin: 0 20px;
      width: 80px;
      height: 100px;
      top: 40px;
      border-radius: 20%;
      filter: blur(22px) brightness(105%);
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
