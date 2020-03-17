<template>
  <Card>
    <h3 slot="title" class="title">每日歌曲推荐</h3>
    <ul class="list-box">
      <li class="item" v-for="(item, index) in mscList" :key="index">
        <div class="left">
          <span class="num">{{ index + 1 < 10 ? `0${index + 1}` : index + 1 }}</span>
          <i class="n-btn iconfont icon-plus" @click="add(item.id)"></i>
          <i
            class="pic"
            :style="{
              background: `url(${item.album.picUrl}?param=40y40)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }"
          ></i>
          <div class="content">
            <span class="msc-name">{{ item.name }}</span>
            <div class="msc-art">
              <span class="art-name" v-for="(art, index) in item.artists" :key="index">
                {{ art.name }}
                <span class="placeholder" v-if="index < item.artists.length - 1">/</span>
              </span>
            </div>
          </div>
        </div>
        <div class="right">
          <span class="time">{{
            `${parseInt(item.duration / 60000)}:${
              parseInt((item.duration / 60000 - parseInt(item.duration / 60000)) * 60) > 9
                ? parseInt((item.duration / 60000 - parseInt(item.duration / 60000)) * 60)
                : '0' + parseInt((item.duration / 60000 - parseInt(item.duration / 60000)) * 60)
            }`
          }}</span>
          <i class="btn iconfont icon-heart_fill"></i>
          <i class="btn iconfont icon-play_fill"></i>
        </div>
      </li>
    </ul>
  </Card>
</template>
<script>
import Card from '~/components/common/Card.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MusicList',
  components: {
    Card
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    // 添加音乐到当前播放列表
    add(id) {
      const msc = this.mscList.find(item => item.id === id)
      this.$store.commit('player/add', msc)
    }
  },
  mounted() {
    const getSong = async () => {
      const { recommend } = await this.$axios.$get('/api/recommend/songs')
      this.$nextTick(() => {
        this.mscList = recommend
      })
    }
    getSong()
  },
  data() {
    return {
      mscList: []
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.list-box {
  width: 100%;
  margin: 0 40px 200px 0;

  .item {
    display: flex;
    justify-content: space-between;
    margin: 4px 0;
    padding: 0 12px;
    width: 100%;
    height: 58px;
    border-radius: 6px;
    color: $mid-6;
    transition: all 0.3s ease;

    .left {
      display: flex;
      align-items: center;
      overflow: hidden;

      .num {
        flex: 0 0 1;
        width: 28px;
        height: 28px;
        font-size: 12px;
        text-align: center;
        line-height: 28px;
        font-weight: 500;
      }

      .n-btn {
        flex: 0 0 1;
        width: 28px;
        height: 28px;
        border-radius: 4px;
        text-align: center;
        line-height: 28px;
        font-size: 20px;
        color: $mid-1;
        transition: all 0.2s ease-out;
        display: none;
      }

      .pic {
        flex: 0 0 1;
        margin: 0 16px 0 8px;
        width: 40px;
        height: 40px;
        border-radius: 6px;
      }

      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .msc-name {
          display: inline-block;
          width: 100%;
          font-size: 14px;
          font-weight: 500;
          color: $mid-11;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }

        .msc-art {
          display: block;
          font-size: 13px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .art-name {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }

          .placeholder {
            color: $mid-5;
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      .time {
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
      }

      .btn {
        margin: 0 4px;
        width: 28px;
        height: 28px;
        border-radius: 4px;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
        color: $mid-5;
        transition: all 0.2s ease-out;
      }
    }

    &:hover {
      background-color: $main-6;
      color: $main-2;
      box-shadow: 0 14px 24px -16px $main-6;

      .left {
        .n-btn {
          color: $mid-1;
          &:hover {
            background-color: $main-4;
          }

          &:active {
            color: $main-6;
            background-color: $main-2;
          }
        }
        .content {
          .msc-name {
            color: $mid-1;
          }
          .msc-art {
            color: $mid-4;
          }
        }

        .n-btn {
          display: block;
        }

        .num {
          display: none;
        }
      }
      .right {
        .btn {
          color: $main-1;
          &:hover {
            background-color: $main-4;
          }

          &:active {
            color: $main-6;
            background-color: $main-2;
          }
        }
      }
    }
  }
}
</style>
