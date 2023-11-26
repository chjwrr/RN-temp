
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
import { GET_MASTER_LIST, TICKET_LIST } from '@/api/API';
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


  function onPress(columnIndex:number){

  }
  function getData(currenPage:number){

    HTTPS.post(GET_MASTER_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    })
    .then((result:any)=>{
      
    })
    .finally(()=>{})


    setLoading(true)
    HTTPS.post(TICKET_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.ticket_list)
        // setDataSource([{},{},{},{},{},{},{}])
      }else {
        setDataSource([...dataSource,...result.ticket_list])
      }
      if (result.ticket_list.length < PAGE_SIZE){
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

  const [currentType,setCurrentType] = useState(0)
  function onChangeType(index:any){
    setCurrentType(index)
  }
  const focusList:any[] = [1,2,3,4,5,6,7,8,9,0]

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
          navigation.navigate('TicketBannerDetailList',{
            info:item
          })
        }}/>
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
            <View style={styles.bannerView}>
              <View style={styles.scrollView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  focusList.map((item:any,index:number)=>{
                    return <TouchableOpacity style={styles.focusView} key={index+'focus'} onPress={()=>{
                      navigation.navigate('SuperPersonDetail',{
                        id:0
                      })
                    }}>
                      <View style={styles.focusAvatarView}>
                        <View style={styles.focusAvtar}/>
                        <View style={styles.focusTipView}/>
                      </View>
                      <Text style={styles.focusName}>用户名字</Text>
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
        <View style={styles.flowIcon}/>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>名字</Text>
      </View>
      <TouchableOpacity style={styles.focusButton}>
        <Image style={styles.flowFocus} source={focus_n}/>
      </TouchableOpacity>
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
const centerItems:any[] = [
  ticket_tj,
  ticket_dr,
  ticket_focus,
  ticket_play
]
function TopCarousel({navigation}:any){
  const [currentIndex,setCurrentIndex] = useState(0)
  const datas:any[] = [1,2,3,4,5]
  function onChangeType(index:number){
  }
  return <View>
    <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>
    <Carousel
      loop
      autoPlay={true}
      width={SCREEN_WIDTH}
      height={SCREEN_WIDTH * 640 / 750}
      data={datas}
      scrollAnimationDuration={3000}
      onSnapToItem={(index) => {setCurrentIndex(index)}}
      renderItem={({ item,index }) => (
        <Image style={{width:'100%',height:'100%'}} source={topbanner}/>
      )}
      />
    <View style={styles.pointView}>
      {
        datas.map((item:any,index:number)=>{
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
            return <TouchableOpacity key={index+'centeritem'} onPressIn={()=>onChangeType(index)}>
                <Image style={[styles.centerItem,{
                }]} source={item} />
            </TouchableOpacity>
          })
        }
      </View>
    </ImageBackground>
  </View>
}

export default Ticket;
