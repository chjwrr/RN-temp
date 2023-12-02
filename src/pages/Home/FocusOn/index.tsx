
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {styles} from './styles'
import { FadeLoading } from 'react-native-fade-loading';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/utils/colors';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import * as HTTPS from '@/api/axios'
import { useUserInfo } from '@/redux/userInfo';
import { FOLLOWING_ARTICLE_LIST, MY_FOLLOWING_USER } from '@/api/API';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';

const ShareIcon = require('@/assets/images/share.png')

function FocusOn({navigation,jumpTo}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const isCanLoadMore = useRef(false)
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1])
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()
  const [myFollowing,setMyFollowing] = useState<any[]>([])

  useEffect(()=>{
    getData(0)
    getMyFollowing()
  },[])

  function getMyFollowing(){
    HTTPS.post(MY_FOLLOWING_USER,{
      "token":userInfo.token,
    }).then((res:any)=>{
      setMyFollowing(res.my_following_users)
    }).finally(()=>{

    })
  }

  function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(FOLLOWING_ARTICLE_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.following_article_list)
      }else {
        setDataSource([...dataSource,...result.following_article_list])
      }
      if (result.following_article_list.length < PAGE_SIZE){
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
    getMyFollowing()
    getData(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    console.log('loading more')
    getData(page + 1)
  }

  function onShowMore(item:any){
    navigation.navigate('ShowDetail',{
      id:item.article_id,
      onFocusChange:()=>{
        getMyFollowing()
      }
    })
  }
  return (
    <FlatList
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      data={dataSource}
      numColumns={1}
      renderItem={({ item, index })=>{
        return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        /> : <RenderItem onShowMore={()=>onShowMore(item)} item={item} index={index} navigation={navigation}/> 
      }}
      ListHeaderComponent={<View style={styles.scrollView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            myFollowing.map((item:any,index:number)=>{
              return <View style={styles.focusView} key={index+'focus'}>
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
                <Text style={styles.focusName}>{item.nickname}</Text>
              </View>
            })
          }
        </ScrollView>
      </View>}
      ListEmptyComponent={<View/>}
      ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
      <Text style={styles.loadMoreTitle}>加载更多...</Text>
        <ActivityIndicator size="small" color={Colors.main} />
      </View> : <View style={styles.loadMoreView}></View>}
      initialNumToRender={10}
      ItemSeparatorComponent={()=><View style={styles.speHeight}/>}
      keyExtractor={(item, index) => index + 'focuson' + item.article_id}
      getItemLayout={(data, index) => (
        {length: 414, offset: (414+10) * index, index}
      )}
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
      }
    />
  );
}

// 顶部44 + 图片300 + 点20  + 标题20 + 内容30  = 414
function RenderItem({item,index,navigation,onShowMore}:any){
  return <View style={styles.itemView}>
    <View style={styles.itemTopView}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <ExpoImage
          style={styles.itemAvatar}
          source={HTTPS.getImageUrl(item.author?.avatar)}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={200}
        />
        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode='tail'>{item.author?.nickname}</Text>
      </View>
      {/* <TouchableOpacity style={styles.shareButton}>
        <Image style={styles.share} source={ShareIcon}/>
      </TouchableOpacity> */}
    </View>
    <SwiperView images={item.images}/>
    {/* <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode='tail'>标题</Text> */}
    <View style={styles.itemContent}>
      <Text style={styles.iteemCCont} numberOfLines={1} ellipsizeMode='tail'>{item.content}</Text>
      <TouchableOpacity onPressIn={onShowMore}>
        <Text style={styles.itemShowMore}>查看全文</Text>
      </TouchableOpacity>
    </View>
  </View>
}

function SwiperView({images}:any){
  const [currentIndex,setCurrentIndex] = useState(0)
  return <View style={styles.itemScrollView}>
    <View style={{height:300,width:'100%'}}>
      <ScrollView 
        style={{flex:1}}
        horizontal={true} 
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event:any)=>{
          setCurrentIndex(Math.ceil(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 32)))
        }}
      >
        {
          images.map((item:any,index:number)=>{
            return <ExpoImage
              key={'focusOn'+index}
              style={styles.swiperTopView}
              source={HTTPS.getImageUrl(item)}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={200}
            />
          // return <CachedImage
          //   resizeMode='cover'
          //   source={HTTPS.getImageUrl(item)}
          //   style={styles.swiperTopView}
          //   blurRadius={30}
          //   loadingImageComponent={ImagePlaceholder}
          //   />
          })
        }
      </ScrollView>
    </View>
    <View style={styles.itemScrollPointView}>
        {
          images.map((item:any,index:number)=>{
            return <View style={[styles.scrollPointerView,{
              backgroundColor:currentIndex == index ? Colors.buttonMain : '#CCCCCC'
            }]} key={index+'scrollPointer'}/>
          })
        }
    </View>
  </View>
}
export default FocusOn;
