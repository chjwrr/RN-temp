
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

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const userInfo = useUserInfo()
  const dispatch = useDispatch()
  function onBack(){
    props.navigation.goBack()
  }

  function onLogout(){
    dispatch(saveUserInfo({}))
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' },
        ],
      })
    );
    HTTPS.post(USER_LOGOUT,{
      token:userInfo.token
    }).then((res:any)=>{
    })

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
            <Text style={styles.title}>设置</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView} keyboardDismissMode='on-drag'>
          <TouchableOpacity style={styles.itemView}>
            <Text style={styles.title}>账号与安全</Text>
            <Image style={styles.arrow} source={arrowr}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView}>
            <Text style={styles.title}>隐私设置</Text>
            <Image style={styles.arrow} source={arrowr}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView}>
            <Text style={styles.title}>通知设置</Text>
            <Image style={styles.arrow} source={arrowr}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView}>
            <Text style={styles.title}>关于Cverselink</Text>
            <Image style={styles.arrow} source={arrowr}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView}>
            <Text style={styles.title}>分享APP</Text>
            <Image style={styles.arrow} source={arrowr}/>
          </TouchableOpacity>
          <TouchableOpacity onPressIn={onLogout}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.logoutButton}>
              <Text style={styles.logoutTitle}>退出登录</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
