<template>
  <div class="player-box" ref="playerBox">
    <div class="discover">
      <div
        class="img"
        :style="{
          background: `100% url(${player.currSong.detail.picUrl}?param=46y46) no-repeat`
        }"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `100% url(${player.currSong.detail.picUrl}?param=46y46) no-repeat`
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
      <Button @has-click="prev" type="primary" icon="icon-backward_end_fill" />
      <Button
        @has-click="playOrPause"
        type="primary"
        :icon="player.currSong.isPlay ? 'icon-pause_fill' : 'icon-play_fill'"
      />
      <Button @has-click="next" type="primary" icon="icon-forward_end_fill" />
    </div>
    <div class="progress">
      <span class="time">{{ mscTime.currTime }}</span>
      <div class="pro" ref="sliderLineBox" @mousedown="clickProgressLine">
        <div
          :class="hasAnimation ? 'line anim' : 'line'"
          ref="sliderLine"
          :style="{ width: mscTime.progress }"
        >
          <i class="btn" ref="slider" @mousedown="selectSlider"> </i>
        </div>
      </div>
      <span class="time">{{ mscTime.totalTime }}</span>
    </div>
    <div class="r-control">
      <Button icon="icon-heart_fill" />
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
      <Button icon="icon-speaker__fill2" />
      <Button icon="icon-music_note_list" :mark="player.list.length" id="playerPlaylistBtn" @has-click="clickList" />
    </div>
    <div class="playlist-box" :style="isShowList ? { height: '360px' } : { height: '0' }">
      <CurrentPlaylist @close-list="closeList" />
    </div>
  </div>
</template>

<script>
import Button from '~/components/common/Button.vue'
import CurrentPlaylist from '~/components/player/CurrentPlaylist.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Player',

  components: {
    Button,
    CurrentPlaylist
  },

  data() {
    return {
      mscProgressWidth: 0,
      hasAnimation: false,
      isShowList: false,
      num: 1
    }
  },

  computed: {
    ...mapState(['player']),
    ...mapGetters({
      mscTime: 'player/mscTime'
    })
  },

  methods: {
    ...mapMutations({
      next: 'player/next',
      prev: 'player/prev',
      switchMode: 'player/switchMode'
    }),
    // 点击进度条
    clickProgressLine(e) {
      this.move(e, true)
      this.adjustMscPosition()
    },
    // 选中进度滑块
    selectSlider(e) {
      e.stopPropagation()
      e.preventDefault()
      this.$refs.playerBox.addEventListener('mousemove', this.move, false)
      this.$refs.playerBox.addEventListener('mouseup', this.stop, false)
      // 禁止自动更改进度条
      this.$store.dispatch({ type: 'player/updatePrg', mark: true })
    },
    // 移动
    move(e, hasAni) {
      if (hasAni) {
        this.hasAnimation = true
      } else {
        this.hasAnimation = false
      }
      e.preventDefault()
      let mousePageX = e.pageX
      let linePageX = this.$refs.sliderLine.getBoundingClientRect().left
      let lineBoxW = this.$refs.sliderLineBox.clientWidth
      let temp = (mousePageX - linePageX) / lineBoxW
      this.mscProgressWidth = temp < 0.01 ? 0 : temp > 0.99 ? 1 : temp
      this.$refs.sliderLine.style.width = this.mscProgressWidth * 100 + '%' // 当前高亮条的长度
    },
    // 停止，一开鼠标
    stop() {
      this.$refs.playerBox.removeEventListener('mousemove', this.move, false)
      this.$refs.playerBox.removeEventListener('mouseup', this.stop, false)
      this.adjustMscPosition()
    },
    // 调整音乐进度
    adjustMscPosition() {
      this.$store.commit('player/updateProgress', this.mscProgressWidth)
      this.$store.dispatch({ type: 'player/updatePrg' })
    },
    // 暂停播放
    playOrPause() {
      if (this.player.audio) {
        if (this.player.audio.paused) {
          this.$store.commit('player/play')
        } else {
          this.$store.commit('player/pause')
        }
      } else {
        if (this.player.list.length > 0) {
          // 根据保持的状态播放
        } else {
          // 列表为空，点击播放后进行提示
        }
      }
    },
    // 点击歌单按钮
    clickList() {
      this.isShowList = !this.isShowList
    },
    closeList() {
      this.isShowList = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.player-box {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;

  & > div {
    display: flex;
    margin: 0 24px;
    height: 100%;
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
      width: 100%;
      height: 4px;
      background-color: $mid-5;
      border-radius: 10px;
      cursor: pointer;

      .line {
        height: 100%;
        background-color: $main-6;
        border-radius: 10px;
        box-shadow: 2px 0 6px $main-4;

        &.anim {
          transition: width 0.3s ease;
        }

        .btn {
          @include progressBtn(16px, $main-4, $main-6);
          float: right;
          margin: -6px -8px 0 0;
        }
      }
    }
  }

  .r-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 48px;
    height: 100%;
  }

  .playlist-box {
    position: absolute;
    right: 0;
    bottom: 80px;
    margin-right: 48px;
    width: 450px;
    background-color: $mid-1;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0 -8px 24px -2px $mid-3;
    transition: height 0.3s ease;
    overflow: hidden;
  }
}
</style>
