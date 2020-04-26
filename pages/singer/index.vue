<template>
  <div class="container" ref="page">
    <div class="select-box">
      <div class="hot-cat active">
        热门
      </div>
    </div>
    <!-- <div class="art-list-box">
      <div class="list-box" v-for="(item, index) in artists" :key="item.id + index">
        <nuxt-link
          class="img"
          :to="{ name: 'singer-id', params: { id: item.id } }"
          :style="{
            background: `center / cover url(${item.img1v1Url.replace(
              /^http:/,
              'https:'
            )}?param=140y140) no-repeat`
          }"
        ></nuxt-link>
        <span class="name">{{ item.name }}</span>
      </div>
    </div> -->
    <SingerList class="list" :list="artists" />
    <div class="empty" ref="loadTag">
      <div v-show="loading" class="loading dot-windmill"></div>
    </div>
  </div>
</template>

<script>
import SingerList from '~/components/common/SingerList.vue';

export default {
  async asyncData({ $axios }) {
    const { artists } = await $axios.$get('/api/artist/list?limit=42');
    return {
      artists
    };
  },
  data: () => ({
    artArea: [
      {
        id: -1,
        name: '全部'
      },
      {
        id: 7,
        name: '华语'
      },
      {
        id: 96,
        name: '欧美'
      },
      {
        id: 8,
        name: '日本'
      },
      {
        id: 16,
        name: '韩国'
      },
      {
        id: 0,
        name: '其他'
      }
    ],
    artType: [
      {
        id: -1,
        name: '全部'
      },
      {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      },
      {
        id: 3,
        name: '乐队'
      }
    ],
    loading: false
  }),
  methods: {
    async fetchArtists(offset = 0, limit = 42) {
      const { artists } = await this.$axios.$get(
        `/api/artist/list?limit=${limit}&offset=${offset}`
      );
      this.loading = false;
      this.artists = this.artists.concat(artists);
    },
    handleScroll() {
      if (this.$refs.loadTag.getBoundingClientRect().top < document.body.offsetHeight + 500) {
        const offset = this.artists.length;
        this.fetchArtists(offset);
        this.loading = true;
        this.$refs.page.removeEventListener('scroll', this.handleScroll);
      }
    }
  },
  mounted() {
    this.$refs.page.addEventListener('scroll', this.handleScroll);
  },
  // updated() {
  //   this.$refs.page.addEventListener('scroll', this.handleScroll);
  // },
  components: {
    SingerList
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

  .list {
    grid-gap: 24px;
    margin: 0 auto;
    padding: 0 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
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
