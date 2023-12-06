
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import * as _ from 'lodash'
import {CacheManager, CachedImage} from '@georstat/react-native-image-cache'
import ImagePlaceholder from '@/components/ImagePlaceholder';
import * as HTTPS from '@/api/axios'
import { Image as ExpoImage } from 'expo-image';
import { MERCHANT_CLOTH_DETAIL, MERCHANT_FOLLOW, MERCHANT_UNFOLLOW,  MERCHANT_CLOTH_UNCOLLECT , MERCHANT_CLOTH_COLLECT } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { savePicture } from '@/utils/common';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const CollectIcon = require('@/assets/images/unlike.png')
const CollectSIcon = require('@/assets/images/like.png')
const shareIcon = require('@/assets/images/share.png')
const downbgIcon = require('@/assets/images/downbg.png')
const hdIcon = require('@/assets/images/hd.png')
const modalLineIcon = require('@/assets/images/tdbg.png')
const buytopiconIcon = require('@/assets/images/buytopicon.png')
const buylineIcon = require('@/assets/images/buyline.png')
const buybgIcon = require('@/assets/images/buybg.png')
const collectshopIcon = require('@/assets/images/collectshop.png')
const collectedshopIcon = require('@/assets/images/collectedshop.png')
const tdIcon = require('@/assets/images/td.png')
const tmIcon = require('@/assets/images/tm.png')
const jdIcon = require('@/assets/images/jd.png')


