<template>
  <li class="list">
    <i
      :class="currSong.id === item.id ? 'icon animate iconfont icon-music_note_' : 'icon animate'"
    ></i>
    <div class="item main">
      <span class="name">{{ item.name }}</span>
      <div class="btn-box">
        <i class="icon iconfont icon-play_fill" @click="play(item.id)"></i>
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
</template>

<script>
export default {
  name: 'CPlaylistItem',
  props: {
    item: {
      type: Object
    },
    currSong: {
      type: Object
    }
  },
  methods: {
    play(id) {
      this.$emit('play', id);
    },
    remove(id) {
      this.$emit('remove', id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

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
</style>
