<template>
  <div class="e-container">
    <div class="left-box">
      <MusicList />
    </div>
    <div class="right-box">
      <Ranking />
    </div>
  </div>
</template>
<script>
import MusicList from '~/components/explore/MusicList.vue'
import Ranking from '~/components/explore/Ranking.vue'

export default {
  name: 'BottomPart',
  components: {
    MusicList,
    Ranking
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.e-container {
  display: flex;
  margin-top: 12px;
  padding: 0 48px;
  min-width: 1000px;

  @include respond-to(lg) {
    width: 100%;
  }
  .left-box {
    flex: 4;
    margin-right: 48px;
    overflow: hidden;
  }

  .right-box {
    flex: 3;
  }
}
</style>
