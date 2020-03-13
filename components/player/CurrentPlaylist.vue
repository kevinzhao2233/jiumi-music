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
        <span class="txt">清空</span>
      </div>
      <i class="del-icon iconfont icon-multiply" @mousedown="closeList"></i>
    </div>
    <ul class="list-box">
      <li class="list">
        <i class="icon animate"></i>
        <div class="item main">
          <span class="name">昨日晴空《昨日晴空》动画电影主题曲</span>
          <div class="btn-box">
            <i class="icon iconfont icon-play_fill"></i>
            <i class="icon iconfont icon-ellipsis"></i>
          </div>
        </div>
        <span class="item songer">尤长靖</span>
        <span class="item time">04:39</span>
        <i class="icon del iconfont icon-multiply"></i>
      </li>
      <li class="list">
        <i class="icon animate"></i>
        <div class="item main">
          <span class="name">昨日晴空《昨日晴空》动画电影主题曲</span>
          <div class="btn-box">
            <i class="icon iconfont icon-play_fill"></i>
            <i class="icon iconfont icon-ellipsis"></i>
          </div>
        </div>
        <span class="item songer">尤长靖</span>
        <span class="item time">04:39</span>
        <i class="icon del iconfont icon-multiply"></i>
      </li>
      <li class="list">
        <i class="icon animate"></i>
        <div class="item main">
          <span class="name">昨日晴空《昨日晴空》动画电影主题曲</span>
          <div class="btn-box">
            <i class="icon iconfont icon-play_fill"></i>
            <i class="icon iconfont icon-ellipsis"></i>
          </div>
        </div>
        <span class="item songer">尤长靖</span>
        <span class="item time">04:39</span>
        <i class="icon del iconfont icon-multiply"></i>
      </li>
    </ul>
  </Card>
</template>

<script>
import Card from '~/components/common/Card.vue'

export default {
  name: 'CurrentPlaylist',
  methods: {
    closeList() {
      this.$emit('close-list')
    }
  },
  mounted() {
    // 点击选框之外的地方，收起选框
    document.addEventListener('mousedown', (e) => {
      if (
        !this.$el.contains(e.target)
        && Array.from(e.target.classList).indexOf('icon-music_note_list') < 0
        && e.target.id !== 'playerPlaylistBtn'
      ) {
        // 如果点击的target不是这个组件，就收起来
        this.closeList();
      }
    });
  },
  components: {
    Card
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

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
  padding: 0 8px;

  // 所有icon统一的样式
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: $mid-1;
    border-radius: 6px;
    transition: all 0.2s ease-out;

    &:active {
      background-color: $mid-5;
      color: main-3;
    }
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
      margin-right: 8px;
    }

    .del {
      display: none;
    }

    .item {
      text-align: center;
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
          display: none;
        }
      }

      &.songer {
        flex: 2;
      }

      &.time {
        flex: 1;
      }
    }

    &:hover {
      background-color: $main-6;
      color: $mid-1;
      box-shadow: 0 14px 24px -16px $main-6;
      .main .btn-box {
        display: block;
      }
      .del {
        display: inline-block;
      }
      .icon {
        color: $main-6;
      }
    }
  }
}
</style>
