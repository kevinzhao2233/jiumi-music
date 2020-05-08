<template>
  <div class="block">
    <span class="tit">{{ items.title }}</span>
    <div class="list-box">
      <div
        :class="item.active ? 'item active' : 'item'"
        v-for="(item, index) in items.list"
        @click="switchRouter(item)"
        :key="index"
        :title="item.name"
      >
        <i
          :class="item.icon ? `icon iconfont ${item.icon}` : 'icon iconfont icon-music_albums_fill'"
        ></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',

  props: {
    items: {
      type: Object
    }
  },

  methods: {
    switchRouter(item) {
      this.$router.push({ name: item.router || 'playlist-id', params: { id: item.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.block {
  margin: 8px auto;
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
    margin: 24px 0 6px 12px;
    font-size: 14px;
    color: $mid-10;
  }

  .list-box {
    padding-bottom: 16px;
    width: 100%;
    overflow: hidden;

    .item {
      display: block;
      margin: 4px 0;
      padding-left: 12px;
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

      .icon {
        margin-right: 6px;
      }

      &.active {
        color: $main-6;
      }

      &:hover {
        color: $main-1;
        background-color: $main-6;
        box-shadow: 0 8px 24px -12px $main-6;
      }

      &:active {
        color: $mid-1;
        background-color: $main-4;
        transition: all 0.1s ease;
      }
    }
  }
}
</style>
