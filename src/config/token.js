/**
 * 存储tokens
 */
export function saveTokens (token) {
  localStorage.setItem('token', `${token}`)
}

/**
 * 获得某个token
 */
export function getToken (tokenKey) {
  return localStorage.getItem(tokenKey)
}

/**
 * 移除token
 */
export function removeToken () {
  localStorage.removeItem('token')
}
