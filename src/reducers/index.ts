import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import music from './music'

export default combineReducers({
    counter,
    user,
    music
})