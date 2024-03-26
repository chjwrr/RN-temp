
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
import { MERCHANT_CLOTH_DETAIL, MERCHANT_FOLLOW, MERCHANT_UNFOLLOW,  MERCHANT_CLOTH_UNCOLLECT , MERCHANT_CLOTH_COLLECT, USER_LOGOUT } from '@/api/API';
import { saveUserInfo, useUserInfo } from '@/redux/userInfo';
import { savePicture } from '@/utils/common';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { changeLanguage } from '@/redux/setting';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const userInfo = useUserInfo()
  const dispatch = useDispatch()
  function onBack(){
    props.navigation.goBack()
  }
  function onLanguageCN(){
    dispatch(changeLanguage('zh-CN'))
    onBack()
  }
  function onLanguageEN(){
    dispatch(changeLanguage('en-US'))
    onBack()
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
            <Text style={styles.title}>多语言</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView} keyboardDismissMode='on-drag'>
          <TouchableOpacity style={styles.itemView} onPressIn={onLanguageCN}>
            <Text style={styles.title}>中文</Text>
            {/* <Image style={styles.arrow} source={arrowr}/> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView} onPressIn={onLanguageEN}>
            <Text style={styles.title}>English</Text>
            {/* <Image style={styles.arrow} source={arrowr}/> */}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
