import Vue from 'vue'
import axios from 'axios'
import { base } from './config'
import { getToken } from './token'

const config = {
  baseURL: base,
  timeout: 5 * 1000 // 请求超时时间设置
}
var loadingInstance = '' // 请求加载中
// 创建请求实例
const _axios = axios.create(config)
// 请求拦截器
_axios.interceptors.request.use(
  originConfig => {
    const reqConfig = { ...originConfig }

    // 容错处理
    if (!reqConfig.url) {
      throw new Error({
        source: 'axiosInterceptors',
        message: 'request need url'
      })
    }
    if (!reqConfig.method) {
      // 默认使用 get 请求
      reqConfig.method = 'get'
    }
    // 大小写容错
    reqConfig.method = reqConfig.method.toLowerCase()

    // 参数容错
    if (reqConfig.method === 'get') {
      if (!reqConfig.params) {
        // 防止字段用错
        reqConfig.params = reqConfig.data || {}
      }
    } else if (reqConfig.method === 'post') {
      if (!reqConfig.data) {
        // 防止字段用错
        reqConfig.data = reqConfig.params || {}
      }
      // 检测是否包含文件类型, 若包含则进行 formData 封装
      let hasFile = false
      Object.keys(reqConfig.data).forEach(key => {
        if (typeof reqConfig.data[key] === 'object') {
          const item = reqConfig.data[key]
          if (item instanceof FileList || item instanceof File || item instanceof Blob) {
            hasFile = true
          }
        }
      })
      // 检测到存在文件使用 FormData 提交数据
      if (hasFile) {
        const formData = new FormData()
        Object.keys(reqConfig.data).forEach(key => {
          formData.append(key, reqConfig.data[key])
        })
        reqConfig.data = formData
      }
    } else {
      // 其他类型请求数据格式处理
      console.warn(`其他请求类型: ${reqConfig.method}`)
    }

    // 有token
    const token = getToken('token')
    if (token) {
      reqConfig.headers.token = token
    }
    console.log(Vue.prototype)
    loadingInstance = Vue.prototype.$loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })
    return reqConfig
  },
  error => {
    Promise.reject(error)
  }
)
// 响应拦截器
_axios.interceptors.response.use(
  res => {
    if (loadingInstance) {
      loadingInstance.close()
    }
    const { meta } = res.data
    if (meta.status === 200) {
      // 获取数据成功
      return res.data
    } else {
      Vue.prototype.$message({
        type: 'error',
        message: meta.msg
      })
      return res.data
    }
  },
  error => {
    if (loadingInstance) {
      loadingInstance.close()
    }
    // 判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Vue.prototype.$message({
        type: 'warning',
        message: '请求超时'
      })
    } else if (!error.response) {
      // 请求错误
      Vue.prototype.$message({
        type: 'error',
        message: '请检查 API 是否异常'
      })
    } else {
      // 响应错误
      const statusCode = error.response.status
      switch (statusCode) {
        case 404:
          // 进入错误页面
          Vue.prototype.$message({
            type: 'error',
            message: '访问接口404'
          })
          break
        case 403:
          // 进入错误页面
          Vue.prototype.$message({
            type: 'error',
            message: '访问接口403'
          })
          break
        case 405:
          // 登录失效
          Vue.prototype.$alert('登录失效，请重新登录！', '登录提示')
          // 进入登录页面
          break
        case 406:
          // 登录失效
          Vue.prototype.$alert('登录失效，请重新登录！', '登录提示')
          // 进入登录页面
          break
        case 407:
          // 没有操作权限
          Vue.prototype.$alert('没有操作权限！', '权限提示')
          break
        case 408:
          // 系统未激活或已过期
          Vue.prototype.$alert('系统未激活或已过期！', '授权提示')
          // 进入登录页面
          break
        default: {
          Vue.prototype.$message({
            type: 'error',
            message: '访问接口' + statusCode
          })
        }
      }
    }
    return Promise.reject(error)
  }
)

export default _axios
