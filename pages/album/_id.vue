<template>
  <div class="container">
    <div class="header" v-if="Object.keys(album).length > 0">
      <div
        class="bg"
        :style="{
          background: `center / cover url(${album.picUrl.replace(
            /^http:/,
            'https:'
          )}?param=x600y180) no-repeat`
        }"
      ></div>
      <div class="header-main">
        <div
          class="img"
          :style="{
            background: `center / cover url(${album.picUrl.replace(
              /^http:/,
              'https:'
            )}?param=x240y240) no-repeat`
          }"
        ></div>
        <div
          class="img-bg"
          :style="{
            background: `center / cover url(${album.picUrl.replace(
              /^http:/,
              'https:'
            )}?param=x240y240) no-repeat`
          }"
        ></div>
        <div class="info">
          <p class="name">{{ album.name }}</p>
          <span class="label">
            歌手：
            <span class="outer" v-for="(item, index) in album.artists" :key="item.id">
              <nuxt-link class="link" :to="{ name: 'singer-id', params: { id: item.id } }"
                >{{ item.name }}
              </nuxt-link>
              {{ index === album.artists.length - 1 ? '' : '/' }}
            </span>
          </span>
          <span class="label">
            发布时间：{{ new Date(album.publishTime).toLocaleDateString() }}
          </span>
          <p class="desc" v-if="album.description">简介：{{ album.description }}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <Card class="card">
        <h3 slot="title" class="title">包含歌曲</h3>
        <span slot="controls" class="controls">更多</span>
        <Playlist :list="songs" @add="addintoList" @play="playAll" @enshrine="openEnshrineModal" />
      </Card>
      <Card class="sub-card">
        <h3 slot="title" class="title">其他专辑</h3>
        <div class="item" v-for="item in otherAlbums" :key="item.id" v-show="item.id !== album.id">
          <nuxt-link
            class="img"
            :to="{ name: 'album-id', params: { id: item.id } }"
            :style="{
              background: `center / cover url(${item.picUrl.replace(
                /^http:/,
                'https:'
              )}?param=x64y64) no-repeat`
            }"
          ></nuxt-link>
          <nuxt-link :to="{ name: 'album-id', params: { id: item.id } }" class="name">{{
            item.name
          }}</nuxt-link>
          <span class="public">{{ new Date(item.publishTime).toLocaleDateString() }}</span>
        </div>
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
import Playlist from '~/components/common/Playlist.vue';
import EnshrineModal from '~/components/common/EnshrineModal.vue';

export default {
  data() {
    return {
      album: {},
      songs: [],
      otherAlbums: [],
      showEnshrineModal: false,
      beEnshrineSong: null
    };
  },
  methods: {
    /**
     * 获取该专辑信息
     */
    async fetchAlbum(id) {
      const { album, songs } = await this.$axios.$get(`/api/album?id=${id}`);
      this.album = album;
      this.songs = songs;
      const { hotAlbums } = await this.$axios.$get(
        `/api/artist/album?id=${this.album.artist.id}&limit=6`
      );
      this.otherAlbums = hotAlbums;
    },
    /**
     * 播放音乐相关
     */
    // 添加到播放列表（下一曲播放）
    addintoList(msc) {
      this.$store.commit('player/add', { msc });
    },
    // 播放所有
    playAll(msc) {
      this.$store.commit('player/playAll', { msc, list: this.songs });
    },
    // 收藏
    enshrineCurrent(msc) {
      this.$store.commit('player/enshrine', msc);
    },
    /**
     * 打开收藏模态框
     */
    openEnshrineModal(msc) {
      this.showEnshrineModal = true;
      this.beEnshrineSong = msc;
    }
  },
  components: {
    Card,
    Playlist,
    EnshrineModal
  },
  created() {
    this.fetchAlbum(this.$route.params.id);
  }
};
</script>

<style scoped lang="scss">
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

        .label {
          display: block;
          color: $mid-9;
          line-height: 1.6;

          .link {
            color: $mid-9;
            cursor: pointer;
            transition: color 0.2s;

            &:hover {
              color: $main-6;
            }
          }

          .outer {
            color: $mid-7;
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
    display: flex;
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

    .sub-card {
      margin: 48px 0 0 48px;
      width: 300px;

      .item {
        display: grid;
        grid-template-columns: 80px 220px;
        grid-template-rows: 40px 40px;
        margin-bottom: 12px;
        width: 100%;
        height: 80px;

        .img {
          display: flex;
          grid-row: 1/3;
          grid-column: 1;
          margin-right: 8px;
          width: 64px;
          height: 64px;
          border-radius: 40%;
        }

        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          align-self: end;
          white-space: nowrap;
          color: $mid-10;
          line-height: 32px;
          cursor: pointer;

          &:hover {
            color: $main-6;
          }
        }

        .public {
          color: $mid-7;
        }
      }
    }
  }
}
</style>
