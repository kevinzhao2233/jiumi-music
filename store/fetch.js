import { setLocalStorage } from './common';

export const state = () => ({
  userPl: {
    createList: [],
    enshrineList: []
  }
});

export const mutations = {
  /**
   * 设置用户列表
   * @param {Array} state 用户创建的列表
   * @param {Array} param1 用户收藏的列表
   */
  setUserPlaylist(state, { createList, enshrineList }) {
    state.userPl.createList = createList;
    state.userPl.enshrineList = enshrineList;
  }
};

export const actions = {
  /**
   * 获取用户歌单，包括创建的，收藏的
   * @param {Object} param0 state
   * @param {Object {Number}} param1 用户id
   */
  async fetchUserList({ state }, { payload: { id } }) {
    const timestamp = new Date().getTime();
    const { playlist } = await this.$axios.$get(
      `/api/user/playlist?uid=${id}&timestamp=${timestamp}`
    );
    state.userPlaylist = playlist;
    // 个人创建歌单
    const createList = playlist.filter(data => data.userId === id);
    // 收藏歌单
    const enshrineList = playlist.filter(data => data.userId !== id);
    setLocalStorage('createList', createList);
    this.commit('fetch/setUserPlaylist', { createList, enshrineList });
  }
};
