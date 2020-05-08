<template>
  <div class="wrap" v-if="showWrap" :class="showContent ? 'fadein' : 'fadeout'">{{ text }}</div>
</template>
<script>
export default {
  name: 'Toast'
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/config.scss';

.wrap {
  position: fixed;
  padding: 10px 24px;
  left: 50%;
  bottom: 240px;
  transform: translateX(-50%);
  box-shadow: 0 8px 24px -8px $main-6;
  font-size: 15px;
  background: $main-6;
  border-radius: 16px;
  color: $mid-1;
  z-index: 100;
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
