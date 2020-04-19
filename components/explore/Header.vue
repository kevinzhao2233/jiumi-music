<template>
  <div class="eh-container">
    <div class="h-banner">
      <Banner :banners="banners" />
    </div>
    <div class="h-btn-box">
      <Button type="" icon="icon-gear_alt_fill1" title="设置" />
      <Button type="" icon="icon-envelope_fill" title="消息" />
      <Button
        type=""
        :icon="upro ? '' : 'icon-person_fill'"
        :title="upro ? upro.nickname : '登录'"
        :bgUrl="upro ? upro.avatarUrl : ''"
        @has-click="clickAvatar"
      />
    </div>
  </div>
</template>

<script>
import Banner from '~/components/explore/Banner.vue';
import Button from '~/components/common/Button.vue';

export default {
  name: 'Header',
  props: {
    banners: Array
  },
  data() {
    return {
      searchRes: '',
      upro: null
    };
  },
  methods: {
    clickAvatar() {
      if (this.upro) {
        this.$toast('你已经登录啦')
      } else {
        this.$router.push({ name: 'Login' });
      }
    }
  },
  created() {
    const upro = localStorage.getItem('upro');
    if (upro) this.upro = JSON.parse(upro);
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

  .h-banner {
    padding-top: 12px;
  }

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
