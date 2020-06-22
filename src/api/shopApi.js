import _axios from '@/config/http'

export default class ShopApi {
  // 登录
  static loginAccount (data) {
    return _axios({
      method: 'post',
      url: '/loginAccount',
      data
    })
  }
}
