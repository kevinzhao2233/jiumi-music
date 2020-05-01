<template>
  <div class="container">
    <Card class="art-list-box">
      <h3 slot="title">歌手榜</h3>
      <SingerList :list="artists" />
    </Card>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue';
import SingerList from '~/components/common/SingerList.vue';

export default {
  async asyncData({ $axios }) {
    // 加载榜单
    const {
      list: { artists }
    } = await $axios.$get('/api/toplist/artist');
    return {
      artists
    };
  },
  components: {
    Card,
    SingerList
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.container {
  padding: 48px 0 160px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.art-list-box {
  margin: 0 auto;
  padding: 0 24px;
  width: 1000px;
  @include respond-to(lg) {
    width: 100%;
    max-width: 1200px;
  }
}
</style>
