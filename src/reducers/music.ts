import { SET_HOT_LIST } from '../constants/music'
import { IMUSICLIST } from '../interfaces/IMusic'

const INITIAL_STATE: IMUSICLIST = {
    musicList: [],
    page: 1,
    totalPages: 1
}

export default function index(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_HOT_LIST:
            return {
                ...state,
                ...action.payload            
            }
        default:
            return state;
    }

}
