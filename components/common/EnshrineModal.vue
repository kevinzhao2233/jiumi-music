<template>
  <Modal :footer="false" @close="close">
    <div slot="header">添加到歌单</div>
    <ul slot="body">
      <li class="list">
        <div class="img add-list">
          <i class="icon iconfont icon-plus"></i>
        </div>
        <div class="info">
          <input class="name input" type="text" placeholder="这里输入歌单名" />
          <div class="checkbox" title="歌单仅自己可见">
            <input type="checkbox" name="isPrivate" id="private" />
            <label for="private">私密</label>
          </div>
          <div class="btn">确定</div>
        </div>
      </li>
      <li class="list" v-for="item in createList" :key="item.id" @click="enshrine(item.id)">
        <div
          class="img"
          :style="{
            background: `center / cover url(${item.coverImgUrl}?param=40y40) no-repeat`
          }"
        ></div>
        <div class="info">{{ item.name }}</div>
      </li>
    </ul>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'EnshrineModal',
  data: () => ({
    createList: JSON.parse(localStorage.getItem('createList')) || []
  }),
  methods: {
    enshrine(id) {
      this.$emit('enshrine', { playlistId: id });
    },
    close() {
      this.$emit('close');
    }
  },
  components: {
    Modal
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.list {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  width: 100%;
  height: 56px;
  border-radius: 12px;

  .img {
    flex: 0 0 1;
    margin: 0 8px;
    width: 40px;
    height: 40px;
    background-color: $mid-1;
    border-radius: 8px;

    &.add-list {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed $mid-7;
      background-color: transparent;

      .icon {
        color: $main-6;
        line-height: 100%;
      }
    }
  }

  .info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      &.input {
        padding-left: 8px;
        width: 240px;
        height: 36px;
        border: none;
        border-radius: 6px;
        background-color: $main-2;
        transition: background-color 0.2s;
      }
    }

    .checkbox {
      margin: 0 8px;
      display: flex;
      align-items: center;

      label {
        margin-left: 4px;
        cursor: pointer;
      }

      input {
        cursor: pointer;
        -webkit-appearance: none;
      }

      input:before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        vertical-align: middle;
        text-align: center;
        color: $mid-1;
        border-radius: 4px;
        border: 1px solid $main-4;
        transition: all 0.2s linear;
      }

      input:checked:before,
      input[checked]:before {
        content: '\2714';
        font-size: 0.625rem;
        color: $mid-1;
        border: 1px solid $main-6;
        background-color: $main-6;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
      width: 64px;
      height: 32px;
      background-color: $main-6;
      border-radius: 8px;
      color: $mid-1;
      transition: all 0.3s;
      cursor: pointer;
    }
  }

  &:hover {
    background-color: $main-6;
    transition: background-color 0.2s;

    .add-list {
      border-color: $mid-2;

      .icon {
        color: $mid-1;
      }
    }

    .info {
      color: $mid-1;

      .input {
        background-color: $main-5;
        color: $mid-1;
        border-bottom: none;
      }

      .checkbox {
        label {
          color: $mid-1;
        }

        input:before {
          border-color: $main-2;
        }

        input:checked:before,
        input[checked]:before {
          color: $main-6;
          border-color: $main-2;
          background-color: $main-1;
        }
      }

      .btn {
        background-color: $mid-1;
        color: $mid-10;

        &:active {
          background-color: $main-4;
        }
      }
    }
  }
}
</style>
