import { formatMusic, getLocalStorage, setLocalStorage } from './common.js';

const defaultCurrSong = {
  isPlay: false,
  id: 0,
  time: {
    currentTime: 0,
    totalTime: 0,
    progress: 0
  },
  detail: {
    id: 0,
    name: '--',
    artists: [{ id: 0, name: '--' }],
    duration: 0,
    sourcePlaylistId: 0
  }
};

export const state = () => ({
  audio: null,
  setting: getLocalStorage('localSetting') || {
    mode: 2, // 1: 单曲循环、2: 顺序循环、3: 随机
    vol: 0.7 // 音量
  },
  currSong: JSON.parse(JSON.stringify(defaultCurrSong)),
  list: [],
  localList: getLocalStorage('localList') || []
});

export const getters = {
  /**
   * 进度条两侧的时间
   */
  mscTime(state) {
    const { duration, currentTime } = state.currSong.time;
    if (duration && currentTime) {
      const viewSec = sec => {
        const s = Math.floor(sec % 60);
        return s < 10 ? `0${s}` : s;
      };
      const currTime = `${Math.floor(currentTime / 60)}:${viewSec(currentTime)}`;
      const totalTime = `${Math.floor(duration / 60)}:${viewSec(duration)}`;
      const progress = currentTime / duration;
      return { currTime, totalTime, progress };
    }
    const currTime = '00:00';
    const totalTime = '00:00';
    const progress = 0;
    return { currTime, totalTime, progress };
  }
};

export const mutations = {
  /**
   * 添加下一首
   * @param {*} state 当前state
   * @param {Object} param1 要添加的歌曲，添加进歌曲的方式（是否为 push）
   */
  add(state, { msc, type }) {
    if (type === 'push') {
      // 格式化后将歌曲 push 到最后
      const music = formatMusic(msc);
      state.list.push(music);
    } else {
      // 需要添加的歌曲在播放列表中的 index
      const songIndex = state.list.findIndex(item => item.id === msc.id);
      // 当前播放的歌曲的 index
      const currentIndex = state.list.findIndex(item => item.id === state.currSong.id);
      if (songIndex >= 0) {
        // 如果已经存在，那就剪切到下一首
        const song = state.list.splice(songIndex, 1);
        state.list.splice(currentIndex + 1, 0, song[0]);
      } else {
        // 格式化后插入到下一首
        const music = formatMusic(msc);
        state.list.splice(currentIndex + 1, 0, music);
      }
      // 判断list中歌的数量，如果只有刚刚添加的一个，就直接装载到audio
      if (state.list.length === 1) {
        this.commit('player/loadSong', msc.id);
      }
    }
  },

  /**
   * 从播放列表删除一首歌
   * @param {*} state
   * @param {Number} id 需要删除的歌曲 id
   */
  remove(state, id) {
    if (id === state.currSong.id) {
      this.commit('player/switchSong', { direction: 'next' });
    }
    state.list.splice(
      state.list.findIndex(item => item.id === id),
      1
    );
  },

  /**
   * 清空播放列表
   * @param {*} state
   */
  removeAll(state) {
    state.list = [];
    if (state.audio) {
      this.commit('player/pause');
      state.audio = null;
      state.currSong = JSON.parse(JSON.stringify(defaultCurrSong));
    }
  },

  /**
   * 播放全部歌曲
   * @param {*} state
   * @param {Object} param1 msc为点击播放后当前需要播放的歌曲， list为整个歌单列表
   */
  playAll(state, { msc, list }) {
    this.commit('player/removeAll');
    for (const item of list) {
      this.commit('player/add', { msc: item, type: 'push' });
    }
    this.commit('player/loadSong', msc.id);
  },

  /**
   * 将播放的音乐装载到audio里
   * @param {*} state
   * @param {Number} id 装载歌曲的id
   */
  loadSong(state, id) {
    // 清空audio
    if (state.audio) {
      this.commit('player/pause');
      state.audio = null;
      state.currSong = JSON.parse(JSON.stringify(defaultCurrSong));
    }
    state.audio = new Audio();
    state.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    // 将当前要播放的音乐信息缓存起来，减少一次异步请求
    const msc = state.list.find(item => item.id === id);
    state.currSong.detail = msc;
    state.currSong.id = id;
    state.audio.addEventListener('canplay', () => {
      if (state.audio.paused) {
        this.commit('player/play');
      }
    });
    this.commit('player/listenerAudio');
    this.commit('player/saveSongToLocal', msc);
    state.audio.addEventListener('error', () => {
      if (state.audio.error && state.audio.error.code === 4) {
        // 歌曲无法播放，关于 VIP 提示的需要判断 msc.fee === 1 和 upro.vipType === 0
        if (state.list.length > 1 && state.setting.mode > 1) {
          this.commit('player/switchSong', { direction: 'next' });
          // 从本地删除
          this.commit('player/removeSongInLocal', msc);
        } else {
          alert('出现意外的大问题');
        }
      }
    });
  },

  /**
   * 播放
   * @param {*} state
   */
  play(state) {
    state.audio.play();
    state.currSong.isPlay = true;
    this.commit('player/changeVol', state.setting.vol);
    this.dispatch({ type: 'player/updatePrg' });
  },

  /**
   * 暂停
   */
  pause(state) {
    state.audio.pause();
    state.currSong.isPlay = false;
    this.dispatch({ type: 'player/updatePrg' });
  },

  /**
   * 监听歌曲是否播放结束
   */
  listenerAudio(state) {
    state.audio.addEventListener('ended', () => {
      this.commit('player/pause');
      this.commit('player/switchSong', {
        direction: 'next',
        lastMsc: state.currSong
      });
    });
  },

  /**
   * 更新进度条
   * @param {*} state
   * @param {Number} setTime 点击进度条或拖动进度条滑块生成的进度, 小数 / 百分比
   */
  updateProgress(state, setTime) {
    const time = state.currSong.time;
    time.duration = Math.floor(state.audio.duration);
    if (setTime) {
      state.audio.currentTime = setTime * time.duration;
      time.currentTime = Math.floor(setTime * time.duration);
    } else {
      time.currentTime = Math.floor(state.audio.currentTime);
    }
    time.progress = Math.floor(time.currentTime / time.duration) / 100;
  },

  /**
   * 切歌
   * @param {*} state state
   * @param {Object} param1 direction：上一曲还是下一曲；lastMsc：刚刚播放完的歌
   */
  switchSong(state, { direction, lastMsc }) {
    if (lastMsc) {
      this.dispatch({ type: 'player/scrobble', lastMsc });
    }
    if (state.currSong.id === 0) {
      // 弹窗提醒，添加歌曲后点击播放
      alert('歌单里没有歌，添加一首再播放吧');
    } else {
      switch (state.setting.mode) {
        case 1:
          state.audio.load();
          break;
        case 2:
          const currIndex = state.list.findIndex(item => item.id === state.currSong.id);
          let switchIndex = -1;
          if (direction === 'next') {
            // 下一曲
            switchIndex = currIndex === state.list.length - 1 ? 0 : currIndex + 1;
          } else if (direction === 'prev') {
            // 上一曲
            switchIndex = currIndex === 0 ? state.list.length - 1 : currIndex - 1;
          }
          this.commit('player/loadSong', state.list[switchIndex].id);
          break;
        case 3:
          if (state.list.length > 1) {
            let randomNum = 0;
            const currIndex = state.list.findIndex(item => item.id === state.currSong.id);
            randomNum = Math.floor(Math.random() * state.list.length);
            while (randomNum === currIndex) {
              randomNum = Math.floor(Math.random() * state.list.length);
            }
            this.commit('player/loadSong', state.list[randomNum].id);
          } else {
            state.audio.load();
          }
          break;
      }
    }
  },

  /**
   * 改变播放模式（单曲循环，顺序播放， 随机播放）
   */
  switchMode(state) {
    state.setting.mode = state.setting.mode > 2 ? 1 : state.setting.mode + 1;
    this.commit('player/saveSettingToLocal');
  },

  /**
   * 改变音量
   * @param {Object} state
   * @param {Number} value 要设置的音量
   */
  changeVol(state, value) {
    state.setting.vol = value;
    if (state.currSong.isPlay) {
      state.audio.volume = value;
    }
    this.commit('player/saveSettingToLocal');
  },

  /**
   * 保存歌曲到本地 -- 最近播放
   * @param {Object} state
   * @param {Objct} msc 需要添加到本地的歌曲
   */
  saveSongToLocal(state, msc) {
    const index = state.localList.findIndex(item => Number(item.id) === Number(msc.id));
    if (index < 0) {
      state.localList.unshift(msc);
    } else {
      const music = state.localList.splice(index, 1)[0];
      state.localList.unshift(music);
    }
    setLocalStorage('localList', state.localList);
  },

  /**
   * 从本地删除一首歌（目前只在检测到歌曲无法播放的时候删除，比如没有版权的）
   * @param {*Object} msc 要删除的歌曲
   */
  removeSongInLocal(state, msc) {
    const index = state.localList.findIndex(item => Number(item.id) === Number(msc.id));
    if (index >= 0) {
      state.localList.splice(index, 1);
    }
    setLocalStorage('localList', state.localList);
  },

  /**
   * 保存设置到本地
   */
  saveSettingToLocal(state) {
    setLocalStorage('localSetting', state.setting);
  }
};

