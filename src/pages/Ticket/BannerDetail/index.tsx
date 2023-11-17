
import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Platform,
  ImageBackground,
  RefreshControl,
  Text,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';

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
      <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>
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
      <SafeAreaView style={{flex:1}}>
        <ScrollView contentContainerStyle={{flex:1}}>
          <Image style={styles.topImage} source={ticket_pro_ban_1}/>
          <LinearGradient colors={['transparent','#000']} style={styles.bottomOp}/>

          <View style={styles.downContent}>
            <View style={styles.avatatView}>
              <Image source={ticketavatar} style={styles.avatar}/>
            </View>
            <View style={styles.downView}>
              <Text style={styles.title}>破妄明心</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.by}>BY：</Text>
                <Text style={styles.byath}>KOL名称</Text>
              </View>
              <View style={styles.numView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{alignItems:'center'}}>
                    <Text style={styles.numTitle}>200</Text>
                    <Text style={styles.numDes}>发行总量</Text>
                  </View>
                  <View style={[{alignItems:'center'},{marginLeft:20}]}>
                    <Text style={styles.numTitle}>520</Text>
                    <Text style={styles.numDes}>收藏人数</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <ImageBackground source={numbg} style={styles.numbg}>
                    <Text style={styles.focus}>点击关注</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <Text style={styles.des}>
                项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍
              </Text>
              <Text style={styles.time}>2023-11-15</Text>
              <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',width:'100%'}}>
                <ImageBackground style={styles.tabButtonBg} source={tabButtonBg}>
                  <Text style={styles.buy}>点击购买</Text>
                  <Image source={downbg} style={styles.buyicon}/>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Ticket;
