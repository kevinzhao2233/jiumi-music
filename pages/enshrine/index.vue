<template>
  <div class="container" ref="page">
    <div class="banner-img"></div>
    <div class="select-box">
      <div
        v-for="item in cat"
        :class="defaultSelect === item.id ? 'cat active' : 'cat'"
        :key="item.id"
        @click="handleSelect(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <AlbumList class="list-box" v-if="defaultSelect === 0" :list="list" />
    <SingerList class="list-box" v-if="defaultSelect === 1" :list="list" />
    <div class="list-box" v-if="defaultSelect === 2">开发者正在筹集头发</div>
    <div class="empty" ref="loadTag">
      <div v-show="loading" class="loading dot-windmill"></div>
    </div>
  </div>
</template>

<script>
import AlbumList from '~/components/common/AlbumList.vue';
import SingerList from '~/components/common/SingerList.vue';

export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.$get('/api/album/sublist');
    return {
      list: data
    };
  },
  data: () => ({
    defaultSelect: 0,
    loading: false,
    cat: [
      {
        id: 0,
        name: '专辑',
        router: '/album/sublist'
      },
      {
        id: 1,
        name: '歌手',
        router: '/artist/sublist'
      },
      {
        id: 2,
        name: 'MV',
        router: '/mv/sublist'
      }
    ]
  }),
  methods: {
    async fetchList(id, router, offset = 0, limit = 42) {
      const { data } = await this.$axios.$get(`/api${router}?limit=${limit}&offset=${offset}`);
      this.loading = false;
      this.list = this.list.concat(data);
    },
    handleSelect(id) {
      this.loading = true;
      this.defaultSelect = id;
      this.list = [];
      this.fetchList(id, this.cat[id].router);
    },
    handleScroll() {
      if (this.$refs.loadTag.getBoundingClientRect().top < document.body.offsetHeight + 500) {
        const offset = this.list.length;
        this.fetchList(this.defaultSelect, this.cat[this.defaultSelect].router, offset);
        this.loading = true;
        this.$refs.page.removeEventListener('scroll', this.handleScroll);
      }
    }
  },
  mounted() {
    this.$refs.page.addEventListener('scroll', this.handleScroll);
  },
  updated() {
    this.$refs.page.addEventListener('scroll', this.handleScroll);
  },
  components: {
    AlbumList,
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
  overflow-y: auto;
}

.banner-img {
  width: 100%;
  height: 256px;
  background: center / cover url('~static/img/banner-5.jpg') no-repeat;
}

.select-box {
  position: relative;
  display: flex;
  margin: 36px auto;
  padding: 0 24px;
  width: 1000px;
  @include respond-to(lg) {
    width: 100%;
    max-width: 1200px;
  }

  .cat {
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
.list-box {
  grid-gap: 24px;
  margin: 36px auto;
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
</style>
