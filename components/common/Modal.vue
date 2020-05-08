<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer" v-if="footer">
        <slot name="footer">
          <div class="btn">取消</div>
          <div class="btn primary">确定</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    footer: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: #fffc;
  z-index: 500;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 480px;
  min-height: 280px;
  max-height: 500px;
  background-color: $mid-1;
  box-shadow: 0 8px 24px -8px $mid-5;
  border-radius: 24px;
  overflow: hidden;
}

.header {
  flex: 0 0 1;
  width: 100%;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
}

.body {
  flex: 1;
  padding: 12px;
  width: 100%;
  border-top: 1px solid $mid-3;
  border-bottom: 1px solid $mid-3;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.footer {
  flex: 0 0 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;

  .btn {
    width: 50%;
    height: 48px;
    text-align: center;
    line-height: 48px;
    user-select: none;
    cursor: pointer;

    &.primary {
      background-color: $main-6;
      color: $mid-1;
    }
  }
}
</style>
