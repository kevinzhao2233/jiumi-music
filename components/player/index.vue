<template>
  <div class="player-box" ref="playerBox">
    <div class="player-view-box" v-if="isMusicPage">
      <PlayerView :songDetail="songDetail" @close-view="clickCover()" />
    </div>
    <div class="discover">
      <div
        class="img"
        :style="{
          background: `100% url(${alPicUrl}?param=46y46) no-repeat`
        }"
      >
        <div :class="player.list.length > 0 ? 'inner' : 'no-display'" @mousedown="clickCover">
          <i
            :class="
              isMusicPage
                ? 'icon iconfont icon-arrow_down_right_arrow_up_left'
                : 'icon iconfont icon-arrow_up_left_arrow_down_right'
            "
          ></i>
        </div>
      </div>
      <div
        class="img-bg"
        :style="{
          background: `100% url(${alPicUrl}?param=46y46) no-repeat`
        }"
      ></div>
      <div class="info">
        <span class="msc-name">{{ player.currSong.detail.name }}</span>
        <span class="msc-art">
          <span v-for="(songer, index) in player.currSong.detail.artists" :key="songer"
            >{{ index > 4 ? '' : `${songer}` }}
            <span v-if="index < 4 && index !== player.currSong.detail.artists.length - 1">/</span>
          </span>
        </span>
      </div>
    </div>
    <div class="l-control">
      <Button
        @has-click="switchSong({ direction: 'prev' })"
        type="primary"
        icon="icon-backward_end_fill"
      />
      <Button
        @has-click="playOrPause"
        type="primary"
        :icon="player.currSong.isPlay ? 'icon-pause_fill' : 'icon-play_fill'"
      />
      <Button
        @has-click="switchSong({ direction: 'next' })"
        type="primary"
        icon="icon-forward_end_fill"
      />
    </div>
    <div class="progress">
      <span class="time">{{ mscTime.currTime }}</span>
      <div class="pro">
        <Slider
          :value="mscTime.progress"
          :rangeEl="$refs.playerBox"
          @has-select-slider="selectSlider"
          @has-change-value="adjustMscPosition"
        />
      </div>
      <span class="time">{{ mscTime.totalTime }}</span>
    </div>
    <div class="r-control">
      <Button icon="icon-heart_fill" @has-click="$toast('开发者正在筹集头发~~')" />
      <Button
        @has-click="switchMode"
        :icon="
          player.setting.mode === 1
            ? 'icon-repeat_'
            : player.setting.mode === 2
            ? 'icon-repeat'
            : 'icon-shuffle'
        "
      />
      <div class="vol-box" ref="vol">
        <Button icon="icon-speaker__fill2" @has-click="cliskVolPanel" />
        <div class="vol-opt" v-show="isShowVolPanel">
          <Slider
            :vertical="true"
            :value="player.setting.vol"
            :parentEl="$refs.vol"
            @has-change-value="changeVol"
            @close="closeVolPanel"
          />
        </div>
      </div>
      <Button
        icon="icon-music_note_list"
        :mark="player.list.length"
        id="playerPlaylistBtn"
        @has-click="clickList"
      />
    </div>
    <transition
      v-if="isShowList"
      tag="div"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div class="playlist-box">
        <CurrentPlaylist @close-list="closeList" />
      </div>
    </transition>
  </div>
</template>

