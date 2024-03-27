
import React, { useEffect, useRef, useState } from 'react';
import {
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
import { MY_MESSAGE_CENTER } from '@/api/API';
import { formatTime } from '@/utils/common';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')

function Ticket({navigation}:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  useEffect(()=>{
    getData(0)
  },[])

  function getData(currentPage:number){
    setLoading(true)
    HTTPS.post(MY_MESSAGE_CENTER,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currentPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currentPage == 0){
        setDataSource(result.my_message_center)
      }else {
        setDataSource([...dataSource,...result.my_message_center])
      }
      if (result.my_message_center.length < PAGE_SIZE){
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
  function onBack(){
    navigation.goBack()
  }
  const {t} = useTranslationLanguage()
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.mainView}>
      <View style={[styles.navigationView,{
      }]}>
        <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
          <Image style={styles.backIcon} source={BackIcon}/>
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.title}>{t('Message Center')}</Text>
        </View>
      </View>
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
          navigation.navigate('SendMessage',{
            info:item.master
          })
        }}/>
        }}
        style={styles.flatList}
        ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>{t('load more')}</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View> : <View style={styles.loadMoreView}/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        keyExtractor={(item, index) => 'keyPlay' + index}
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
            source={HTTPS.getImageUrl(item.master.avatar)}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={200}
          />
          <View style={{flex:1}}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>{item.master.name}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowNameid}>{item.last_message.content}</Text>
          </View>
       </View>
       <Text style={styles.flowNameid}>{formatTime(item.last_message.created_at)}</Text>

    </View>
  </TouchableOpacity>
}

export default Ticket;
