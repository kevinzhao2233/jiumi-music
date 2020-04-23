<template>
  <Card class="banner-box">
    <h3 class="tit" slot="title">新歌速递</h3>
    <div class="content-box">
      <div class="msc-box" v-for="item in banners" :key="item.id">
        <div
          class="img"
          :style="{
            background: `center / cover url(${item.song.album.picUrl.replace(/^http:/,'https:')}?param=72y72) no-repeat`
          }"
        >
          <div class="play"></div>
        </div>
        <div class="info">
          <div class="msc-info">
            <nuxt-link :to="{ name: 'song-id', params: { id: item.id } }" class="msc-name link"
              >{{ item.name }}
            </nuxt-link>
            <div class="msc-art">
              <span class="msc-art-name" v-for="(art, index) in item.song.artists" :key="index">
                <nuxt-link
                  :to="{ name: 'singer-id', params: { id: art.id } }"
                  class="art-name link"
                  >{{ art.name }}</nuxt-link
                >
                <span class="placeholder" v-if="index < item.song.artists.length - 1"> / </span>
              </span>
            </div>
          </div>
          <div class="right">
            <div class="control">
              <i class="btn iconfont icon-play_fill" @click="play(item.song)"></i>
              <i class="btn iconfont icon-plus" @click="add(item.song)"></i>
            </div>
            <span class="time">{{ formateTime(item.song.duration) }}</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
<script>
import Card from '~/components/common/Card.vue';

export default {
  name: 'Banner',
  props: {
    banners: Array
  },
  data() {
    return {};
  },
  methods: {
    // 格式化时间
    formateTime(duration) {
      const min = Math.floor(duration / 60000);
      const fMin = min > 9 ? min : '0' + min;
      const sec = Math.floor((duration / 1000) % 60);
      const fSec = sec > 9 ? sec : '0' + sec;
      return `${fMin}:${fSec}`;
    },

    // 添加到下一曲
    add(msc) {
      this.$store.commit('player/add', { msc });
    },

    // 播放当前
    play(msc) {
      this.$store.commit('player/add', { msc });
      this.$nextTick(() => {
        this.$store.commit('player/switchSong', 'next');
      });
    }
  },
  components: {
    Card
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.banner-box {
  padding: 0 48px;
  width: 1000px;
  height: 360px;

  @include respond-to(lg) {
    width: calc(100vw - 240px);
  }

  .content-box {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px 24px;
  }

  .msc-box {
    display: flex;
    align-items: center;
    padding-left: 8px;
    height: 90px;
    border-radius: 12px;
    transition: background-color 0.3s, box-shadow 0.3s;
    overflow: hidden;

    .img {
      width: 72px;
      height: 72px;
      border-radius: 12px;

      .play {
      }
    }

    .info {
      flex: 1;
      display: flex;
      padding-left: 12px;
      justify-content: space-between;
      align-content: center;
      overflow: hidden;

      .msc-info {
        flex: 1;
        color: $mid-6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .msc-name {
          color: $mid-10;
        }

        .msc-art {
          overflow: hidden;
        }

        .msc-art-name {
          .art-name {
            color: $mid-6;
          }

          .placeholder {
            color: $mid-5;
          }
        }

        .link {
          line-height: 22px;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .right {
        flex: 0 0 1;
        display: flex;

        .control {
          display: none;
          margin-right: 36px;
          flex: 0 0 1;
          align-self: center;

          .btn {
            margin: 0 4px;
            width: 30px;
            height: 30px;
            border-radius: 40%;
            font-size: 20px;
            line-height: 30px;
            text-align: center;
            transition: all 0.2s ease-out;
            cursor: pointer;
          }
        }

        .time {
          align-self: center;
          padding-right: 24px;
          font-weight: 500;
          color: $mid-6;
        }
      }
    }

    &:hover {
      background-color: $main-6;
      box-shadow: 0 14px 24px -16px $main-6;

      .msc-info {
        .link {
          color: $mid-1;
        }
        .msc-art-name {
          .art-name {
            color: $mid-2;
          }
        }
      }
      .right {
        .control {
          display: flex;

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
        .time {
          display: none;
          color: $main-2;
          @include respond-to(xl) {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