<script>
import Button from '~/components/common/Button.vue';
import Slider from '~/components/common/Slider.vue';
import CurrentPlaylist from '~/components/player/CurrentPlaylist.vue';
import PlayerView from '~/components/player/PlayerView.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Player',

  data() {
    return {
      mscProgressWidth: 0,
      hasAnimation: false,
      isShowList: false,
      isShowVolPanel: false,
      isMusicPage: false,
      songDetail: null,
      alPicUrl: 'https://img-bed-1259149964.cos.ap-chengdu.myqcloud.com/projectCND/temp.png'
    };
  },

  computed: {
    ...mapState(['player']),
    ...mapGetters({
      mscTime: 'player/mscTime'
    }),
    currSongId() {
      return this.player.currSong.id;
    }
  },

  watch: {
    currSongId(newVal, oldVal) {
      if (newVal !== 0 && newVal !== oldVal) {
        // 获取封面
        this.fetchPic(newVal);
      }
    }
  },

  methods: {
    ...mapMutations({
      switchSong: 'player/switchSong',
      switchMode: 'player/switchMode',
      changeVol: 'player/changeVol'
    }),
    // 获取歌曲详情和封面
    async fetchPic(id) {
      const { songs, privileges } = await this.$axios.$get(`/api/song/detail?ids=${id}`);
      this.$nextTick(() => {
        this.songDetail = songs[0];
        this.songDetail.privileges = privileges;
        this.alPicUrl = songs[0].al.picUrl;
      });
    },
    // 点击歌曲封面
    clickCover() {
      // TODO：点击歌曲封面
      // this.$toast('开发者正在筹集头发~~');
      this.isMusicPage = !this.isMusicPage;
    },
    // 选中进度滑块
    selectSlider(e) {
      if (this.player.list.length > 0) {
        // 禁止自动更改进度条
        this.$store.dispatch({ type: 'player/updatePrg', mark: true });
      }
    },
    // 调整音乐进度
    adjustMscPosition(value) {
      this.$store.commit('player/updateProgress', value);
      this.$store.dispatch({ type: 'player/updatePrg' });
    },
    // 暂停播放
    playOrPause() {
      if (this.player.audio) {
        if (this.player.audio.paused) {
          this.$store.commit('player/play');
        } else {
          this.$store.commit('player/pause');
        }
      }
    },
    cliskVolPanel() {
      this.isShowVolPanel = !this.isShowVolPanel;
    },
    closeVolPanel() {
      this.isShowVolPanel = false;
    },
    // 点击歌单按钮
    clickList() {
      this.isShowList = !this.isShowList;
    },
    closeList() {
      this.isShowList = false;
    }
  },

  mounted() {
    if (this.player.list.length > 0 && this.alPicUrl.includes('img-bed')) {
      this.fetchPic(this.player.currSong.id);
    }
  },

  components: {
    Button,
    Slider,
    CurrentPlaylist,
    PlayerView
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
@import '~assets/scss/mixins.scss';

// 覆盖动画时常
.animated {
  animation-duration: 0.3s;
}

.player-box {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $mid-1;

  & > div {
    display: flex;
    margin: 0 24px;
    height: 100%;
  }

  .player-view-box {
    position: fixed;
    display: block;
    margin: 0;
    left: 0;
    top: 0;
    width: 1240px;
    height: calc(100vh - 80px);
    z-index: -1;
    @include respond-to(lg) {
      width: 100%;
    }
  }

  .discover {
    position: relative;
    display: flex;
    align-items: center;
    width: 216px;

    .img {
      margin-right: 12px;
      width: 46px;
      height: 46px;
      border-radius: 6px;
      background-color: $main-6;
      z-index: 110;

      .inner {
        display: block;
        width: 100%;
        height: 100%;
        transition: all 0.2s ease;

        .icon {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 46px;
          font-size: 32px;
          color: $main-6;
          opacity: 0;
          transform: rotate(90deg);
          transition: opacity 0.2s ease;
          cursor: pointer;
        }
      }

      &:hover {
        .inner {
          background-color: #ffffff77;
          .icon {
            opacity: 1;
          }
        }
      }
    }
    .img-bg {
      position: absolute;
      top: 36px;
      left: 8px;
      width: 30px;
      height: 30px;
      filter: blur(20px);
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 46px;
      overflow: hidden;

      & > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .msc-name {
        font: {
          size: 16px;
          weight: 500;
        }
        color: $mid-10;
      }

      .msc-art {
        font-size: 13px;
        color: $mid-6;
      }
    }
  }

  .l-control {
    margin-left: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .progress {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .time {
      display: inline-block;
      text-align: center;
      min-width: 40px;
      font-weight: 500;
      line-height: 100%;
    }

    .pro {
      position: relative;
      flex: 1;
      margin: 0 12px;
    }
  }

  .r-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 48px;
    height: 100%;

    .vol-box {
      position: relative;

      .vol-opt {
        position: absolute;
        bottom: 46px;
        left: 8px;
        width: 36px;
        height: 140px;
        background-color: $mid-1;
        border-radius: 8px;
        box-shadow: -4px 0 24px -8px $mid-5;
      }
    }
  }

  .playlist-box {
    position: absolute;
    right: 0;
    bottom: 80px;
    margin-right: 48px;
    width: 450px;
    height: 400px;
    background-color: $mid-1;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0 -8px 24px -2px $mid-3;
    transition: height 0.3s ease;
    overflow: hidden;
    z-index: -1;
  }
}
</style>
