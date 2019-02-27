import { login, logout, info } from '@/api/user'
import { clearLoginInfo, getToken, setToken, setMobile, getMobile } from '@/libs/utils.js'
export default {
  state: {
    level: '',
    coin: '',
    hasActive: '',
    hasMessage: '',
    realName: '',
    userId: '',
    username: '',
    mobile: getMobile(),
    token: () => { getToken() },
  },
  mutations: {
    setUserInfo(state, data) {
      state.coin = data.coin
      state.hasActive = data.hasActive
      state.hasMessage = data.hasMessage
      state.realName = data.realName
      state.userId = data.userId
      state.username = data.username
    },
    setToken(state, token) {
      state.token = token
      setToken(token);
    },
    setLevel(state, val) {
      state.level = val
    },
    setMobile(state, val) {
      setMobile(val)
      state.mobile = val
    },
  },
  getters: {

  },
  actions: {
    handleLogin({ commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        })
          .then(res => {
            if (res.data.code === '0000') {
              let token = res.data.data.userId + "_" + res.data.data.token;
              commit('setMobile', username)
              commit('setToken', token)
              commit('setLevel', res.data.data.level)
              resolve(res.data)
            } else {
              reject(res.data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            commit('setMobile', '')
            commit('setToken', '')
            commit('setLevel', '')
            commit('setUserInfo', {
              coin: '',
              hasActive: '',
              hasMessage: '',
              realName: '',
              userId: '',
              username: '',
            })
            clearLoginInfo()
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })

      })
    },
    // 获取用户相关信息
    handleUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        info()
          .then(res => {
            const data = res.data.data
            commit('setUserInfo', data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
