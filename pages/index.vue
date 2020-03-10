<template>
  <div class="container">
    <Header :banners="banners" />
    <CenterCard :recommendRes="recommendRes" />
    <BottomPart />
  </div>
</template>

<script>
import Header from '~/components/explore/Header.vue'
import CenterCard from '~/components/explore/CenterCard.vue'
import BottomPart from '~/components/explore/BottomPart.vue'

export default {
  async asyncData({ $axios }) {
    // 加载 banner图
    const { banners } = await $axios.$get('/api/banner')
    // 加载 推荐歌单
    const { recommend } = await $axios.$get('/api/recommend/resource')

    return {
      banners,
      recommendRes: recommend
    }
  },
  components: {
    Header,
    CenterCard,
    BottomPart
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
</style>
