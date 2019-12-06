import request from '../service/http'

const login = (user: string) => {
    const url = process.env.TARO_ENV === 'h5'? "/api/login": "http://localhost:8082/login"
    return request.post(url, user)
}

export {
    login
}
