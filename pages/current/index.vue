<template>
  <div class="container">
    <div class="banner-img"></div>
    <Card class="card">
      <h3 slot="title" class="title">最近播放</h3>
      <div class="empty-list" v-if="!player.localList.length">
        你还没有听过歌儿哦ヾ(≧ ▽ ≦)ゝ
      </div>
      <Playlist
        v-else
        :list="player.localList"
        @enshrine="enshrineSong"
        @add="addToList"
        @play="playAll"
      />
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
  methods: {
    addToList(msc) {
      this.$store.commit('player/add', { msc });
    },
    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.player.localList });
    },
    enshrineSong(msc) {
      this.$store.commit('player/enshrine', msc);
    }
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
  padding-bottom: 160px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.banner-img {
  width: 100%;
  height: 256px;
  background: center / cover url('~static/img/banner-3.jpg') no-repeat;
}

.card {
  margin: 36px auto;
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
