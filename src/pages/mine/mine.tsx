import Taro, { useState, useEffect, useMemo } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import classnames from 'classnames'
import { AtButton } from 'taro-ui'

import { INFO, IDATALIST } from '../../interfaces/IMine'

import LoginModal from '../../components/LoginModal'

import './mine.scss'


function Mine() {
    const [info, setInfo] = useState<INFO>({name: 'myself', avatar: '', desc: ''})
    const [dataList, setDataList] = useState<Array<IDATALIST>>([])
    const [isLogin, setIsLogin] = useState(false)
    const [loginModal, setLoginModal] = useState(false)

    useEffect(() => {
        console.log('render ....')
        setTimeout(()=> {
            setInfo({...info, name: 'myself2'})
            let data: Array<IDATALIST> = []
            data.push({name: '1', image: '123', date: new Date()})
            data.push({name: '2', image: '321', date: new Date()})
            data.push({name: '13', image: '32323', date: new Date()})
            data.push({name: '15', image: '32323', date: new Date()})
            setDataList(data)
        }, 3000)
    }, []) // 不依赖任何变量更新数据，只会在初始化和销毁组件调用effect, 如果没有依赖，则表示每次
    // 渲染的时候都会执行该方法

    const onHandlerLoginModal = (flag: boolean): void => {
        setLoginModal(flag)
    }


    return (
        <View className={'mine-container'}>
            <View className={'header'}>
                <View className={'info-img'}>
                    <Image className={'img'} src={require('../../assets/images/mine.jpg')}/>
                </View>
                {
                    isLogin ?   
                        (
                            <View className={'info-desc'}>
                                <Text className={classnames('info', 'name')}>{info.name}</Text>
                                <Text className={classnames('info', 'desc')}>{info.desc || '这个人还没有简介...'}</Text>
                            </View>
                        )
                        :
                        (
                            <View className={'lgoin-btn'}>
                                <AtButton type='secondary' size='small' onClick={() => onHandlerLoginModal(true)}>未登录</AtButton>
                            </View>
                        )
                }
            </View>
            <View className={'main'}>
                <View className={'item-list'}>
                    {
                        dataList && dataList.map((item, index) => {
                            return (
                                <View className={'item'}>
                                    <p>{item.name}</p>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            {   
                // ts中如果需要向子组件中传递函数，为了不报错，需要在子组件中定义propTypes才可以
                // 如果指定的事件中需要传递参数，那么需要在触发事件的时候，加上箭头函数指定，否则页面加载的时候就直接触发了
                loginModal ? <LoginModal onCloseModal={() => onHandlerLoginModal(false)} loginModal={loginModal}></LoginModal> : null
            }
        </View>
    )
}

export default Mine
