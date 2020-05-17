<template>
  <div class="screening-box">
    <div
      v-for="item in items"
      :class="defaultSelect === item.id ? 'cat active' : 'cat'"
      :key="item.id"
      @click="handleSelect({ id: item.id })"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Screening',
  props: {
    items: {
      type: Array
    },
    defaultSelect: {
      type: Number
    }
  },
  methods: {
    handleSelect(params) {
      this.$emit('selected', params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.screening-box {
  position: relative;
  display: flex;
  margin: 12px auto;
  padding: 0 24px;

  .cat {
    margin: 0 4px;
    padding: 8px 16px;
    color: $mid-8;
    border-radius: 6px;
    user-select: none;
    transition: background-color 0.2s, color 0.2s;
    cursor: pointer;

    &.active {
      background-color: $main-6;
      color: $mid-1;
    }

    &:hover {
      background-color: $main-6;
      color: $mid-1;

      &:active {
        background-color: $main-4;
      }
    }
  }
}
</style>
