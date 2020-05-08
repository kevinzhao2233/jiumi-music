<template>
  <div class="k-box">
    <Card>
      <h3 slot="title">云音乐榜</h3>
      <nuxt-link :to="{ name: 'toplist' }" class="link" slot="controls">更多</nuxt-link>
      <ul class="content">
        <nuxt-link
          class="list"
          v-for="item in toplist"
          :key="item.id"
          :title="item.name"
          :to="
            item.id > 0
              ? { name: 'playlist-id', params: { id: item.id } }
              : { name: 'artistToplist' }
          "
        >
          <div
            class="img"
            :style="{
              background: `center / cover url(${item.coverImgUrl.replace(
                /^http:/,
                'https:'
              )}?param=120y120) no-repeat`
            }"
          ></div>
          <div
            class="img-bg"
            :style="{
              background: `center / cover url(${item.coverImgUrl.replace(
                /^http:/,
                'https:'
              )}?param=120y120) no-repeat`
            }"
          ></div>
        </nuxt-link>
      </ul>
    </Card>
    <Card>
      <h3 slot="title">歌手榜</h3>
      <nuxt-link :to="{ name: 'artistToplist' }" class="link" slot="controls">更多</nuxt-link>
      <ul class="content">
        <nuxt-link
          class="list"
          v-for="item in artists"
          :key="item.id"
          :to="{ name: 'singer-id', params: { id: item.id } }"
        >
          <div
            class="img"
            :style="{
              background: `center / cover url(${item.picUrl.replace(
                /^http:/,
                'https:'
              )}?param=120y120) no-repeat`
            }"
          ></div>
          <div
            class="img-bg"
            :style="{
              background: `center / cover url(${item.picUrl.replace(
                /^http:/,
                'https:'
              )}?param=120y120) no-repeat`
            }"
          ></div>
          <div class="script-box">
            <span class="script">{{ item.name }}</span>
          </div>
        </nuxt-link>
      </ul>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue';

export default {
  name: 'Ranking',
  components: {
    Card
  },
  methods: {
    /**
     * 获取歌手榜
     */
    async fetchArtists() {
      const { list } = await this.$axios.$get('/api/toplist/artist');
      this.artists = list.artists.filter((data, index) => index < 5);
    },
    /**
     * 获取排行榜
     */
    async fetchToplist() {
      const { list, artistToplist } = await this.$axios.$get('/api/toplist');
      this.toplist = list.slice(0, 4);
      const arToplist = {
        coverImgUrl: artistToplist.coverUrl,
        name: artistToplist.name,
        id: 0
      };
      this.toplist.push(arToplist);
    }
  },
  created() {
    this.fetchArtists();
    this.fetchToplist();
  },
  data() {
    return {
      toplist: [],
      artists: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.link {
  color: $main-5;

  &:visited {
    color: $main-5;
  }

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: $main-7;
  }
}

.k-box {
  padding-bottom: 160px;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .list {
    position: relative;
    width: 17%;
    padding-top: 17%;
    text-align: center;

    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      z-index: 10;
      cursor: pointer;
    }

    .img-bg {
      position: absolute;
      top: 24%;
      left: 10%;
      width: 80%;
      height: 80%;
      border-radius: 40%;
      filter: blur(24px);
    }

    .script-box {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30%;
      background: linear-gradient(transparent, $mid-7);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      z-index: 20;
      opacity: 0;
      transition: opacity 0.3s ease;

      .script {
        margin-bottom: 4px;
        color: $mid-2;
      }
    }

    &:hover {
      .script-box {
        opacity: 1;
      }
    }
  }
}
</style>
