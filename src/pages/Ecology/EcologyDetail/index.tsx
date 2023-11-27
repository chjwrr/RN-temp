
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
import { PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
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





function Ticket(props:any): JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;

  function onBack(){
    props.navigation.goBack()
  }
  function onBuy(){
    
    props.navigation.navigate('TicketBannerDetailList')

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
  return (
    <View style={styles.main}>
      <Image style={styles.topImage} source={ticket_pro_ban_1}/>
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
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onCollect}>
            <Image style={styles.collectIcon} source={CollectIcon}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={shareIcon}/>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* <SafeAreaView style={{flex:1}}> */}
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={styles.downContent}>
            <View style={styles.downView}>
              <Text style={styles.title}>游戏名称</Text>
            </View>
          </View>
          <WebView
          source={{uri:'https://www.baidu.com'}}
          style={styles.webView}
        />
        </ScrollView>
        <TouchableOpacity onPressIn={onBuy}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.buyBtn}>
            <Text style={styles.buy}>进入游戏</Text>
          </LinearGradient>
        </TouchableOpacity>
    </View>
  );
}

export default Ticket;
