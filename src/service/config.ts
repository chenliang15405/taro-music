/**
 * base_url 配置类
 */
 
type GET_URL_FUNC = {
    (url: string): string
}

const getBaseUrl: GET_URL_FUNC = (url: string) => {
    let BASE_URL: string = '';
    if (process.env.NODE_ENV === 'development') {
        //开发环境 - 根据请求不同返回不同的BASE_URL--用于项目中不同的url请求不同的后端路由
        if (url.includes('/api/')) {
            BASE_URL = ''
        } else if (url.includes('/iatadatabase/')) {
            BASE_URL = ''
        }
    } else if (process.env.NODE_ENV === 'production'){
        // 生产环境
        if (url.includes('/api/')) {
            BASE_URL = ''
        } else if (url.includes('/iatadatabase/')) {
            BASE_URL = ''
        }
    }
        return BASE_URL
    }

export default getBaseUrl;