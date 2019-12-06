import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index/Index'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import '@tarojs/async-await'

import { Provider } from '@tarojs/redux'
import configStore from './store'

import './app.scss'

const store = configStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/mine/Mine',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        'iconPath': 'assets/images/hotest.png',
        'selectedIconPath': 'assets/images/hotest_on.png',
        pagePath: 'pages/index/index',
        text: '首页'
      }, {
        'iconPath': 'assets/images/latest.png',
        'selectedIconPath': 'assets/images/lastest_on.png',
        pagePath: 'pages/mine/Mine',
        text: 'Me'
      }],
      'color': '#000',
      'selectedColor': '#56abe4',
      'backgroundColor': '#fff',
      'borderStyle': 'black'
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
