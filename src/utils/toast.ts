import Taro from '@tarojs/taro'

const toast = (title: string, icon: string = "none", duration: number = 2000): void => {
    Taro.showToast({
        title: title,
        icon: icon,
        duration: duration
    })
}

export {
    toast
}
