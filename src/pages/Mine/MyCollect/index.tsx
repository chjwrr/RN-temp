
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
import { MY_ARTICLE_COLLECT_LIST} from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { savePicture } from '@/utils/common';
import { FadeLoading } from 'react-native-fade-loading';
import Colors from '@/utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1,1,1,1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  useEffect(()=>{
    getData(0)
  },[])
  function onBack(){
    props.navigation.goBack()
  }

  function onPress(item:any,index:number){
    props.navigation.navigate('ShowDetail',{
      id:item.article_id,
      onCollectChange:(is_collect:boolean)=>{
        console.log('is_collect=',is_collect)
        let temp = [...dataSource]
        temp.splice(index,1)
        setDataSource(temp)
      }
    })
  }

  function getData(currentPage:number){
    setLoading(true)
    HTTPS.post(MY_ARTICLE_COLLECT_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currentPage * PAGE_SIZE
    }).then((result:any)=>{
      if (currentPage == 0){
        setDataSource(result.my_article_collect_list)
      }else {
        setDataSource([...dataSource,...result.my_article_collect_list])
      }
      if (result.my_article_collect_list.length < PAGE_SIZE){
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
  const  {t} = useTranslationLanguage()
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      {/* <SafeAreaView style={{flex:1}}> */}
        <View style={[styles.navigationView,{
        }]}>
          <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
            <Image style={styles.backIcon} source={BackIcon}/>
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>{t('my collection')}</Text>
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
              source={HTTPS.getImageUrl(item.images ? item.images[0] : '')}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={200}
            />
            <View>
              <Text ellipsizeMode='tail' numberOfLines={4} style={styles.flowViewTitle}>
              {item.content}
              </Text>
            </View>
          </TouchableOpacity>
          }
          </View>
        }}
        style={styles.flatList}
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
          // setTimeout(() => {
            isCanLoadMore.current = true;

          // }, 1000);
        }}
        onEndReachedThreshold={0.01}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
        }
      />
      {/* </SafeAreaView> */}
    </ImageBackground>
  );
}
export default RecommendDetail;
