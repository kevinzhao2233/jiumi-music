<template>
  <div class="playlist-box">
    <nuxt-link
      class="list-box"
      v-for="(item, index) in list"
      :to="{ name: 'playlist-id', params: { id: item.id } }"
      :key="item.id + index"
      :title="item.name"
    >
      <div
        class="img"
        :style="{
          background: `center / cover url(${item.coverImgUrl.replace(
            /^http:/,
            'https:'
          )}?param=132y140) no-repeat`
        }"
      ></div>
      <span class="count-mark">{{ formatPlayCount(item.playCount) }}</span>
      <span class="title">{{ item.name }}</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'PlaylistList',
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    formatPlayCount(count) {
      if (count / 100000000 > 1) {
        return Math.floor(count / 100000000) + '亿';
      }
      if (count / 10000 > 1) {
        return Math.floor(count / 10000) + '万';
      }
      return count;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.playlist-box {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 132px);
  grid-gap: 36px 24px;
  margin: 0 auto;
  padding: 0 24px;
  width: 1000px;
  @include respond-to(lg) {
    width: 100%;
    max-width: 1200px;
  }

  .list-box {
    position: relative;
    display: block;
    width: 132px;
    height: 188px;
    color: $mid-8;
    cursor: pointer;

    .img {
      width: 132px;
      height: 140px;
      border-radius: 8px;
    }

    .count-mark {
      position: absolute;
      display: block;
      right: 0;
      top: 0;
      padding: 1px 8px;
      color: $mid-1;
      background-color: #55555533;
      border-radius: 10px;
    }

    .title {
      display: inline-block;
      margin: 8px 0 0 0;
      font-size: 14px;
      transition: color 0.2s ease;
      width: 132px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
    }

    &:hover {
      color: $main-6;
    }
  }
}
</style>
