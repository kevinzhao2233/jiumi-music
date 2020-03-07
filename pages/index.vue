<template>
  <div class="container">
    <Header />
  </div>
</template>

<script>
import Header from '~/components/explore/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
}
</style>
