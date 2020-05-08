<template>
  <div class="container">
    <div class="header">
      <div
        class="img"
        :style="{
          background: `center / cover url(${playlist.coverImgUrl.replace(
            /^http:/,
            'https:'
          )}?param=240y240) no-repeat`
        }"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `center / cover url(${playlist.coverImgUrl.replace(
            /^http:/,
            'https:'
          )}?param=240y240) no-repeat`
        }"
      ></div>
      <div class="info">
        <span class="tit">{{ playlist.name }}</span>
        <div class="creater">
          <div
            class="avatar"
            :style="{
              background: `center / cover url(${playlist.creator.avatarUrl}?param=36y36) no-repeat`
            }"
          ></div>
          <span class="name">{{ playlist.creator.nickname }}</span>
        </div>
        <div class="label">
          标签：
          <span class="label-item" v-for="item in playlist.tags" :key="item">{{ item }}</span>
        </div>
        <span class="count">播放量：{{ playlist.playCount }}</span>
        <span class="count">收藏量：{{ playlist.subscribedCount }}</span>
      </div>
    </div>
    <div class="content">
      <Card class="main-card">
        <h3 slot="title" class="title">歌曲列表</h3>
        <Songlist
          :list="tracks"
          :pic="true"
          @add="addintoList"
          @play="playAll"
          @enshrine="openEnshrineModal"
        />
      </Card>
      <div class="sub">
        <span class="title">简介</span>
        <span class="txt">{{ playlist.description }}</span>
      </div>
    </div>
    <EnshrineModal
      v-if="showEnshrineModal"
      :mscId="beEnshrineSong.id"
      @close="showEnshrineModal = false"
    />
  </div>
</template>

<script>
import Songlist from '~/components/common/Songlist.vue';
import Card from '~/components/common/Card.vue';
import EnshrineModal from '~/components/common/EnshrineModal.vue';

export default {
  components: {
    Songlist,
    Card,
    EnshrineModal
  },
  data() {
    return {
      playlist: {
        name: '',
        coverImgUrl: '',
        tags: [],
        playCount: 0,
        subscribedCount: 0,
        description: '',
        creator: {
          id: 0,
          nickname: '',
          backgroundUrl: ''
        }
      },
      tracks: [],
      showEnshrineModal: false,
      beEnshrineSong: null
    };
  },
  methods: {
    async fetchSonger(id) {
      const { playlist, privileges } = await this.$axios.$get(`/api/playlist/detail?id=${id}`);
      this.$nextTick(() => {
        playlist.creator.avatarUrl.replace(/^http:/, 'https:');
        playlist.tracks.map((item, index) => {
          item.privilege = privileges[index];
          item.sourcePlaylistId = id;
        });
        this.playlist = playlist;
        this.tracks = playlist.tracks;
      });
    },

    addintoList(msc) {
      this.$store.commit('player/add', { msc });
    },

    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.tracks });
    },

    /**
     * 打开收藏模态框
     */
    openEnshrineModal(msc) {
      this.showEnshrineModal = true;
      this.beEnshrineSong = msc;
    }
  },
  created() {
    this.fetchSonger(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';
@import '~assets/scss/spin.scss';

.container {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  .header {
    position: relative;
    display: flex;
    margin: 0 auto;
    padding: 0 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .img {
      flex: 0 0 1;
      margin: 60px 48px 60px 0;
      width: 240px;
      height: 240px;
      border-radius: 36px;
      background-color: #fff;
      z-index: 10;
    }

    .img-bg {
      position: absolute;
      left: 24px;
      bottom: 48px;
      width: 240px;
      height: 240px;
      border-radius: 20%;
      filter: blur(22px) brightness(105%);
    }

    .info {
      flex: 1;
      margin: 60px 0;
      overflow: hidden;
      text-overflow: ellipsis;

      .tit {
        display: inline-block;
        margin: 8px 0 12px;
        font-size: 28px;
      }

      .creater {
        display: flex;
        align-items: center;
        margin: 8px 0 16px;

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 40%;
        }
        .name {
          margin-left: 8px;
          font-size: 16px;
          color: $mid-7;
          cursor: pointer;
          transition: color 0.2s;

          &:hover {
            color: $main-6;
          }
        }
      }

      .label {
        margin: 8px 0;

        .label-item {
          display: inline-block;
          margin: 0 4px;
          padding: 3px 12px;
          border-radius: 100px;
          background-color: $main-6;
          color: $mid-1;
          cursor: pointer;
        }
      }

      .count {
        display: block;
        margin: 8px 0;
      }
    }
  }

  .content {
    display: flex;
    margin: 0 auto;
    padding: 0 24px 160px 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .main-card {
      overflow: hidden;
    }

    .sub {
      margin: 48px 0 0 48px;
      width: 300px;

      .title {
        display: block;
        font-size: 20px;
        margin-bottom: 24px;
      }

      .txt {
        line-height: 1.7;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
