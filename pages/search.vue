<template>
  <div class="container">
    <div class="header">
      <Inputbar
        class="search-box"
        placeholder="搜索歌曲、歌手、歌词"
        icon="icon-search"
        :value="inputValue"
        @has-submit="launchSearch"
        @has-input="getSuggest"
      />
      <div class="tip-box">
        <div class="tip">
          <span class="tit">热门搜索：</span>
          <span
            class="keywords"
            v-for="(item, index) in hotSearch"
            :key="index"
            @click="handleSearch(item)"
            >{{ item }}</span
          >
        </div>
        <!-- <div class="tip">
          <span class="tit">历史搜索：</span>
          <span
            class="keywords"
            v-for="(item, index) in keywords"
            :key="index"
            @click="handleSearch(item)"
            >{{ item }}</span
          >
          <i class="icon iconfont icon-trash"></i>
        </div> -->
      </div>
    </div>
    <div class="hot" v-if="hot.artist !== null">
      <nuxt-link
        class="img"
        :to="{ name: 'singer-id', params: { id: hot.artist[0].id } }"
        :style="{
          background: `center / cover url(${hot.artist[0].img1v1Url.replace(
            /^http:/,
            'https:'
          )}?param=108y108) no-repeat`
        }"
      ></nuxt-link>
      <div class="info">
        <nuxt-link class="name" :to="{ name: 'singer-id', params: { id: hot.artist[0].id } }">
          {{ hot.artist[0].name }}
        </nuxt-link>
        <div class="num">
          <span>单曲 {{ hot.artist[0].musicSize }}</span>
          <span>专辑 {{ hot.artist[0].albumSize }}</span>
          <span>MV {{ hot.artist[0].mvSize }}</span>
          <span>粉丝 {{ hot.artist[0].fansSize }}</span>
        </div>
        <div class="btn" @click="playHotSong(hot.artist[0].id)">
          <i class="icon iconfont icon-play"></i>
          <span class="txt">播放歌手热门歌曲</span>
        </div>
      </div>
    </div>
    <div class="list-box">
      <ul class="nav">
        <li
          :class="item.id === currNav ? 'nav-item active' : 'nav-item'"
          v-for="item in searchContent"
          :key="item.id"
          @mousedown="toggleNav(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <hr class="line" />
      <div class="content-box">
        <div class="dot-floating loading" v-show="loading"></div>
        <!-- 单曲列表 -->
        <Playlist
          :list="searchContent[1].list"
          :control="true"
          v-if="currNav === 1"
          @add="addintoList"
          @play="playCurrent"
          @enshrine="enshrineCurrent"
        />
        <!-- 专辑列表 -->
        <AlbumList v-if="currNav === 10" :list="searchContent[10].list" />
        <!-- 歌手列表 -->
        <SingerList v-if="currNav === 100" :list="searchContent[100].list" />
        <div v-if="currNav > 100">开发者正在筹集头发~~</div>
      </div>
    </div>
  </div>
</template>

<script>
import Inputbar from '~/components/common/Inputbar.vue';
import Playlist from '~/components/common/Playlist.vue';
import SingerList from '~/components/common/SingerList.vue';
import AlbumList from '~/components/common/AlbumList.vue';

