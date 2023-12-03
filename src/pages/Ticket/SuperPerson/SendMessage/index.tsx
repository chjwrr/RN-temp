
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  Animated,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  LayoutAnimation,
  UIManager,
  InteractionManager,
  DeviceEventEmitter
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import * as _ from 'lodash'
import Colors from '@/utils/colors';
import * as Animatable from 'react-native-animatable';
import CustomTextInput from '@/components/CustomTextInput';
import { useUserInfo } from '@/redux/userInfo';
import * as HTTPS from '@/api/axios'
import {
  ARTICLE_DETAIL,
  USER_FOLLOW,
  ARTICLE_UNLIKE,
  ARTICLE_COMMENT_PUBLISH,
  ARTICLE_COOMMENT_UP,
  ARTICLE_UNCOLLECT,
  ARTICLE_COLLECT,
  ARTICLE_LIKE,
  ARTICLE_COOMMENT_REPLY,
  SEND_MESSAGE_TO_MASTER,
  MY_MESSAGE
} from '@/api/API';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { formatTime } from '@/utils/common';
import { Image as ExpoImage } from 'expo-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';

const BackIcon = require('@/assets/images/back_w.png')
const BackBIcon = require('@/assets/images/back_b.png')
const BGImage = require('@/assets/images/homebg.png')

function RecommendDetail(props:any): JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useUserInfo()
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const detailInfo = props.route.params.info
  const isDark = props.route.params.isDark
  const [otherSide,setOtherSide] = useState<any>({})

  function getCommonList(currenPage:number){
    setLoading(true)
    HTTPS.post(MY_MESSAGE,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE,
      to_id:detailInfo.master_id
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.my_message)
      }else {
        setDataSource([...dataSource,...result.my_message])
      }
      if (result.my_message.length < PAGE_SIZE){
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
    getCommonList(0)
  },[])

  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    getCommonList(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    console.log('loading more')
    getCommonList(page + 1)
  }


  function onBack(){
    props.navigation.goBack()
  }
  
  function onCommonChange(item:any){
    let temp = [item,...dataSource]
    setDataSource(temp)
  }

  return (
    <ImageBackground style={[styles.mainView,{
      backgroundColor:isDark ? '#000' : 'transparent'
    }]} source={isDark ? null : BGImage}>
      <LinearGradient colors={isDark ? ['rgb(21,7,32)', 'rgba(24,7,107,0.4)'] : ['transparent','transparent']} style={styles.bgView}>
        <KeyboardAvoidingView style={{ flex: 1 }}
          behavior={Platform.select({ ios: "padding", default: undefined })}
          keyboardVerticalOffset={0}
          >
          <SafeAreaView style={{flex:1}}>
            <Animated.View style={[styles.navigationView,{
              backgroundColor:isDark ? 'rgb(21,7,32)' : 'transparent'
            }]}>
              <View style={{flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
                  <Image style={styles.backIcon} source={isDark ? BackIcon : BackBIcon}/>
                </TouchableOpacity>
                <ExpoImage
                  style={styles.accounticon}
                  source={HTTPS.getImageUrl(detailInfo.avatar)}
                  placeholder={BLUR_HASH}
                  contentFit="cover"
                  transition={200}
                />
                <Text style={[styles.accountTitle,{
                  color:isDark ? '#fff' : '#000'
                }]} numberOfLines={1} ellipsizeMode='tail'>{detailInfo.name}</Text>
              </View>
            </Animated.View>
            <FlatList
              keyboardDismissMode='on-drag'
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}
              data={dataSource}
              numColumns={1}
              renderItem={({ item, index })=>{
                return <CommonItem detailInfo={detailInfo} isDark={isDark} item={item} index={index}/>
              }}
              style={{ flex: 1 }}
              ListEmptyComponent={<View/>}
              initialNumToRender={10}
              keyExtractor={(item, index) => 'pmkey' + index}
              scrollEventThrottle={16}
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
            <DownInfo isDark={isDark} master_id={detailInfo.master_id}
            onCommonChange={onCommonChange}/>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}

function DownInfo({master_id,onCommonChange,isDark}:any){
  const inputRef = useRef<any>()
  const userInfo = useUserInfo()
  function onFocus(){
   
  }
  function onBlur(){
    
  }

  function onSubmitEditing(e:any){
    const newContent = {"content": e.nativeEvent.text, 
    "created_at": dayjs().unix() * 1000, 
    "from_id": userInfo.uid, 
    "message_id": 999,
    "to_id": master_id}
    HTTPS.post(SEND_MESSAGE_TO_MASTER,{
      "token":userInfo.token,
      master_id:master_id,
      content:e.nativeEvent.text
    }).then((result:any)=>{
      onCommonChange && onCommonChange(newContent)
      inputRef.current.clear()
    }).finally(()=>{
    })
  }

  return <View style={[styles.downView]}>
    <CustomTextInput
      ref={inputRef}
      style={[styles.input,{
        backgroundColor:isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
      }]}
      inputProps={{
        multiline:false,
        numberOfLines:1,
        style:{color:isDark ? Colors.white : Colors.black},
        onFocus:onFocus,
        onBlur:onBlur,
        returnKeyLabel:'发送',
        returnKeyType:'send',
        onSubmitEditing:onSubmitEditing,
        placeholder:'说点什么...',
        placeholderTextColor:Colors.white
      }}
    />
  </View>
}
function CommonItem({item,index,isDark,detailInfo}:any){
  console.log('detailInfo=',detailInfo)
  const userInfo = useUserInfo()
  return <View style={styles.msgView}>
    <ExpoImage
      style={styles.avatar}
      source={HTTPS.getImageUrl(item.from_id == userInfo.uid ? userInfo.avatar : detailInfo.avatar)}
      placeholder={BLUR_HASH}
      contentFit="cover"
      transition={200}
    />
    <View style={styles.itemRight}>
      <Text style={[styles.name,{
        color:isDark ? '#fff' : '#000'
      }]}>{item.from_id == userInfo.uid ? userInfo.nickname : detailInfo.name}</Text>
      <View style={styles.contentView}>
        <Text style={[styles.content,{
           color:isDark ? '#fff' : '#000'
        }]}>{item.content}</Text>
      </View>
      <Text style={[styles.name,{textAlign:'right',marginTop:5}]}>{formatTime(item.created_at)}</Text>
    </View>
  </View>
}

export default RecommendDetail;
