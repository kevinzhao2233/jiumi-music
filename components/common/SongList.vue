<template>
  <ul class="k-list-box">
    <li class="item" v-for="item in list" :key="item.id">
      <div
        class="img"
        :title="item.name"
        :style="{
          background: `url(${item.img1v1Url}?param=130y144)`,
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
  padding: 0 24px;
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
      transition: all 0.2s ease-out;
      cursor: pointer;

      &:hover {
        color: $main-6;
      }
    }
  }
}
</style>
