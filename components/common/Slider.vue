<template>
  <div :class="vertical ? 'vertical slideBox' : 'slideBox'" ref="sliderBox">
    <div class="slide" ref="sliderLineBox" @mousedown="clickProgressLine">
      <div
        :class="hasAnimation ? 'line anim' : 'line'"
        ref="sliderLine"
        :style="vertical ? { height: value * 100 + '%' } : { width: value * 100 + '%' }"
      >
        <i class="btn" ref="slider" @mousedown="selectSlider"> </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    parentEl: {
      type: HTMLDivElement
    },
    rangeEl: {
      type: HTMLDivElement
    }
  },
  data() {
    return {
      hasAnimation: true,
      progress: 0
    }
  },
  methods: {
    // 点击进度条
    clickProgressLine(e) {
      if (!this.disable) {
        this.move(e, true)
        this.$emit('has-change-value', this.progress)
      }
    },
    // 选中进度滑块
    selectSlider(e) {
      this.$emit('has-select-slider')
      if (!this.disable) {
        e.stopPropagation()
        e.preventDefault()
        if (this.rangeEl) {
          this.rangeEl.addEventListener('mousemove', this.move, false)
          this.rangeEl.addEventListener('mouseup', this.stop, false)
        }else {
          this.$refs.sliderBox.addEventListener('mousemove', this.move, false)
          this.$refs.sliderBox.addEventListener('mouseup', this.stop, false)
        }
      }
    },
    // 移动
    move(e, hasAni) {
      if (hasAni) {
        e.preventDefault()
        this.hasAnimation = true
      } else {
        this.hasAnimation = false
      }
      if (this.vertical) {
        let mousePageY = e.pageY
        let linePageY = this.$refs.sliderLine.getBoundingClientRect().top
        let lineBoxH = this.$refs.sliderLineBox.clientHeight
        let lineH = this.$refs.sliderLine.style.height
        let temp = (linePageY + (lineBoxH * lineH.replace('%', '')) / 100 - mousePageY) / lineBoxH
        this.progress = temp < 0.01 ? 0 : temp > 0.99 ? 1 : temp
        this.$refs.sliderLine.style.height = this.progress * 100 + '%'
        this.$emit('has-change-value', this.progress)
      } else {
        let mousePageX = e.pageX
        let linePageX = this.$refs.sliderLine.getBoundingClientRect().left
        let lineBoxW = this.$refs.sliderLineBox.clientWidth
        let temp = (mousePageX - linePageX) / lineBoxW
        this.progress = temp < 0.01 ? 0 : temp > 0.99 ? 1 : temp
        this.$refs.sliderLine.style.width = this.progress * 100 + '%' // 当前高亮条的长度
      }
    },
    // 停止，移开鼠标
    stop() {
      if(this.rangeEl) {
        this.rangeEl.removeEventListener('mousemove', this.move, false)
        this.rangeEl.removeEventListener('mouseup', this.stop, false)
      }else {
        this.$refs.sliderBox.removeEventListener('mousemove', this.move, false)
        this.$refs.sliderBox.removeEventListener('mouseup', this.stop, false)
      }
      this.$emit('has-change-value', this.progress)
    },
    closeOpt() {
      this.$emit('close')
    }
  },
  mounted() {
    // 点击选框之外的地方，收起选框
    document.addEventListener('mousedown', e => {
      if (this.parentEl && !this.parentEl.contains(e.target)) {
        this.closeOpt()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.slideBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .slide {
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
        transition: all 0.3s ease;
      }

      .btn {
        @include progressBtn(16px, $main-4, $main-6);
        float: right;
        margin: -6px -8px 0 0;
      }
    }
  }

  &.vertical {
    .slide {
      display: flex;
      align-items: flex-end;
      margin: 0 auto;
      height: 100px;
      width: 4px;

      .line {
        width: 100%;
        box-shadow: 0 2px 6px $main-4;

        .btn {
          @include progressBtn(16px, $main-4, $main-6);
          margin: -8px -6px 0 -5px;
        }
      }
    }
  }
}
</style>