// setInterval 实例
let progessInterval = null;
export const actions = {
  /**
   * 更新进度条
   * @param {Object} param0 state
   * @param {Object} param1 标记，为 true 则停止进度(在拖动进度条时需要禁止更新进度)，为空或 false 则为更新进度条
   */
  updatePrg({ state }, { mark }) {
    clearInterval(progessInterval);
    if (!mark && !state.audio.paused) {
      this.commit('player/updateProgress');
      progessInterval = setInterval(() => {
        this.commit('player/updateProgress');
      }, 1000);
    } else {
      clearInterval(progessInterval);
    }
  },

  /**
   * 收藏歌曲
   * @param {*} param0 占位
   * @param {*} param1 payload: {歌单id，歌曲id}
   */
  async enshrine({}, { payload: { playlistId, songId } }) {
    const { code } = await this.$axios.$get(
      `/api/playlist/tracks?op=add&pid=${playlistId}&tracks=${songId}`
    );
    if (code === 200) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 创建歌单
   * @param {*} 占位
   * @param {Object} msc 需要收藏个歌曲
   */
  async createPlaylist({ rootState }, { payload: { name, privacy } }) {
    const { playlist } = await this.$axios.$get(
      `/api/playlist/create?name=${name}&privacy=${privacy ? '10' : ''}`
    );
    if (playlist && playlist.id) {
      this.dispatch({
        type: 'fetch/fetchUserList',
        payload: { id: rootState.user.uid }
      });
      return { id: playlist.id };
    } else {
      return false;
    }
  },

  /**
   * 听歌打卡
   * @param {Object} param0 占位符
   * @param {Object} param1 上一首歌曲
   */
  async scrobble({}, { lastMsc }) {
    const msc = lastMsc.detail;
    const { code } = await this.$axios.$get(
      `/api/scrobble?id=${msc.id}&sourceid=${msc.sourcePlaylistId}&time=${Math.floor(
        msc.duration / 1000
      )}`
    );
    if (code === 200) console.log('听歌打卡成功');
  }
};
