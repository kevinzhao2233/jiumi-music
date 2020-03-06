<template>
  <swiper class="swiper-box" :options="swiperOption">
    <swiper-slide class="slide-1"></swiper-slide>
    <swiper-slide class="slide-2"></swiper-slide>
    <swiper-slide class="slide-3"></swiper-slide>
    <swiper-slide class="slide-4"></swiper-slide>
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
      swiperOption: {
        loop: true,
        autoplay: true,
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
  height: 360px;

  @include respond-to(lg) {
    width: calc(100vw - 240px);
  }

  .swiper-slide {
    width: 1000px;
    background-repeat: no-repeat;
    background-size: cover;

    &.slide-1 {
      background-image: url('http://p1.music.126.net/1gtmC0J9BmWMSUcMzP2BGg==/109951164773657908.jpg');
    }
    &.slide-2 {
      background-image: url('http://p1.music.126.net/JqHIEytzdtTdb2qsdLfA1g==/109951164775913560.jpg');
    }
    &.slide-3 {
      background-image: url('http://p1.music.126.net/j57dewSnSy9hiSffO9pyfg==/109951164773755426.jpg');
    }
    &.slide-4 {
      background-image: url('http://p1.music.126.net/j57dewSnSy9hiSffO9pyfg==/109951164773755426.jpg');
    }
  }
}
</style>
