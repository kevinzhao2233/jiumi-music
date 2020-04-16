<template>
  <div class="sidebar-box">
    <div class="block logo-box">啾咪音乐</div>
    <List v-for="(items, index) in sidebarList" :key="index" :items="items"></List>
  </div>
</template>

<script>
import List from './List.vue';

export default {
  name: 'Sidebar',
  components: {
    List
  },

  data() {
    return {
      // TODO: icon，路由 需要放到 list 中
      sidebarList: {
        explore: {
          title: '发现音乐',
          list: [
            {
              id: '101',
              name: '搜索',
              icon: 'icon-search',
              router: 'search'
            },
            {
              id: '102',
              name: '个性推荐',
              icon: 'icon-location_fill',
              router: 'index'
            },
            {
              id: '103',
              name: '歌单',
              icon: 'icon-music_albums_fill',
              router: 'playlist'
            },
            {
              id: '104',
              name: '歌手',
              icon: 'icon-person__fill',
              router: 'singer'
            },
            {
              id: '105',
              name: 'MV',
              icon: 'icon-videocam_fill',
              router: 'mv'
            }
          ]
        },
        myMusic: {
          title: '我的音乐',
          list: [
            {
              id: '201',
              name: '我的喜欢',
              icon: 'icon-heart_fill',
              router: 'playlist'
            },
            {
              id: '202',
              name: '最近播放',
              icon: 'icon-clock_fill',
              router: 'playlist'
            },
            {
              id: '203',
              name: '我的收藏',
              icon: 'icon-star_fill',
              router: 'playlist'
            }
          ]
        },
        myCreate: {
          title: '创建的歌单',
          list: []
        },
        myEnshrine: {
          title: '收藏的歌单',
          list: []
        }
      },
      settings: {
        tagname: 'div'
      }
    };
  },

  created() {
    const uid = localStorage.getItem('uid');
    const getUserList = async () => {
      const { playlist } = await this.$axios.$get(`/api/user/playlist?uid=${uid}`);
      const createList = playlist.filter((data, index) => {
        return data.userId.toString() === uid && index > 0;
      });
      const enshrineList = playlist.filter(data => {
        return data.userId.toString() !== uid;
      });
      this.sidebarList.myCreate.list = createList;
      this.sidebarList.myEnshrine.list = enshrineList;
    };
    if (uid) {
      getUserList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.sidebar-box {
  width: 100%;
  height: 100%;
  padding: 24px 16px 200px 16px;
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
