interface INFO {
    name: string
    desc: string
    avatar: string
}

interface IDATALIST {
    name: string
    date: Date
    image: string
}

interface IUSERLOGININFO {
    username: string
    password: string
}

interface IUSER {
    id: string
    username: string
    token: string
    faceImage: string
    nickname: string
    isFollow: string
    // [propName: string]: any
}

interface IUSER_SLECTOR_STATE {
    user: IUSER
}


export {
    INFO,
    IDATALIST,
    IUSERLOGININFO,
    IUSER,
    IUSER_SLECTOR_STATE
}