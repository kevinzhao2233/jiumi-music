<template>
  <div class="container" ref="page">
    <div class="select-box">
      <div class="drop-box">{{ currentCat }}</div>
      <div
        class="hot-cat"
        v-for="item in hotPlaylistTags"
        :key="item.id"
        @click="fetchPlaylists(item.name)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="playlist-box">
      <nuxt-link
        :to="{ name: 'playlist-id', params: { id: item.id } }"
        class="list-box"
        v-for="(item, index) in playlists"
        :key="item.id + index"
      >
        <div
          class="img"
          :style="{
            background: `center / cover url(${item.coverImgUrl.replace(
              /^http:/,
              'https:'
            )}?param=132y140) no-repeat`
          }"
        ></div>
        <span class="title">{{ item.name }}</span>
      </nuxt-link>
    </div>
    <div class="empty" ref="loadTag"></div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // 加载歌单分类和“全部”分类的内容（提前加载）
    const { tags } = await $axios.$get('/api/playlist/hot');
    const { playlists, cat } = await $axios.$get('/api/top/playlist?cat=全部&limit=60');
    return {
      hotPlaylistTags: tags,
      playlists,
      currentCat: cat
    };
  },
  methods: {
    async fetchPlaylists(offset, cat = '全部', limit = 60) {
      const { playlists } = await this.$axios.$get(
        `/api/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`
      );
      this.playlists = this.playlists.concat(playlists);
    },
    handleScroll() {
      if (this.$refs.loadTag.getBoundingClientRect().top < document.body.offsetHeight + 500) {
        const offset = this.playlists.length;
        this.fetchPlaylists(offset);
        this.$refs.page.removeEventListener('scroll', this.handleScroll);
      }
    }
  },
  mounted() {
    this.$refs.page.addEventListener('scroll', this.handleScroll);
  },
  updated() {
    this.$refs.page.addEventListener('scroll', this.handleScroll);
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

  .select-box {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 24px;
    width: 1000px;
    height: 100px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .drop-box {
      position: relative;
      margin-right: 36px;
      padding: 8px 20px;
      background-color: $main-6;
      color: $mid-1;
      border-radius: 6px;
      user-select: none;
      cursor: pointer;
    }

    .hot-cat {
      margin: 0 4px;
      padding: 8px 16px;
      color: $mid-8;
      border-radius: 6px;
      user-select: none;
      transition: background-color 0.2s, color 0.2s;
      cursor: pointer;

      &:hover {
        background-color: $main-6;
        color: $mid-1;

        &:active {
          background-color: $main-4;
        }
      }
    }
  }

  .playlist-box {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 132px);
    grid-gap: 24px;
    margin: 0 auto;
    padding: 0 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .list-box {
      display: block;
      width: 132px;
      height: 188px;
      color: $mid-8;
      cursor: pointer;

      .img {
        width: 132px;
        height: 140px;
        border-radius: 8px;
      }

      .title {
        display: inline-block;
        margin: 8px 0 0 0;
        font-size: 14px;
        transition: color 0.2s ease;
        width: 132px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp: 2; //显示的行
      }

      &:hover {
        color: $main-6;
      }
    }
  }

  .empty {
    height: 200px;
    padding-bottom: 160px;
  }
}
</style>
