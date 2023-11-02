
import React, { useRef, useState } from 'react';
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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import * as _ from 'lodash'

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const CollectIcon = require('@/assets/images/collectICON.png')
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
  const id = props.route.params.id
  const [showBuy,setShowBuy] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current;

  function onBack(){
    props.navigation.goBack()
  }
  function onCollect(){

  }
  function onShare(){
    const url = 'https://awesome.contents.com/';
    const title = 'Awesome Contents';
    const message = 'Please check this out.';
    const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
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

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <Animated.View style={[styles.navigationView,{
          backgroundColor:scrollY.interpolate({
            inputRange: [0,88],
            outputRange: ['transparent','#fff'],
          })
        }]}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Image style={styles.backIcon} source={BackIcon}/>
            </TouchableOpacity>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPress={onCollect}>
                <Image style={styles.collectIcon} source={CollectIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPress={onShare}>
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
          {id == 0 ? <TDModalView/> : <SwiperView/>}
          <View style={styles.detailView}>
            <ShopInfo/>
            <WebView
              source={{ uri: 'https://www.baidu.com' }}
              style={styles.webDetailView}
            />
          </View>
        </ScrollView>
        <View style={styles.downView}>
          <TouchableOpacity style={[styles.downViewItem,showBuy && styles.downViewItemSel]} onPress={onShowBuy}>
            <Image style={styles.downIcon} source={downbgIcon}/>
            <Text style={[styles.downTitle, showBuy && styles.downTitleSel]}>服饰购买</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.downViewItem,styles.downViewItemRight]}>
            <Image style={styles.downIcon} source={hdIcon}/>
            <Text style={styles.downTitle}>联名合作</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.showBuyView,{
            transform: [{translateY: bottomAnim}]
          }]}>
            <View style={styles.showBuyLeftView}>
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
            <BuyModalRight/>
        </Animated.View>
        <Animated.View style={[styles.bgModal,{
          opacity:fadeAnim,
          top:posButtonBottom
        }]} onTouchStart={onShowBuy}/>
      </SafeAreaView>
    </ImageBackground>
  );
}
function BuyModalRight(){
  const [collect,setCollect] = useState(false)
  function onCollect(){
    setCollect(!collect)
  }
  return <View style={styles.showBuyRightView}>
    <Image style={styles.showBuyRightDownBg} source={buybgIcon}/>
    <Image style={styles.showBuyRightIcon} source={buytopiconIcon}/>
    <Text style={styles.showBuyRightName} numberOfLines={1} ellipsizeMode='tail'>店铺名称</Text>
    <TouchableOpacity onPress={onCollect}>
      <Image style={styles.showBuyRightDownIcon} source={collect ? collectedshopIcon : collectshopIcon}/>
    </TouchableOpacity>
  </View>
}
function ShopInfo(){
  const [focus,setFocus] = useState(false)
  function onFocus(){
    setFocus(!focus)
  }
  return <View style={styles.shopView}>
    <View style={{flexDirection:'row'}}>
      <View style={styles.shopIcon}/>
      <View>
        <Text style={styles.shopName}>店铺名称</Text>
        <Text style={styles.shopDes}>1.5万+收藏</Text>
      </View>
    </View>
    <TouchableOpacity style={[styles.focusdis,focus && styles.focusSel]} onPress={onFocus}>
      <Text style={[styles.shopFocus,focus && styles.shopFocussel]}>{focus ? '已关注' : '+ 关注'}</Text>
    </TouchableOpacity>
  </View>
}
function SwiperView(){
  const [currentIndex,setCurrentIndex] = useState(0)
  const data:any[] = [1,2,3,4,5,6]
  return <View style={styles.swiperView}>
    <Carousel
      loop
      width={SCREEN_WIDTH - 32}
      height={SCREEN_WIDTH + 20}
      // autoPlay={true}
      data={data}
      // scrollAnimationDuration={3000}
      onSnapToItem={(index) => setCurrentIndex(index)}
      // mode="parallax"
      // modeConfig={{
      //   parallaxScrollingScale: 0.9,
      //   parallaxScrollingOffset: 40,
      // }}
      renderItem={({ item,index }) => (
        <View style={styles.swiperTopView}>
          <Text>{index}</Text>
        </View>
      )}
      />
    <View style={styles.sliderView}>
      <Text style={styles.sliderTitle}>{currentIndex + 1}/{data.length}</Text>
    </View>
    <Text style={styles.name}>服饰名字</Text>
  </View>
}
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
