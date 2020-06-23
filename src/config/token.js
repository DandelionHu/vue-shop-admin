/**
 * 存储tokens
 */
export function saveTokens (token) {
  sessionStorage.setItem('token', `${token}`)
}

/**
 * 获得某个token
 */
export function getToken (tokenKey) {
  return sessionStorage.getItem(tokenKey)
}

/**
 * 移除token
 */
export function removeToken () {
  sessionStorage.removeItem('token')
}
