<template>
  <Card>
    <h3 slot="title" class="title">每日歌曲推荐</h3>
    <ul class="list-box">
      <li class="item" v-for="(item, index) in mscList" :key="index">
        <div class="left">
          <span class="num">{{ index + 1 < 10 ? `0${index + 1}` : index + 1 }}</span>
          <i class="n-btn" @click="add"></i>
          <i
            class="pic"
            :style="{
              background: `url(${item.album.picUrl}?param=40y40)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }"
          ></i>
          <div class="content">
            <span class="msc-name">{{ item.name }}</span>
            <div class="msc-art">
              <span class="aet-name" v-for="(art, index) in item.artists" :key="index">
                {{ art.name }}
                <span class="placeholder" v-if="index < item.artists.length - 1">/</span>
              </span>
            </div>
          </div>
        </div>
        <div class="right">
          <span class="time">{{
            parseInt(item.duration / 60000) +
              ':' +
              parseInt((item.duration / 60000 - parseInt(item.duration / 60000)) * 60)
          }}</span>
          <i class="btn"></i>
          <i class="btn"></i>
        </div>
      </li>
    </ul>
  </Card>
</template>
<script>
import Card from '~/components/common/Card.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MusicList',
  components: {
    Card
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    add() {
      this.$store.commit('todos/add', '这是一个todo')
    }
  },
  mounted() {
    const getSong = async () => {
      const { recommend } = await this.$axios.$get('/api/recommend/songs')
      this.$nextTick(() => {
        this.mscList = recommend
      })
    }
    getSong()
  },
  data() {
    return {
      mscList: []
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.list-box {
  width: 100%;
  margin: 0 40px 200px 0;

  .item {
    display: flex;
    justify-content: space-between;
    margin: 4px 0;
    padding: 0 12px;
    width: 100%;
    height: 58px;
    border-radius: 6px;
    color: $mid-6;
    transition: all 0.3s ease;

    .left {
      display: flex;
      align-items: center;
      overflow: hidden;

      .num {
        flex: 0 0 1;
        width: 24px;
        height: 24px;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
        font-weight: 500;
      }

      .n-btn {
        flex: 0 0 1;
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 4px;
        display: none;
      }

      .pic {
        flex: 0 0 1;
        margin: 0 16px 0 8px;
        width: 40px;
        height: 40px;
        border-radius: 6px;
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
        }

        .msc-art {
          display: block;
          font-size: 13px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .art-name {
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }

          .placeholder {
            color: $mid-5;
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      .time {
        padding: 0 20px;
        font-size: 14px;
        font-weight: 500;
      }

      .btn {
        margin: 0 4px;
        width: 28px;
        height: 28px;
        background-color: #ddd;
        border-radius: 4px;
      }
    }

    &:hover {
      background-color: $main-6;
      color: $main-2;
      box-shadow: 0 14px 24px -16px $main-6;

      .left {
        .content {
          .msc-name {
            color: $mid-1;
          }
          .msc-art {
            color: $mid-4;
          }
        }

        .n-btn {
          display: block;
        }

        .num {
          display: none;
        }
      }
    }
  }
}
</style>
