
import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  RefreshControl,
  Text,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import {styles} from './styles'
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';
import { MY_FOLLOWING_MASTERS,MY_FOLLOWING_MASTER_TICKET_LIST } from '@/api/API';

const centerBg = require('@/assets/images/ticket_downbg.png')
const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_2.png')
const ticket_pro_ban_2 = require('@/assets/images/ticket_pro_ban_1.png')
const topbanner = require('@/assets/images/ticket_banner.png')
const ticket_line = require('@/assets/images/tdbg.png')
const ticket_tj = require('@/assets/images/ticket_tj_icon.png')
const ticket_dr = require('@/assets/images/ticket_dr_icon.png')
const ticket_focus = require('@/assets/images/ticket_focus_icon.png')
const ticket_play = require('@/assets/images/ticket_play_icon.png')
const ticket_item_1 = require('@/assets/images/tick_icon_1.png')
const ticket_item_2 = require('@/assets/images/tick_icon_2.png')
const focus_n = require('@/assets/images/share_w.png')
const limmitBg = require('@/assets/images/limmitBg.png')
const downBg = require('@/assets/images/ticket_downbgperson.png')


const bannerList:any[] = [
  {
    title:'破妄明心',
    des:'·明星阵容',
    banner:ticket_pro_ban_1
  },
  {
    title:'阴阳师',
    des:'·全民集结',
    banner:ticket_pro_ban_2
  }
]

function Ticket({navigation}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([{},{},{}])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()
  const [myFollowingList,setMyFollowingList] = useState<any[]>([])


  function onPress(columnIndex:number){

  }

  function onMyFollowingMaster(){
    HTTPS.post(MY_FOLLOWING_MASTERS,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:0
    }).then((result:any)=>{
      setMyFollowingList(result.my_following_masters)
    }).finally(()=>{
    })
  }
  function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(MY_FOLLOWING_MASTER_TICKET_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.my_following_masters_ticket_list)
      }else {
        setDataSource([...dataSource,...result.my_following_masters_ticket_list])
      }
      if (result.my_following_masters_ticket_list.length < PAGE_SIZE){
        setIsLoadEnd(true)
      }else {
        setIsLoadEnd(false)
      }
      setPage(currenPage)
    }).finally(()=>{
      setRefreshing(false)
      setLoading(false)
    })
  }

  useEffect(()=>{
    getData(0)
    onMyFollowingMaster()
  },[])


  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    onMyFollowingMaster()
    getData(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    console.log('loading more')
    getData(page + 1)
  }

  return (
    <View style={styles.mainView}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        numColumns={1}
        renderItem={({ item, index })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:2,
          }]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        />: <RemmenntRenderItem item={item} onPress={()=>{
          navigation.navigate('TicketDetail',{
            info:item,
          })
        }}/>
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
            <View style={styles.bannerView}>
              <View style={styles.scrollView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  myFollowingList.map((item:any,index:number)=>{
                    return <TouchableOpacity style={styles.focusView} key={index+'focus'} onPress={()=>{
                      navigation.navigate('SuperPersonDetail',{
                        id:0
                      })
                    }}>
                      <View style={styles.focusAvatarView}>
                        <ExpoImage
                          style={styles.focusAvtar}
                          source={HTTPS.getImageUrl(item.avatar)}
                          placeholder={BLUR_HASH}
                          contentFit="cover"
                          transition={200}
                        />
                        {/* <View style={styles.focusTipView}/> */}
                      </View>
                      <Text style={styles.focusName}>{item.name}</Text>
                    </TouchableOpacity>
                  })
                }
                </ScrollView>
              </View>
            </View>
        }
        ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>加载更多...</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View> : <View style={styles.loadMoreView}/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        keyExtractor={(item, index) => 'key' + index}
        onEndReached={() => {
          if (isCanLoadMore) {
            onEndReached();
            isCanLoadMore.current = false;
          }
        }}
        onContentSizeChange={() => {
          isCanLoadMore.current = true;
        }}
        onEndReachedThreshold={0.01}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fff']}/>
        }
      />
    </View>
  );
}

function RemmenntRenderItem({item,onPress}:any){
  return <TouchableOpacity onPress={onPress} style={[styles.flowView,{
    marginVertical:2,
  }]}>
    <View style={styles.flowViewSubView}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <ExpoImage
          style={styles.flowIcon}
          source={HTTPS.getImageUrl(item.master?.avatar)}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={200}
        />
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>{item.master?.name}</Text>
      </View>
      {/* <TouchableOpacity style={styles.focusButton}>
        <Image style={styles.flowFocus} source={focus_n}/>
      </TouchableOpacity> */}
    </View>
    <ExpoImage
      style={styles.typeItem}
      source={HTTPS.getImageUrl(item.image)}
      placeholder={BLUR_HASH}
      contentFit="cover"
      transition={200}
    />
  </TouchableOpacity>
}

export default Ticket;
