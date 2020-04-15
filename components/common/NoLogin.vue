<template>
  <div class="box">
    这里需要登录哦 φ(゜▽゜*)♪
    <div class="btn" @click="submit">立马登录</div>
  </div>
</template>

<script>
export default {
  name: 'NoLogin',
  methods: {
    submit() {
      this.$emit('has-click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';

.box {
  width: 100%;
  height: 100%;
  text-align: center;
  color: $main-6;

  .btn {
    margin: 12px auto 0;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border-radius: 12px;
    background-color: $main-6;
    color: $mid-1;
    transition: background-color 0.2s;
    user-select: none;
    cursor: pointer;

    &:active {
      background-color: $main-4;
    }
  }
}
</style>
