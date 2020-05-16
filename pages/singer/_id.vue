<template>
  <div class="container">
    <div class="header" v-if="Object.keys(artist).length > 0">
      <div
        class="bg"
        :style="{
          background: `center / cover url(${artist.picUrl.replace(/^http:/, 'https:')}) no-repeat`
        }"
      ></div>
      <div class="header-main">
        <div
          class="img"
          :style="{
            background: `center / cover url(${artist.img1v1Url.replace(
              /^http:/,
              'https:'
            )}?param=240y240) no-repeat`
          }"
        ></div>
        <div
          class="img-bg"
          :style="{
            background: `center / cover url(${artist.img1v1Url.replace(
              /^http:/,
              'https:'
            )}?param=240y240) no-repeat`
          }"
        ></div>
        <div class="info">
          <p class="name">{{ artist.name }}</p>
          <div class="count">
            <span class="label"
              >单曲<span class="label-count">{{ artist.musicSize }}</span></span
            >
            <span class="label"
              >专辑<span class="label-count">{{ artist.albumSize }}</span></span
            >
            <span class="label"
              >MV<span class="label-count">{{ artist.mvSize }}</span></span
            >
          </div>
          <p class="desc">简介：{{ artist.briefDesc }}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <Card class="card">
        <h3 slot="title" class="title">热门歌曲</h3>
        <span slot="controls" class="controls">更多</span>
        <Songlist
          :list="hotSongs"
          @add="addintoList"
          @play="playAll"
          @enshrine="openEnshrineModal"
        />
        <div
          class="show-more"
          v-if="totalHotSongs.length > hotSongs.length"
          @click="showAllHotSongs"
        >
          <div class="btn">展示更多</div>
        </div>
      </Card>
      <Card class="card">
        <h3 slot="title" class="title">专辑</h3>
        <span slot="controls" class="controls">更多</span>
        <AlbumList :list="albums" />
      </Card>
    </div>
    <EnshrineModal
      v-if="showEnshrineModal"
      :mscId="beEnshrineSong.id"
      @close="showEnshrineModal = false"
    />
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue';
import Songlist from '~/components/common/Songlist.vue';
import AlbumList from '~/components/common/AlbumList.vue';
import EnshrineModal from '~/components/common/EnshrineModal.vue';

export default {
  components: {
    Card,
    Songlist,
    AlbumList,
    EnshrineModal
  },
  data() {
    return {
      artist: {},
      hotSongs: [],
      totalHotSongs: [],
      albums: [],
      mvs: {},
      story: {},
      showEnshrineModal: false,
      beEnshrineSong: null
    };
  },
  methods: {
    /**
     * 歌曲列表的操作
     */
    // 添加到播放列表（下一曲播放）
    addintoList(msc) {
      this.$store.commit('player/add', { msc });
    },
    // 播放所有
    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.hotSongs });
    },
    // 展示全部热门歌曲
    showAllHotSongs() {
      this.hotSongs = this.totalHotSongs;
    },
    /**
     * 打开收藏模态框
     */
    openEnshrineModal(msc) {
      this.showEnshrineModal = true;
      this.beEnshrineSong = msc;
    },

    /**
     * 异步获取数据
     */
    async fetchArtist(id) {
      const { artist, hotSongs } = await this.$axios.$get(`/api/artists?id=${id}`);
      this.$nextTick(() => {
        this.artist = artist;
        this.totalHotSongs = hotSongs;
        if (hotSongs.length > 10) {
          this.hotSongs = hotSongs.slice(0, 10);
        } else {
          this.hotSongs = hotSongs;
        }
      });
    },
    async fetchAlbum(id) {
      const { hotAlbums } = await this.$axios.$get(`/api/artist/album?id=${id}`);
      this.$nextTick(() => {
        this.albums = hotAlbums;
      });
    },
    async fetchMV(id) {
      const { mvs } = await this.$axios.$get(`/api/artist/mv?id=${id}`);
      this.$nextTick(() => {
        this.mvs = mvs;
      });
    }
  },
  mounted() {
    this.fetchArtist(this.$route.params.id);
    this.fetchAlbum(this.$route.params.id);
    this.fetchMV(this.$route.params.id);
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
    width: 100%;
    height: 360px;
    overflow: hidden;

    .bg {
      position: absolute;
      left: -2%;
      top: -2%;
      width: 104%;
      height: 104%;
      filter: blur(24px) brightness(1.1) opacity(0.5);
    }

    .header-main {
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
        filter: blur(24px) brightness(100%);
      }

      .info {
        flex: 1;
        margin: 60px 0;
        overflow: hidden;
        text-overflow: ellipsis;

        .name {
          margin: 8px 0 12px;
          font-size: 28px;
        }

        .count {
          margin: 16px 0;
          .label {
            margin-right: 12px;
            font-size: 18px;

            .label-count {
              margin-left: 4px;
              font-size: 24px;
            }
          }
        }

        .desc {
          margin-top: 12px;
          height: 162px;
          line-height: 1.6;
          color: $mid-9;
          white-space: pre-wrap;
          overflow-y: auto;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }

  .content {
    margin: 0 auto;
    padding: 0 24px 160px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .card {
      position: relative;
      margin-top: 48px;

      .controls {
        margin-right: 4px;
        color: $main-6;
        user-select: none;
        cursor: pointer;
      }

      .show-more {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 80px;
        background: linear-gradient(#fff1, #f0f3faff);

        .btn {
          margin: 30px auto 0;
          padding: 12px 36px;
          width: 160px;
          border-radius: 18px;
          background-color: $main-6;
          font-size: 16px;
          text-align: center;
          color: $mid-1;
          transition: 0.2s;
          cursor: pointer;

          &:active {
            background-color: $main-4;
          }
        }
      }
    }
  }
}
</style>
