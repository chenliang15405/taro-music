import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
      navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index-container'>
          <Text>Hello wor11111</Text>
          <View className={'header'}>
                <View className={'info-img'}>
                    <Image className={'img'} src={require('../../assets/images/mine.jpg')}/>
                </View>
                <View className={'info-desc'}>
                    <Text>"123"</Text>
                    <Text>{'这个人还没有简介...'}</Text>
                </View>
            </View>
      </View>
    )
  }
}