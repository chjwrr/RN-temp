
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
import dayjs from 'dayjs';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const userInfo = useUserInfo()
  const [day,setDay] = useState('-')
  useEffect(()=>{
    const day1 = dayjs(dayjs(userInfo.created_at).format('YYYY-MM-DD'))
    const day2 = dayjs(dayjs().format('YYYY-MM-DD'))
    setDay(day2.diff(day1,'day')+'')
  },[userInfo])
  function onBack(){
    props.navigation.goBack()
  }
  function onChangeAvatar(){
    props.navigation.navigate('ChangeAvatar')
  }
  function onChangeName(){
    props.navigation.navigate('ChangeName')
  }
  function onUserIntro(){
    props.navigation.navigate('UserIntro')
  }
  function onUserAddress(){
    props.navigation.navigate('UserAddress')
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
            <Text style={styles.title}>编辑资料</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollView} keyboardDismissMode='on-drag'>
          <TouchableOpacity style={styles.itemView} onPressIn={onChangeAvatar}>
            <Text style={styles.title}>头像</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <ExpoImage
                style={styles.avatar}
                source={HTTPS.getImageUrl(userInfo.avatar)}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
              <Image style={styles.arrow} source={arrowr}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView} onPressIn={onChangeName}>
            <Text style={styles.title}>用户名CN</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.value}>{userInfo.nickname}</Text>
              <Image style={styles.arrow} source={arrowr}/>
            </View>
          </TouchableOpacity>
          <View style={styles.itemView}>
            <Text style={styles.title}>玩家时间</Text>
            <Text style={styles.value}>{day}天</Text>
          </View>
          <TouchableOpacity style={styles.itemView} onPressIn={onChangeName}>
            <Text style={styles.title}>性别</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.value}>{userInfo.gender == 0 ? '女' : '男'}</Text>
              <Image style={styles.arrow} source={arrowr}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView} onPressIn={onUserAddress}>
            <Text style={styles.title}>现居</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.value}>{userInfo.province} {userInfo.city}</Text>
              <Image style={styles.arrow} source={arrowr}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView}>
            <Text style={styles.title}>星座</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.value}>请选择</Text>
              <Image style={styles.arrow} source={arrowr}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemView} onPressIn={onUserIntro}>
            <Text style={styles.title}>签名</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.value}>{userInfo.intro}</Text>
              <Image style={styles.arrow} source={arrowr}/>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
