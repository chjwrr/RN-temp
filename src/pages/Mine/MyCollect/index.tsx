
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
import { BLUR_HASH, SCREEN_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT } from '@/utils';
import * as _ from 'lodash'
import {CacheManager, CachedImage} from '@georstat/react-native-image-cache'
import ImagePlaceholder from '@/components/ImagePlaceholder';
import * as HTTPS from '@/api/axios'
import { Image as ExpoImage } from 'expo-image';
import { MERCHANT_CLOTH_DETAIL, MERCHANT_FOLLOW, MERCHANT_UNFOLLOW,  MERCHANT_CLOTH_UNCOLLECT , MERCHANT_CLOTH_COLLECT } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { savePicture } from '@/utils/common';
import { FadeLoading } from 'react-native-fade-loading';
import Colors from '@/utils/colors';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  useEffect(()=>{
    setTimeout(() => {
      setDataSource([{},{},{},{}])
    }, 2000);
  },[])
  function onBack(){
    props.navigation.goBack()
  }

  function onPress(item:any,index:number){

  }

  function getData(currentPage:number){

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
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <View style={[styles.navigationView,{
        }]}>
          <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
            <Image style={styles.backIcon} source={BackIcon}/>
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>我的收藏</Text>
          </View>
        </View>
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
        /> : <TouchableOpacity onPress={()=>onPress(item,index)} style={[styles.flowView,{
          }]}>
            <ExpoImage
              style={styles.flowViewIcon}
              // source={HTTPS.getImageUrl(item.image)}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={200}
            />
            <View>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>名字</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>ID:</Text>
            </View>
          </TouchableOpacity>
          }
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
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
