<template>
  <div
    class="k-box"
    @mouseenter="changeInputState('hover')"
    @mouseleave="changeInputState('leave')"
  >
    <div :class="isHover ? 'input-box active' : 'input-box'">
      <div class="btn" @mousedown="submit">
        <i class="icon iconfont icon-search"></i>
      </div>
      <input
        :class="isHover ? 'input active' : 'input'"
        @focus="changeInputState('focus')"
        @blur="changeInputState('blur')"
        @input="handleInput"
        autocomplete="off"
        type="text"
        name="search"
        ref="input"
        v-model="inputData"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      isFocused: false,
      isHover: false,
      inputData: '',
      timer: null
    };
  },
  methods: {
    changeInputState(value) {
      switch (value) {
        case 'focus':
          this.isFocused = true;
          break;
        case 'blur':
          this.isHover = false;
          this.isFocused = false;
          break;
        case 'hover':
          this.isHover = true;
          this.$refs.input.focus();
          break;
        case 'leave':
          if (this.inputData === '') {
            this.isHover = false;
          }
          break;
      }
    },
    // 防抖处理
    handleInput() {
      const timeout = 200;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.submit();
      }, timeout);
    },
    // 提交搜索
    submit() {
      this.$emit('submit', this.inputData);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: all 0.3s ease;

  .input-box {
    display: flex;
    flex-direction: row-reverse;
    width: 36px;
    height: 36px;
    background-color: $mid-1;
    box-shadow: 0 12px 24px -4px $mid-5;
    border-radius: 15px;
    transition: all 0.3s ease;
    overflow: hidden;

    .btn {
      flex: 0 0 36px;
      width: 36px;
      height: 36px;
      text-align: center;

      .icon {
        color: $main-6;
        line-height: 36px;
      }
    }
    &.active {
      width: 196px;
      box-shadow: none;
    }

    .input {
      flex: 0;
      width: 100%;
      height: 36px;
      line-height: 36px;
      border: none;

      &.active {
        flex: 1;
        margin-left: 12px;
      }
    }
  }
}
</style>
