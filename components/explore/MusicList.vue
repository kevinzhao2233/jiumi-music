<template>
  <div class="container">
    <Card>
      <h3 slot="title" class="title">每日歌曲推荐</h3>
      <NoLogin v-if="loginState === 'noLogin'" />
      <playlist
        v-if="loginState === 'login'"
        :list="mscList"
        :pic="true"
        @enshrine="enshrineSong($event)"
        @add="addToList($event)"
        @play="playAll($event)"
      />
    </Card>
  </div>
</template>
<script>
import Card from '~/components/common/Card.vue'
import Playlist from '~/components/common/Playlist.vue'
import NoLogin from '~/components/common/NoLogin.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MusicList',
  components: {
    Card,
    Playlist,
    NoLogin
  },
  data() {
    return {
      mscList: [],
      loginState: ''
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
    },
    /**
     * 获取推荐歌曲 【需要登录】
     */
    async getSong() {
      const { recommend } = await this.$axios.$get('/api/recommend/songs')
      this.$nextTick(() => {
        this.loginState = 'login'
        this.mscList = recommend
      })
    }
  },
  created() {
    this.getSong().catch(err => {
      if (err.response.data.code === 301) {
        this.loginState = 'noLogin'
      }
    })
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
