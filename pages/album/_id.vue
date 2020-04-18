<template>
  <div class="container">
    <div class="header" v-if="Object.keys(album).length > 0">
      <div
        class="bg"
        :style="{
          background: `center / cover url(${album.picUrl}?param=x600y180) no-repeat`
        }"
      ></div>
      <div class="header-main">
        <div
          class="img"
          :style="{
            background: `center / cover url(${album.picUrl}?param=x240y240) no-repeat`
          }"
        ></div>
        <div
          class="img-bg"
          :style="{
            background: `center / cover url(${album.picUrl}?param=x240y240) no-repeat`
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
        <Playlist :list="songs" />
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue';
import Playlist from '~/components/common/Playlist.vue';

export default {
  data() {
    return {
      album: {},
      songs: []
    };
  },
  methods: {
    async fetchAlbum(id) {
      const { album, songs } = await this.$axios.$get(`/api/album?id=${id}`);
      this.$nextTick(() => {
        console.log(songs);
        this.album = album;
        this.songs = songs;
      });
    }
  },
  components: {
    Card,
    Playlist
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
