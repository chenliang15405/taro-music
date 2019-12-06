import { LOGIN, STORAGE_KEY } from '../constants/user'
import { getStorageSync } from '../utils/storage'

const cacheUserInfo = getStorageSync(STORAGE_KEY) || {}

const INITIAL_STATE = {
    username: cacheUserInfo.username || '',
    token: cacheUserInfo.token || '',
    faceImage: cacheUserInfo.faceImage || '',
    nickname: cacheUserInfo.nickname || '',
    isFollow: cacheUserInfo.isFollow || ''
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}