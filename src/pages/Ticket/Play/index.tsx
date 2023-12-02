
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
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';
import { MY_FOLLOWING_MASTERS } from '@/api/API';

const ticket_msg_bg = require('@/assets/images/ticket_msg_bg.png')
const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_2.png')
const ticket_pro_ban_2 = require('@/assets/images/ticket_pro_ban_1.png')

function Ticket({navigation}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()
  const [myFollowingList,setMyFollowingList] = useState<any[]>([])

  useEffect(()=>{
    setTimeout(() => {
      setDataSource([{},{},{},{}])
    }, 2000);
  },[])

  function onPress(columnIndex:number){

  }

  function getData(currenPage:number){
    // setLoading(true)
    // HTTPS.post(MY_FOLLOWING_MASTERS,{
    //   "token":userInfo.token,
    //   "limit":PAGE_SIZE,
    //   offset:currenPage * PAGE_SIZE
    // }).then((result:any)=>{
    //   if (currenPage == 0){
    //     setDataSource(result.my_following_masters)
    //     // setDataSource([{},{},{},{},{},{},{}])
    //   }else {
    //     setDataSource([...dataSource,...result.my_following_masters])
    //   }
    //   if (result.my_following_masters.length < PAGE_SIZE){
    //     setIsLoadEnd(true)
    //   }else {
    //     setIsLoadEnd(false)
    //   }
    //   setPage(currenPage)
    // }).finally(()=>{
    //   setRefreshing(false)
    //   setLoading(false)
    // })
  }

  useEffect(()=>{
    getData(0)
  },[])


  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    // setRefreshing(true);
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

  return (
    <ImageBackground style={styles.mainView} source={ticket_msg_bg}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        numColumns={1}
        renderItem={({ item, index })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:10,
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
        style={styles.flatList}
        // ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
        //   <Text style={styles.loadMoreTitle}>加载更多...</Text>
        //   <ActivityIndicator size="small" color={Colors.main} />
        // </View> : <View style={styles.loadMoreView}/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        keyExtractor={(item, index) => 'keyPlay' + index}
        // onEndReached={() => {
        //   if (isCanLoadMore) {
        //     onEndReached();
        //     isCanLoadMore.current = false;
        //   }
        // }}
        // onContentSizeChange={() => {
        //   isCanLoadMore.current = true;
        // }}
        // onEndReachedThreshold={0.01}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fff']}/>
        }
      />
    </ImageBackground>
  );
}

function RemmenntRenderItem({item,onPress}:any){
  return <TouchableOpacity onPress={onPress} style={[styles.flowView,{
    marginVertical:10,
  }]}>
    <View style={styles.flowViewSubView}>
       <View style={{flexDirection:'row'}}>
          <ExpoImage
            style={styles.avatar}
            source={HTTPS.getImageUrl(item.avatar)}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={200}
          />
          <View style={{width:'60%'}}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>项目群</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowNameid}>最近一条评论</Text>
          </View>
       </View>
       <View style={{alignItems:'flex-end'}}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowNameid}>昨天</Text>
        {/* <View style={styles.unRead}>
          <Text style={styles.unReadText}>10</Text>
        </View> */}
       </View>
    </View>
  </TouchableOpacity>
}

export default Ticket;
