<template>
  <Card class="container">
    <h3 slot="title" class="title">每日歌曲推荐</h3>
    <NoLogin message="登陆后展示你的每日推荐" v-if="loginState === 'noLogin'" />
    <playlist
      v-if="loginState === 'login'"
      :list="mscList"
      :pic="true"
      @enshrine="enshrineSong($event)"
      @add="addToList($event)"
      @play="playAll($event)"
    />
  </Card>
</template>
<script>
import Card from '~/components/common/Card.vue';
import Playlist from '~/components/common/Playlist.vue';
import NoLogin from '~/components/common/NoLogin.vue';
import { mapState } from 'vuex';

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
    };
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    // 添加音乐到当前播放列表
    addToList(msc) {
      this.$store.commit('player/add', { msc });
    },
    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.mscList });
    },
    enshrineSong(msc) {
      this.$store.commit('player/enshrine', msc);
    },
    /**
     * 获取推荐歌曲 【需要登录】
     */
    async fetchSong() {
      const { recommend } = await this.$axios.$get('/api/recommend/songs');
      this.$nextTick(() => {
        this.loginState = 'login';
        this.mscList = recommend;
      });
    }
  },
  created() {
    this.fetchSong().catch(err => {
      if (err.response.data.code === 301) {
        this.loginState = 'noLogin';
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  padding-bottom: 200px;
}
</style>
