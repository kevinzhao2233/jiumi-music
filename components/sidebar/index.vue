<template>
  <div class="sidebar-box">
    <div class="block logo-box">啾咪音乐</div>
    <List v-for="item in sidebarList" :key="item.title" :item="item"></List>
  </div>
</template>

<script>
import List from './List.vue'

export default {
  name: 'Sidebar',
  components: {
    List
  },

  data() {
    return {
      // TODO: icon，路由 需要放到 list 中
      sidebarList: [
        {
          title: '发现音乐',
          list: ['个性推荐', '歌单', '歌手', 'MV']
        },
        {
          title: '我的音乐',
          list: ['我的喜欢', '最近播放', '我的收藏']
        },
        {
          title: '创建的歌单',
          list: [
            '双笙 囧菌 玄觞 三无 银临 漆柚 Akie秋绘',
            '『耳机福利』左右耳已跪',
            '听了心情会变好的欢快古风小调',
            '音阙诗听的二十四节气'
          ]
        },
        {
          title: '收藏的歌单',
          list: [
            '「島唄」海风中歌声悠扬',
            '恋恋心事：春天了抓个人搭伙唱情歌',
            '✨地球太嘈杂，可以和你潜入另一座星球吗？',
            '游戏BGM丨一燃到底 全程高能'
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.sidebar-box {
  height: 100%;
  padding: 24px 24px 60px 24px;
  overflow-y: scroll;

  .block {
    margin: 12px auto;
    overflow: hidden;

    &.logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      background-color: $aux-1;
      border-radius: 16px;
      font-size: 32px;
      font-weight: 400;
      color: $mid-10;
    }
  }
}
</style>
