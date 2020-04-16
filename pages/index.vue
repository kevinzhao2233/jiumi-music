<template>
  <div class="container">
    <Header :banners="banners" />
    <CenterCard :recommendRes="recommendRes" />
    <BottomPart />
  </div>
</template>

<script>
import Header from '~/components/explore/Header.vue';
import CenterCard from '~/components/explore/CenterCard.vue';
import BottomPart from '~/components/explore/BottomPart.vue';

export default {
  async asyncData({ $axios }) {
    // 加载 banner图
    const { banners } = await $axios.$get('/api/banner');
    return {
      banners
    };
  },
  data() {
    return {
      recommendRes: []
    };
  },
  methods: {
    // 获取 推荐歌单 【需要登录】
    async getRecommendList() {
      const { recommend } = await this.$axios.$get('/api/recommend/resource');
      this.recommendRes = recommend;
    },
    // 获取 热门歌单
    async getHotList() {
      const { playlists } = await this.$axios.$get('/api/top/playlist?limit=10');
      console.log(playlists);
      this.recommendRes = playlists;
    }
  },
  created() {
    this.getRecommendList().catch(err => {
      // 如果没有登录，则换几个歌单
      if (err.response.data.code === 301) {
        this.getHotList();
      }
    });
  },
  components: {
    Header,
    CenterCard,
    BottomPart
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
