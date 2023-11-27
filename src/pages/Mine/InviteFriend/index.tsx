
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
  TouchableWithoutFeedback,
  TextInput
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
const arrowr = require('@/assets/images/back_b_r.png')
const share = require('@/assets/images/share.png')
const downbg = require('@/assets/images/invitebg.png')



function RecommendDetail(props:any): JSX.Element {
  const userInfo = useUserInfo()
  function onBack(){
    props.navigation.goBack()
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <View style={[styles.navigationView,{
        }]}>
          <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
            <Image style={styles.backIcon} source={BackIcon}/>
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>邀请好友</Text>
          </View>
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onBack}>
            <Image style={styles.backIcon} source={share}/>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center'}}>
          <ImageBackground style={styles.downView} source={downbg}>
            <Text style={styles.downTitle}>我的邀请码</Text>
            <View style={{alignItems:'center'}}>
              <View style={styles.code}/>
              <Text style={styles.downDes}>扫码下载我们的APP</Text>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
