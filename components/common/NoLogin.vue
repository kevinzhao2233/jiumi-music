<template functional>
  <div class="box">
    这里需要登录哦 φ(゜▽゜*)♪
    <nuxt-link :to="{ name: 'Login' }" class="btn">立马登录</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NoLogin'
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';

.box {
  width: 100%;
  height: 100px;
  text-align: center;
  color: $main-6;

  .btn {
    display: block;
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
