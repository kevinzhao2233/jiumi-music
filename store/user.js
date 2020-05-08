import { getLocalStorage, setLocalStorage } from './common.js';

export const state = () => ({
  uid: getLocalStorage('uid') || 0,
  upro: getLocalStorage('upro') || null
});

export const mutations = {
  /**
   * 手动更新 state
   */
  setState(state) {
    state.uid = getLocalStorage('uid');
    state.upro = getLocalStorage('upro');
  }
};

export const actions = {
  /**
   * 登录
   */
  async login({}, { payload: { user, password } }) {
    let loginRes = null;
    if (user.includes('@')) {
      // 邮箱登录
      loginRes = await this.$axios.$post('/api/login', {
        email: user,
        password: password,
        timestamp: Date.parse(new Date()) / 1000
      });
    } else {
      // 电话登录
      loginRes = await this.$axios.$post('/api/login/cellphone', {
        phone: user,
        password: password,
        timestamp: Date.parse(new Date()) / 1000
      });
    }
    if (loginRes.code === 200) {
      setLocalStorage('uid', loginRes.account.id);
      setLocalStorage('upro', loginRes.profile);
      this.commit('user/setState');
      return { state: true };
    } else {
      return { state: false };
    }
  }
};
