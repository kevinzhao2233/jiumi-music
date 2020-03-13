export const state = () => ({
  audio: null,
  currSong: null,
  list: [{
    name: '',
    artists: [],
    duration: 0,
    
  }]
})

export const mutations = {
  add (state, id) {
    state.list.push({
      id,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
}