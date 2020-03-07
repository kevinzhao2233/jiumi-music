<template>
  <div :class="`box icon ${size} ${type}`">
    <i class="icon"></i>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: {
      validator: function(value) {
        if (typeof value === 'undefined') {
          return 1
        } else {
          return (
            typeof value === 'string' &&
            ['large', 'small'].indexOf(value) !== -1
          )
        }
      }
    },
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 8px;
  width: 32px;
  height: 32px;
  border-radius: 36%;
  background-color: $mid-1;
  box-shadow: 0 12px 24px -4px $mid-3;
  transition: all 0.2s ease;
  cursor: pointer;

  .icon {
    display: block;
    font-size: 16px;
    color: $main-6;
  }

  &.large {
    width: 48px;
    height: 48px;

    .icon {
      font-size: 24px;
    }
  }
  &.small {
    width: 24px;
    height: 24px;

    .icon {
      font-size: 12px;
    }
  }
  &.primary {
    background-color: $main-6;

    .icon {
      color: $mid-1;
    }
  }

  &:hover {
    box-shadow: 0 8px 24px -4px $mid-7;
  }
}
</style>
