import request from '@/utils/request'

export const getUserInfo = () => {
  return request({
    url: '/info'
  })
}

export const logout = () => {
  return request({
    url: '/logout'
  })
}
