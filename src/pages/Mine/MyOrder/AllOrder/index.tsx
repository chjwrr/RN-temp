
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT } from '@/utils';
import * as _ from 'lodash'
import {CacheManager, CachedImage} from '@georstat/react-native-image-cache'
import ImagePlaceholder from '@/components/ImagePlaceholder';
import * as HTTPS from '@/api/axios'
import { Image as ExpoImage } from 'expo-image';
import { MY_ORDER_LIST} from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { formatTime, savePicture } from '@/utils/common';
import { FadeLoading } from 'react-native-fade-loading';
import Colors from '@/utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  useEffect(()=>{
    getData(0)
  },[])

  function getData(currentPage:number){
    setLoading(true)
    HTTPS.post(MY_ORDER_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currentPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currentPage == 0){
        setDataSource(result.my_order_list)
      }else {
        setDataSource([...dataSource,...result.my_order_list])
      }
      if (result.my_order_list.length < PAGE_SIZE){
        setIsLoadEnd(true)
      }else {
        setIsLoadEnd(false)
      }
      setPage(currentPage)
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
    getData(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd || !isCanLoadMore.current){
      return
    }
    console.log('loading more')
    getData(page + 1)
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dataSource}
      renderItem={({ item, index })=>{
        return <View style={{flex:1}}>
          { item == 1 ? <FadeLoading
        style={[styles.flowLoadingView,{
        }]}
        children={''}
        primaryColor={'#a6abe2'}
        secondaryColor={'#b391e8'}
        duration={0}
        visible={true}
        animated={true}
      /> : <OrderItem item={item}/> }
        </View>
      }}
      style={styles.flatList}
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
// status 0-待支付 1-已完成 2-已取消
function OrderItem({item}:any){
  return <TouchableOpacity style={[styles.flowView,{
  }]}>

    <Text style={styles.time}>下单时间：{formatTime(item.created_at)}</Text>
    <View style={styles.line}/>
    <View style={styles.itemView}>
      <ExpoImage
        style={styles.itemImage}
        source={HTTPS.getImageUrl(item.image)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      <View>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.name}>
        名称:{item.name}
        </Text>
        <Text style={styles.name}>
        ID:{item.order_id}
        </Text>
        <Text style={styles.name}>
        价格:￥{item.price}
        </Text>
        {
          item.status == 0 ? <TouchableOpacity>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.buyBtn}>
              <Text style={styles.buytitle}>立即购买</Text>
            </LinearGradient>
          </TouchableOpacity> : <Text style={styles.name}>
            {item.status == 1 ? '已完成' : '已取消'}
          </Text>
        }
      </View>
    </View>
  </TouchableOpacity>
}
export default RecommendDetail;