function RecommendDetail(props:any): JSX.Element {
  const [showBuy,setShowBuy] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useUserInfo()
  const [merchantClothInfo,setMerchantClothInfo] = useState<any>({})
  useEffect(()=>{
    HTTPS.post(MERCHANT_CLOTH_DETAIL,{
      "token":userInfo.token,
      cloth_id:props.route.params.id
    }).then((res:any)=>{
      setMerchantClothInfo(res.merchant_cloth_detail)
    }).finally(()=>{

    })
    return 
  },[])


  function onBack(){
    props.navigation.goBack()
  }
  function onCollect(){
    HTTPS.post(merchantClothInfo.is_collect ? MERCHANT_CLOTH_UNCOLLECT : MERCHANT_CLOTH_COLLECT,{
      "token":userInfo.token,
      "cloth_id":merchantClothInfo.cloth_id,
    }).then((result:any)=>{
      setMerchantClothInfo({
        ...merchantClothInfo,
        is_collect:!merchantClothInfo.is_collect
      })
      props.route.params.onCollectChange && props.route.params.onCollectChange(!merchantClothInfo.is_collect)
    }).finally(()=>{
    })
  }
  function onShare(){
    const url = HTTPS.getImageUrl(merchantClothInfo.image)
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

  const bottomAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [posButtonBottom,setPosButtonBottom] = useState(SCREEN_HEIGHT)
  const [isAnimated,setIsAnimated] = useState(false)


  function onShowBuy(){
    if (isAnimated){
      return
    }
    setShowBuy(!showBuy)
    setIsAnimated(true)
    if (showBuy){
      Animated.parallel([
        Animated.timing(bottomAnim, {
          toValue: 0,
          duration:200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration:200,
          useNativeDriver: true,
        })
      ]).start(()=>{
        setPosButtonBottom(SCREEN_HEIGHT)
        setTimeout(() => {
          setIsAnimated(false)
        }, 200);
      })
    }else {
      setPosButtonBottom(0)
      Animated.parallel([
        Animated.timing(bottomAnim, {
          toValue: -220,
          duration:200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration:200,
          useNativeDriver: true,
        })
      ]).start(()=>{
        setTimeout(() => {
          setIsAnimated(false)
        }, 200);
      })
    }
  }

  function onJoin(){
    // if (merchantClothInfo.image){
    //   savePicture(HTTPS.getImageUrl(merchantClothInfo.image))
    // }
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <Animated.View style={[styles.navigationView,{
          backgroundColor:scrollY.interpolate({
            inputRange: [0,88],
            outputRange: ['transparent','#fff'],
          })
        }]}>
            <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
              <Image style={styles.backIcon} source={BackIcon}/>
            </TouchableOpacity>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onCollect}>
                <Image style={styles.collectIcon} source={merchantClothInfo.is_collect ? CollectSIcon : CollectIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
                <Image style={styles.backIcon} source={shareIcon}/>
              </TouchableOpacity>
            </View>
          </Animated.View>
        <ScrollView
          style={{flex:1}}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}}
          ],{
            useNativeDriver:false
          })}
        >
          {/* {id == 0 ? <TDModalView/> : <SwiperView/>} */}
          <SwiperView images={merchantClothInfo.images} name={merchantClothInfo.name}/>
          <View style={styles.detailView}>
            <ShopInfo info={merchantClothInfo} onChange={(info:any)=>{
              setMerchantClothInfo(info)
            }}/>
            <WebView
              source={{ uri: 'https://www.baidu.com' }}
              style={styles.webDetailView}
            />
          </View>
        </ScrollView>
        <View style={styles.downView}>
          <TouchableOpacity style={[styles.downViewItem,showBuy && styles.downViewItemSel]} onPressIn={onShowBuy}>
            <Image style={styles.downIcon} source={downbgIcon}/>
            <Text style={[styles.downTitle, showBuy && styles.downTitleSel]}>服饰购买</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.downViewItem,styles.downViewItemRight]} onPressIn={onJoin}>
            <Image style={styles.downIcon} source={hdIcon}/>
            <Text style={styles.downTitle}>联名合作</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.showBuyView,{
            transform: [{translateY: bottomAnim}]
          }]}>
            <View style={styles.showBuyvLeftView}>
              <View style={styles.showBuyLeftSubView}>
                <Image style={styles.showBuyLeftIcon} source={tdIcon}/>
                <Text style={styles.showBuyLeftName}>淘宝链接</Text>
              </View>
              <View style={styles.showBuyLeftSubView}>
                <Image style={styles.showBuyLeftIcon} source={tmIcon}/>
                <Text style={styles.showBuyLeftName}>天猫链接</Text>
              </View>
              <View style={styles.showBuyLeftSubView}>
                <Image style={styles.showBuyLeftIcon} source={jdIcon}/>
                <Text style={styles.showBuyLeftName}>京东链接</Text>
              </View>
            </View>
            <Image style={styles.showBuyLine} source={buylineIcon}/>
            <BuyModalRight info={merchantClothInfo} onChange={(info:any)=>{
              setMerchantClothInfo(info)
            }}/>
        </Animated.View>
        <Animated.View style={[styles.bgModal,{
          opacity:fadeAnim,
          top:posButtonBottom
        }]} onTouchStart={onShowBuy}/>
      </SafeAreaView>
    </ImageBackground>
  );
}
function BuyModalRight({info,onChange}:any){
  const [focus,setFocus] = useState(false)
  useEffect(()=>{
    setFocus(info.merchant?.is_follow)
  },[info.merchant?.is_follow])
  const userInfo = useUserInfo()
  // 关注店铺
  function onFocus(){
    console.log('merchantClothInfo==',info)
    HTTPS.post(focus ? MERCHANT_UNFOLLOW : MERCHANT_FOLLOW,{
      "token":userInfo.token,
      "merchant_id":info.merchant?.merchant_id,
    }).then((result:any)=>{
      setFocus(!focus)
      let temp = {...info}
      temp.merchant.is_follow = !focus
      onChange(temp)
    }).finally(()=>{
    })
  }
  return <View style={styles.showBuyRightView}>
    <Image style={styles.showBuyRightDownBg} source={buybgIcon}/>
    <Image style={styles.showBuyRightIcon} source={buytopiconIcon}/>
    <Text style={styles.showBuyRightName} numberOfLines={1} ellipsizeMode='tail'>店铺名称</Text>
    <TouchableOpacity onPressIn={onFocus}>
      <Image style={styles.showBuyRightDownIcon} source={focus ? collectedshopIcon : collectshopIcon}/>
    </TouchableOpacity>
  </View>
}
function ShopInfo({info,onChange}:any){
  const [focus,setFocus] = useState(false)
  useEffect(()=>{
    setFocus(info.merchant?.is_follow)
  },[info.merchant?.is_follow])
  const userInfo = useUserInfo()
  // 关注店铺
  function onFocus(){
    console.log('merchantClothInfo==',info)
    HTTPS.post(focus ? MERCHANT_UNFOLLOW : MERCHANT_FOLLOW,{
      "token":userInfo.token,
      "merchant_id":info.merchant?.merchant_id,
    }).then((result:any)=>{
      setFocus(!focus)
      let temp = {...info}
      temp.merchant.is_follow = !focus
      onChange(temp)
    }).finally(()=>{
    })
  }

  return <View style={styles.shopView}>
    <View style={{flexDirection:'row'}}>
      {/* <View style={styles.shopIcon}/> */}
      <ExpoImage
          style={styles.shopIcon}
          source={HTTPS.getImageUrl(info.merchant?.logo)}
          placeholder={BLUR_HASH}
          contentFit="cover"
          transition={200}
        />
      <View>
        <Text style={styles.shopName}>{info.merchant?.name}</Text>
        <Text style={styles.shopDes}>{info.merchant?.follow_count}+关注</Text>
      </View>
    </View>
    <TouchableOpacity style={[styles.focusdis,focus && styles.focusSel]} onPressIn={onFocus}>
      <Text style={[styles.shopFocus,focus && styles.shopFocussel]}>{focus ? '已关注' : '+ 关注'}</Text>
    </TouchableOpacity>
  </View>
}
const SwiperView = memo(({images,name}:{images:any[],name:any})=>{
  const [imageSource,setImageSource] = useState<any>([])
  const [currentIndex,setCurrentIndex] = useState(0)

  useEffect(()=>{
    if (images){
      setImageSource(images)
    }
  },[images])

  return <View style={styles.swiperView}>
    <Carousel
      loop
      width={SCREEN_WIDTH - 32}
      height={SCREEN_WIDTH + 20}
      // autoPlay={true}
      data={imageSource}
      // scrollAnimationDuration={3000}
      onSnapToItem={(index:number) => setCurrentIndex(index)}
      // mode="parallax"
      // modeConfig={{
      //   parallaxScrollingScale: 0.9,
      //   parallaxScrollingOffset: 40,
      // }}
      renderItem={({ item,index }:any) => (
        // <ExpoImage
        //   style={styles.swiperTopView}
        //   source={HTTPS.getImageUrl(item)}
        //   placeholder={BLUR_HASH}
        //   contentFit="cover"
        //   transition={200}
        //   onLoad={(e:any)=>{
        //     console.log('eeee==',e)
        //   }}
        // />
        <CachedImage
        sourceAnimationDuration={100}
        thumbnailAnimationDuration={100}
        resizeMode='cover'
        source={HTTPS.getImageUrl(item)}
        style={styles.swiperTopView}
        blurRadius={30}
        loadingImageComponent={ImagePlaceholder}
        />
      )}
      />
    <View style={styles.sliderView}>
      <Text style={styles.sliderTitle}>{currentIndex + 1}/{imageSource.length}</Text>
    </View>
    <Text style={styles.name}>{name}</Text>
  </View>
},(pre:any,next:any)=>pre.images == next.images)
function TDModalView(){
  return <View style={styles.modalView}>
    <WebView
      source={{ uri: 'https://nextjs-3d-modal-j2fc-git-main-chjwrr.vercel.app/' }}
      style={styles.webView}
    />
    <Image style={styles.modalLine} source={modalLineIcon}/>
    <Text style={styles.name}>服饰名字</Text>
  </View>
}

export default RecommendDetail;
