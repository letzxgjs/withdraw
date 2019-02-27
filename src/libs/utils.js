import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import Cookies from 'js-cookie'
/**
 * 清除登录信息
 */
export const TOKEN_KEY = 'token'
export function clearLoginInfo() {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove('mobile')
}

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setMobile = val => {
  Cookies.set('mobile', val)
}

export const getMobile = () => {
  const mobile = Cookies.get('mobile')
  if (mobile) return mobile
  else return false
}

export const setUser = (username) => {
  Cookies.set('username', username)
}

export const getUsername = () => {
  const username = Cookies.get('username')
  console.log(username)
  if (username) return username
  else return false
}

export const getUid = () => {
  const uid = Cookies.get('uid')
  console.log(uid)
  if (uid) return uid
  else return false
}

export const saveUserInfo = (data) => {
  localStorage.setItem('loginUserInfo', JSON.stringify(data))
}

export const removeUserInfo = () => {
  localStorage.removeItem("loginUserInfo");
}

