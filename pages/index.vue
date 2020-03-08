<template>
  <div class="container">
    <Header />
    <CenterCard/>
  </div>
</template>

<script>
import Header from '~/components/explore/Header.vue'
import CenterCard from '~/components/explore/CenterCard.vue'

export default {
  components: {
    Header,
    CenterCard,
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>
