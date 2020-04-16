<template>
  <div class="k-card-box">
    <div class="k-header">
      <h3 class="tit">
        <slot name="title">卡片标题</slot>
      </h3>
      <div class="controls">
        <slot name="controls"></slot>
      </div>
    </div>
    <div class="k-main">
      <slot>
        <span></span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-card-box {
  margin-top: 8px;
  width: 100%;
  color: $mid-10;

  .k-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 0;

    .tit {
      font-size: 20px;
      font-weight: 600;
      white-space: 2px;
    }

    .controls {
      display: flex;
      align-items: center;
    }
  }

  .k-main {
    width: 100%;
    min-height: 14px;
  }
}
</style>
