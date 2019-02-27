import http from '@/libs/httpRequest'
import qs from 'qs'
export const reg = (data) => {
  return http({
    url: http.adornUrl('api/users/register') + '?' + qs.stringify(data),
    method: 'post',
    // data: http.adornData(data)
  })
}

export const sendMessage = (data) => {
  return http({
    url: http.adornUrl('api/users/sendMessage') + '?' + qs.stringify(data),
    method: 'post',
    // data: http.adornData(data)
  })
}

export const login = (data) => {
  return http({
    url: http.adornUrl('api/tokens/login') + '?' + qs.stringify(data),
    method: 'post',
    // data: data
  })
}

export const info = () => {
  return http({
    url: http.adornUrl('api/users/getUserInfo'),
    method: 'get',
  })
}

export const logout = () => {
  return http({
    url: http.adornUrl('api/tokens/logout'),
    method: 'delete',
  })
}

export const upload = (data) => {
  return http({
    url: http.adornUrl('upload'),
    method: 'post',
    data: data
  })
}

export const mPassword = (data) => {
  return http({
    url: http.adornUrl('api/users/password?' + qs.stringify(data)),
    method: 'put'
  })
}




