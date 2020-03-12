<template>
  <swiper class="swiper-box" :options="swiperOption" ref="bannerSwiper">
    <swiper-slide
      v-for="(slide, index) in banners"
      :key="index"
      :style="{
        background: `url(${slide.imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }"
    ></swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Banner',
  props: {
    banners: Array,
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: true,
        centeredSlides: true,
        spaceBetween: 30,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
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
  width: 1000px;
  height: 388px;

  @include respond-to(lg) {
    width: calc(100vw - 240px);
  }

  .swiper-slide {
    width: 1000px;
    height: 388px;
    border-radius: 16px;
    cursor: pointer;
  }
}
</style>
