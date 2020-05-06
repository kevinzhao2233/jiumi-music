<template>
  <Card class="container">
    <h3 slot="title" class="title">每日歌曲推荐</h3>
    <NoLogin message="登陆后展示你的每日推荐" v-if="loginState === 'noLogin'" />
    <playlist
      v-if="loginState === 'login'"
      :list="mscList"
      :pic="true"
      @enshrine="openEnshrineModal($event)"
      @add="addToList($event)"
      @play="playAll($event)"
    />
    <EnshrineModal
      v-if="showEnshrineModal"
      @close="showEnshrineModal = false"
      @enshrine="enshrineSong"
    />
  </Card>
</template>
<script>
import Card from '~/components/common/Card.vue';
import Playlist from '~/components/common/Playlist.vue';
import NoLogin from '~/components/common/NoLogin.vue';
import EnshrineModal from '~/components/common/EnshrineModal.vue';

export default {
  name: 'MusicList',
  data() {
    return {
      mscList: [],
      loginState: '',
      showEnshrineModal: false,
      beEnshrineSong: null
    };
  },
  methods: {
    // 添加音乐到当前播放列表
    addToList(msc) {
      this.$store.commit('player/add', { msc });
    },
    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.mscList });
    },
    openEnshrineModal(msc) {
      this.showEnshrineModal = true;
      this.beEnshrineSong = msc;
    },
    enshrineSong({ playlistId }) {
      this.$store.dispatch({
        type: 'player/enshrine',
        payload: { playlistId, songId: this.beEnshrineSong.id }
      });
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
  },
  components: {
    Card,
    Playlist,
    NoLogin,
    EnshrineModal
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  padding-bottom: 200px;
}
</style>
