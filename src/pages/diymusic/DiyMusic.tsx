import Taro, { useState } from "@tarojs/taro"
import { View, Text, Image, Picker } from "@tarojs/components"
import classnames from "classnames"
import { AtButton, AtInput } from "taro-ui"
import { useSelector, useDispatch } from "@tarojs/redux"

import { MINFO } from "../../interfaces/IMusic"
import { IUSER_SLECTOR_STATE } from '../../interfaces/IMine' 

import { confirmUploadMusic } from '../../api/music'

import { toast } from "../../utils/toast"

import "./DiyMusic.scss"

const DiyMusic = () => {
    
    function initState(): MINFO {
        return { id: '', title: '', desc: '', category: '请选择' }
    }
    function initSelectorState(): Array<string> {
        const selector: string[] = ['中文', '英文', '二次元', '民谣', '怀旧']
        return selector
    }
    const [musicInfo, setMusicInfo] = useState<MINFO>(initState())
    const [cateSelector, setCateSelector] = useState<Array<string>>(initSelectorState())

    const state = useSelector((state: IUSER_SLECTOR_STATE) => state.user) 

    const handleChange = (e: string): void => {
        setMusicInfo(preState => {
            return {...preState, title: e}
        })
    }

    const onSelectChange = e => {
        const cateSel = cateSelector[e.detail.value]
        setMusicInfo(preState => {
            return {...preState, category: cateSel}
        })
    }

    const handleDescChange = (e: string) => {
        setMusicInfo(preState => {
            return {...preState, desc: e}
        })
    }

    // 上传视频到微信服务器
    const uploadVideo = async () => {
        const tempRes: any = await Taro.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 35,
            camera: 'back',
            success(res) {
              console.log(res.tempFilePath)
            }
        })
        console.log('tempRes: ', tempRes)
        // 判断是否成功，判断时长
        if(tempRes.errMsg === 'chooseVideo:ok') {
            if(tempRes.duration < 5) {
                toast("视频的长度不能小于5s")
                return
            } else if (tempRes.duration > 60) {
                toast("视频的长度不能大于60s")
                return
            }
            // 上传文件
            const uploadTask = Taro.uploadFile({
                url: 'http://localhost:8082/taro/audio/upload',
                filePath: tempRes.tempFilePath,
                name: 'file',
                formData: {
                  'userId': state.id,
                  'name': musicInfo.title,
                  'desc': musicInfo.desc
                },
                header: {
                    'Content-type': 'application/json',
                    'userId': state.id,
                    'token': state.token
                },
                success (res){
                  console.log('upload file :', res)
                  if(res.statusCode === 200) {
                    // 返回的对象为string类型，需要转换为json类型
                    const data = JSON.parse(res.data)
                    if(data.status === 200) {
                        const content = data.data
                        setMusicInfo(preState => {
                            return {...preState, id: content.id}
                        })
                        toast("上传成功", "success")
                    }
                  }
                },
                fail(err) {
                    toast("上传失败，请重新尝试")
                    console.log('err : ', err)
                }
              })
        } else {
            toast("上传视频出现异常，请重新尝试")
        }
    }

    const submit = async () => {
        // 提交信息，更新userId到music表
        const data = {
            userId: state.id,
            musicId: musicInfo.id
        }
        // 发送请求
        const res: any = await confirmUploadMusic(JSON.stringify(data))
        console.log('submit res: ', res)
        if(res.status === 200) {
            // 跳转到首页，跳转到tabbar，需要使用switchTab
            Taro.switchTab({
                url: '/pages/index/Index'
            })
        }
    }


    return (
        <View>
            <View className='dim-section'>
                <AtInput
                    name="title"
                    title="名称:"
                    type="text"
                    placeholder="名称"
                    value={musicInfo.title}
                    onChange={handleChange}
                />
                <View className='picker-box'>
                    <Text>分类:</Text>
                    <Picker
                        className='sel' 
                        mode='selector'
                        value={0}
                        range={cateSelector} 
                        onChange={onSelectChange}>
                            <View className='picker'>
                                {musicInfo.category}
                            </View>
                    </Picker>
                </View>
                <AtInput
                    name="desc"
                    title="描述:"
                    type="text"
                    placeholder="描述..."
                    value={musicInfo.desc}
                    onChange={handleDescChange}
                />
                <View className="upload-video-btn">
                    <AtButton 
                        className="btn" 
                        type='secondary' 
                        size='small' 
                        onClick={uploadVideo}
                        >
                        + 点击上传视频
                    </AtButton>
                </View>
                <View className="submit-btn">
                    <AtButton 
                        className="st" 
                        type='primary' 
                        size='normal' 
                        onClick={submit}
                        >
                        确定
                    </AtButton>
                </View>
            </View>
        </View>
    )
}

export default DiyMusic;
