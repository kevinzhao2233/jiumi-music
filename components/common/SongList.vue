<template functional>
  <transition-group
    tag="ul"
    name="flip-list"
    class="k-list-box"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <li class="item" v-for="item in list" :key="item.id">
      <nuxt-link
        class="img"
        :title="item.name"
        :to="{ name: 'singer-id', params: { id: item.id } }"
        :style="{
          background: `url(${item.img1v1Url}?param=130y144)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></nuxt-link>
      <nuxt-link
        class="name"
        :title="item.name"
        :to="{ name: 'singer-id', params: { id: item.id } }"
        >{{ item.name }}</nuxt-link
      >
    </li>
  </transition-group>
</template>

<script>
export default {
  name: 'SongList',

  props: {
    list: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-list-box {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-gap: 24px;
  padding: 0 24px;
  width: 100%;
  color: $mid-10;

  .item {
    margin: 0 0 12px;
    width: 130px;
    height: 190px;
    text-align: center;

    .img {
      display: block;
      width: 130px;
      height: 130px;
      border-radius: 36%;
      box-shadow: 0 12px 24px -4px $mid-6;
      cursor: pointer;

      &:hover {
        & + .name {
          color: $main-6;
        }
      }
    }

    .name {
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $mid-10;
      transition: all 0.2s ease-out;
      cursor: pointer;

      &:hover {
        color: $main-6;
      }
    }
  }
}
</style>
