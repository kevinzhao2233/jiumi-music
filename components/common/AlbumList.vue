<template>
  <ul class="k-list-box">
    <li class="item" v-for="item in list" :key="item.id">
      <div
        class="img"
        :title="item.name"
        :style="{
          background: `url(${item.picUrl}?param=130y130)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <span class="name" :title="item.name">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SongList',

  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-list-box {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-gap: 24px;
  width: 100%;
  color: $mid-10;

  .item {
    margin: 0 0 12px;
    width: 130px;
    height: 190px;
    text-align: center;

    .img {
      width: 130px;
      height: 130px;
    }
  }
}
</style>
