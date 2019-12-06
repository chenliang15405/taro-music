import Taro from '@tarojs/taro'

/**
 * 缓存中保存数据异步接口
 * @param key 
 * @param data 
 */
export const setStorage = (key: string, data: any): void => {
    let params: any = data;
    if(typeof data == 'object'){
        params = JSON.stringify(data)
    }
    Taro.setStorage({ key: key, data: params })
}

/**
 * 缓存中保存数据同步接口
 * @param key 
 * @param data 
 */
export const setStorageAsync = (key: string, data: any): void => {
    let params: any = data;
    if(typeof data == 'object'){
        params = JSON.stringify(data)
    }
    Taro.setStorageSync(key, params)
}

/**
 * 缓存中获取数据异步接口
 * @param key 
 */
export const getStorage = (key: string): any => {
    Taro.getStorage({ key: key })
        .then(res => {
            console.log('res', res)
            let result = res.data
            if(result){
                result= JSON.parse(result)
             }else{
                 return null
             }
             return  result
        }
    ) 
}

/**
 * 缓存中获取数据同步接口
 * @param key 
 */
export const getStorageSync = (key: string): any => {
    let result = Taro.getStorageSync(key)
    if(result){
       result= JSON.parse(result)
    }else{
        return null
    }
    return  result
  }