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
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      keyword: '',
      timer: null,
      currSubmit: ''
    };
  },
  watch: {
    value(newVal) {
      this.keyword = newVal;
    }
  },
  methods: {
    submit() {
      if (this.currSubmit !== this.keyword) {
        this.currSubmit = this.keyword;
        this.$emit('has-submit', this.keyword);
      }
    },
    handleInput() {
      const timeout = 160;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit('has-input', this.keyword);
      }, timeout);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-input-box {
  display: flex;
  align-items: stretch;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
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
