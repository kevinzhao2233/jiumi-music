<template>
  <div class="block">
    <span class="tit">{{ item.title }}</span>
    <ul class="list-box">
      <li
        class="item"
        v-for="(list, index) in item.list"
        :key="index"
        :title="list"
      >
        {{ list }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',

  props: {
    item: {
      type: Object
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.block {
  margin: 12px auto;
  overflow: hidden;

  &.logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: $aux-1;
    border-radius: 16px;
    font-size: 32px;
    font-weight: 400;
    color: $mid-10;
  }

  .tit {
    display: inline-block;
    margin: 24px 0 6px 0;
    font-size: 14px;
    color: $mid-10;
  }

  .list-box {
    width: 100%;
    overflow: hidden;

    .item {
      display: block;
      margin: 4px 0;
      width: 100%;
      color: $mid-7;
      font-size: 14px;
      line-height: 40px;
      border-radius: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all 0.3s ease;
      user-select: none;
      cursor: pointer;

      &.active {
        color: $main-6;
        background-color: $main-1;
      }

      &:hover {
        color: $main-6;
        background-color: $main-1;
      }

      &:active {
        color: $main-7;
        background-color: $main-3;
      }
    }
  }
}
</style>
