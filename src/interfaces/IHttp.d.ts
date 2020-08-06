interface IParams {
    url: string
    data: string | number
    contentType?: string
}

interface IHttp {
    baseOptions(params: IParams, method: string): any
    get(url: string, data: string): any
    post(url: string, data: string, contentType: string): any
    put(url: string, data: string): any
    delete(url: string, data: string): any
}


export {
    IHttp,
    IParams
}
