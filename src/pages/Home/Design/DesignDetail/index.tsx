
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import { styles } from './styles'
import { show, hidden } from '@/components/CoverModal'
import * as HTTPS from '@/api/axios'
import { DESIGN_CIRCLE_CLOTH_DETAIL,DESIGN_CIRCLE_CLOTH_COLLECT,DESIGN_CIRCLE_CLOTH_UNCOLLECT } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { Image as ExpoImage } from 'expo-image';
import { BLUR_HASH, SCREEN_WIDTH } from '@/utils';
import { savePicture } from '@/utils/common';
import {CacheManager, CachedImage} from '@georstat/react-native-image-cache'
import ImagePlaceholder from '@/components/ImagePlaceholder';
import Carousel from 'react-native-reanimated-carousel';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const CollectIcon = require('@/assets/images/unlike.png')
const CollectSIcon = require('@/assets/images/like.png')

const shareIcon = require('@/assets/images/share.png')
const downbgIcon = require('@/assets/images/downbg.png')
const hdIcon = require('@/assets/images/hd.png')
const model_left_bgIcon = require('@/assets/images/model_left_bg.png')
const model_right_bgIcon = require('@/assets/images/model_right_bg.png')
const spebgIcon = require('@/assets/images/spebg.png')
const download_nIcon = require('@/assets/images/download_n.png')
const share_nIcon = require('@/assets/images/share_n.png')


function DesignDetail(props:any): JSX.Element {
  const [showBuy,setShowBuy] = useState(false)
  const [scrollEnabled,setScrollEnabled] = useState(true)
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useUserInfo()
  const [clothDetail,setClothDetail] = useState<any>({})

  useEffect(()=>{
    HTTPS.post(DESIGN_CIRCLE_CLOTH_DETAIL,{
      "token":userInfo.token,
      cloth_id:props.route.params.id
    }).then((res:any)=>{
      setClothDetail(res.design_circle_cloth_detail)
    }).finally(()=>{

    })
  },[])

  function onBack(){
    props.navigation.goBack()
  }
  function onCollect(){
    HTTPS.post(clothDetail.is_collect ?DESIGN_CIRCLE_CLOTH_UNCOLLECT : DESIGN_CIRCLE_CLOTH_COLLECT,{
      "token":userInfo.token,
      "cloth_id":clothDetail.cloth_id,
    }).then((result:any)=>{
      setClothDetail({
        ...clothDetail,
        is_collect:!clothDetail.is_collect
      })
    }).finally(()=>{
    })


  }
  function onShare(){
    const url = HTTPS.getImageUrl(clothDetail.image)
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


  function onShowDown(){
    console.log('----')
    show(<DownImage image={clothDetail.image}/>)
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
                <Image style={styles.collectIcon} source={clothDetail.is_collect ? CollectSIcon : CollectIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
                <Image style={styles.backIcon} source={shareIcon}/>
              </TouchableOpacity>
            </View>
          </Animated.View>
        <ScrollView style={{flex:1}}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}}
          ],{
            useNativeDriver:false
          })}
          >
          
          <SwiperView images={clothDetail.images} name={clothDetail.name}/>


          <DetailInfo/>
        </ScrollView>
        <View style={styles.downView}>
          <TouchableOpacity style={[styles.downViewItem,showBuy && styles.downViewItemSel]} onPressIn={onShowDown}>
            <Image style={styles.downIcon} source={downbgIcon}/>
            <Text style={[styles.downTitle, showBuy && styles.downTitleSel]}>下载图片</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.downViewItem,styles.downViewItemRight]}>
            <Image style={styles.downIcon} source={hdIcon}/>
            <Text style={styles.downTitle}>下载3D文件</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function DetailInfo(){
  // model_right_bgIcon model_left_bgIcon
  const [selectIndex,setSelectIndex] = useState(0)
  return <View style={styles.detailInfo}>
    <ImageBackground resizeMode='cover' source={selectIndex == 0 ? model_right_bgIcon : model_left_bgIcon} style={styles.detailTopBg}>
      <TouchableOpacity style={selectIndex == 0 ? styles.detailLeftButton : styles.detailLeftButton} onPressIn={()=>setSelectIndex(0)}>
        <Text style={selectIndex == 0 ? styles.detailTopTitle : styles.detailTopTitledis}>模型介绍</Text>
      </TouchableOpacity>
      <TouchableOpacity style={selectIndex != 0 ? styles.detailRightButton : styles.detailRightButton} onPressIn={()=>setSelectIndex(1)}>
        <Text style={selectIndex != 0 ? styles.detailTopTitle : styles.detailTopTitledis}>制作公司介绍</Text>
      </TouchableOpacity>
    </ImageBackground>
    <WebView
      source={{ uri: 'https://www.baidu.com' }}
      style={styles.webDetailView}
    />
  </View>
}
function DownImage({image}:any){
  function onDownload(){
    if (image){
      savePicture(HTTPS.getImageUrl(image))
    }
    hidden()
  }
  function onShare(){
    const url = HTTPS.getImageUrl(image)
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
    hidden()
  }
  return <View style={styles.downImageView}>
    {/* <ExpoImage
      style={styles.downImageContent}
      source={HTTPS.getImageUrl(image)}
      placeholder={BLUR_HASH}
      contentFit="cover"
      transition={200}
    /> */}
    <CachedImage
        sourceAnimationDuration={100}
        thumbnailAnimationDuration={100}
        resizeMode='cover'
        source={HTTPS.getImageUrl(image)}
        style={styles.downImageContent}
        blurRadius={30}
        loadingImageComponent={ImagePlaceholder}
        />
    <View style={styles.downImageLineView}>
      <View style={styles.downlinecir}/>
      <Image style={styles.downImageLine} source={spebgIcon}/>
      <View style={styles.downlinercir}/>
    </View>
    <View style={styles.downButtonView}>
      <TouchableOpacity style={styles.downImagebutton} onPressIn={onDownload}>
        <Image style={styles.downImagebuttonicon} source={download_nIcon}/>
        <Text style={styles.downImagebuttontitle}>保存图片</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.downImagebutton,styles.downImagebuttonSpa]} onPressIn={onShare}>
        <Image style={styles.downImagebuttonicon} source={share_nIcon}/>
        <Text style={styles.downImagebuttontitle}>分享链接</Text>
      </TouchableOpacity>
    </View>
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

//clothDetail.name
function TDModalView(name:string){
  return <View style={styles.modalView}>
    <WebView
      // source={{uri:'https://www.baidu.com'}}
      source={{ uri: Platform.OS == 'ios' ? 'https://nextjs-3d-modal-j2fc-git-main-chjwrr.vercel.app/' : 'http://test.yingxiong123.top/' }}
      style={styles.webView}
      // onTouchStart={()=>{
      //   setScrollEnabled(false)
      // }}
      // onTouchCancel={()=>{
      //   setScrollEnabled(true)
      // }}
      // onTouchEnd={()=>{
      //   setScrollEnabled(true)
      // }}
    />
    <Text style={styles.name}>{name}</Text>
  </View>
}

export default DesignDetail;
