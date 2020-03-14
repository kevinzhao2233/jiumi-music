export const state = () => ({
  audio: null,
  currSong: {
    isPlay: false,
    id: 0
  },
  list: []
})

export const mutations = {
  add(state, { id, name, artists, duration }) {
    // 查找list中是否已经有这首歌了
    const temp = state.list.findIndex(item => item.id === id)
    console.log(temp)
    if (temp >= 0) {
      // TODO: 在弹窗中提示出来
      console.log('==播放列表里已经有了==')
    } else {
      let formatDuration = ''
      const time = duration / 60000
      const int = parseInt(time)
      const dec = parseInt((time - int) * 60)
      formatDuration = `${int > 9 ? int : '0' + int}:${dec > 9 ? dec : '0' + dec}`

      const art = []
      artists.map(item => {
        art.push(item.name)
      })

      state.list.push({
        id,
        name,
        artists: art,
        duration,
        formatDuration
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
    // 如果audio里面已经有音乐
    if (state.audio) {
      this.commit('player/pause')
      state.audio = null
    }
    state.audio = new Audio()
    state.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    state.audio.addEventListener('canplaythrough', () => {
      this.commit('player/play', id)
    })
  },
  play(state, id) {
    state.audio.play()
    state.currSong.id = id
    state.currSong.isPlay = true
    this.commit('player/listenerAudio')
  },
  pause(state) {
    state.audio.pause()
    state.currSong.isPlay = false
  },
  // 监听歌曲是否播放结束
  listenerAudio(state) {
    state.audio.addEventListener('ended', () => {
      state.currSong.isPlay = false
    })
  }
}

export const actions = {
  // async getSong({ commit }, { id }) {
  //   // const { data } = await this.$axios.$get(`/api/song/url?br=320000&id=${id}`)
  //   this.commit('player/loadSong', `https://music.163.com/song/media/outer/url?id=${id}.mp3`)
  // },
}
