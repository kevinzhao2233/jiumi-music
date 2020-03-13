<template>
  <Card>
    <div class="main-t" slot="title"></div>
    <div class="controls" slot="controls"></div>
    <div class="list"></div>
  </Card>
</template>

<script>
import Card from '~/components/common/Card.vue'

export default {
  name: 'Playlist',
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped></style>
