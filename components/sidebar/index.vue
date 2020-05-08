<template>
  <div class="sidebar-box">
    <img src="~/static/img/logo.png" class="block logo-box" alt="啾咪音乐" />
    <List :items="sidebarList.explore" />
    <List :items="sidebarList.myMusic" v-if="isLogin" />
    <List :items="sidebarList.myCreate" v-if="isLogin" />
    <List :items="sidebarList.myEnshrine" v-if="isLogin" />
    <NoLogin message="登录后显示你的歌单" v-else />
  </div>
</template>

<script>
import NoLogin from '~/components/common/NoLogin.vue';
import List from './List.vue';
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  components: {
    List,
    NoLogin
  },

  data() {
    return {
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
              name: '发现音乐',
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
            }
            // TODO: MV
            // {
            //   id: '105',
            //   name: 'MV',
            //   icon: 'icon-videocam_fill',
            //   router: 'mv'
            // }
          ]
        },
        myMusic: {
          title: '我的音乐',
          list: [
            {
              id: '201',
              name: '我的喜欢',
              icon: 'icon-heart_fill'
            },
            {
              id: '202',
              name: '最近播放',
              icon: 'icon-clock_fill',
              router: 'current'
            },
            {
              id: '203',
              name: '我的收藏',
              icon: 'icon-star_fill',
              router: 'enshrine'
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
      isLogin: false
    };
  },

  computed: {
    ...mapState(['user', 'fetch']),
    createList() {
      return this.fetch.userPl.createList;
    },
    enshrineList() {
      return this.fetch.userPl.enshrineList;
    }
  },
  watch: {
    createList() {
      this.setUserList();
    },
    enshrineList() {
      this.setUserList();
    }
  },
  methods: {
    /**
     * 获取用户歌单列表
     */
    setUserList() {
      this.sidebarList.myCreate.list = JSON.parse(JSON.stringify(this.createList.slice(1)));
      this.sidebarList.myEnshrine.list = JSON.parse(JSON.stringify(this.enshrineList));
      this.sidebarList.myMusic.list[0].id = JSON.parse(JSON.stringify(this.createList[0].id));
    },

    /**
     * 切换歌单列表显示效果
     */
    switchSidebarEff(to) {
      for (const key in this.sidebarList) {
        if (this.sidebarList.hasOwnProperty(key)) {
          const myList = this.sidebarList[key];
          for (const item of myList.list) {
            this.$set(item, 'active', false);
            if (item.router === to.name) {
              this.$set(item, 'active', true);
            } else if (to.name === 'playlist-id' && Number(item.id) === Number(to.params.id)) {
              this.$set(item, 'active', true);
            }
          }
        }
      }
    }
  },

  created() {
    if (this.user.uid) {
      // this.fetchUserList(this.user.uid).then(() => {
      //   // 更新侧边显示效果
      //   this.switchSidebarEff(this.$route);
      // });
      this.isLogin = true;
      this.$store
        .dispatch({
          type: 'fetch/fetchUserList',
          payload: { id: this.user.uid }
        })
        .then(() => this.switchSidebarEff(this.$route));
    } else {
      this.isLogin = false;
    }
  },

  mounted() {
    this.switchSidebarEff(this.$route);
    this.$router.beforeEach((to, from, next) => {
      this.switchSidebarEff(to);
      next();
    });
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
      width: 110%;
      height: auto;
    }
  }
}
</style>
