<template>
  <div class="container">
    <Card>
      <h3 slot="title" class="title">每日歌曲推荐</h3>
      <NoLogin v-if="!isLogin" @has-click="login" />
      <playlist
        v-else
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
      isLogin: false
    }
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    login() {
      this.$router.push({ name: 'Login' })
    },
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
        this.isLogin = true
        this.mscList = recommend
      })
    }
  },
  created() {
    this.getSong().catch(err => {
      if (err.response.data.code === 301) {
        this.isLogin = false
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