export default {
  data() {
    return {
      inputValue: '',
      hotSearch: [],
      currNav: 1,
      loading: false,
      keywords: ['李荣浩新歌', '树读', '歌手', '我们的乐队', '吉卜力'],
      searchContent: {
        1: {
          name: '单曲',
          id: 1,
          list: []
        },
        10: {
          name: '专辑',
          id: 10,
          list: []
        },
        100: {
          name: '歌手',
          id: 100,
          list: []
        },
        1000: {
          name: '歌单',
          id: 1000,
          list: []
        },
        1006: {
          name: '歌词',
          id: 1006,
          list: []
        },
        1014: {
          name: '视频',
          id: 1014,
          list: []
        }
      },
      hot: {
        artist: null
      }
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
    // 播放当前歌曲
    playCurrent(msc) {
      this.$store.commit('player/add', { msc });
      this.$nextTick(() => {
        this.$store.commit('player/loadSong', msc.id);
      });
    },
    // 收藏
    enshrineCurrent(msc) {
      this.$store.commit('player/enshrine', msc);
    },
    // 播放歌手热门歌曲
    async playHotSong(id) {
      const songs = await this.fetchArtistHotSong(id);
      this.$store.commit('player/playAll', { msc: songs[0], list: songs });
    },
    /**
     * 切换导航
     */
    toggleNav(id) {
      const temp = this.currNav;
      this.currNav = id;
      if (this.inputValue && temp !== id) {
        this.launchSearch(this.inputValue);
      }
    },
    /**
     * 点击热搜或历史搜索
     */
    handleSearch(keyword) {
      this.inputValue = keyword;
      this.fetchList(keyword);
    },
    /**
     * 获取搜索框下的搜索建议
     */
    getSuggest(keyword) {
      this.inputValue = keyword;
    },
    /**
     * 发起搜索
     */
    launchSearch(keyword) {
      this.fetchHotSonger(keyword);
      this.fetchList(keyword);
    },
    /**
     * 获取搜索结果列表
     */
    async fetchList(keyword) {
      this.loading = true;
      this.songsResult = [];
      const { result } = await this.$axios.$get(
        `/api/search?keywords=${keyword}&type=${this.currNav}&limit=50`
      );
      this.$nextTick(() => {
        this.loading = false;
        switch (this.currNav) {
          case 1:
            this.searchContent[1].list = result.songs;
            break;
          case 10:
            this.searchContent[10].list = result.albums;
            break;
          case 100:
            this.searchContent[100].list = result.artists;
            break;
        }
      });
    },
    /**
     * 获取热搜关键词，将前 6 个存起来（对，我就是意思一下）
     */
    async fetchHotSearch() {
      const { result } = await this.$axios.$get(`/api/search/hot`);
      this.$nextTick(() => {
        result.hots.map((item, index) => {
          if (index < 6) this.hotSearch.push(item.first);
        });
      });
    },
    /**
     * 相当于智能推荐，暂时只有匹配歌手，以后看情况添加 MV，专辑等等
     */
    async fetchHotSonger(keyword) {
      const { result } = await this.$axios.$get(`/api/search/multimatch?keywords=${keyword}`);
      this.$nextTick(() => {
        if (result.artist) {
          this.hot.artist = result.artist;
        }
      });
    },
    /**
     * 获取歌手热门 50 首歌曲
     */
    async fetchArtistHotSong(id) {
      const { hotSongs } = await this.$axios.$get(`/api/artists?id=${id}`);
      return hotSongs;
    }
  },
  components: {
    Playlist,
    Inputbar,
    SingerList,
    AlbumList
  },
  created() {
    // 获取热搜
    this.fetchHotSearch();
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 256px;
    background: no-repeat url('~static/img/banner-1.jpg');

    .search-box {
      width: 640px;
      height: 52px;
      background-color: $mid-1;
      border-radius: 15px;
      overflow: hidden;
    }

    .tip-box {
      margin-top: 24px;
      color: $mid-1;

      .tip {
        margin: 12px 0;
        white-space: nowrap;

        .keywords {
          margin: 0 4px;
          cursor: pointer;
        }

        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 40%;
          margin: 0 0 0 12px;
          transition: all 0.2s ease-out;
          cursor: pointer;

          &:hover {
            background-color: #fff;
            color: $main-6;
            box-shadow: 0 4px 24px -4px $mid-7;
          }
          &:active {
            box-shadow: 0 4px 24px -4px $mid-2;
          }
        }
      }
    }
  }

  .hot {
    display: flex;
    margin: 0 auto;
    padding: 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .img {
      flex: 0 0 1;
      width: 108px;
      height: 108px;
      margin-right: 24px;
      border-radius: 40%;
      cursor: pointer;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .name {
        font-weight: 500;
        font-size: 16px;
        color: $main-6;
        line-height: 16px;
        cursor: pointer;
      }

      .num {
        margin-top: 4px;
        font-size: 16px;
        span {
          margin-right: 24px;
          font-weight: 500;
        }
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 6px;
        width: 180px;
        height: 42px;
        background-color: $main-6;
        color: $mid-1;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.2s ease-out;
        user-select: none;

        .icon {
          margin-right: 8px;
          font-size: 24px;
        }

        &:active {
          background-color: $main-4;
        }
      }
    }
  }

  .list-box {
    margin: 0 auto;
    padding: 0 24px 160px 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }

    .nav {
      display: flex;
      width: 100%;
      margin: 24px 0;

      .nav-item {
        margin-right: 12px;
        padding: 10px 24px;
        font-size: 16px;
        border-radius: 16px;
        cursor: pointer;
        transition: 0.2s ease-out;
        user-select: none;

        &.active {
          color: $mid-1;
          background-color: $main-6;
        }

        &:hover {
          color: $mid-1;
          background-color: $main-6;

          &:active {
            background-color: $main-4;
          }
        }
      }
    }

    .line {
      display: block;
      width: 100%;
      height: 1px;
      background-color: $main-3;
      border: none;
    }

    .content-box {
      width: 100%;
      margin: 24px 0;
      padding: 0 0 48px;
      overflow-x: hidden;

      .loading {
        margin: 0 auto;
      }
    }
  }
}
</style>
