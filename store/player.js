export const state = () => ({
  audio: null,
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
      // TODO: 在弹窗中提示出来
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
      state.currSong.isPlay = false
    })
  },
  // 更新进度条
  updateProgress(state, setTime) {
    if (setTime) {
      const time = state.currSong.time
      time.duration = Math.floor(state.audio.duration)
      state.audio.currentTime = setTime * time.duration
      time.currentTime = Math.floor(setTime * time.duration)
      time.progress = Math.floor(time.currentTime / time.duration) / 100
    } else {
      const time = state.currSong.time
      time.duration = Math.floor(state.audio.duration)
      time.currentTime = Math.floor(state.audio.currentTime)
      time.progress = Math.floor(time.currentTime / time.duration) / 100
    }
  }
}

export const actions = {
  // 循环更新进度条
  updatePrg({ state }) {
    let progessInterval = null
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
