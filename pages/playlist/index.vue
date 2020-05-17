<template>
  <div class="container" ref="page">
    <div class="select-box">
      <div
        :class="currentCat === '全部' ? 'hot-cat active' : 'hot-cat'"
        @click="handleClick('全部')"
      >
        全部
      </div>
      <div
        :class="currentCat === item.name ? 'hot-cat active' : 'hot-cat'"
        v-for="item in hotPlaylistTags"
        :key="item.id"
        @click="handleClick(item.name)"
      >
        {{ item.name }}
      </div>
    </div>
    <PlaylistList :list="playlists" />

    <div class="empty" ref="loadTag">
      <div v-show="loading" class="loading dot-windmill"></div>
    </div>
  </div>
</template>

<script>
import PlaylistList from '~/components/common/PlaylistList.vue';

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
  data: () => ({
    loading: false
  }),
  methods: {
    /**
     * 获取歌单列表
     */
    async fetchPlaylists(cat, offset = 0, limit = 60) {
      const { playlists } = await this.$axios.$get(
        `/api/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`
      );
      this.loading = false;
      this.currentCat = cat;
      this.playlists = this.playlists.concat(playlists);
    },
    /**
     * 点击切换标签
     */
    handleClick(cat) {
      if (this.currentCat === cat) return;
      this.playlists = [];
      this.currentCat = cat;
      this.loading = true;
      this.fetchPlaylists(cat);
    },
    /**
     * 处理滚动
     */
    handleScroll() {
      if (this.$refs.loadTag.getBoundingClientRect().top < document.body.offsetHeight + 500) {
        const offset = this.playlists.length;
        this.fetchPlaylists(this.currentCat, offset);
        this.loading = true;
        this.$refs.page.removeEventListener('scroll', this.handleScroll);
      }
    }
  },
  components: {
    PlaylistList
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
    }

    .hot-cat {
      margin: 0 4px;
      padding: 8px 16px;
      color: $mid-8;
      border-radius: 6px;
      user-select: none;
      transition: background-color 0.2s, color 0.2s;
      cursor: pointer;

      &.active {
        background-color: $main-6;
        color: $mid-1;
      }

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
    grid-gap: 36px 24px;
    margin: 0 auto;
    padding: 0 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .list-box {
      position: relative;
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

      .count-mark {
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        padding: 1px 8px;
        color: $mid-1;
        background-color: #55555533;
        border-radius: 10px;
      }

      .title {
        display: inline-block;
        margin: 8px 0 0 0;
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

    .loading {
      margin: 40px auto;
    }
  }
}
</style>
