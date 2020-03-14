<template>
  <Card>
    <h3 slot="title" class="title">播放列表</h3>
    <div class="controls" slot="controls">
      <div class="item">
        <i class="icon iconfont icon-folder_badge_plus"></i>
        <span class="txt">收藏全部</span>
      </div>
      <hr class="line" />
      <div class="item">
        <i class="icon iconfont icon-trash"></i>
        <span class="txt" @click="removeAll">清空</span>
      </div>
      <i class="del-icon iconfont icon-multiply" @click="closeList"></i>
    </div>
    <ul class="list-box">
      <transition-group
        name="flip-list"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated zoomOutRight"
      >
        <li class="list" v-for="item in player.list" :key="item.id">
          <i :class="player.currSong.id === item.id ? 'icon animate iconfont icon-music_note_' : 'icon animate'"></i>
          <div class="item main">
            <span class="name">{{ item.name }}</span>
            <div class="btn-box">
              <i class="icon iconfont icon-play_fill" @mousedown="play(item.id)"></i>
              <i class="icon iconfont icon-ellipsis"></i>
            </div>
          </div>
          <span class="item songer">
            <span v-for="(songer, index) in item.artists" :key="songer"
              >{{ index > 4 ? '' : `${songer}` }}
              <span v-if="index < 4 && index !== item.artists.length - 1">/</span>
            </span>
          </span>
          <span class="item time">{{ item.formatDuration }}</span>
          <i class="icon del iconfont icon-multiply" @click="remove(item.id)"></i>
        </li>
      </transition-group>
    </ul>
  </Card>
</template>

<script>
import Card from '~/components/common/Card.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CurrentPlaylist',
  computed: {
    ...mapState(['player'])
  },
  methods: {
    ...mapMutations({
      removeAll: 'player/removeAll',
      remove: 'player/remove',
      play: 'player/loadSong'
    }),
    closeList() {
      this.$emit('close-list')
    }
  },
  mounted() {
    // 点击选框之外的地方，收起选框
    document.addEventListener('mousedown', e => {
      if (
        !this.$el.contains(e.target) &&
        Array.from(e.target.classList).indexOf('icon-music_note_list') < 0 &&
        e.target.id !== 'playerPlaylistBtn'
      ) {
        // 如果点击的target不是这个组件，就收起来
        this.closeList()
      }
    })
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.flip-list-move {
  transition: transform 0.2s;
}

.title {
  margin-left: 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
}

.controls {
  color: $mid-9;

  .item {
    height: 16px;
    transition: color 0.2s ease-out;
    cursor: pointer;

    .icon {
      display: inline-block;
      margin: 0 -3px 2px -3px;
      vertical-align: top;
    }

    .txt {
      display: inline-block;
      vertical-align: top;
      line-height: 16px;
    }

    &:hover {
      color: $main-6;
    }

    &:active {
      color: $main-4;
    }
  }
  .line {
    margin: 0 12px;
    width: 1px;
    height: 12px;
  }

  .del-icon {
    display: inline-block;
    margin: 0 12px;
    width: 24px;
    height: 24px;
    border-radius: 9px;
    color: $mid-9;
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    transition: all 0.2s ease;

    &:hover {
      background-color: $main-6;
      color: $mid-1;
      font-size: 16px;
    }

    &:active {
      background-color: $main-4;
    }
  }
}

.list-box {
  padding: 0 8px 40px 8px;
  height: 296px;
  border-top: 1px solid $main-2;
  overflow-x: hidden;
  overflow-y: auto;
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }

  // 所有icon统一的样式
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 6px;
    transition: all 0.2s ease-out;
  }

  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0;
    padding: 0 8px;
    width: 100%;
    height: 50px;
    border-radius: 12px;
    color: $mid-10;
    transition: all 0.3s ease;

    .animate {
      flex: 0 0 1;
      margin-right: 4px;
      color: $main-6;
    }

    .del {
      display: none;
    }

    .item {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &.main {
        flex: 4;
        display: flex;
        align-items: center;

        .name {
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .btn-box {
          flex: 0 0 1;
          margin: 0 12px 0 8px;
          display: none;
        }
      }

      &.songer {
        flex: 2;
        color: $mid-6;
      }

      &.time {
        flex: 1;
        font-weight: 500;
        color: $mid-6;
      }
    }

    &:hover {
      background-color: $main-6;
      color: $mid-1;
      box-shadow: 0 14px 24px -16px $main-6;
      .main .btn-box {
        display: block;
      }
      .songer,
      .time {
        color: $mid-4;
      }
      .del {
        display: inline-block;
      }
      .icon {
        color: $mid-1;

        &:hover {
          background-color: $main-4;
        }

        &:active {
          background-color: $main-2;
          color: $main-6;
        }
      }
    }
  }
}
</style>
