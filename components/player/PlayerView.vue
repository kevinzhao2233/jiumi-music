<template>
  <div class="player-view">
    <div
      class="img-bg"
      :style="{
        background: `center / cover url(${songDetail.al.picUrl}?param=400y400) no-repeat`
      }"
    ></div>
    <div class="disc-box">
      <div class="box active">
        <i class="bg"></i>
        <div
          class="disc-cir"
          :style="{
            background: `center / cover url(${songDetail.al.picUrl}?param=400y400) no-repeat`
          }"
        ></div>
      </div>
    </div>
    <div class="lrc-box">
      <span class="tit">{{ songDetail.name }}</span>
      <span class="alia">{{ songDetail.alia[0] }}</span>
      <div class="label">
        歌手：
        <span class="art-names" v-for="(art, index) in songDetail.ar" :key="index">
          <nuxt-link
            class="label-item"
            :to="{ name: 'singer-id', params: { id: art.id } }"
            @click.native="closeView"
            >{{ art.name }}</nuxt-link
          >
          <span class="placeholder" v-if="index < songDetail.ar.length - 1"> / </span>
        </span>
      </div>
      <div class="label">
        专辑：
        <nuxt-link
          :to="{ name: 'album-id', params: { id: songDetail.al.id } }"
          class="label-item"
          @click.native="closeView"
          >{{ songDetail.al.name }}</nuxt-link
        >
      </div>
      <div class="lrc">
        {{ lrcStr }}
      </div>
    </div>
    <div class="comment-box"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PlayerView',

  props: {
    songDetail: {
      type: Object
    }
  },

  data: () => ({
    lrc: null,
    lrcStr: ''
  }),

  computed: {
    ...mapState(['player']),
    currSongId() {
      return this.player.currSong.id;
    }
  },

  watch: {
    currSongId() {
      this.fetchLrc(this.currSongId);
    }
  },

  methods: {
    closeView() {
      this.$emit('close-view');
    },

    /**
     * 获取歌词
     */
    async fetchLrc(id) {
      const { lrc } = await this.$axios.$get(`/api/lyric?id=${id}`);
      this.$nextTick(() => {
        this.lrcStr = lrc.lyric.replace(/\[(.+)\]/g, '');
      });
    }
  },

  created() {
    this.fetchLrc(this.songDetail.id);
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.player-view {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  margin: 0 auto;
  padding-bottom: 160px;
  width: 100%;
  height: 100%;
  background-color: $aux-1;
  overflow-x: hidden;
  overflow-y: auto;

  /* 滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }

  .img-bg {
    position: fixed;
    left: -2%;
    top: -2%;
    width: 104%;
    height: 100%;
    z-index: 0;
    filter: blur(24px) brightness(1.2) opacity(0.3);
  }
}

.disc-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42%;
  height: 680px;
  z-index: 10;

  .box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 360px;
    height: 360px;

    &.active {
      .bg {
        content: '';
        position: absolute;
        left: 5%;
        top: 2%;
        background-color: #ffffff65;
        width: 360px;
        height: 360px;
        border-radius: 50%;
        transform-origin: 45% 48%;
        animation: circle 6s linear infinite;
      }
      &::after {
        content: '';
        position: absolute;
        left: -5%;
        top: -5%;
        background-color: #ffffff4f;
        width: 360px;
        height: 360px;
        border-radius: 50%;
        transform-origin: 54% 56%;
        animation: circle 8s linear infinite;
      }
      &::before {
        content: '';
        position: absolute;
        left: -4%;
        top: 8%;
        background-color: #ffffff22;
        width: 360px;
        height: 360px;
        border-radius: 50%;
        transform-origin: 54% 43%;
        animation: circle 12s linear infinite;
      }
    }
  }
  .disc-cir {
    width: 360px;
    height: 360px;
    border-radius: 50%;
    z-index: 10;
    // animation: circle 24s linear infinite;
  }
}

.lrc-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 0 0;
  width: 42%;
  height: 680px;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 10;

  .tit {
    display: inline-block;
    margin: 8px 0 12px;
    font-size: 28px;
  }

  .alia {
    margin-bottom: 12px;
    display: block;
    color: $mid-7;
  }

  .label {
    margin: 8px 0 0;

    .label-item {
      display: inline-block;
      margin: 0 4px;
      color: $mid-10;
      cursor: pointer;

      &:hover {
        color: $main-6;
      }
    }
  }

  .lrc {
    flex: 1;
    margin-top: 24px;
    padding: 24px 98px 24px 0;
    white-space: pre-wrap;
    overflow: auto;

    /* 滚动条 */
    &::-webkit-scrollbar {
      width: 6px;
    }
    /* 滚动条的滑块 */
    &::-webkit-scrollbar-thumb {
      background-color: #fff4;
      border-radius: 3px;
    }
  }
}

.comment-box {
  width: 100%;
  // min-height: 400px;
}
</style>
