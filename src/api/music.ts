import request from '../service/http'
import { API_BASE_URL } from './apiConfig'

const urlProxy: string = process.env.TARO_ENV === 'h5'? '/api': API_BASE_URL

const confirmUploadMusic = (data: string) => {
    return request.put(`${urlProxy}/taro/audio/save`, data)
}

const getIndexMusicLis = (page: number, pageSize: number = 8) => {
    return request.get(`${urlProxy}/taro/audio/index/list?page=${page}&pageSize=${pageSize}`)
}


export {
    confirmUploadMusic,
    getIndexMusicLis
}

