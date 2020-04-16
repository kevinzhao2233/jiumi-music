<template>
  <transition-group
    tag="ul"
    name="flip-list"
    class="k-list-box"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <li class="item" v-for="item in list" :key="item.id">
      <div
        class="img"
        :title="item.name"
        :style="{
          background: `url(${item.picUrl}?param=130y130)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      >
        <span class="sub">{{ item.size }}首</span>
      </div>
      <span class="name" :title="item.name">{{ item.name }}</span>
      <span class="artist" :title="item.artist.name">{{ item.artist.name }}</span>
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
  grid-template-columns: repeat(auto-fill, 150px);
  padding: 0 24px;
  grid-gap: 24px;
  width: 100%;
  color: $mid-10;

  .item {
    margin: 0 0 12px;
    width: 150px;
    height: 190px;

    .img {
      position: relative;
      width: 130px;
      height: 130px;

      .sub {
        position: absolute;
        bottom: 4px;
        left: 8px;
        opacity: 0;
        color: $mid-1;
        transition: all 0.2s;
      }

      &::after {
        content: '';
        display: block;
        width: 150px;
        height: 130px;
        background: url('~static/img/album_cover.png') no-repeat;
        background-size: cover;
      }

      &:hover {
        cursor: pointer;
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 48px;
          background: linear-gradient(#55555500, #55555599);
        }

        .sub {
          opacity: 1;
        }
      }
    }

    .name {
      display: inline-block;
      margin-top: 8px;
      width: 150px;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        color: $main-6;
      }
    }

    .artist {
      @extend .name;
      margin-top: -2px;
      font-size: 14px;
    }
  }
}
</style>
