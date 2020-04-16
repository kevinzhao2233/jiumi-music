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
      <RecycleScroller
        v-if="player.list.length > 50"
        :items="player.list"
        :item-size="58"
        key-fild="id"
        :buffer="500"
        page-mode
        v-slot="{ item }"
      >
        <CPlaylistItem
          :item="item"
          :currSong="player.currSong"
          @play="play($event)"
          @remove="remove($event)"
        />
      </RecycleScroller>
      <transition-group
        v-else
        name="flip-list"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated zoomOutRight"
      >
        <CPlaylistItem
          v-for="item in player.list"
          :key="item.id"
          :item="item"
          :currSong="player.currSong"
          @play="play($event)"
          @remove="remove($event)"
        />
      </transition-group>
    </ul>
  </Card>
</template>

<script>
import CPlaylistItem from './CPlaylistItem.vue'
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
        Array.from(e.target.classList).indexOf('__mark') < 0 &&
        e.target.id !== 'playerPlaylistBtn'
      ) {
        // 如果点击的target不是这个组件，就收起来
        this.closeList()
      }
    })
  },
  components: {
    Card,
    CPlaylistItem
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

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
  height: 336px;
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
}
</style>
