<template>
  <div class="container">
    <div class="content" v-if="error.statusCode">
      <h2>{{error.statusCode}}</h2>
      <span>{{error.message}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error'],
  mounted() {
    console.log(this.error)
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
