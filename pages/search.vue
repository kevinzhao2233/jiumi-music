<template>
  <div class="container">
    <div class="header">
      <div class="search-box">
        <Inputbar
          placeholder="搜索歌曲、歌手、歌词"
          icon="icon-search"
          @has-submit="getList"
          @has-input="getSuggest"
        />
      </div>
      <div class="tip-box">
        <div class="tip">
          <span class="tit">热门搜索：</span>
          <span class="keywords" v-for="(item, index) in keywords" :key="index">{{ item }}</span>
        </div>
        <div class="tip">
          <span class="tit">历史搜索：</span>
          <span class="keywords" v-for="(item, index) in keywords" :key="index">{{ item }}</span>
          <i class="icon iconfont icon-trash"></i>
        </div>
      </div>
    </div>
    <div class="hot" v-if="hot.artist">
      <div
        class="img"
        :style="{
          background: `url(${hot.artist[0].img1v1Url}?param=108y108)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <div class="info">
        <span class="name">{{ hot.artist[0].name }}</span>
        <div class="num">
          <span>单曲 {{ hot.artist[0].musicSize }}</span>
          <span>专辑 {{ hot.artist[0].albumSize }}</span>
          <span>MV {{ hot.artist[0].mvSize }}</span>
          <span>粉丝 {{ hot.artist[0].fansSize }}</span>
        </div>
        <div class="btn">
          <i class="icon iconfont icon-play"></i>
          <span class="txt">播放歌手热门歌曲</span>
        </div>
      </div>
    </div>
    <div class="list-box">
      <ul class="nav">
        <li
          :class="item.id === currNav ? 'nav-item active' : 'nav-item'"
          v-for="item in nav"
          :key="item.id"
          @mousedown="toggleNav(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <hr class="line" />
      <div class="content-box">
        <Playlist :list="songsResult" :control="true" v-if="currNav === 1" />
        <div v-if="currNav === 100">歌手</div>
      </div>
    </div>
  </div>
</template>

<script>
import Inputbar from '~/components/common/Inputbar.vue'
import Playlist from '~/components/common/Playlist.vue'

export default {
  components: {
    Playlist,
    Inputbar
  },
  data() {
    return {
      keywords: ['李荣浩新歌', '树读', '歌手', '我们的乐队', '吉卜力'],
      nav: [
        {
          name: '单曲',
          id: 1
        },
        {
          name: '歌手',
          id: 100
        },
        {
          name: '专辑',
          id: 10
        },
        {
          name: '视频',
          id: 1014
        },
        {
          name: '歌词',
          id: 1006
        },
        {
          name: '歌单',
          id: 1000
        },
        {
          name: '用户',
          id: 6
        }
      ],
      hot: {
        artist: [
          {
            name: '陈雪凝',
            id: 12382970,
            picUrl: 'https://p1.music.126.net/UheOVkTuZEGnT1GarIj4Pw==/109951163985034688.jpg',
            img1v1Url: 'https://p1.music.126.net/rh786RRpup1SxRQg8FDEKg==/109951163814926414.jpg',
            albumSize: 19,
            musicSize: 47,
            mvSize: 6,
            fansSize: 2634671
          }
        ]
      },
      songsResult: [],
      currNav: 1
    }
  },
  methods: {
    toggleNav(id) {
      this.currNav = id
    },
    async getList(keyword) {
      // 进入 loading 效果
      const { result } = await this.$axios.$get(`/api/search?type=${this.currNav}?keywords=${keyword}`)
      this.$nextTick(() => {
        console.log('搜索结果', result)
        // 退出 loading 效果
        this.songsResult = result.songs

      })
    },
    getSuggest(keyword) {
      console.log('获取搜索建议')
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

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
    }
  }
}
</style>
