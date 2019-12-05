import request from '../service/http'

const login = (user: string) => {
    return request.post("/api/login", user)
}

export {
    login
}
