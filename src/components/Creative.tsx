import Taro, { useMemo } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtFab } from "taro-ui";
import propTypes from 'prop-types'
import { useSelector } from '@tarojs/redux'

import 'taro-ui/dist/style/index.scss'; // icon的样式无法在components中生效
import './creative.scss'

import {} from '../interfaces/IMine'

const Creative = (props) => {
    const user = useSelector<any, any>(state => state.user) 


    const onButtonClick = (e) => {
        if(user.username && user.token) {
            Taro.navigateTo({url: '/pages/diymusic/DiyMusic'})
        } else {
            props.onCheck(true) 
        }
    }

    return (
        <View className='fab-btn'>
            <AtFab onClick={onButtonClick}>
                <Text className='at-fab__icon at-icon at-icon-sound'></Text>
            </AtFab>
        </View>
    )

}

Creative.propTypes = {
    onCheck: propTypes.func
}

export default Creative
