
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
import WaterfallFlow from 'react-native-waterfall-flow'
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { MASTER_LIST, TICKET_BANNER, PROJECT_RECOMMEND_LIST } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';

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
const focus_n = require('@/assets/images/collwhi.png')
const limmitBg = require('@/assets/images/limmitBg.png')
const downBg = require('@/assets/images/ticketitembg.png')

function Ticket({navigation,tabState,jumpTo,onBannerPress}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1,1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()
  const [proList,setProList] = useState<any[]>([])

  function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(PROJECT_RECOMMEND_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.project_recommend_list)
      }else {
        setDataSource([...dataSource,...result.project_recommend_list])
      }
      if (result.project_recommend_list.length < PAGE_SIZE){
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
  },[])


  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    getData(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    console.log('loading more')
    getData(page + 1)
  }

  function onScroll(e:any){
    if (e.nativeEvent.contentOffset.y < SCREEN_WIDTH * 640 / 750 + 100){
      // 隐藏
      tabState(false,0)
    }
    if (e.nativeEvent.contentOffset.y >= SCREEN_WIDTH * 640 / 750 + 100){
      // 显示
      tabState(true,0)
    }

  }


  return (
    <View style={styles.mainView}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        renderItem={({ item, index })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:4,
          }]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        />: <TouchableOpacity style={[styles.flowView,{
          marginVertical:4,
        }]} key={index+'tickbanner'} onPress={()=>{
          onBannerPress(item)
        }}>
          <ExpoImage
            style={styles.banner}
            source={HTTPS.getImageUrl(item.image)}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.bannerTitleView}>
            <Text style={styles.bannerTitle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
        }}
        style={{ flex: 1}}
        ListHeaderComponent={
          <View style={styles.contentView}>
            <TopCarousel navigation={navigation} jumpTo={jumpTo} tabState={tabState}/>
            <View style={styles.bannerView}>
              <Text style={styles.centerTitle}>来自票友推荐</Text>
            </View>
          </View>
        }
        ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>加载更多...</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View> : <View style={styles.loadMoreView}/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        onScroll={onScroll}
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

const centerItems:any[] = [
  {
    key:'Recommend',
    icon:ticket_tj
  },
  {
    key:'SuperPerson',
    icon:ticket_dr
  },
  {
    key:'FocusOn',
    icon:ticket_focus
  },
  {
    key:'Play',
    icon:ticket_play
  },
]
function TopCarousel({navigation,jumpTo,tabState}:any){
  const [currentIndex,setCurrentIndex] = useState(0)
  const userInfo = useUserInfo()
  const [bannerList,setBannerList] = useState<any[]>([])

  useEffect(()=>{
    HTTPS.post(TICKET_BANNER,{
      "token":userInfo.token,
    }).then((res:any)=>{
      setBannerList(res.banner)
    }).finally(()=>{

    })
  },[])



  function onChangeType(key:string,index:number){
    if (key != 'Recommend'){
      tabState(true,index)
      jumpTo(key)
    }
  }
  return <View style={{backgroundColor:Colors.black}}>
    <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>
    <Carousel
      loop
      autoPlay={true}
      width={SCREEN_WIDTH}
      height={SCREEN_WIDTH * 640 / 750}
      data={bannerList}
      scrollAnimationDuration={3000}
      onSnapToItem={(index) => {setCurrentIndex(index)}}
      renderItem={({ item,index }:any) => (
        <ExpoImage
          style={styles.topBanner}
          source={HTTPS.getImageUrl(item.image)}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={200}
        />
        // <CachedImage
        //   resizeMode='cover'
        //   source={HTTPS.getImageUrl(item.merchant.logo)}
        //   style={styles.flowIcon}
        //   blurRadius={30}
        //   loadingImageComponent={ImagePlaceholder}
        //   />
      )}
      />
    <View style={styles.pointView}>
      {
        bannerList.map((item:any,index:number)=>{
          return <View key={index+'tickban'} style={[styles.point,{
            backgroundColor:currentIndex == index ? Colors.buttonMain : '#CCCCCC'
          }]}/>
        })
      }
    </View>
    <ImageBackground style={styles.centerbg} source={centerBg}>
      <Image style={styles.centerLine} source={ticket_line}/>
      <View style={styles.centerItemView}>
        {
          centerItems.map((item:any,index:number)=>{
            return <TouchableOpacity key={index+'centeritem'} onPressIn={()=>onChangeType(item.key,index)}>
                <Image style={[styles.centerItem,{
                }]} source={item.icon} />
            </TouchableOpacity>
          })
        }
      </View>
    </ImageBackground>
  </View>
}

export default Ticket;
