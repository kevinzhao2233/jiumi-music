<template>
  <div class="k-box">
    <Card>
      <h3 slot="title">云音乐榜</h3>
      <a class="link" slot="controls" href="/">更多</a>
      <div class="content"></div>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue'

export default {
  name: 'Ranking',
  components: {
    Card,
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.link {
  color: $main-5;

  &:visited {
    color: $main-5;
  }

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: $main-7;
  }
}
</style>
