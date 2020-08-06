import Taro from "@tarojs/taro"
import getBaseUrl from "./config"
import interceptors from "./interceptors"
import {IHttp, IParams} from "../interfaces/IHttp"
import { toast } from '../utils/toast'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

/**
 * 类实现接口，接口是用来描述该类有那些方法和属性，并且类型是什么，并不限制该类中实际类型，
 * 例如实际是any，也可以避免检查，所以，class中还需要定义具体的类型
 */
class HttpRequest implements IHttp {

    baseOptions(params: IParams, method: string = "GET") {
        let { url, data } = params;
        const BASE_URL = getBaseUrl(url);
        let contentType = "application/json";
        contentType = params.contentType || contentType;
        const option: any = {
            url: BASE_URL + url,
            data: data,
            method: method,
            header: {
                "content-type": contentType,
                Authorization: Taro.getStorageSync("token") || "" // 预留token
            }
        };
        Taro.showLoading({
            title: 'loading...'
        })
        return Taro.request(option).then(result => {
            Taro.hideLoading()
            return result
        }).catch(err => {
            Taro.hideLoading()
            toast('请求异常')
            console.log(err)
        });
    }

    get(url: string, data: string | number = "") {
        let option = { url, data };
        return this.baseOptions(option);
    }

    post(url: string, data: string, contentType: string = "application/json") {
        let params = { url, data, contentType };
        return this.baseOptions(params, "POST");
    }

    put(url: string, data: string = "") {
        let option = { url, data };
        return this.baseOptions(option, "PUT");
    }

    delete(url: string, data: string = "") {
        let option = { url, data };
        return this.baseOptions(option, "DELETE");
    }
}

export default new HttpRequest();
