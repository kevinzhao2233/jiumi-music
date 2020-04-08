<template>
  <div class="container">
    <div class="header" v-if="Object.keys(artist).length > 0">
      <div
        class="bg"
        :style="{
          background: `center / cover url(${artist.picUrl}) no-repeat`
        }"
      ></div>
      <div class="header-main">
        <div
          class="img"
          :style="{
            background: `center / cover url(${artist.img1v1Url}?param=240y240) no-repeat`
          }"
        ></div>
        <div
          class="img-bg"
          :style="{
            background: `center / cover url(${artist.img1v1Url}?param=240y240) no-repeat`
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
        <Playlist
          :list="hotSongs"
          @add="addintoList"
          @play="playAll"
          @enshrine="enshrineCurrent"
        />
      </Card>
      <Card class="card">
        <h3 slot="title" class="title">专辑</h3>
        <span slot="controls" class="controls">更多</span>
        <AlbumList :list="albums" />
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue'
import Playlist from '~/components/common/Playlist.vue'
import AlbumList from '~/components/common/AlbumList.vue'

export default {
  components: {
    Card,
    Playlist,
    AlbumList
  },
  data() {
    return {
      artist: {},
      hotSongs: [],
      albums: {},
      mvs: {},
      story: {}
    }
  },
  methods: {
    /**
     * 歌曲列表的操作
     */
    // 添加到播放列表（下一曲播放）
    addintoList(msc) {
      this.$store.commit('player/add', { msc })
    },
    // 播放所有
    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.hotSongs })
    },
    // 收藏
    enshrineCurrent(msc) {
      this.$store.commit('player/enshrine', msc)
    },

    /**
     * 异步获取数据
     */
    async getArtist(id) {
      const { artist, hotSongs } = await this.$axios.$get(`/api/artists?id=${id}`)
      this.$nextTick(() => {
        console.log(artist)
        this.artist = artist
        this.hotSongs = hotSongs
      })
    },
    async getAlbum(id) {
      const { hotAlbums } = await this.$axios.$get(`/api/artist/album?id=${id}`)
      this.$nextTick(() => {
        this.albums = hotAlbums
      })
    },
    async getMV(id) {
      const { mvs } = await this.$axios.$get(`/api/artist/mv?id=${id}`)
      this.$nextTick(() => {
        this.mvs = mvs
      })
    }
  },
  mounted() {
    this.getArtist(this.$route.params.id)
    this.getAlbum(this.$route.params.id)
    this.getMV(this.$route.params.id)
  }
}
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
      margin-top: 48px;
    }

    .controls {
      margin-right: 4px;
      color: $main-6;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>
