<template>
  <div class="container">
    <div class="header">
      <div
        class="img"
        :style="{
          background: `center / cover url(${song.al.picUrl.replace(/^http:/,'https:')}?param=240y240) no-repeat`
        }"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `center / cover url(${song.al.picUrl.replace(/^http:/,'https:')}?param=240y240) no-repeat`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <div class="info">
        <span class="tit">{{ song.name }}</span>
        <span class="alia">{{ song.alia[0] }}</span>
        <div class="label">
          歌手：
          <span class="art-names" v-for="(art, index) in song.ar" :key="index">
            <nuxt-link class="label-item" :to="{ name: 'singer-id', params: { id: art.id } }">{{
              art.name
            }}</nuxt-link>
            <span class="placeholder" v-if="index < song.ar.length - 1"> / </span>
          </span>
        </div>
        <div class="label">
          专辑：
          <nuxt-link :to="{ name: 'album-id', params: { id: song.al.id } }" class="label-item">{{
            song.al.name
          }}</nuxt-link>
        </div>
        <div class="label" v-if="song.mv > 0">
          MV：
          <nuxt-link :to="{ name: 'mv-id', params: { id: song.mv } }" class="label-item">{{
            song.mv
          }}</nuxt-link>
        </div>
      </div>
    </div>
    <div class="content">
      <Card class="main-card">
        <h3 slot="title" class="title">歌词</h3>
        <p class="content">{{ lrc }}</p>
      </Card>
      <div class="sub-card">
        <Card>
          <h3 slot="title" class="title">相关歌单</h3>
          <div class="item" v-for="item in simiPlaylists" :key="item.id">
            <nuxt-link
              class="img"
              :to="{ name: 'playlist-id', params: { id: item.id } }"
              :style="{
                background: `url(${item.coverImgUrl}?param=72y72)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }"
            ></nuxt-link>
            <nuxt-link :to="{ name: 'playlist-id', params: { id: item.id } }" class="name">{{
              item.name
            }}</nuxt-link>
            <span class="creator">{{ item.creator.nickname }}</span>
          </div>
        </Card>
        <!-- <Card>
          <h3 slot="title" class="title">相似歌曲</h3>
          <p>==========</p>
        </Card> -->
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue';

export default {
  components: {
    Card
  },
  data() {
    return {
      song: {
        id: 0,
        mv: 0,
        fee: 0,
        alia: [''],
        name: '',
        ar: [],
        al: {
          id: 0,
          name: '',
          picUrl: ''
        },
        publishTime: 0
      },
      lrc: '',
      simiSongs: [],
      simiPlaylists: []
    };
  },
  methods: {
    async getSong(id) {
      const { songs } = await this.$axios.$get(`/api/song/detail?ids=${id}`);
      this.$nextTick(() => {
        this.song = songs[0];
      });
    },
    async getLrc(id) {
      const { lrc } = await this.$axios.$get(`/api/lyric?id=${id}`);
      this.$nextTick(() => {
        this.lrc = lrc.lyric.replace(/\[(.+)\]/g, '');
      });
    },
    async getSimiPlaylists(id) {
      const { playlists } = await this.$axios.$get(`/api/simi/playlist?id=${id}`);
      this.$nextTick(() => {
        this.simiPlaylists = playlists;
      });
    },
    async getSimiSongs(id) {
      const { songs } = await this.$axios.$get(`/api/simi/song?id=${id}`);
      this.$nextTick(() => {
        this.simiSongs = songs;
      });
    }
  },
  mounted() {
    this.getSong(this.$route.params.id);
    this.getLrc(this.$route.params.id);
    this.getSimiPlaylists(this.$route.params.id);
    // this.getSimiSongs(this.$route.params.id)
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

      .alia {
        margin-bottom: 12px;
        display: block;
        color: $mid-7;
      }

      .label {
        margin: 8px 0;

        .label-item {
          display: inline-block;
          margin: 0 4px;
          color: $mid-10;
          cursor: pointer;

          &:hover {
            color: $main-6;
          }
        }
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

      .content {
        white-space: pre-wrap;
        line-height: 1.6;
      }
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
          grid-row: 1/3;
          grid-column: 1;
          margin-right: 8px;
          width: 72px;
          height: 72px;
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

        .creator {
          color: $mid-7;
        }
      }
    }
  }
}
</style>
