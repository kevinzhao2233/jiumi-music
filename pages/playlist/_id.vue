<template>
  <div class="container">
    <div class="header">
      <div class="img"></div>
      <div class="info">
        <span class="tit">百听不腻的神曲《网络热歌》</span>
        <div class="creater">
          <div class="avatar"></div>
          <span class="name">莫离-Nice</span>
        </div>
        <div class="label">标签：
          <span class="label-item">古风</span>
          <span class="label-item">中二</span>
          <span class="label-item">流行</span>
        </div>
        <span class="count">播放量：3324</span>
        <span class="count">收藏量：335</span>
      </div>
    </div>
    <div class="content">
      <Card>
        <h3 slot="title" class="title">歌曲列表</h3>
        <Playlist :list="list" />
      </Card>
      <div class="sub"></div>
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
      list: []
    }
  },
  methods: {
    async getSonger(id) {
      const { playlist } = await this.$axios.$get(`/api/playlist/detail?id=${id}`)
      this.$nextTick(() => {
        console.log(playlist.tracks)
        this.list = playlist.tracks
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
      border-radius: 16px;
      background-color: #fff;
    }

    .info {
      flex: 1;
      margin: 60px 0;
      overflow: hidden;
      text-overflow: ellipsis;

      .tit {
        display: inline-block;
        margin-bottom: 12px;
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
          background: url('http://p1.music.126.net/0MmmjoVGZNwdykwpL-tJLg==/109951164518168720.jpg?param=36y36')
            no-repeat;
          background-size: cover;
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
    margin: 0 auto;
    padding: 0 24px 160px 24px;
    width: 1000px;
    @include respond-to(lg) {
      width: 100%;
      max-width: 1200px;
    }
  }
}
</style>
