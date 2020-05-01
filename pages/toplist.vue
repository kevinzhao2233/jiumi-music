<template>
  <div class="container">
    <Card class="toplist-card">
      <h3 class="title" slot="title">官方榜</h3>
      <div class="list-box">
        <nuxt-link
          class="list-item"
          v-for="item in offcialToplist"
          :key="item.id"
          :to="{ name: 'playlist-id', params: { id: item.id } }"
        >
          <div
            class="img"
            :style="{
              background: `center / cover url(${item.coverImgUrl}?param=130y144) no-repeat`
            }"
          ></div>
          <div
            class="img-bg"
            :style="{
              background: `center / cover url(${item.coverImgUrl}?param=130y144) no-repeat`
            }"
          ></div>
          <span class="name" title="item.name">{{ item.name }}</span>
        </nuxt-link>
      </div>
    </Card>
    <Card class="toplist-card">
      <h3 class="title" slot="title">其他榜</h3>
      <div class="list-box">
        <nuxt-link
          class="list-item"
          v-for="item in otherToplist"
          :key="item.id"
          :to="{ name: 'playlist-id', params: { id: item.id } }"
        >
          <div
            class="img"
            :style="{
              background: `center / cover url(${item.coverImgUrl}?param=130y144) no-repeat`
            }"
          ></div>
          <div
            class="img-bg"
            :style="{
              background: `center / cover url(${item.coverImgUrl}?param=130y144) no-repeat`
            }"
          ></div>
          <span class="name" title="item.name">{{ item.name }}</span>
        </nuxt-link>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue';

export default {
  async asyncData({ $axios }) {
    // 加载榜单
    const { list, artistToplist } = await $axios.$get('/api/toplist');
    const offcialToplist = list.slice(0, 4);
    const otherToplist = list.slice(4);
    return {
      offcialToplist,
      otherToplist
    };
  },

  components: {
    Card
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';
@import '~assets/scss/spin.scss';

.container {
  padding: 48px 160px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.toplist-card {
  margin: 0 auto;
  padding: 0 24px;
  width: 1000px;
  @include respond-to(lg) {
    width: 100%;
    max-width: 1200px;
  }

  .list-box {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 132px);
    grid-gap: 48px 24px;

    .list-item {
      position: relative;
      display: block;
      width: 132px;
      height: 168px;
      color: $mid-8;
      cursor: pointer;

      .img {
        position: relative;
        width: 132px;
        height: 140px;
        border-radius: 8px;
        z-index: 10;
      }

      .img-bg {
        width: 100px;
        height: 100px;
        position: absolute;
        bottom: 20px;
        left: 16px;
        border-radius: 20%;
        filter: blur(24px);
      }

      .name {
        position: relative;
        display: inline-block;
        margin: 8px 0 0 0;
        font-size: 14px;
        transition: color 0.2s ease;
        width: 132px;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        z-index: 10;
      }

      &:hover {
        .name {
          color: $main-6
        }
      }
    }
  }
}
</style>
