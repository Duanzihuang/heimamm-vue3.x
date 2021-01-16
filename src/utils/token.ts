const KEY = 'heimamm_token'

// 保存token
const saveToken = (token: string) => {
  localStorage.setItem(KEY, token)
}

// 获取token
const getToken = () => {
  return localStorage.getItem(KEY)
}

// 删除token
const removeToken = () => {
  localStorage.removeItem(KEY)
}

// 按需导出，{} 不是对象，只是按需导出语法的一个组成部分
export { saveToken, getToken, removeToken }
