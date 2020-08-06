import Taro, { useState, useEffect } from "@tarojs/taro"
import { View, Text, Image, Picker, ScrollView } from "@tarojs/components"
import { useDispatch } from '@tarojs/redux'

import { AtList, AtListItem } from "taro-ui"

import { IMUSICLIST, MINFO } from "../../interfaces/IMusic"
import { getIndexMusicLis } from "../../api/music"
import { API_BASE_URL } from '../../api/apiConfig'
import { SET_HOT_LIST } from '../../constants/music'

import './Index.scss'

const Index = () => {
    function initState(): IMUSICLIST {
        let musicList: MINFO[] = [
            { id: "", title: "", desc: "", category: "" }
        ]
        let page = 1
        let totalPages = 1
        return { musicList, page, totalPages }
    }
    const [list, setList] = useState<IMUSICLIST>(initState);

    const dispatch = useDispatch()

    useEffect(() => {
        // 加载首页列表数据
        const queryList = async () => {
            const res: any = await getIndexMusicLis(list.page);
            console.log("index: ", res);
            const musicList = res.data.rows;
            const page = res.data.page;
            const totalPages = res.data.totalPages;
            setList({ musicList, page, totalPages });
            // 分发到redux中
            dispatch({type: SET_HOT_LIST, payload: {musicList, page, totalPages}})
        };
        queryList();
    }, [])

    const onScroll = e => {
        console.log(e)
    }

    const MusicInfo = (index: number) => {
        // 获取索引的对应music数据
        const musicList = list.musicList
        const music = musicList[index]
        console.log(music)
        const props = JSON.stringify(music)
        // 传递参数
        Taro.navigateTo({
            url: `/pages/music/Music?music=${props}`
        })
    }

    return (
        <ScrollView
            className="scrollview"
            scrollY
            scrollWithAnimation
            onScroll={onScroll}
        >
            <View className="music-list-container">
                <AtList>
                    {
                        list.musicList.map((item, index) => {
                            return (
                                <AtListItem
                                    key={item.id}
                                    className='list-item'
                                    title={item.name}
                                    note={item.musicDesc}
                                    arrow="right"
                                    extraText={`用户: ${item.nickname}`}
                                    thumb={API_BASE_URL + item.coverPath}
                                    onClick={() => MusicInfo(index)}
                                />
                            )
                        })
                    }
                </AtList>
            </View>
        </ScrollView>
    );
};

// hook 中设置config
Index.config = {
    navigationBarTitleText: "首页"
}

export default Index
