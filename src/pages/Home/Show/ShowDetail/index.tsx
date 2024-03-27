
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
import { BLUR_HASH, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
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
  USER_UNFOLLOW
} from '@/api/API';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { formatTime } from '@/utils/common';
import { Image as ExpoImage } from 'expo-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';


const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
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
  const [refreshing, setRefreshing] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useUserInfo()
  const [detailInfo,setDetailInfo] = useState<any>({})
  const [commentList,setCommentList] = useState<any>([])
  function getDetail(){
    HTTPS.post(ARTICLE_DETAIL,{
      "token":userInfo.token,
      article_id:props.route.params.id
    }).then((res:any)=>{
      setDetailInfo(res.article_detail)
      onGetCommonList(res.article_detail?.comment_list)
    }).finally(()=>{
      setRefreshing(false)
    })
  }
  function onGetCommonList(comment_list:any[]){
    // 第一步，筛选出顶级的评论列表
    // 第二步，将回复的评论列表添加到顶级评论的 replyList 属性中
    let topList:any[] = []
    comment_list.map((item:any)=>{
      if (!item.reply_id){
        topList.push({
          ...item,
          replyList:[] // 默认给个空数组
        })
      }
    })
    topList.map((topItem:any)=>{
      comment_list.map((item:any)=>{
        if(item.first_reply_id && item.first_reply_id == topItem.comment_id){
          // 这条评论属于这个评论的回复评论
          topItem.replyList = [...topItem.replyList,item]
        }
      })
    })
    setCommentList(topList)
  }

  useEffect(()=>{
    getDetail()
  },[])

  function onRefresh(){
    if (refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    getDetail()
  }

  function onBack(){
    props.navigation.goBack()
  }

  function onShare(){
    if(detailInfo.images){
      const url = HTTPS.getImageUrl(detailInfo.images[0])
      const title = '';
      const message = detailInfo.content;
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
  function onCommonChange(){
    getDetail()
  }
  const {t} = useTranslationLanguage()
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", default: undefined })}
        keyboardVerticalOffset={0}
        >
        <SafeAreaView style={{flex:1}}>
          <Animated.View style={[styles.navigationView,{
            backgroundColor:scrollY.interpolate({
              inputRange: [0,88],
              outputRange: ['transparent','#fff'],
            })
          }]}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
                <Image style={styles.backIcon} source={BackIcon}/>
              </TouchableOpacity>
              <ExpoImage
                style={styles.accounticon}
                source={HTTPS.getImageUrl(detailInfo.author?.avatar)}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
              <Text style={styles.accountTitle} numberOfLines={1} ellipsizeMode='tail'>{detailInfo.author?.nickname}</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <FocusButton onFocusChange={props.route.params.onFocusChange} user_id={detailInfo.author?.uid} is_follow={detailInfo.author?.is_follow}/>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
                <Image style={styles.backIcon} source={shareIcon}/>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <FlatList
            keyboardDismissMode='on-drag'
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            data={commentList}
            numColumns={1}
            renderItem={({ item, index })=>{
              return <CommonItem onCommonChange={onCommonChange} item={item} index={index} articleId={detailInfo.article_id}/>
            }}
            style={{ flex: 1 }}
            ListHeaderComponent={<View style={{flex:1}}>
              <SwiperView images={detailInfo.images}/>
              {/* <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>标题</Text> */}
              <Text style={styles.des}>{detailInfo.content}</Text>
              <View style={styles.line}/>
              <View style={styles.commonTitleVieew}>
                <Text style={styles.commonTitle}>{t('total')}</Text>
                <Text style={styles.commonTitleMain}>{commentList.length}</Text>
                <Text style={styles.commonTitle}>{t('Comment')}</Text>
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
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
            }
          />
          <DownInfo
            is_like={detailInfo.is_like}
            is_collect={detailInfo.is_collect}
            article_id={detailInfo.article_id}
            onCollectChange={props.route.params.onCollectChange}
            onCommonChange={onCommonChange}/>
        </SafeAreaView>
        <SafeAreaView style={{flex:0,backgroundColor:Colors.white}}></SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

function DownInfo({is_collect,article_id,is_like,onCollectChange,onCommonChange}:any){
  const [isCollect,setIsCollect] = useState(false)
  const [articleId,setArticleId] = useState('')
  const [isLike,setIsLike] = useState(false)


  const [rightWidth,setRightWidth] = useState(186)
  const rightWidthAnim = useRef(new Animated.Value(0)).current;
  const userInfo = useUserInfo()
  useEffect(()=>{
    setIsCollect(is_collect)
  },[is_collect])
  useEffect(()=>{
    setArticleId(article_id)
  },[article_id])
  useEffect(()=>{
    setIsLike(is_like)
  },[is_like])

  function onFocus(){
    // LayoutAnimation.configureNext({
    //   duration:500,
    //   create:{
    //     delay:250,
    //     type:LayoutAnimation.Types.spring,
    //   },
    //   update:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   },
    //   delete:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   }
    // })
    // Animated.timing(rightWidthAnim, {
    //   toValue: SCREEN_WIDTH,
    //   duration:2000,
    //   useNativeDriver: true,
    // }).start(()=>{
     
    // })
    // LayoutAnimation.linear()
    // setRightWidth(0)
    // setRightWidth(0)
    setRightWidth(0)
    // setTimeout(() => {
    //   downRightRef.current.transitionTo({width:0})
    // }, 2000);
  }
  function onBlur(){
    setRightWidth(186)

    // setTimeout(() => {
    //   downRightRef.current.transitionTo({width:186})
    // }, 2000);
    // Animated.timing(rightWidthAnim, {
    //   toValue: 0,
    //   duration:2000,
    //   useNativeDriver: true,
    // }).start(()=>{
     
    // })
    // LayoutAnimation.linear()
    // setRightWidth(186)
    // LayoutAnimation.configureNext({
    //   duration:500,
    //   create:{
    //     delay:250,
    //     type:LayoutAnimation.Types.spring,
    //   },
    //   update:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   },
    //   delete:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   }})
    // setRightWidth(186)
  }

  const downRightRef = useRef<any>()
  const downLeftRef = useRef<any>()
  const inputRef = useRef<any>()

  function onCommon(){
    // inputRef && inputRef.current && inputRef.current.focus()
    inputRef.current.onFocus()
  }
  function onCollect(){
    if (!articleId)return
    HTTPS.post(isCollect ? ARTICLE_UNCOLLECT : ARTICLE_COLLECT,{
      "token":userInfo.token,
      article_id:articleId
    }).then((result:any)=>{
      setIsCollect(!isCollect)
      onCollectChange && onCollectChange(!isCollect)
    }).finally(()=>{
    })
  }
  function onLike(){
    if (!articleId)return
    HTTPS.post(isLike ? ARTICLE_UNLIKE : ARTICLE_LIKE,{
      "token":userInfo.token,
      article_id:articleId
    }).then((result:any)=>{
      setIsLike(!isLike)
    }).finally(()=>{
    })
  }

  function onSubmitEditing(e:any){
    console.log('====',replayInfo)

    if(!e.nativeEvent.text)return
    if (replayInfo.comment_id){
      HTTPS.post(ARTICLE_COOMMENT_REPLY,{
        "token":userInfo.token,
        article_id:articleId,
        content:e.nativeEvent.text,
        reply_id:replayInfo.comment_id,
        first_reply_id:replayInfo.comment_id
      }).then((result:any)=>{
        onCommonChange && onCommonChange()
        inputRef.current.clear()
        setReplayInfo({})
      }).finally(()=>{
      })
    }else {
      HTTPS.post(ARTICLE_COMMENT_PUBLISH,{
        "token":userInfo.token,
        article_id:articleId,
        content:e.nativeEvent.text
      }).then((result:any)=>{
        onCommonChange && onCommonChange()
        inputRef.current.clear()
      }).finally(()=>{
      })
    }
  }
  const [replayInfo,setReplayInfo] = useState<any>({})
  useEffect(()=>{
    const listener = DeviceEventEmitter.addListener('replay',(item:any)=>{
      inputRef.current.onFocus()
      setReplayInfo(item)
    })
    return ()=>{
      listener && listener.remove()
    }
  },[])
  const {t} = useTranslationLanguage()

  return <View style={[styles.downView]}>
    <View style={styles.downViewCon}>
      <Animatable.View ref={downLeftRef} style={[styles.comInputView]}>
        <Image style={styles.downComIcon} source={comicontIcon}/>
        <Text style={styles.replyTitle}>{replayInfo.author?.nickname ? t('reply') + replayInfo.author?.nickname : ''}</Text>
        <CustomTextInput
          ref={inputRef}
          style={{height:'100%',flex:1}}
          inputProps={{
            multiline:false,
            numberOfLines:1,
            style:{color:Colors.black},
            onFocus:onFocus,
            onBlur:onBlur,
            returnKeyLabel:t('send'),
            returnKeyType:'send',
            onSubmitEditing:onSubmitEditing
          }}
        />
      </Animatable.View>
      <Animatable.View ref={downRightRef} style={[styles.downRight,{width:rightWidth}]}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPressIn={onLike}>
          <Image style={styles.downIcon} source={isLike ? zaniconIcon : likeiconIcon} resizeMode='contain'/>
          <Text style={styles.downRightTitle}>{t('like')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPressIn={onCollect}>
          <Image style={styles.downIcon} source={isCollect ? stariconSIcon : stariconIcon}/>
          <Text style={styles.downRightTitle}>{t('collect')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPressIn={onCommon}>
          <Image style={styles.downIcon} source={comiconIcon}/>
          <Text style={styles.downRightTitle}>{t('Comment')}</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  </View>
}
function CommonItem({item,index,articleId,onCommonChange}:any){
  console.log('item',item)
  const userInfo = useUserInfo()

  function onLikeCommon(){
    if (!item.is_up){
      HTTPS.post(ARTICLE_COOMMENT_UP,{
        "token":userInfo.token,
        article_comment_id:item.comment_id
      }).then((result:any)=>{
        onCommonChange && onCommonChange()
      }).finally(()=>{
      })
    }
  }
  function onReplay(){
    DeviceEventEmitter.emit('replay',item)
  }
  const {t} = useTranslationLanguage()

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
          <TouchableOpacity onPressIn={onReplay}>
            <Text style={styles.comReplay}>{t('reply')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.comFocusView}>
        <TouchableOpacity style={styles.comFocusButton} onPress={onLikeCommon}>
          <Image style={styles.collectIcon} source={item.is_up ? zaniconIcon : likeiconIcon}/>
        </TouchableOpacity>
        <Text style={styles.collectTitle}>{item.up_count}</Text>
      </View>
    </View>

    {
      item.replyList.map((item:any,index:number)=>{
        return <View style={styles.replayView} key={index+'replaycom'}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={styles.collectTitleCol}>{item.reply_author.nickname}</Text>
            <Text style={styles.collectTitle}>{t('Replied')}</Text>
            <Text style={styles.collectTitleCol}>{item.author.nickname}： </Text>
          </View>
          <Text style={styles.collectTitle}>
            {item.content}
          </Text>
          <View style={styles.comRelayButton}>
            <Text style={styles.comDay}>{formatTime(item.created_at)}</Text>
            <TouchableOpacity onPressIn={onReplay}>
              <Text style={styles.comReplay}>{t('reply')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      })
    }

    <View style={styles.comLine}/>
  </View>
}
function FocusButton({is_follow,user_id,onFocusChange}:any){
  const userInfo = useUserInfo()
  const [focus,setFocus] = useState(false)
  const [uid,setUid] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    setFocus(is_follow)
  },[is_follow])
  useEffect(()=>{
    setUid(user_id)
  },[user_id])

  function onFocus(){
    if (isLoading || !uid){
      return
    }
    setIsLoading(true)
    HTTPS.post(focus ? USER_UNFOLLOW : USER_FOLLOW,{
      "token":userInfo.token,
      "to_uid":uid,
    }).then((result:any)=>{
      setFocus(!focus)
      onFocusChange && onFocusChange()
    }).finally(()=>{
      setIsLoading(false)
    })
  }
  return <TouchableOpacity style={[styles.focusButton,focus && styles.focusButtoned]} onPressIn={onFocus}>
    <Text style={[styles.focusTitle,focus && styles.focusTitleed]}>{focus ? '已关注' : '关注'}</Text>
  </TouchableOpacity>
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
          key={item}
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
