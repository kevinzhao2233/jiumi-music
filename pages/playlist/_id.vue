<template>
  <div class="container">
    <div class="header">
      <div
        class="img"
        :style="{
          background: `url(${playlist.coverImgUrl}?param=240y240)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `url(${playlist.coverImgUrl}?param=240y240)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      <div class="info">
        <span class="tit">{{ playlist.name }}</span>
        <div class="creater">
          <div
            class="avatar"
            :style="{
              background: `url(${playlist.creator.avatarUrl}?param=36y36)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }"
          ></div>
          <span class="name">{{ playlist.creator.nickname }}</span>
        </div>
        <div class="label">
          标签：
          <span class="label-item" v-for="item in playlist.tags" :key="item">{{ item }}</span>
        </div>
        <span class="count">播放量：3324</span>
        <span class="count">收藏量：335</span>
      </div>
    </div>
    <div class="content">
      <Card>
        <h3 slot="title" class="title">歌曲列表</h3>
        <Playlist :list="tracks" :pic="true" />
      </Card>
      <div class="sub">
        <span class="title">简介</span>
        <span class="txt">{{playlist.description}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Playlist from '~/components/common/Playlist.vue'
import Card from '~/components/common/Card.vue'

export default {
  components: {
    Playlist,
    Card
  },
  data() {
    return {
      playlist: {
        name: '',
        coverImgUrl: '',
        tags: ['华语', '流行', '民谣'],
        playCount: 0,
        subscribedCount: 0,
        description: '',
        creator: {
          id: 0,
          nickname: '',
          backgroundUrl: ''
        }
      },
      tracks: []
    }
  },
  methods: {
    async getSonger(id) {
      const { playlist } = await this.$axios.$get(`/api/playlist/detail?id=${id}`)
      this.$nextTick(() => {
        console.log(playlist)
        this.playlist = playlist
        this.tracks = playlist.tracks
      })
    }
  },
  created() {
    this.getSonger(this.$route.params.id)
  }
}
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

      .creater {
        display: flex;
        align-items: center;
        margin: 8px 0;

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 40%;
        }
        .name {
          margin-left: 8px;
          font-size: 16px;
          color: $mid-7;
          cursor: pointer;
        }
      }

      .label {
        margin: 8px 0;

        .label-item {
          display: inline-block;
          margin: 0 4px;
          padding: 3px 12px;
          border-radius: 100px;
          background-color: $main-6;
          color: $mid-1;
          cursor: pointer;
        }
      }

      .count {
        display: block;
        margin: 8px 0;
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

    .sub {
      margin: 48px 0 0 48px;
      width: 300px;

      .title {
        display: block;
        font-size: 20px;
        margin-bottom: 24px;
      }

      .txt {
        line-height: 1.7;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
