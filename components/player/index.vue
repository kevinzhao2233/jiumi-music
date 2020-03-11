<template>
  <div class="player-box">
    <div class="discover">
      <div
        class="img"
        :style="{
          background: `100% url(https://p1.music.126.net/FuyWt50x4HipjqoTiCKg-Q==/109951164307554693.jpg?param=46y46) no-repeat`
        }"
      ></div>
      <div
        class="img-bg"
        :style="{
          background: `100% url(https://p1.music.126.net/FuyWt50x4HipjqoTiCKg-Q==/109951164307554693.jpg?param=46y46) no-repeat`
        }"
      ></div>
      <div class="info">
        <span class="msc-name">希望之名</span>
        <span class="msc-art">肥皂菌 | 珉珉的猫咪</span>
      </div>
    </div>
    <div class="l-control">
      <Button type="primary" />
      <Button type="primary" />
      <Button type="primary" />
    </div>
    <div class="progress" ref="progressBox">
      <span class="time">00:00</span>
      <div class="pro" ref="sliderLineBox" @mousedown="clickProgressLine">
        <div
          :class="hasAnimation ? 'line anim' : 'line'"
          ref="sliderLine"
          :style="{ width: mscProgressWidth }"
        >
          <i class="btn" ref="slider" @mousedown="selectSlider"> </i>
        </div>
      </div>
      <span class="time">43:54</span>
    </div>
    <div class="r-control">
      <Button type="primary" />
      <Button type="primary" />
      <Button type="primary" />
      <Button type="primary" />
    </div>
  </div>
</template>

<script>
import Button from '~/components/common/Button.vue'

export default {
  name: 'Player',

  components: {
    Button
  },

  data() {
    return {
      mscProgressWidth: '0%',
      hasAnimation: false
    }
  },

  methods: {
    clickProgressLine(e) {
      this.move(e, true)
    },

    selectSlider(e) {
      // this.hasAnimation = false
      e.preventDefault()
      this.$refs.progressBox.addEventListener('mousemove', this.move, false)
      this.$refs.progressBox.addEventListener('mouseup', this.stop, false)
    },

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
      this.$refs.sliderLine.style.width = ((mousePageX - linePageX) / lineBoxW) * 100 + '%' // 当前高亮条的长度
    },

    stop() {
      this.$refs.progressBox.removeEventListener('mousemove', this.move, false)
      this.$refs.progressBox.removeEventListener('mouseup', this.stop, false)
      this.adjustMscPosition()
    },

    adjustMscPosition() {
      //TODO: 这里是对音乐进度进行调整的地方
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.player-box {
  display: flex;
  width: 100%;
  height: 100%;

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

  .r-control{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
}
</style>