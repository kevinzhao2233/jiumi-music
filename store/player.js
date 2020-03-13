export const state = () => ({
  audio: null,
  currSong: null,
  list: []
})

export const mutations = {
  add(state, { id, name, artists, duration }) {
    // 查找list中是否已经有这首歌了
    const temp = state.list.findIndex(item => item.id === id)
    console.log(temp)
    if (temp >= 0) {
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
  }
}
