<template>
  <div class="k-box">
    <span class="tit">登录</span>
    <input
      type="text"
      class="input"
      placeholder="输入【电话号码】或【163邮箱】"
      v-model="login.user"
    />
    <input type="password" class="input" placeholder="输入密码" v-model="login.password" />
    <span class="message">{{ error }}</span>
    <div class="btn" @click="submit">登录</div>
  </div>
</template>

<script>
export default {
  layout: 'fullPage',

  data() {
    return {
      login: {
        user: '',
        password: ''
      },
      error: ''
    };
  },

  methods: {
    async handleLogin() {
      let loginRes;
      if (this.login.user.includes('@')) {
        loginRes = await this.$axios.$post('/api/login', {
          email: this.login.user,
          password: this.login.password,
          timestamp: Date.parse(new Date()) / 1000
        });
      } else {
        loginRes = await this.$axios.$post('/api/login/cellphone', {
          phone: this.login.user,
          password: this.login.password,
          timestamp: Date.parse(new Date()) / 1000
        });
      }
      console.log(loginRes);
      localStorage.setItem('uid', loginRes.account.id);
      localStorage.setItem('upro', JSON.stringify(loginRes.profile));
      this.$router.back();
    },
    submit() {
      this.error = '';
      this.handleLogin().catch(err => {
        if (err.response.data.code === 400) this.error = '账号或密码错误';
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';

.k-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 40px 24px;
  transform: translateX(calc(50vw - 150px)) translateY(calc(50vh - 220px));
  width: 300px;
  height: 440px;
  background-color: $mid-1;
  border-radius: 24px;
  box-shadow: 0 8px 24px -8px $mid-4;

  .tit {
    font-size: 26px;
    line-height: 48px;
  }

  .input {
    margin-top: 40px;
    padding: 0 4px;
    width: 100%;
    height: 24px;
    border: none;
    border-bottom: 1px solid $mid-6;
    letter-spacing: 1px;
  }

  .message {
    display: inline-block;
    height: 18px;
    line-height: 32px;
    color: $main-6;
  }

  .btn {
    margin-top: 72px;
    text-align: center;
    width: 100%;
    height: 48px;
    background-color: $main-6;
    box-shadow: 0 16px 24px -8px $main-5;
    border-radius: 12px;
    line-height: 44px;
    font-size: 17px;
    color: $mid-1;
    user-select: none;
    cursor: pointer;
  }
}
</style>
