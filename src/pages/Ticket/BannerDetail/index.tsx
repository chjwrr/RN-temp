
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
import { BLUR_HASH, PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import WaterfallFlow from 'react-native-waterfall-flow'
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { PROJECT_DETAIL, MASTER_UNFOLLOW, MASTER_FOLLOW } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { Image as ExpoImage } from 'expo-image';
import { formatTime } from '@/utils/common';



const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_w.png')
const CollectIcon = require('@/assets/images/collwhi.png')
const shareIcon = require('@/assets/images/share_w.png')
const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_1.png')
const ticketavatar = require('@/assets/images/ticketavatar.png')
const numbg = require('@/assets/images/numbg.png')
const tabButtonBg = require('@/assets/images/buttonbg.png')
const downbg = require('@/assets/images/downbg.png')


function Ticket(props:any): JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useUserInfo()
  const [projectDetail,setProjectDetail] = useState<any>({})
  const [isFocus,setIsFocus] = useState(false)

  useEffect(()=>{
    HTTPS.post(PROJECT_DETAIL,{
      "token":userInfo.token,
      "project_id":props.route.params.project_id,
    })
    .then((result:any)=>{
      setProjectDetail(result.project_detail)
      setIsFocus(result.project_detail.master.is_follow)
    })
    .finally(()=>{})
  },[])

  function onBack(){
    props.navigation.goBack()
  }
  function onBuy(){
    props.navigation.navigate('TicketBannerDetailList',{
      project_id:props.route.params.project_id,
      image:projectDetail.image,
      avatar:projectDetail.master?.avatar,
      pro_name:projectDetail.name,
      name:projectDetail.master?.name
    })
  }

  function onFocus(){
    HTTPS.post(isFocus ? MASTER_UNFOLLOW : MASTER_FOLLOW,{
      "token":userInfo.token,
      master_id:projectDetail.master?.master_id
    }).then((result:any)=>{
      setIsFocus(!isFocus)
    }).finally(()=>{
    })
  }

  function onShare(){
    const url = HTTPS.getImageUrl(projectDetail.image)
    const title = projectDetail.name;
    const message = projectDetail.intro;
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
      <ExpoImage
        style={styles.topImage}
        source={HTTPS.getImageUrl(projectDetail.image)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>
      <LinearGradient colors={['transparent','#000']} style={styles.bottomOp}/>
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
      {/* <SafeAreaView style={{flex:1}}> */}
      
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={styles.downContent}>
            <View style={styles.avatatView}>
              <ExpoImage
                style={styles.avatar}
                source={HTTPS.getImageUrl(projectDetail.master?.avatar)}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
            </View>
            <View style={styles.downView}>
              <Text style={styles.title}>{projectDetail.name}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.by}>BY：</Text>
                <Text style={styles.byath}>{projectDetail.master?.name}</Text>
              </View>
              <View style={styles.numView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{alignItems:'center'}}>
                    <Text style={styles.numTitle}>{projectDetail.ticket_count}</Text>
                    <Text style={styles.numDes}>发行总量</Text>
                  </View>
                  {/* <View style={[{alignItems:'center'},{marginLeft:20}]}>
                    <Text style={styles.numTitle}>0</Text>
                    <Text style={styles.numDes}>收藏人数</Text>
                  </View> */}
                </View>
                <TouchableOpacity onPressIn={onFocus}>
                  <ImageBackground source={numbg} style={styles.numbg}>
                    <Text style={styles.focus}>{isFocus ? '取消关注' : '点击关注'}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <Text style={styles.des}>
                {projectDetail.intro}
              </Text>
              <Text style={styles.time}>{formatTime(projectDetail.created_at)}</Text>
            </View>
          </View>
          <WebView
          source={{uri:'https://www.baidu.com'}}
          style={styles.webView}
        />
        </ScrollView>

        <TouchableOpacity style={styles.buyBtn} onPressIn={onBuy}>
          <ImageBackground style={styles.tabButtonBg} source={tabButtonBg}>
            <Text style={styles.buy}>点击购买</Text>
            <Image source={downbg} style={styles.buyicon}/>
          </ImageBackground>
        </TouchableOpacity>
      {/* </SafeAreaView> */}
    </View>
  );
}

export default Ticket;
