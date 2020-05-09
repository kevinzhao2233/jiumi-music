<template>
  <li :class="item.privilege ? `${item.privilege.st > -1 ? 'item' : 'item no-cr'}` : 'item'">
    <div class="left">
      <!-- 序号、加号、图片 -->
      <span class="idx num">{{ index + 1 > 9 ? index + 1 : `0${index + 1}` }}</span>
      <i class="idx icon iconfont icon-plus" @click="add(item.id)"></i>
      <nuxt-link
        class="pic"
        v-if="pic"
        :to="{ name: 'song-id', params: { id: item.id } }"
        :style="{
          background: `center / cover url(${
            item.al
              ? item.al.picUrl.replace(/^http:/, 'https:')
              : item.album.picUrl.replace(/^http:/, 'https:')
          }?param=40y40) no-repeat`
        }"
      ></nuxt-link>
      <!-- 歌名歌手 -->
      <div class="content">
        <nuxt-link :to="{ name: 'song-id', params: { id: item.id } }" class="msc-name"
          >{{ item.name }}
          <span class="alia" v-if="item.alia">{{ item.alia.length > 0 ? `（${item.alia}）` : '' }}</span>
          <span class="alia" v-if="item.alias">{{ item.alias.length > 0 ? `（${item.alias[0]}）` : '' }}</span>
        </nuxt-link>
        <div class="msc-art" v-if="item.artists">
          <span class="art-names" v-for="(art, index) in item.artists" :key="index">
            <nuxt-link :to="{ name: 'singer-id', params: { id: art.id } }" class="art-name">{{
              art.name
            }}</nuxt-link>
            <span class="placeholder" v-if="index < item.artists.length - 1"> / </span>
          </span>
        </div>
        <div class="msc-art" v-if="item.ar">
          <span class="art-names" v-for="(art, index) in item.ar" :key="index">
            <nuxt-link :to="{ name: 'singer-id', params: { id: art.id } }" class="art-name">{{
              art.name
            }}</nuxt-link>
            <span class="placeholder" v-if="index < item.ar.length - 1"> / </span>
          </span>
        </div>
      </div>
      <!-- 中间按钮 -->
      <div class="control">
        <i class="btn iconfont icon-play_fill" @click="play(item.id)"></i>
        <i class="btn iconfont icon-folder_fill_badge_plus" @click="enshrine(item.id)"></i>
      </div>
    </div>
    <!-- 专辑 -->
    <nuxt-link
      class="center album"
      :to="{ name: 'album-id', params: { id: `${item.album ? item.album.id : item.al.id}` } }"
      >{{ item.album ? item.album.name : item.al.name }}</nuxt-link
    >
    <!-- 时间 -->
    <div class="right time">
      {{ item.duration ? formateTime(item.duration) : formateTime(item.dt) }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'SonglistItem',
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    },
    pic: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formateTime(duration) {
      const min = Math.floor(duration / 60000);
      const fMin = min > 9 ? min : '0' + min;
      const sec = Math.floor((duration / 1000) % 60);
      const fSec = sec > 9 ? sec : '0' + sec;
      return `${fMin}:${fSec}`;
    },
    // 点击了添加按钮
    add(id) {
      this.$emit('add', id);
    },
    play(id) {
      this.$emit('play', id);
    },
    enshrine(id) {
      this.$emit('enshrine', id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

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
    padding-right: 24px;
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

    .pic {
      display: block;
      margin-right: 16px;
      width: 40px;
      height: 40px;
      border-radius: 6px;
      cursor: pointer;
    }

    .content {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .msc-name {
        display: inline;
        font-weight: 500;
        color: $mid-11;
        line-height: 22px;
        cursor: pointer;

        .alia {
          color: $mid-6;
        }

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
          color: $mid-6;
          cursor: pointer;

          &:hover {
            color: $main-2;
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

    &.album {
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

    &.time {
      padding: 0 24px;
      font-size: 15px;
      font-weight: 500;
    }
  }

  &.no-cr {
    .left .content .msc-name,
    .center.album {
      color: $mid-6;
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
          .alia {
          color: $mid-4;
        }
        }
        .msc-art {
          color: $mid-4;

          .art-name {
            color: $mid-4;
          }
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
    .center.album {
      color: $mid-4;
    }

    &.no-cr {
      .left .num {
        display: inline-block;
      }

      .left .icon {
        display: none;
      }

      .control {
        display: none;
      }
    }
  }
}
</style>
