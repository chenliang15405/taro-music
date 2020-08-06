interface MINFO {
    id: string
    title: string
    desc: string
    category: string
    [propName: string]: any
}

interface IMUSICLIST {
    musicList: MINFO[]
    page: number
    totalPages: number
    pageSize?: number
}

interface IAUDIO_STATUS {
    curretTime: number
    duration: number
    seek: any
    status: string
    src: string
    ended: boolean
    curDraging: boolean
}

type IMUSIC_STATE = {
    music: IMUSICLIST
}

export {
    MINFO,
    IMUSICLIST,
    IAUDIO_STATUS,
    IMUSIC_STATE
}
