
import React, { useEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from 'react-native';
import {styles} from './styles'
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { FadeLoading } from 'react-native-fade-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserInfo } from '@/redux/userInfo';
import * as HTTPS from '@/api/axios'
import { HOME_BANNER, RECOMMEND_MERCHANT_CLOTH_LIST,MERCHANT_CLOTH_COLLECT,MERCHANT_CLOTH_UNCOLLECT } from '@/api/API';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';


const focus_n = require('@/assets/images/unlike.png')
const focus_s = require('@/assets/images/like.png')
const home_item_t = require('@/assets/images/home_item_t.png')
const home_item_s = require('@/assets/images/home_item_s.png')
const home_item_m = require('@/assets/images/home_item_m.png')


function Recommend({navigation,jumpTo}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  async function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(RECOMMEND_MERCHANT_CLOTH_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.merchant_cloth_recommend_list)
      }else {
        setDataSource([...dataSource,...result.merchant_cloth_recommend_list])
      }
      if (result.merchant_cloth_recommend_list.length < PAGE_SIZE){
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


  function onPress(item:any,index:number){
    navigation.navigate('RecommendDetail',{
      id:item.cloth_id,
      onCollectChange:(is_collect:boolean)=>{
        let temp = [...dataSource]
        temp.splice(index,1,{...item,is_collect:is_collect})
        setDataSource(temp)
      }
    })
  }

  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    getData(0)
  }

  function onEndReached(){
    console.log('==onEndReached==',loading,refreshing,isLoadEnd)
    if (loading || refreshing || isLoadEnd || !isCanLoadMore.current){
      return
    }
    console.log('loading more')
    getData(page + 1)
  }

  // 收藏服饰
  function onCollect(item:any,index:number){
    HTTPS.post(item.is_collect ? MERCHANT_CLOTH_UNCOLLECT : MERCHANT_CLOTH_COLLECT,{
      "token":userInfo.token,
      "cloth_id":item.cloth_id,
    }).then((result:any)=>{
      let temp = [...dataSource]
      temp.splice(index,1,{...item,is_collect:!item.is_collect})
      setDataSource(temp)
    }).finally(()=>{
    })
  }

  return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        columnWrapperStyle={{justifyContent:'space-between'}}
        numColumns={2}
        renderItem={({ item, index })=>{
          // console.log('item.merchant==',item.merchant)
          return <View style={{flex:1}}>
            { item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:2,
            marginRight:index % 2 == 0 ? 2 : 0,
            marginLeft:index % 2 == 0 ? 0 : 2,
          }]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        /> : <TouchableOpacity onPress={()=>onPress(item,index)} style={[styles.flowView,{
            marginVertical:2,
            marginRight:index % 2 == 0 ? 2 : 0,
            marginLeft:index % 2 == 0 ? 0 : 2,
          }]}>
            <ExpoImage
              style={styles.flowViewIcon}
              source={HTTPS.getImageUrl(item.image)}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={200}
            />
            {/* <CachedImage
              resizeMode='cover'
              source={HTTPS.getImageUrl(item.image)}
              style={styles.flowViewIcon}
              blurRadius={30}
              loadingImageComponent={ImagePlaceholder}
              sourceAnimationDuration={200}
              /> */}
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>{item.name}</Text>
            <View style={styles.flowViewSubView}>
              <View style={{flexDirection:'row'}}>
                {/* <CachedImage
                  resizeMode='cover'
                  source={HTTPS.getImageUrl(item.merchant.logo)}
                  style={styles.flowIcon}
                  blurRadius={30}
                  loadingImageComponent={ImagePlaceholder}
                  sourceAnimationDuration={200}
                  /> */}
                  <ExpoImage
                    style={styles.flowIcon}
                    source={HTTPS.getImageUrl(item.merchant.logo)}
                    placeholder={BLUR_HASH}
                    contentFit="cover"
                    transition={200}
                  />
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>{item.merchant.name}</Text>
              </View>
              <TouchableOpacity style={styles.focusButton} onPress={()=>onCollect(item,index)}>
                <Image style={styles.flowFocus} source={item.is_collect ? focus_s : focus_n}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          }
          </View>
        }}
        style={{ flex: 1,width:SCREEN_WIDTH - 32 }}
        ListHeaderComponent={<HomeBanner navigation={navigation}/>}
        ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>加载更多...</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View> : <View style={styles.loadMoreView}/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        keyExtractor={(item, index) => index + 'recommend' + item.cloth_id}
        onEndReached={() => {
          if (isCanLoadMore) {
            onEndReached();
            isCanLoadMore.current = false;
          }
        }}
        onContentSizeChange={() => {
          // setTimeout(() => {
            isCanLoadMore.current = true;

          // }, 1000);
        }}
        onEndReachedThreshold={0.01}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
        }
      />
  );
}

function HomeBanner({navigation}:any){
  const userInfo = useUserInfo()
  const [bannerList,setBannerList] = useState<any[]>([])
  const [currentIndex,setCurrentIndex] = useState(0)
  useEffect(()=>{
    HTTPS.post(HOME_BANNER,{
      "token":userInfo.token,
    }).then((res:any)=>{
      setBannerList(res.banner)
    }).finally(()=>{

    })
  },[])

  return <View style={{flex:1}}>
    <Carousel
    loop
    width={SCREEN_WIDTH - 32}
    height={180}
    autoPlay={true}
    data={bannerList}
    scrollAnimationDuration={3000}
    onSnapToItem={(index:number) => setCurrentIndex(index)}
    mode="parallax"
    modeConfig={{
      parallaxScrollingScale: 0.9,
      parallaxScrollingOffset: 40,
    }}
    renderItem={({ item,index }:any) => (
      <TouchableOpacity key={item.image} onPress={()=>{
        navigation.navigate('RecommendDetail',{
          id:item.banner_id
        })
      }}>
      <ExpoImage
        style={styles.flowViewIcon}
        source={HTTPS.getImageUrl(item.image)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      </TouchableOpacity>
     
      // <CachedImage
      //   resizeMode='contain'
      //   source={HTTPS.getImageUrl(item.image)}
      //   style={styles.flowViewIcon}
      //   blurRadius={30}
      //   loadingImageComponent={ImagePlaceholder}
      //   sourceAnimationDuration={200}
      //   />
    )}
    />
    <View style={styles.pointerView}>
      {
        bannerList.map((item:any,index:number)=>{
          return <View style={currentIndex === index ? styles.pointerItem : styles.pointerItemNor} key={'homepoinnt'+index}/>
        })
      }
    </View>
    <Text style={styles.topTitle}>穿越不同朝代</Text>
    <View style={styles.topItem}>
      <TouchableOpacity containerStyle={styles.topItemSub}>
        <ImageBackground style={styles.topItemSub} source={home_item_t} resizeMode='cover'/>
      </TouchableOpacity>
      <TouchableOpacity containerStyle={[styles.topItemSub,styles.topItemSubSpa]}>
        <ImageBackground style={styles.topItemSub} source={home_item_s} resizeMode='cover'/>
      </TouchableOpacity>
      <TouchableOpacity containerStyle={styles.topItemSub}>
        <ImageBackground style={styles.topItemSub} source={home_item_m} resizeMode='cover'/>
      </TouchableOpacity>
    </View>
  </View>
}
export default Recommend;
