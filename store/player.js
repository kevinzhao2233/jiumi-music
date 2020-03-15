export const state = () => ({
  audio: null,
  setting: {
    mode: 2, // 1: 单曲循环、2: 顺序循环、3: 随机
    vol: 0.7  // TODO: 需要函数防抖后保存进localStorage
  },
  currSong: {
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
      artists: ['--', '---'],
      duration: 0,
      picUrl: 'http://www.ziliao6.com/fm/images/1.jpg'
    }
  },
  list: []
})

export const getters = {
  mscTime(state) {
    const { duration, currentTime } = state.currSong.time
    if (duration && currentTime) {
      const viewSec = sec => {
        const s = Math.floor(sec % 60)
        return s < 10 ? `0${s}` : s
      }
      const currTime = `${Math.floor(currentTime / 60)}:${viewSec(currentTime)}`
      const totalTime = `${Math.floor(duration / 60)}:${viewSec(duration)}`
      const progress = `${(currentTime / duration) * 100}%`
      return { currTime, totalTime, progress }
    }
    const currTime = '00:00'
    const totalTime = '00:00'
    const progress = '0%'
    return { currTime, totalTime, progress }
  }
}

export const mutations = {
  add(state, { id, name, artists, duration, album }) {
    // 查找list中是否已经有这首歌了
    const temp = state.list.findIndex(item => item.id === id)
    if (temp >= 0) {
      console.log('==播放列表里已经有了==')
    } else {
      // 格式化时间
      let formatDuration = ''
      const time = duration / 60000
      const int = parseInt(time)
      const dec = parseInt((time - int) * 60)
      formatDuration = `${int > 9 ? int : '0' + int}:${dec > 9 ? dec : '0' + dec}`
      // 歌手
      const art = []
      artists.map(item => {
        art.push(item.name)
      })

      state.list.push({
        id,
        name,
        artists: art,
        duration,
        formatDuration,
        picUrl: album.picUrl
      })

      // 判断list中歌的数量，如果只有刚刚添加的一个，就直接装载到audio
      if (state.list.length === 1) {
        this.commit('player/loadSong', id)
      }
    }
  },
  remove(state, id) {
    state.list.splice(
      state.list.findIndex(item => item.id === id),
      1
    )
  },
  removeAll(state) {
    state.list = []
  },
  // 加载歌曲
  loadSong(state, id) {
    // 清空audio
    if (state.audio) {
      this.commit('player/pause')
      state.audio = null
    }
    state.audio = new Audio()
    state.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // 将当前要播放的音乐信息缓存起来，减少一次异步请求
    state.currSong.detail = JSON.parse(JSON.stringify(state.list.find(item => item.id === id)))
    state.audio.addEventListener('canplaythrough', () => {
      this.commit('player/play', id)
    })
  },
  play(state, id) {
    state.audio.play()
    state.currSong.id = id
    state.currSong.isPlay = true
    this.commit('player/listenerAudio')
    this.commit('player/changeVol', state.setting.vol)
    this.dispatch({ type: 'player/updatePrg' })
  },
  pause(state) {
    state.audio.pause()
    state.currSong.isPlay = false
    this.dispatch({ type: 'player/updatePrg' })
  },
  // 监听歌曲是否播放结束
  listenerAudio(state) {
    state.audio.addEventListener('ended', () => {
      this.commit('player/pause')
      this.commit('player/next')
    })
  },
  // 更新进度条
  updateProgress(state, setTime) {
    const time = state.currSong.time
    time.duration = Math.floor(state.audio.duration)
    if (setTime) {
      state.audio.currentTime = setTime * time.duration
      time.currentTime = Math.floor(setTime * time.duration)
    } else {
      time.currentTime = Math.floor(state.audio.currentTime)
    }
    time.progress = Math.floor(time.currentTime / time.duration) / 100
  },
  next(state) {
    if (state.currSong.id === 0) {
      // 弹窗提醒，添加歌曲后点击播放
    } else {
      console.log(state.setting.mode)
      switch (state.setting.mode) {
        case 1:
          state.audio.load()
          break
        case 2:
          const currIndex = state.list.findIndex(item => item.id === state.currSong.id)
          const nextIndex = currIndex === state.list.length - 1 ? 0 : currIndex + 1
          this.commit('player/loadSong', state.list[nextIndex].id)
          break
        case 3:
          if (state.list.length > 1) {
            let randomNum = 0
            const currIndex = state.list.findIndex(item => item.id === state.currSong.id)
            randomNum = Math.floor(Math.random() * state.list.length)
            while (randomNum === currIndex) {
              randomNum = Math.floor(Math.random() * state.list.length)
            }
            this.commit('player/loadSong', state.list[randomNum].id)
          } else {
            state.audio.load()
          }
          break
      }
    }
  },
  prev(state) {
    switch (state.setting.mode) {
      case 1:
        state.audio.load()
        break
      case 2:
        const currIndex = state.list.findIndex(item => item.id === state.currSong.id)
        const prevIndex = currIndex === 0 ? state.list.length - 1 : currIndex - 1
        this.commit('player/loadSong', state.list[prevIndex].id)
        break
      case 3:
        if (state.list.length > 1) {
          let randomNum = 0
          const currIndex = state.list.findIndex(item => item.id === state.currSong.id)
          randomNum = Math.floor(Math.random() * state.list.length)
          while (randomNum === currIndex) {
            randomNum = Math.floor(Math.random() * state.list.length)
          }
          this.commit('player/loadSong', state.list[randomNum].id)
        } else {
          state.audio.load()
        }
        break
    }
  },
  switchMode(state) {
    state.setting.mode = state.setting.mode > 2 ? 1 : state.setting.mode + 1
  },
  changeVol(state, value) {
    state.setting.vol = value;
    if(state.currSong.isPlay) {
      state.audio.volume = value
    }
  }
}

let progessInterval = null
export const actions = {
  // 循环更新进度条
  updatePrg({ state }, { mark }) {
    clearInterval(progessInterval)
    if (mark) {
      clearInterval(progessInterval)
    } else {
      if (!state.audio.paused) {
        this.commit('player/updateProgress')
        progessInterval = setInterval(() => {
          this.commit('player/updateProgress')
        }, 1000)
      } else {
        clearInterval(progessInterval)
      }
    }
  }
}
