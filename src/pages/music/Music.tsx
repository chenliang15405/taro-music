import Taro, { useState, useEffect, useRouter, useMemo, useRef, getBackgroundAudioPlayerState } from "@tarojs/taro"
import { View, Text, Image, Audio } from "@tarojs/components"
import classnames from 'classnames'
import { useSelector } from '@tarojs/redux'

import  { MINFO, IAUDIO_STATUS, IMUSIC_STATE } from '../../interfaces/IMusic'
import { API_BASE_URL } from '../../api/apiConfig'

import { convertSeconds } from '../../utils/common'

import './Music.scss'


const Music = () => {

    // 在hook中使用useRouter，class中使用this.$router
    const router = useRouter()

    const [musicInfo, setMusicInfo] = useState<MINFO>()
    const [playing, setPlaying] = useState<boolean>(false)

    function initState() {
        return { curretTime: 0, duration: 0, src: '', seek: '', status: '', ended: false, curDraging: false}
    }
    const [audio, setAudio] = useState<IAUDIO_STATUS>(initState)
    const [audioCtx, setAudioCtx] = useState()
    const [currenTimer, setCurrentTimer] = useState()

    const musicState = useSelector((state: IMUSIC_STATE) => state.music)

    // 使用useMemo来解决计算属性的问题，相当于vue的wath或者computed
    // 第二个参数表示更新的依赖
    const currentTimeStyle = useMemo(() => {
        // console.log((audio.curretTime / audio.duration)*240 + 'rpx')
        return (audio.curretTime / audio.duration)*240 + 'rpx' || 0
    }, [audio.curretTime])


    useEffect(() => {
        // 获取路由参数
        const {music} = router.params
        const params = music && JSON.parse(music)
        setMusicInfo(params)
    }, [router.params])

    // 解决hook中的setState的第二个参数的回调问题
    useEffect(() => {
        // 结束播放，使用useEffect可以立刻监听到对应的状态改变
        console.log('ended', audio.ended)
        if(audio.ended) {
            setPlaying(false)
            ifPlayEnded(true)
        }
        // 在这里进行下一首播放试试
    }, [audio.ended])


    useEffect(() => {
        // 初始化audioContext
        const audioCtx = Taro.createInnerAudioContext()
        audioCtx.autoplay = false
        audioCtx.loop = false
        audioCtx.src = API_BASE_URL + (musicInfo && musicInfo.musicPath)
        audioCtx.onPlay(() => {
            console.log('开始播放' + playing)
            setPlaying(true)
            curretScrollTimer()
        })
        audioCtx.onPause(() => {
            console.log('暂停播放')
            clearInterval(currenTimer)
        })
        audioCtx.onTimeUpdate(() => {
            // 监听音频播放进度更新事件
            // 如果自动播放，则可以在这里获取到时长
            // console.log(audioCtx.duration)
        })
        audioCtx.onStop(() => {
            console.log('停止')
            setAudio(preState => {
                return {...preState, ended: true}
            })
        })
        audioCtx.onEnded(() => {
            console.log('自然播放结束')
            setAudio(preState => {
                return {...preState, ended: true}
            })
            // 播放结束，自动下一首
            // TODO 判断是否需要播放
            setTimeout(() => {
                nextMusic()
                playMusic()
            }, 500)
        })
        audioCtx.onCanplay(() => {
            // 如果不自动播放，则在这里异步获取时长
            // 必须，相当于初始化
            audioCtx.duration
            setTimeout(() => {
                console.log('audio time: ', audioCtx.duration)
                setAudio(preState => {
                    return {...preState, duration: audioCtx.duration}
                })
            }, 500)
        })
        audioCtx.onError(() => {
            console.log('error')
        })
        console.log('audioCtx: ',  audioCtx)
        setAudioCtx(audioCtx)
        setAudio(initState())
    }, [])


    useEffect(()=> {
        // componentWillUnmount 事件
        // 清除定时任务和销毁创建的对象
        return () => {
            console.log('component will UnMount')
            audioCtx && audioCtx.destroy()
        }
    }, [])


    const playMusic = () => {
        console.log(musicInfo)
        console.log('是否播放：',playing)
        // 播放/暂停
        if(playing) {
            // 暂停x
            audioCtx.pause()
            clearTimer()
        } else {
            // 播放
            console.log(audioCtx)
            audioCtx.play()
            // 定时器设置currentTime和滚动条
            curretScrollTimer()
        }
        setPlaying(!playing)
    }

    // 监听当前时间和滚动条
    const curretScrollTimer = () => {
        // ifPlayEnded(audio.ended)
        clearInterval(currenTimer)
        const timer = setInterval(() => {
            // 判断是否正在拖动bar
            if(audio.curDraging){
                return;
            }
            // ifPlayEnded(audio.ended)
            console.log('time: ' + audioCtx.currentTime)
            moveCurBarByCurrentTime(audioCtx.currentTime, audio.duration)
        }, 100)
        console.log('结束？')
        setCurrentTimer(timer)
    }

    // 暂停时 清除的timer
    const clearTimer= () => {
        clearInterval(currenTimer)
    }

    // 结束播放，重置状态
    const ifPlayEnded = (ended: boolean) => {
        // 如果结束，则结束播放
        if(ended) {
            clearTimer()
            audioCtx && audioCtx.stop()
            // 将ended初始化，否则第二次无法播放
            setAudio(preState => {
                return {...preState, ended: false}
            })
        }
    }

    // 通过当前时间移动bar
    const moveCurBarByCurrentTime = (currentTime: number, duration: number) => {
        if (currentTime >= duration) {
            currentTime=duration;
            // 结束播放
            // ifPlayEnded(true)
        }
        setAudio(preState => {
            return {...preState, curretTime: currentTime}
        })
        // const query = Taro.createSelectorQuery()
        // const curP = query.select('.process-cur')
        // 无法获取到style属性, 通过useMemo实现computed属性
    }

    // 点击滚动条
    const touchMove = (e) => {
        if(e.detail.x > 240) {
            e.detail.x = 240
        }
        let winWidth = Taro.getSystemInfoSync().windowWidth
        const mul = 750/winWidth
        winWidth = winWidth * mul
        winWidth =(winWidth-240-160)/2
        const x = e.detail.x * mul
        // e.detail-x 是按照px计算，所以乘以 mul表示换算为rpx, winWith表示左边空白的部分，80是currentTime和10px换算为rpx得到
        const s = (x-winWidth - 80) / 240 * audio.duration
        console.log(s)
        seekMusicProcess(s)
    }

    const seekMusicProcess = (second: number) => {
        // 进度条跳转
        setAudio(preState => {
            return {...preState, curretTime: second}
        })
        // 音乐进度跳转
        audioCtx.seek(second)
    }

    // 上一首
    const preMusic = () => {
        audioCtx.stop()
        const musicList = musicState.musicList
        let index: number = musicInfo && musicList.findIndex(item => {
            return item.id === musicInfo.id
        }) || 0
        if(index === -1) {
            return
        }
        index = index - 1
        if(index < 0) {
            index = 0
        } else {
            const item = musicList[index]
            console.log('上一首', item)
            setMusicInfo(item)
        }
    }

    // 下一首
    const nextMusic = () => {
        audioCtx.stop()
        console.log(musicInfo)
        const musicList = musicState.musicList
        let index: number = musicInfo && musicList.findIndex(item => {
            return item.id === musicInfo.id
        }) || 0
        console.log(index)
        // 根据索引获取下一个music
        if(index === -1) {
            return
        }
        index = index + 1
        if (index >= musicList.length) {
            // 获取下一页数据
        } else {
            // 还在第一页中，则直接获取下一首
            const item = musicList[index]
            console.log('下一首', item)
            setMusicInfo(item)
        }
    }


    return (
        <View className='music-container'>
            <View className={classnames('bg', {'bg-play': playing})} style={{background:'url("https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3381573685,1866477444&fm=26&gp=0.jpg") no-repeat'}}></View>
            <View className='bg-mask'></View>

            <View className='header'>
                <View className='back-btn'>返回</View>
                <View className='title'>
                    <View className={classnames('name', 'music-name')}>{musicInfo && musicInfo.name}</View>
                    <View className={classnames('name', 'author-name')}>{musicInfo && musicInfo.nickname}</View>
                </View>
            </View>

            <View className='center'>
                <Image className={classnames('disk-hand', {'hand-animate': playing})} src={require('../../assets/images/music/play_needle.png')}></Image>
                <View className='disk-bg'></View>
                <View className={classnames('disk-play', {'animate': playing})}>
                    <Image className='disk-album-bg' src={'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3381573685,1866477444&fm=26&gp=0.jpg'}></Image>
                    <Image className='disk-music-bg' src={require("../../assets/images/music/play_disc.png")}></Image>
                </View>
            </View>

            <View className='footer'>
                {/* 进度条 */}
                <View className='process'>
                    <Text className='current-time'>{convertSeconds(audio.curretTime)}</Text>
                    <View className='process-bar' onClick={touchMove}>
                        <View className={classnames('process-all')}></View>
                        <View className='process-cur' style={{width: currentTimeStyle}}>
                            <Text className='cur-btn' style={{left: currentTimeStyle}}></Text>
                        </View>
                        <View className='process-ready'></View>
                    </View>
                    <Text className='total-time'>{convertSeconds(audio.duration)}</Text>
                </View>
                <View className='control'>
                    <View>
                        <Image className='loop-list' src={require('../../assets/images/music/play_icn_loop.png')}></Image>
                    </View>
                    <View>
                        <Image className='pre-next' onClick={preMusic} src={require('../../assets/images/music/play_btn_prev.png')}></Image>
                    </View>
                    <View >
                        <Image onClick={playMusic}
                                className='play-pause' 
                                src={playing ? require('../../assets/images/music/play_rdi_btn_pause.png'): 
                                            require('../../assets/images/music/play_rdi_btn_play.png')}
                        >
                        </Image>
                    </View>
                    <View>
                        <Image className='pre-next' onClick={nextMusic} src={require('../../assets/images/music/play_btn_next.png')}></Image>
                    </View>
                    <View>
                        <Image className='loop-list' src={require('../../assets/images/music/play_icn_src.png')}></Image>
                    </View>
                </View>

            </View>
        </View>
    )

}


export default Music
