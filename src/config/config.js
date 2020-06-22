const base = ''

const config = {
  baseUrl: base, // 通用请求头部
  hostImg: base, // 通用图片地址
  notLoginRoute: ['login'] // 无需登录即可访问的路由 name,
}

export {
  base,
  config
}
