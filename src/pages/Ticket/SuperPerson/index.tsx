
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
import { MASTER_LIST, MASTER_RECOMMEND_LIST, MASTER_UNFOLLOW,MASTER_FOLLOW } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

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
const focus_n = require('@/assets/images/unlike.png')
const focus_s = require('@/assets/images/like.png')

const limmitBg = require('@/assets/images/limmitBg.png')
const downBg = require('@/assets/images/ticket_downbgperson.png')

function Ticket({navigation}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()
  const [recommenList,seRecommenList] = useState<any[]>([])


  useEffect(()=>{
    getData(0)
    getRecommenMsterList()
  },[])

  function getRecommenMsterList(){
    HTTPS.post(MASTER_RECOMMEND_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:0
    }).then((result:any)=>{
      seRecommenList(result.master_recommend_list)
    }).finally(()=>{
    })
  }

  function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(MASTER_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.master_list)
        // setDataSource([{},{},{},{},{},{},{}])
      }else {
        setDataSource([...dataSource,...result.master_list])
      }
      if (result.master_list.length < PAGE_SIZE){
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


  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    getRecommenMsterList()
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
  
  function onLike(item:any,index:number){
    HTTPS.post(item.is_follow ? MASTER_UNFOLLOW : MASTER_FOLLOW,{
      "token":userInfo.token,
      master_id:item.master_id
    }).then((result:any)=>{
      let temp = [...dataSource]
      temp.splice(index,1,{...item,is_follow:!item.is_follow})
      setDataSource(temp)
    }).finally(()=>{
    })
  }
  const {t} = useTranslationLanguage()
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
        />: <RemmenntRenderItem item={item} columnIndex={index} onPress={()=>{
            navigation.navigate('SuperPersonDetail',{
              master_id:item.master_id,
              onFocusChange:(isFocus:boolean)=>{
                let temp = [...dataSource]
                temp.splice(index,1,{...item,is_follow:isFocus})
                setDataSource(temp)
              }
            })
          }} onLike={()=>onLike(item,index)}/>
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={
            <View style={styles.bannerView}>
              <Text style={styles.centerTitle}>{t('Recommended by experts')}</Text>
              <View style={styles.scrollView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  recommenList.map((item:any,index:number)=>{
                    return <TouchableOpacity style={styles.focusView} key={index+'focus'} onPress={()=>{
                      navigation.navigate('SuperPersonDetail',{
                        master_id:item.master_id
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
          <Text style={styles.loadMoreTitle}>{t('load more')}</Text>
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

function RemmenntRenderItem({item,columnIndex,onPress,onLike}:any){
  return <TouchableOpacity onPress={onPress} style={[styles.flowView,{
    marginVertical:2,
    marginRight:columnIndex == 0 ? 2 : 0,
    marginLeft:columnIndex == 0 ? 0 : 2
  }]}>
    <View style={styles.typeItem}>
    {/* <CachedImage
      resizeMode='cover'
      source={HTTPS.getImageUrl(item.image)}
      style={styles.typeItem}
      blurRadius={30}
      loadingImageComponent={ImagePlaceholder}
      /> */}
      <ExpoImage
        style={styles.typeItem}
        source={HTTPS.getImageUrl(item.avatar)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      {/* <ImageBackground source={limmitBg} style={styles.limmitbg}>
        <Text style={styles.limmittitle}>限量:{item.total}份</Text>
      </ImageBackground> */}
    </View>
    <View style={styles.typeItemDown}>
      {/* <Image style={styles.typeItemDownbg} source={downBg} resizeMode='cover'/> */}
      <LinearGradient colors={['rgba(64,14,179,0.6)', 'transparent']} style={styles.typeItemDownbg}/>
      <View style={styles.flowViewSubView}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>{item.intro}</Text>
        <TouchableOpacity style={styles.focusButton} onPressIn={onLike}>
          <Image style={styles.flowFocus} source={item.is_follow ? focus_s : focus_n}/>
        </TouchableOpacity>
      </View>
      <View style={styles.flowViewSubView}>
        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
          {/* <View style={styles.flowIcon}/> */}
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>{item.name}</Text>
        </View>
      </View>
    </View>
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
        <Image key={index + 'superperson'} style={{width:'100%',height:'100%'}} source={topbanner}/>
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
