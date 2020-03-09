<template>
  <div class="container">
    <Header />
    <CenterCard />
    <BottomPart />
  </div>
</template>

<script>
import Header from '~/components/explore/Header.vue'
import CenterCard from '~/components/explore/CenterCard.vue'
import BottomPart from '~/components/explore/BottomPart.vue'

export default {
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
