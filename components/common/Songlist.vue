<template>
  <div class="k-list-box">
    <RecycleScroller
      v-if="list.length > 60"
      :items="list"
      :item-size="62"
      key-fild="id"
      page-mode
      v-slot="{ item, index }"
    >
      <SonglistItem
        :item="item"
        :index="index"
        :pic="pic"
        @add="add"
        @play="play"
        @enshrine="enshrine"
      />
    </RecycleScroller>
    <SonglistItem
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
import SonglistItem from './SonglistItem.vue';
import { mapState } from 'vuex';

export default {
  name: 'Songlist',
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
  computed: {
    ...mapState(['user'])
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
      if (this.user.uid > 0) {
        const msc = this.list.find(item => item.id === id);
        this.$emit('enshrine', msc);
      } else {
        this.$toast('收藏歌曲需要登录哦~~');
      }
    }
  },
  components: {
    SonglistItem
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.k-list-box {
  width: 100%;
}
</style>
