<template>
  <div class="k-list-box">
    <RecycleScroller
      v-if="list.length > 50"
      :items="list"
      :item-size="62"
      key-fild="id"
      page-mode
      v-slot="{ item, index }"
    >
      <PlaylistItem
        :item="item"
        :index="index"
        :pic="pic"
        @add="add"
        @play="play"
        @enshrine="enshrine"
      />
    </RecycleScroller>
    <PlaylistItem
      v-else
      v-for="(item, index) in list"
      :key="item.id"
      :item="item"
      :index="index"
      :pic="pic"
      @add="add"
      @play="play"
      @enshrine="enshrine"
    />
  </div>
</template>

<script>
import PlaylistItem from './PlaylistItem.vue';

export default {
  name: 'Playlist',
  props: {
    list: {
      type: Array
    },
    control: {
      type: Boolean,
      default: false
    },
    pic: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击了添加按钮
    add(id) {
      const msc = this.list.find(item => item.id === id);
      this.$emit('add', msc);
    },
    play(id) {
      const msc = this.list.find(item => item.id === id);
      this.$emit('play', msc);
    },
    enshrine(id) {
      const msc = this.list.find(item => item.id === id);
      this.$emit('enshrine', msc);
    }
  },
  components: {
    PlaylistItem
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-list-box {
  width: 100%;
}
</style>
