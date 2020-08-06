import request from '../service/http'
import { API_BASE_URL } from './apiConfig'

const urlProxy: string = process.env.TARO_ENV === 'h5'? '/api': API_BASE_URL

const login = (user: string) => {
    // 根据环境判断是否为h5,如果是h5,需要设置代理跨域，如果是小程序则不用代理
    return request.post(`${urlProxy}/login`, user)
}

export {
    login
}
