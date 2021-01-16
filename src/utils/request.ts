import axios from 'axios'
import { getToken, removeToken } from '@/utils/token'
import router from '@/router'

// 设置基准路径
/**
 * 在开发阶段：npm run serve它的值是：http://127.0.0.1/heimamm/public
 * 在生产阶段：npm run build它的值是：http://47.106.148.205/heimamm/public/
 *
 * 上述解决方案，在vue脚手架中，人家称之为`环境变量`
 *
 */
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 设置允许cookies【因为验证码这一块需要用到】
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
      config.headers.token = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.code === 206) {
      // token异常了

      // 清空token
      removeToken()

      // 跳转回登录页面
      router.push('/login').catch(() => {
        // console.log(err)
      })
    }
    // 对响应数据做点什么
    // 直接把页面需要的数据返回
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default axios
