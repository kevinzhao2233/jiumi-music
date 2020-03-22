<template>
  <div class="k-input-box">
    <input
      type="text"
      class="input"
      :placeholder="placeholder"
      v-model="keyword"
      @input="handleInput"
      @keypress.enter="submit"
    />
    <i :class="`icon iconfont ${icon}`" v-if="icon" @mousedown="submit"></i>
  </div>
</template>

<script>
export default {
  name: 'Inputbar',
  props: {
    placeholder: {
      type: String,
      default: '输入关键词'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      keyword: '',
      timer: null,
      currSubmit: ''
    }
  },
  methods: {
    submit() {
      if (this.currSubmit !== this.keyword) {
        this.currSubmit = this.keyword
        console.log('submit', this.keyword)
      }
    },
    handleInput() {
      const timeout = 160
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$emit('has-input', this.keyword)
      }, timeout)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-input-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: $mid-10;

  .input {
    flex: 1;
    margin: 0 12px;
    height: 100%;
    border: none;
  }

  .icon {
    flex: 0 0 1;
    display: inline-block;
    text-align: center;
    width: 52px;
    line-height: 1.6;
    font-size: 24px;
    cursor: pointer;

    &:hover {
      color: $main-6;

      &:active {
        color: $main-4;
      }
    }
  }
}
</style>
