<template>
  <div class="container">
    <Card class="card">
      <h3 slot="title" class="title">最近播放</h3>
      <div class="empty-list" v-if="!player.localList.length">
        你还没有听过歌儿哦ヾ(≧ ▽ ≦)ゝ
      </div>
      <Playlist :list="player.localList" v-else />
    </Card>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue';
import Playlist from '~/components/common/Playlist.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['player'])
  },
  components: {
    Card,
    Playlist
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.container {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.card {
  margin: 0 auto;
  padding: 0 24px;
  width: 1000px;
  @include respond-to(lg) {
    width: 100%;
    max-width: 1200px;
  }
}

.empty-list {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
}
</style>
