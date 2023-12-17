
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
import { BLUR_HASH, PAGE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { TICKET_LIST, TICKET_LIST_DETAIL,ORDER_CREATE } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { Image as ExpoImage } from 'expo-image';
import LoadingButton from '@/components/LoadingButton';
import { showMessage } from 'react-native-flash-message';
import { formatID, isImage } from '@/utils/common';



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
  const userInfo = useUserInfo()
  const [detailInfo,setDetailInfo] = useState<any>({})
  const [project_ticket_count,setProject_ticket_count] = useState(0)

  useEffect(()=>{
    HTTPS.post(TICKET_LIST_DETAIL,{
      "token":userInfo.token,
      ticket_id:props.route.params.ticket_id
    }).then((result:any)=>{
      setDetailInfo(result.ticket_detail)
      setProject_ticket_count(result.project_ticket_count)
    }).finally(()=>{
    })
  },[])


  function onBack(){
    props.navigation.goBack()
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
    const url = HTTPS.getImageUrl(detailInfo.image)
    const title = detailInfo.name;
    const message = detailInfo.intro;
    const options = Platform.select({
      default: {
        title,
        subject: title,
        message: `${message} ${url}`,
      },
    });
    Share.open(options);
  }
  const [isCreat,setIsCreat] = useState(false)
  function onCreatOrder(){
    setIsCreat(true)
    HTTPS.post(ORDER_CREATE,{
      "token":userInfo.token,
      ticket_id_list:[detailInfo.ticket_id]
    }).then((result:any)=>{
      onBack()
      showMessage({
        message: "订单创建成功，请在我的订单中查看",
        type: "success",
      });
    }).finally(()=>{
      setIsCreat(false)
      onHiddenBuy()
    })
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
          {/* <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onCollect}>
            <Image style={styles.collectIcon} source={CollectIcon}/>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={shareIcon}/>
          </TouchableOpacity>
        </View>
      </Animated.View>  
      <ScrollView contentContainerStyle={{flexGrow:1,alignItems:'center'}}>
        <ImageBackground source={topbg} style={styles.topbg} resizeMode='cover'>
          <ExpoImage
            style={styles.topItemImage}
            source={{uri:HTTPS.getImageUrl(detailInfo.image)}} 
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.priceView}>
            <Text style={styles.priceuni}>￥</Text>
            <Text style={styles.price}>{detailInfo.price}</Text>
          </View>
        </ImageBackground>
        {/* <View style={styles.infoView}> */}
        <View style={{position:'relative'}}>
          <View style={styles.limitView}>
            <ImageBackground style={styles.limmitbg} source={limmitBg}>
              <Text style={styles.limmittitle}>限量:{project_ticket_count}份</Text>
            </ImageBackground>
          </View>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(140,105,255,0.2)', 'rgba(0,102,255,0.2)']} style={styles.infoView}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text style={styles.name}>{detailInfo.project_name}</Text>
              <Text style={styles.name}>ID:{formatID(detailInfo.project_id)}{formatID(detailInfo.ticket_id)}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <ExpoImage
                style={styles.avatarsmal}
                source={{uri:HTTPS.getImageUrl(props.route.params.avatar)}} 
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
              <Text style={styles.avatarName}>{props.route.params.name}</Text>
            </View>
          </LinearGradient>
        </View>
       <View style={styles.detailView}>
        {
          detailInfo.intro && JSON.parse(detailInfo.intro).map((item:string,index:number)=>{
            if (isImage(item)){
              return <DetailImage key={item} imageName={item}/>
            }
            return <Text key={item} style={styles.detailName}>{item}</Text>
          })
        }
       </View>
      </ScrollView>
      <TouchableOpacity style={styles.buyBtn} onPressIn={onShowBuy}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.buyBtn}>
          <Text style={styles.buy}>立即购买</Text>
          <Image source={downbg} style={styles.buyicon}/>
          </LinearGradient>
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
            <Text style={styles.payPrice}>{detailInfo.price}</Text>
          </View>
          <LoadingButton isLoading={isCreat} onPressIn={onCreatOrder}>
            <ImageBackground style={styles.payButton} source={paybtnbg}>
              <Text style={styles.payButtonTitle}>提交订单</Text>
            </ImageBackground>
          </LoadingButton>
        </View>

      </Animated.View>
      <Animated.View style={[styles.bgModal,{
        opacity:fadeAnim,
        top:posButtonBottom
      }]} onTouchStart={onShowBuy}/>
    </View>
  );
}
function DetailImage({imageName}:any){
  const [imageHeight,setImageHeight] = useState(500)
  return <ExpoImage
    style={[styles.detailImage,{
      height:imageHeight
    }]}
    source={HTTPS.getImageUrl(imageName)}
    placeholder={BLUR_HASH}
    contentFit="cover"
    transition={200}
    onLoad={(e:any)=>{
      setImageHeight((SCREEN_WIDTH - 32) * e.source.height / e.source.width)
    }}
  />
}
export default Ticket;
