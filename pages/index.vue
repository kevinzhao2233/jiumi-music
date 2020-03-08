<template>
  <div class="container">
    <Header />
    <CenterCard />
    <MusicList />
  </div>
</template>

<script>
import Header from '~/components/explore/Header.vue'
import CenterCard from '~/components/explore/CenterCard.vue'
import MusicList from '~/components/explore/MusicList.vue'

export default {
  components: {
    Header,
    CenterCard,
    MusicList
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
