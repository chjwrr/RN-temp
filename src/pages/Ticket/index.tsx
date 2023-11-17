
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
  SafeAreaView
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

const centerBg = require('@/assets/images/ticket_downbg.png')
const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_2.png')
const ticket_pro_ban_2 = require('@/assets/images/ticket_pro_ban_1.png')
const topbanner = require('@/assets/images/ticket_banner.png')
const ticket_line = require('@/assets/images/tdbg.png')
const ticket_tj = require('@/assets/images/ticket_tj_ic.png')
const ticket_dr = require('@/assets/images/ticket_dr_ic.png')
const ticket_focus = require('@/assets/images/ticket_focus_ic.png')
const ticket_play = require('@/assets/images/ticket_play_ic.png')
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

function Ticket({navigation}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()
  const [showTab,setShowTab] = useState(false)


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
        // setDataSource(result.ticket_list)
        setDataSource([{},{},{},{},{},{},{}])
      }else {
        // setDataSource([...dataSource,...result.ticket_list])
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
      if (showTab){
        setShowTab(false)
      }
    }
    if (e.nativeEvent.contentOffset.y >= SCREEN_WIDTH * 640 / 750 + 100){
      if (!showTab){
        setShowTab(true)
      }
    }

  }
  const [currentType,setCurrentType] = useState(0)
  function onChangeType(index:any){
    setCurrentType(index)
  }
  const focusList:any[] = [1,2,3,4,5,6,7,8,9,0]

  return (
    <View style={styles.mainView}>
      {showTab && <TopTabbar onChange={onChangeType} current={currentType}/>}
      <WaterfallFlow
        showsVerticalScrollIndicator={false}
        data={dataSource}
        numColumns={2}
        renderItem={({ item, index, columnIndex })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:2,
            marginRight:columnIndex == 0 ? 2 : 0,
            marginLeft:columnIndex == 0 ? 0 : 2,
          }]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        />: <TouchableOpacity onPress={()=>onPress(columnIndex)} style={[styles.flowView,{
            marginVertical:2,
            marginRight:columnIndex == 0 ? 2 : 0,
            marginLeft:columnIndex == 0 ? 0 : 2
          }]}>
            <ImageBackground source={ticket_item_1} style={styles.typeItem} resizeMode='cover'>
              <ImageBackground source={limmitBg} style={styles.limmitbg}>
                <Text style={styles.limmittitle}>限量:200份</Text>
              </ImageBackground>
            </ImageBackground>
            <View style={styles.typeItemDown}>
              <Image style={styles.typeItemDownbg} source={downBg} resizeMode='cover'/>
              <View style={styles.flowViewSubView}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>名称名称名称名称名称名称名称名称名称</Text>
                <TouchableOpacity style={styles.focusButton}>
                  <Image style={styles.flowFocus} source={focus_n}/>
                </TouchableOpacity>
              </View>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowNameid}>id:1234</Text>
              <View style={styles.flowViewSubView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={styles.flowIcon}/>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>名字</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.moenyUni}>$</Text>
                  <Text style={styles.moeny}>99.90</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View style={styles.contentView}>
            <TopCarousel navigation={navigation}/>
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
                    navigation.navigate('TicketBannerDetail',{
                      id:0
                    })
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

function IenderItem({columnIndex}:any){
  function onPress(index:any){

  }
  return <TouchableOpacity onPress={()=>onPress(columnIndex)} style={[styles.flowView,{
    marginVertical:2,
    marginRight:columnIndex == 0 ? 2 : 0,
    marginLeft:columnIndex == 0 ? 0 : 2
  }]}>
    <ImageBackground source={ticket_item_1} style={styles.typeItem} resizeMode='cover'>
      <BlurView
        style={styles.typeItemDownBlur}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
        />
        <View  style={styles.typeItemDown}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>名称</Text>
          <View style={styles.flowViewSubView}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              {/* <View style={styles.flowIcon}/> */}
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>名字</Text>
            </View>
            <TouchableOpacity style={styles.focusButton}>
              <Image style={styles.flowFocus} source={focus_n}/>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
            return <TouchableOpacity key={index+'centeritem'} onPress={()=>onChangeType(index)}>
                <Image style={[styles.centerItem,{
                  marginLeft:index == 0 ? 0 : -90
                }]} source={item} />
            </TouchableOpacity>
          })
        }
      </View>
    </ImageBackground>
  </View>
}

const tabs:any[] = [
  {
    title:'推荐',
    icon_n:require('@/assets/images/ticket_tj.png'),
    icon_s:require('@/assets/images/ticket_tj_s.png'),
  },
  {
    title:'达人',
    icon_n:require('@/assets/images/ticket_sj.png'),
    icon_s:require('@/assets/images/ticket_sj_s.png'),
  },
  {
    title:'关注',
    icon_n:require('@/assets/images/ticket_xc.png'),
    icon_s:require('@/assets/images/ticket_xc_s.png'),
  },
  {
    title:'玩圈',
    icon_n:require('@/assets/images/ticket_gz.png'),
    icon_s:require('@/assets/images/ticket_gz_s.png'),
  },
]
function TopTabbar({onChange,current}:any){
  return <Animatable.View animation='fadeInDown' style={[styles.navigationView,{opacity:0}]}>
    {
      tabs.map((item:any,index:number)=>{
        return <TouchableOpacity style={[styles.tabButton]} key={item.title+'type'} onPressIn={()=>{
          onChange(index)
        }}>
          <ImageBackground style={styles.tabButtonBg} source={current == index ? item.icon_s : item.icon_n}>
            <Text style={{
              fontSize:current == index ? 18 : 14,
              fontWeight:current == index ? '600' : '400',
              color:current == index ? Colors.white : Colors.light
            }}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      })
    }
  </Animatable.View>
}

export default Ticket;
