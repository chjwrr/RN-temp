
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
import { MERCHANT_CLOTH_DETAIL, MERCHANT_FOLLOW, MERCHANT_UNFOLLOW,  MERCHANT_CLOTH_UNCOLLECT , MERCHANT_CLOTH_COLLECT, MY_USER_INFO_UPDATE } from '@/api/API';
import { saveUserInfo, useUserInfo } from '@/redux/userInfo';
import { savePicture } from '@/utils/common';
import dayjs from 'dayjs';
import CustomTextInput from '@/components/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import LoadingButton from '@/components/LoadingButton';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const userInfo = useUserInfo()
  const [inputValue,setInputValue] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setInputValue(userInfo.intro)
  },[userInfo])
  function onBack(){
    props.navigation.goBack()
  }

  function onChange(e:any){
    setInputValue(e.nativeEvent.text)
  }

  function onPost(){
    if (isLoading)return
    setIsLoading(true)
    HTTPS.post(MY_USER_INFO_UPDATE,{
      "token":userInfo.token,
      // 'avatar': res.media_id,
      // 'province': '广东省',
      // 'city': '深圳市',
      // 'birthday': 1699708371238,
      // 'email': 'xxx@163.com',
      'intro': inputValue
    }).then((result:any)=>{
      dispatch(saveUserInfo({
        ...userInfo,
        intro:inputValue
      }))
      onBack()
    }).finally(()=>{
      setIsLoading(false)
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
            <Text style={styles.title}>编辑签名</Text>
          </View>
        </View>
        <CustomTextInput 
          style={styles.input}
          inputProps={{
            value:inputValue,
            onChange:onChange,
            editable:!isLoading,
            multiline:true,
            placeholder:'说点什么吧~',
            style:{color:'#000',fontSize:16}
          }}/>
          <LoadingButton isLoading={isLoading} onPressIn={onPost}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.logoutButton}>
              <Text style={styles.logoutTitle}>修改</Text>
            </LinearGradient>
          </LoadingButton>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
