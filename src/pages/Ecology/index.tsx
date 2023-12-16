
import React, { useEffect, useRef, useState } from 'react';
import {
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
import { MASTER_LIST, TICKET_BANNER, PROJECT_RECOMMEND_LIST, GAME_BANNER, GAME_RECOMMEND_LIST } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

function Ticket({navigation,tabState,jumpTo,onItemPress,onBannerPress}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()


  function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(GAME_RECOMMEND_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.game_recommend_list)
      }else {
        setDataSource([...dataSource,...result.game_recommend_list])
      }
      if (result.game_recommend_list.length < PAGE_SIZE){
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
    setRefreshing(true);
    getData(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    getData(page + 1)
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
        }]} onPress={()=>{
          navigation.navigate('EcologyDetail',{
            game_id:item.game_id
          })
        }}>
          <ExpoImage
            style={styles.banner}
            source={HTTPS.getImageUrl(item.image)}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.bannerTitleView}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.bannerTitle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View style={styles.contentView}>
            <TopCarousel navigation={navigation} jumpTo={jumpTo} tabState={tabState}/>
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

function TopCarousel({navigation,jumpTo,tabState}:any){
  const [currentIndex,setCurrentIndex] = useState(0)
  const userInfo = useUserInfo()
  const [bannerList,setBannerList] = useState<any[]>([])

  useEffect(()=>{
    HTTPS.post(GAME_BANNER,{
      "token":userInfo.token,
    }).then((res:any)=>{
      setBannerList(res.banner)
    }).finally(()=>{

    })
  },[])
  return <View style={{backgroundColor:Colors.black}}>
    <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>
    <Carousel
      loop
      autoPlay={true}
      width={SCREEN_WIDTH}
      height={SCREEN_WIDTH}
      data={bannerList}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 1,
        parallaxScrollingOffset: 0,
      }}
      scrollAnimationDuration={3000}
      onSnapToItem={(index) => {setCurrentIndex(index)}}
      renderItem={({ item,index }:any) => (
        <ExpoImage
          key={item.image}
          style={styles.topBanner}
          source={HTTPS.getImageUrl(item.image)}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={200}
        />
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
      <Text style={styles.centerTitle}>热门推荐</Text>
    </ImageBackground>
  </View>
}

export default Ticket;
