
import React, { useEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {styles} from './styles'
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import { FadeLoading } from 'react-native-fade-loading';
import WaterfallFlow from 'react-native-waterfall-flow'
import Colors from '@/utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserInfo } from '@/redux/userInfo';
import { ARTICLE_LIKE, ARTICLE_LIST, FOLLOWING_ARTICLE_LIST } from '@/api/API';
import * as HTTPS from '@/api/axios'
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';


const unlike = require('@/assets/images/unlike.png')
const like = require('@/assets/images/like.png')


function Show({navigation,jumpTo}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const isCanLoadMore = useRef(false)
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1,1,1])
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  async function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(ARTICLE_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.article_list)
      }else {
        setDataSource([...dataSource,...result.article_list])
      }
      if (result.article_list.length < PAGE_SIZE){
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

  return (
    <View style={{flex:1}}>

    <FlatList
      showsVerticalScrollIndicator={false}
      data={dataSource}
      numColumns={2}
      columnWrapperStyle={{justifyContent:'space-between'}}
      renderItem={({ item, index })=>{
        return  <View style={{flex:1}}>
          {item == 1 ? <FadeLoading
        style={[styles.flowLoadingView,{
          marginVertical:2,
          marginRight:index % 2 == 0 ? 2 : 0,
          marginLeft:index % 2 == 0 ? 0 : 2
        }]}
        children={''}
        primaryColor={'#a6abe2'}
        secondaryColor={'#b391e8'}
        duration={0}
        visible={true}
        animated={true}
      />: <RenderItem item={item} index={index} navigation={navigation}/>}
        </View>
      }}
      style={{ flex: 1, width:SCREEN_WIDTH - 32 }}
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
      }
      />
    </View>
  );
}
function RenderItem({item,index,navigation}:any){
  const userInfo = useUserInfo()
  function onPress(){
    navigation.navigate('ShowDetail',{
      id:item.article_id,
      uid:item.uid
    })
  }
  function onLike(){
    HTTPS.post(ARTICLE_LIKE,{
      "token":userInfo.token,
      article_id:item.article_id
    }).then((result:any)=>{
    }).finally(()=>{
    })


  }
  return <TouchableOpacity onPress={onPress} style={[styles.flowView,{
    marginVertical:2,
    marginRight:index % 2 == 0 ? 2 : 0,
    marginLeft:index % 2 == 0 ? 0 : 2
  }]}>
    {/* <CachedImage
      resizeMode='cover'
      source={(item.images && item.images.length > 0) ? HTTPS.getImageUrl(item.images[0]) : ''}
      style={styles.flowViewIcon}
      blurRadius={30}
      loadingImageComponent={ImagePlaceholder}
      /> */}
      <ExpoImage
        style={styles.flowViewIcon}
        source={(item.images && item.images.length > 0) ? HTTPS.getImageUrl(item.images[0]) : ''}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>{item.content}</Text>
    <View style={styles.flowViewSubView}>
      <View style={{flexDirection:'row'}}>
        <View style={styles.flowIcon}/>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>名字</Text>
      </View>
      <TouchableOpacity style={styles.focusButton} onPressIn={onLike}>
        <Image style={styles.flowFocus} source={unlike}/>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
}
export default Show;
