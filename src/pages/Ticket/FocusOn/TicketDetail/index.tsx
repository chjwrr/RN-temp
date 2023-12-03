
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
  TICKET_COMMENT_PUBLISH,
  USER_FOLLOW,
  ARTICLE_UNLIKE,
  ARTICLE_COMMENT_PUBLISH,
  ARTICLE_COOMMENT_UP,
  ARTICLE_UNCOLLECT,
  ARTICLE_COLLECT,
  ARTICLE_LIKE,
  ARTICLE_COOMMENT_REPLY,
  USER_UNFOLLOW,
  TICKET_COMMENT_LIST
} from '@/api/API';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { formatTime } from '@/utils/common';
import { Image as ExpoImage } from 'expo-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';


const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_w.png')
const shareIcon = require('@/assets/images/share.png')
const accountIcon = require('@/assets/images/account.png')
const collectIcon = require('@/assets/images/unlike.png')
const comiconIcon = require('@/assets/images/comicon.png')
const stariconIcon = require('@/assets/images/unlike.png')
const stariconSIcon = require('@/assets/images/like.png')
const comicontIcon = require('@/assets/images/comicont.png')
const likeiconIcon = require('@/assets/images/unzan.png')
const zaniconIcon = require('@/assets/images/zan.png')



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

  function getCommonList(currenPage:number){
    setLoading(true)
    HTTPS.post(TICKET_COMMENT_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE,
      ticket_id:detailInfo.ticket_id
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.ticket_comment_list)
      }else {
        setDataSource([...dataSource,...result.ticket_comment_list])
      }
      if (result.ticket_comment_list.length < PAGE_SIZE){
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

  function onShare(){
    if(detailInfo.images){
      const url = HTTPS.getImageUrl(detailInfo.images[0])
      const title = 'Cverselink';
      const message = '';
      const options = Platform.select({
        default: {
          title,
          subject: title,
          message: `${message} ${url}`,
        },
      });
      Share.open(options);
    }
  }
  function onCommonChange(item:any){
    let temp = [item,...dataSource]
    setDataSource(temp)
  }

  return (
    <View style={styles.bgView}>
      <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", default: undefined })}
        keyboardVerticalOffset={0}
        >
        <SafeAreaView style={{flex:1}}>
          <Animated.View style={[styles.navigationView,{
            backgroundColor:'#000'
          }]}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
                <Image style={styles.backIcon} source={BackIcon}/>
              </TouchableOpacity>
              <ExpoImage
                style={styles.accounticon}
                source={HTTPS.getImageUrl(detailInfo.master?.avatar)}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
              <Text style={styles.accountTitle} numberOfLines={1} ellipsizeMode='tail'>{detailInfo.master?.name}</Text>
            </View>
          </Animated.View>
          <FlatList
            keyboardDismissMode='on-drag'
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            data={dataSource}
            numColumns={1}
            renderItem={({ item, index })=>{
              return <CommonItem onCommonChange={onCommonChange} item={item} index={index} ticketId={detailInfo.ticket_id}/>
            }}
            style={{ flex: 1 }}
            ListHeaderComponent={<View style={{flex:1}}>
              <SwiperView images={[detailInfo.image]}/>
              {/* <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>标题</Text> */}
              <Text style={styles.des}>{detailInfo.intro}</Text>
              <View style={styles.line}/>
              <View style={styles.commonTitleVieew}>
                <Text style={styles.commonTitle}>共</Text>
                <Text style={styles.commonTitleMain}>{dataSource.length}</Text>
                <Text style={styles.commonTitle}>条评论</Text>
              </View>
            </View>}
            ListEmptyComponent={<View/>}
            initialNumToRender={10}
            keyExtractor={(item, index) => 'key' + index}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: scrollY}}}
            ],{
              useNativeDriver:false
            })}
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
          <DownInfo
            ticket_id={detailInfo.ticket_id}
            onCommonChange={onCommonChange}/>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

function DownInfo({ticket_id,onCollectChange,onCommonChange}:any){
  const userInfo = useUserInfo()

  function onFocus(){
  
  }
  function onBlur(){
  
  }

  const inputRef = useRef<any>()


  function onSubmitEditing(e:any){
    const newContent = {"author": 
    {"avatar": userInfo.avatar, 
    "nickname":userInfo.nickname
    }, 
    "comment_id": 9999,
    "content": e.nativeEvent.text, 
    "created_at": dayjs().unix() * 1000,
    "down_count": 0, 
    "first_reply_id": null,
    "first_reply_uid": null, 
    "is_down": false,
    "is_up": false,
    "reply_id": null, 
    "reply_uid": null, 
    "up_count": 0}
    HTTPS.post(TICKET_COMMENT_PUBLISH,{
      "token":userInfo.token,
      ticket_id:ticket_id,
      content:e.nativeEvent.text
    }).then((result:any)=>{
      onCommonChange && onCommonChange(newContent)
      inputRef.current.clear()
    }).finally(()=>{
    })
    
  }
  return <View style={[styles.downView]}>
      <Animatable.View style={[styles.comInputView]}>
        <Image style={styles.downComIcon} source={comicontIcon}/>
        <CustomTextInput
          ref={inputRef}
          style={{height:'100%',flex:1}}
          inputProps={{
            multiline:false,
            numberOfLines:1,
            style:{color:Colors.white},
            onFocus:onFocus,
            onBlur:onBlur,
            returnKeyLabel:'发送',
            returnKeyType:'send',
            onSubmitEditing:onSubmitEditing,
            placeholder:'说点什么...',
            placeholderTextColor:Colors.white
          }}
        />
      </Animatable.View>
  </View>
}
function CommonItem({item,index,ticketId,onCommonChange}:any){
  const userInfo = useUserInfo()

  return <View style={styles.comMain}>
    <View style={styles.comView}>
      <ExpoImage
        style={styles.avatar}
        source={HTTPS.getImageUrl(item.author?.avatar)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.comContent}>
        <Text style={styles.comName} numberOfLines={1} ellipsizeMode='tail'>{item.author.nickname}</Text>
        <Text style={styles.comContentDes}>{item.content}</Text>
        <View style={styles.comRelayButton}>
          <Text style={styles.comDay}>{formatTime(item.created_at)}</Text>
        </View>
      </View>
    </View>
    <View style={styles.comLine}/>
  </View>
}

const SwiperView = memo(({images}:any)=>{
  const [currentIndex,setCurrentIndex] = useState(0)
  return <View style={styles.swiperView}>
    <Carousel
      loop
      width={SCREEN_WIDTH - 32}
      height={500}
      // autoPlay={true}
      data={images}
      // scrollAnimationDuration={3000}
      onSnapToItem={(index) => setCurrentIndex(index)}
      // mode="parallax"
      // modeConfig={{
      //   parallaxScrollingScale: 0.9,
      //   parallaxScrollingOffset: 40,
      // }}
      renderItem={({ item,index }:any) => (
        <ExpoImage
          style={styles.swiperTopView}
          source={HTTPS.getImageUrl(item)}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={200}
        />
        // <CachedImage
        //   resizeMode='cover'
        //   source={HTTPS.getImageUrl(item)}
        //   style={styles.swiperTopView}
        //   blurRadius={30}
        //   loadingImageComponent={ImagePlaceholder}
        //   />
      )}
      />
    <View style={styles.sliderView}>
      <Text style={styles.sliderTitle}>{currentIndex + 1}/{images?.length}</Text>
    </View>
  </View>
},(pre:any,next:any)=>pre.images == next.images)

export default RecommendDetail;
