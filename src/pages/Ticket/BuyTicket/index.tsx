
import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Platform,
  ImageBackground,
  Text,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { PAGE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import WaterfallFlow from 'react-native-waterfall-flow'
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { TICKET_LIST } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';



const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_w.png')
const CollectIcon = require('@/assets/images/collwhi.png')
const shareIcon = require('@/assets/images/share_w.png')
const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_1.png')
const ticketavatar = require('@/assets/images/ticketavatar.png')
const numbg = require('@/assets/images/numbg.png')
const tabButtonBg = require('@/assets/images/buttonbg.png')
const downbg = require('@/assets/images/downbg.png')
const back_b = require('@/assets/images/back_b.png')
const topbg = require('@/assets/images/tickbuytopbg.png')
const tick_icon_1 = require('@/assets/images/tick_icon_1.png')
const limmitBg = require('@/assets/images/limmitBg.png')

const uncheck = require('@/assets/images/uncheck.png')
const check = require('@/assets/images/check.png')
const paybtnbg = require('@/assets/images/paybtnbg.png')




function Ticket(props:any): JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;


  const bottomAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [posButtonBottom,setPosButtonBottom] = useState(SCREEN_HEIGHT)
  const [isAnimated,setIsAnimated] = useState(false)


  function onBack(){
    props.navigation.goBack()
  }

  function onCollect(){

  }


  function onShowBuy(){
    if (isAnimated){
      return
    }
    setPosButtonBottom(0)
    Animated.parallel([
      Animated.timing(bottomAnim, {
        toValue: -300,
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
  function onHiddenBuy(){
    console.log('onHiddenBuy')
    if (isAnimated){
      return
    }
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
  }

  const [payType,setPayType] = useState(0)
  function onChoosePay(index:number){
    setPayType(index)
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
  return (
    <View style={styles.main}>
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
            <Image style={styles.collectIcon} source={CollectIcon}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={shareIcon}/>
          </TouchableOpacity>
        </View>
      </Animated.View>  
      <ScrollView contentContainerStyle={{flexGrow:1,alignItems:'center'}}>

        <ImageBackground source={topbg} style={styles.topbg} resizeMode='cover'>
          <Image source={tick_icon_1} style={styles.topItemImage}/>
          <View style={styles.priceView}>
            <Text style={styles.priceuni}>￥</Text>
            <Text style={styles.price}>199</Text>
          </View>
        </ImageBackground>
        <View style={styles.infoView}>
          <ImageBackground style={styles.limmitbg} source={limmitBg}>
            <Text style={styles.limmittitle}>限量:200份</Text>
          </ImageBackground>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={styles.name}>项目名称</Text>
            <Text style={styles.name}>ID:000</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={styles.avatarsmal}/>
            <Text style={styles.avatarName}>名字</Text>
          </View>
        </View>
        <WebView
          source={{uri:'https://www.baidu.com'}}
          style={styles.webView}
        />
      </ScrollView>
      <TouchableOpacity style={styles.buyBtn} onPressIn={onShowBuy}>
        <ImageBackground style={styles.tabButtonBg} source={tabButtonBg}>
          <Text style={styles.buy}>立即购买</Text>
          <Image source={downbg} style={styles.buyicon}/>
        </ImageBackground>
      </TouchableOpacity>

      <Animated.View style={[styles.showBuyView,{
          transform: [{translateY: bottomAnim}]
        }]}>

        <TouchableOpacity onPressIn={onHiddenBuy} style={styles.back1Icon}>
          <Image style={styles.backIcon} source={back_b}/>
        </TouchableOpacity>
        <Text style={styles.buytitle}>确认订单</Text>
        <View style={styles.line}/>
        
        <View style={styles.payView}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={styles.payImage}/>
              <Text style={styles.payName}>支付宝</Text>
            </View>
            <TouchableOpacity onPressIn={()=>onChoosePay(0)}>
              <Image style={styles.checkicon} source={payType==0?check:uncheck}/>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={styles.payImage}/>
              <Text style={styles.payName}>微信</Text>
            </View>
            <TouchableOpacity onPressIn={()=>onChoosePay(1)}>
            <Image style={styles.checkicon} source={payType==1?check:uncheck}/>
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient colors={['transparent','transparent','rgba(0,0,0,0.05)']} style={styles.payButtonVietop}/>
        <View style={styles.payButtonVie}>
          <View style={{flexDirection:'row',alignItems:'flex-end'}}>
            <Text style={styles.payUnit}>￥</Text>
            <Text style={styles.payPrice}>199</Text>
          </View>
          <TouchableOpacity>
            <ImageBackground style={styles.payButton} source={paybtnbg}>
              <Text style={styles.payButtonTitle}>提交订单</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

      </Animated.View>
      <Animated.View style={[styles.bgModal,{
        opacity:fadeAnim,
        top:posButtonBottom
      }]} onTouchStart={onShowBuy}/>
    </View>
  );
}

export default Ticket;
