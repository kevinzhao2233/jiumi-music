<template>
  <div class="eh-container">
    <Banner :banners="banners" />
    <div class="h-btn-box">
      <Button
        type=""
        icon="icon-gear_alt_fill1"
        title="设置"
        @has-click="$toast('开发者正在筹集头发~~')"
      />
      <Button
        type=""
        icon="icon-envelope_fill"
        title="消息"
        @has-click="$toast('开发者正在筹集头发~~')"
      />
      <Button
        type=""
        :icon="user.upro ? '' : 'icon-person_fill'"
        :title="user.upro ? user.upro.nickname : '登录'"
        :bgUrl="user.upro ? user.upro.avatarUrl : ''"
        @has-click="clickAvatar"
      />
    </div>
  </div>
</template>

<script>
import Banner from '~/components/explore/Banner.vue';
import Button from '~/components/common/Button.vue';
import { mapState } from 'vuex';

export default {
  name: 'Header',
  props: {
    banners: Array
  },
  data() {
    return {
      searchRes: '',
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    clickAvatar() {
      if (this.user.upro) {
        this.$toast('你已经登录啦');
      } else {
        this.$router.push({ name: 'Login' });
      }
    }
  },
  components: {
    Banner,
    Button
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';

.eh-container {
  position: relative;
  padding-top: 12px;

  .h-btn-box {
    position: absolute;
    display: flex;
    margin: 30px 48px 0 0;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
</style>
