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
    // 加载 banner 位置的新歌, 网友精选歌单
    const { result: banner } = await $axios.$get('/api/personalized/newsong');
    const { result: hotList } = await $axios.$get('/api/personalized?limit=11');
    const banners = banner.slice(0, 9);
    return {
      banners,
      hotList
    };
  },
  data() {
    return {
      recommendRes: []
    };
  },
  methods: {
    // 获取 推荐歌单 【第一个API需要登录，第二个不需要】
    async getRecommendList() {
      const { recommend } = await this.$axios.$get('/api/recommend/resource');
      return recommend;
    }
  },
  created() {
    this.getRecommendList()
      .then(recommend => {
        this.recommendRes = recommend;
        this.hotList.map((data, index) => {
          if (index < 4) this.recommendRes.push(data);
        });
      })
      .catch(err => {
        // 如果没有登录，换个歌单，并在第一次打开网页时提示
        if (err.response.data.code === 301) {
          const isNoLogin = sessionStorage.getItem('noLogin');
          if (!isNoLogin) {
            sessionStorage.setItem('noLogin', true);
            this.$toast('你还没有登录哦~~');
          }
          this.recommendRes = this.hotList;
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
