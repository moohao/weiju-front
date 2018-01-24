import axios from 'axios'

export default {
  loadUser ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/user').then((res) => {
        // console.log(res.data.email)
        commit('SET_USER', { user: res.data })
        resolve()
      }).catch(() => {
        window.localStorage.removeItem('authorization')
        commit('SET_USER', { user: '' })
        axios.defaults.headers.common['Authorization'] = ''
        resolve()
      })
    })
  }
}
