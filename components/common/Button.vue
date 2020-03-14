<template>
  <div :class="`k-box icon ${size} ${type}`" @click="handleClick">
    <i :class="`icon iconfont ${icon}`"></i>
    <i v-if="mark" class="mark __mark">{{ mark > 999 ? '999+' : mark }}</i>
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
          return typeof value === 'string' && ['large', 'small'].indexOf(value) !== -1
        }
      }
    },
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String
    },
    mark: {
      type: Number
    }
  },
  methods: {
    handleClick() {
      this.$emit('has-click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.k-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 8px;
  width: 36px;
  height: 36px;
  border-radius: 40%;
  background-color: $mid-1;
  box-shadow: 0 12px 24px -4px $mid-5;
  transition: all 0.2s ease;
  cursor: pointer;

  .icon {
    display: block;
    font-size: 16px;
    color: $main-6;
  }

  .mark {
    position: absolute;
    right: -4px;
    top: -6px;
    display: inline-block;
    padding: 0 5px;
    background-color: $main-6;
    color: $mid-1;
    border-radius: 10px;
    font-size: 12px;
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
  &:hover {
    box-shadow: 0 8px 24px -4px $mid-7;

    &:active {
      background-color: $mid-2;
      box-shadow: 0 6px 24px -8px $mid-7;
    }
  }

  &.primary {
    background-color: $main-6;
    box-shadow: 0 12px 24px -4px $main-4;

    .icon {
      color: $mid-1;
    }

    .mark {
      background-color: $mid-1;
      color: $main-6;
    }

    &:hover {
      box-shadow: 0 8px 24px -4px $main-9;

      &:active {
        background-color: $main-4;
        box-shadow: 0 6px 24px -8px $main-9;
      }
    }
  }
}
</style>
