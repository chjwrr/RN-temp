
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
import { PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
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
import { useTicketBanner } from '@/api';

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
function Ticket({navigation,tabState,jumpTo,onItemPress,onBannerPress}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  function getData(currenPage:number){

    // HTTPS.post(GET_MASTER_LIST,{
    //   "token":userInfo.token,
    //   "limit":PAGE_SIZE,
    //   offset:currenPage * PAGE_SIZE
    // })
    // .then((result:any)=>{
      
    // })
    // .finally(()=>{})

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
    }).finally(()=>{
      setRefreshing(false)
      setLoading(false)
    })
  }

  useEffect(()=>{
    getData(page)
  },[page])


  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    setPage(0)
    getData(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    console.log('loading more')
    setPage((pre:number)=>pre + 1)
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
        columnWrapperStyle={{justifyContent:'space-between'}}
        numColumns={2}
        renderItem={({ item, index })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:2,
            marginRight:index % 2 == 0 ? 2 : 0,
            marginLeft:index % 2  == 0 ? 0 : 2,
          }]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        />: <RemmenntRenderItem item={item} columnIndex={index} onPress={()=>onItemPress(item)}/>
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View style={styles.contentView}>
            <TopCarousel navigation={navigation} jumpTo={jumpTo} tabState={tabState}/>
            <View style={styles.bannerView}>
            {currentType != 0 && <View style={styles.scrollView}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                focusList.map((item:any,index:number)=>{
                  return <View style={styles.focusView} key={index+'focus'}>
                    <View style={styles.focusAvatarView}>
                      <View style={styles.focusAvtar}/>
                      <View style={styles.focusTipView}/>
                    </View>
                    <Text style={styles.focusName}>用户名字</Text>
                  </View>
                })
              }
              </ScrollView>
            </View>}
              <Text style={styles.centerTitle}>来自票友推荐</Text>
              {
                bannerList.map((item:any,index:number)=>{
                  return <TouchableOpacity key={index+'tickbanner'} onPress={()=>{
                    onBannerPress(item)
                  }}>
                    <Image style={styles.banner} source={item.banner}/>
                    <View style={styles.bannerTitleView}>
                      <Text style={styles.bannerTitle}>{item.title}</Text>
                      <Text style={styles.bannerTitleDes}>{item.des}</Text>
                    </View>
                  </TouchableOpacity>
                })
              }
            </View>
          </View>
        }
        ListFooterComponent={<View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>加载更多...</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View>}
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
function RemmenntRenderItem({item,columnIndex,onPress}:any){
  return <TouchableOpacity onPress={()=>onPress()} style={[styles.flowView,{
    marginVertical:2,
    marginRight:columnIndex == 0 ? 2 : 0,
    marginLeft:columnIndex == 0 ? 0 : 2
  }]}>
    <View style={styles.typeItem}>
    <CachedImage
      resizeMode='cover'
      source={HTTPS.getImageUrl(item.image)}
      style={styles.typeItem}
      blurRadius={30}
      loadingImageComponent={ImagePlaceholder}
      />
      <ImageBackground source={limmitBg} style={styles.limmitbg}>
        <Text style={styles.limmittitle}>限量:{item.total}份</Text>
      </ImageBackground>
    </View>
    <View style={styles.typeItemDown}>
      <Image style={styles.typeItemDownbg} source={downBg} resizeMode='cover'/>
      <View style={styles.flowViewSubView}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>{item.intro}</Text>
        <TouchableOpacity style={styles.focusButton}>
          <Image style={styles.flowFocus} source={focus_n}/>
        </TouchableOpacity>
      </View>
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowNameid}>id:{item.ticket_id}</Text>
      <View style={styles.flowViewSubView}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={styles.flowIcon}/>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>名字</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={styles.moenyUni}>$</Text>
          <Text style={styles.moeny}>{item.price}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
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
  const bannerInfo = useTicketBanner()
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
      data={bannerInfo.data}
      scrollAnimationDuration={3000}
      onSnapToItem={(index) => {setCurrentIndex(index)}}
      renderItem={({ item,index }:any) => (
        <CachedImage
          resizeMode='cover'
          source={HTTPS.getImageUrl(item.merchant.logo)}
          style={styles.flowIcon}
          blurRadius={30}
          loadingImageComponent={ImagePlaceholder}
          />
      )}
      />
    <View style={styles.pointView}>
      {
        bannerInfo.data?.map((item:any,index:number)=>{
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
