<template>
  <div class="container">
    <Card>
      <h3 slot="title" class="title">每日歌曲推荐</h3>
      <playlist
        :list="mscList"
        :pic="true"
        @add="addToList($event)"
        @play="playAll($event)"
        @enshrine="enshrineSong($event)"
      />
    </Card>
  </div>
</template>
<script>
import Card from '~/components/common/Card.vue'
import Playlist from '~/components/common/Playlist.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MusicList',
  components: {
    Card,
    Playlist
  },
  data() {
    return {
      mscList: []
    }
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    // 添加音乐到当前播放列表
    addToList(msc) {
      this.$store.commit('player/add', { msc })
    },
    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.mscList })
    },
    enshrineSong(msc) {
      this.$store.commit('player/enshrine', msc)
    }
  },
  mounted() {
    const getSong = async () => {
      const { recommend } = await this.$axios.$get('/api/recommend/songs')
      this.$nextTick(() => {
        this.mscList = recommend
      })
    }
    getSong()
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.container {
  width: 100%;
  padding-bottom: 200px;
}
</style>
