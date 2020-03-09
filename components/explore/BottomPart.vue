<template>
  <div class="e-container">
    <div class="left-box">
      <MusicList />
    </div>
    <div class="right-box item-box">
      
    </div>
  </div>
</template>
<script>
import MusicList from '~/components/explore/MusicList.vue'

export default {
  name: 'BottomPart',
  components: {
    MusicList,
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/config.scss';
@import '~/assets/scss/mixins.scss';

.e-container {
  display: flex;
  margin-top: 12px;
  padding: 0 48px;
  width: 100%;

  .left-box {
    flex: 4;
    margin-right: 48px;
  }

  .right-box {
    flex: 3;
    background-color: #fff;
  }
}
</style>
