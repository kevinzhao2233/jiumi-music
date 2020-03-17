<template>
  <ul class="k-list-box">
    <li class="item" v-for="(item, index) in list" :key="index">
      <div class="left">
        <span class="idx num">{{ index + 1 > 9 ? index + 1 : `0${index + 1}` }}</span>
        <i class="idx icon iconfont icon-plus" @click="add(item.id)"></i>
        <div class="content">
          <span class="msc-name">{{ item.name }}</span>
          <div class="msc-art">
            <span class="art-names" v-for="(art, index) in item.artists" :key="index">
              <span class="art-name">{{ art.name }}</span>
              <span class="placeholder" v-if="index < item.artists.length - 1"> / </span>
            </span>
          </div>
        </div>
        <div class="control">
          <i class="btn iconfont icon-play_fill"></i>
          <i class="btn iconfont icon-folder_fill_badge_plus"></i>
        </div>
      </div>
      <div class="center">
        <span class="album">{{ item.album.name }}</span>
      </div>
      <div class="right">
        <span class="time">{{
          `${parseInt(item.duration / 60000)}:${
            parseInt((item.duration / 60000 - parseInt(item.duration / 60000)) * 60) > 9
              ? parseInt((item.duration / 60000 - parseInt(item.duration / 60000)) * 60)
              : '0' + parseInt((item.duration / 60000 - parseInt(item.duration / 60000)) * 60)
          }`
        }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Playlist',
  props: {
    list: {
      type: Array
    },
    control: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    // 添加音乐到当前播放列表
    add(id) {
      const msc = this.list.find(item => item.id === id)
      this.$store.commit('player/add', msc)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

.k-list-box {
  width: 100%;

  .item {
    display: flex;
    justify-content: space-between;
    margin: 4px 0;
    padding: 0 12px;
    width: 100%;
    height: 58px;
    border-radius: 6px;
    color: $mid-7;
    transition: all 0.3s ease;

    .left {
      flex: 4;
      display: flex;
      align-items: center;
      overflow: hidden;

      .idx {
        flex: 0 0 1;
        display: inline-block;
        margin: 0 12px 0 4px;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-weight: 500;
        border-radius: 40%;
        transition: all 0.2s ease-out;
        cursor: pointer;

        &.num {
          font-size: 12px;
        }

        &.icon {
          font-size: 20px;
          color: $mid-1;
          display: none;
        }
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

          &:hover {
            text-decoration: underline;
          }
        }

        .msc-art {
          display: block;
          font-size: 13px;
          line-height: 16px;
          color: $mid-6;
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

      .control {
        flex: 1;
        display: none;
        align-items: center;
        margin-left: 12px;
        height: 100%;

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
    }

    .center {
      flex: 2;
      display: flex;
      align-items: center;
      height: 100%;
      overflow: hidden;

      .album {
        line-height: 100%;
        color: $mid-8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .right {
      flex: 0 0 1;
      display: flex;
      align-items: center;

      .time {
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
      }
    }

    &:hover {
      background-color: $main-6;
      color: $main-2;
      box-shadow: 0 14px 24px -16px $main-6;

      .left {
        .icon {
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

        .icon {
          display: block;
        }

        .num {
          display: none;
        }
      }
      .center {
        .album {
          color: $mid-4;
        }
      }
    }
  }
}
</style>
