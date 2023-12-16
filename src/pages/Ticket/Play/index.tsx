
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
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';
import { TICKET_CIRCLE } from '@/api/API';
import { formatTime } from '@/utils/common';

const ticket_msg_bg = require('@/assets/images/ticket_msg_bg.png')
const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_2.png')
const ticket_pro_ban_2 = require('@/assets/images/ticket_pro_ban_1.png')

function Ticket({navigation}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  useEffect(()=>{
    getData()
  },[])

  function getData(){
    setLoading(true)
    HTTPS.post(TICKET_CIRCLE,{
      "token":userInfo.token,
    }).then((result:any)=>{
      setDataSource(result.ticket_circle)
    }).finally(()=>{
      setLoading(false)
      setRefreshing(false)
    })
  }

  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    getData()
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
          navigation.navigate('PrivateMessage',{
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
       <View style={{flexDirection:'row',flex:1}}>
          <ExpoImage
            style={styles.avatar}
            source={HTTPS.getImageUrl(item.ticket.image)}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={200}
          />
          <View style={{flex:1}}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>{item.ticket.name}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowNameid}>{item.last_comment.author.nickname}:{item.last_comment.content}</Text>
          </View>
       </View>
       <Text style={styles.flowNameid}>{formatTime(item.last_comment.created_at)}</Text>

    </View>
  </TouchableOpacity>
}

export default Ticket;
