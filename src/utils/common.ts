/**
 * 转换秒为mm:ss
 * @param seconds 
 */
export const convertSeconds = (seconds: number): string => {
    if(seconds === 0) {
        return '00:00'
    }
    let minuteTime = '0'
    let secondTime = '0'
    if(seconds > 60) {
        minuteTime = Math.floor(seconds / 60).toString().padStart(2, '0')
        secondTime = Math.floor(seconds % 60).toString().padStart(2, '0')
    } else if(seconds === 60){
        minuteTime = '01'
        secondTime = '00'
    } else {
        secondTime = Math.round(seconds).toString().padStart(2, '0')
    }
    return `${minuteTime}:${secondTime}`
}
