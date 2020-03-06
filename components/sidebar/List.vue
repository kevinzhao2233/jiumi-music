<template>
  <div class="block">
    <span class="tit">{{ item.title }}</span>
    <ul class="list-box">
      <li class="item" v-for="(list, index) in item.list" :key="index" :title="list">
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

  mounted() {
    console.log('--==--==', this.item.list)
  }
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
    margin: 40px 0 0 0;
    font-size: 14px;
    color: $mid-9;
  }

  .list-box {
    width: 100%;
    overflow: hidden;

    .item {
      margin: 4px 0;
      width: 100%;
      color: $mid-7;
      font-size: 14px;
      line-height: 36px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        color: $mid-9;
        background-color: $aux-1;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>
