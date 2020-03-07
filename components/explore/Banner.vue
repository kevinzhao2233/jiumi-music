<template>
  <swiper class="swiper-box" :options="swiperOption">
    <swiper-slide
      v-for="(slide, index) in swiperSlides"
      :key="index"
      :style="{
        background: `url(${slide})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }"
    ></swiper-slide>
    <div
      class="swiper-pagination swiper-pagination-white"
      slot="pagination"
    ></div>
    <div
      class="swiper-button-prev swiper-button-white"
      slot="button-prev"
    ></div>
    <div
      class="swiper-button-next swiper-button-white"
      slot="button-next"
    ></div>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Banner',
  data() {
    return {
      swiperSlides: [
        'http://p1.music.126.net/1gtmC0J9BmWMSUcMzP2BGg==/109951164773657908.jpg',
        'http://p1.music.126.net/DNyjJ6nqdbgdzABu6Ff_Dw==/109951164776971148.jpg',
        'http://p1.music.126.net/DNyjJ6nqdbgdzABu6Ff_Dw==/109951164776971148.jpg',
        'http://p1.music.126.net/1gtmC0J9BmWMSUcMzP2BGg==/109951164773657908.jpg'
      ],
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
