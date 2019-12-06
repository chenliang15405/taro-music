import Taro, { useState, useRef } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput,AtButton } from "taro-ui";
import propTypes from 'prop-types'
import classnames from 'classnames'

import { useDispatch } from '@tarojs/redux'
import { LOGIN, STORAGE_KEY } from '../constants/user'
import { IUSERINFO } from '../interfaces/IMine'
import { toast } from '../utils/toast'
import { login } from '../api/user'
import { setStorage } from '../utils/storage'
import './loginModal.scss'


function LoginModal(props) {
    const [userInfo, setUserInfo] = useState<IUSERINFO>({username: "", password: ""})
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    
    const handleChange = (flag: number, event: string) => {
        if(flag === 1){
            // useState不会自动合并对象属性，通过函数来手动合并
            setUserInfo(prevUserInfo => {
                return {...prevUserInfo, username: event}
            })
        } else {
            setUserInfo(prevUserInfo => {
                return {...prevUserInfo, password: event}
            })
        }
    }

    // 登录请求
    const loginHandler = async () => {
        // 发送登录请求
        const data = {...userInfo}
        setLoading(true)
        // 如果返回的是promise对象，那么需要使用await来实现异步，否则会返回一个pennding的promise对象，因为promise还没有执行完
        const resp: any = await login(JSON.stringify(data))
        if(resp.status === 200) {
            toast("登录成功", "success")
            const {username, token, faceImage, nickname, isFollow} = resp.data
            // 存储到redux中
            // dispatch({type: LOGIN, payload: {username, token: userToken, faceImage, nickname, isFollow}})
            dispatch(() => {
                // 可以在dispatch中进行其他操作，例如class中定义的action，然后操作完成之后再dispath到reducer
                setStorage(STORAGE_KEY, {username, token, faceImage, nickname, isFollow})
                dispatch({type: LOGIN, payload: {username, token, faceImage, nickname, isFollow}})
            })
            props.onCloseModal(false)
        }
        setLoading(false)
    }

    // 取消登录
    const closeModal = () => {
        props.onCloseModal(false)
    }

    return (
        <View className="modal-container">
            <View className={classnames('main',{
                'animate': props.loginModal
            })}>
                <View className="title">
                    <View className="at-icon at-icon-sketch">
                        Login
                    </View>
                </View>
                <AtInput
                    className="input"
                    name="value1"
                    title="文本"
                    type="text"
                    placeholder="username"
                    value={userInfo.username}
                    onChange={(e: any) => handleChange(1, e)}
                />
                <AtInput
                    className="input"
                    name="value3"
                    title="密码"
                    type="password"
                    placeholder="密码不能少于10位数"
                    value={userInfo.password}
                    onChange={(e: any) => handleChange(2, e)}
                    onBlur={(e) => handleChange(2, e)}
                />
                <View className="btn-group">
                    <AtButton className="btn" loading={loading} type='primary' size='normal' onClick={loginHandler}>登录</AtButton>
                    <AtButton className="btn" type='secondary' size='normal' onClick={closeModal}>取消</AtButton>
                </View>
            </View>
        </View>
    );
}

LoginModal.propTypes = {
    onCloseModal: propTypes.func,
    loginModal: propTypes.bool
}

export default LoginModal;
