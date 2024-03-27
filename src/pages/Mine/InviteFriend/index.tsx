
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
import {QRCode, Canvas} from 'easyqrcode-react-native';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

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
  function onShare(){

  }
  const generateQRCode = (canvas:any) => {
    if (canvas !== null){
        var options = {
            text: userInfo.uid,
            width: 140,
            height: 140,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H, // L, M, Q, H
            logo: HTTPS.getImageUrl(userInfo.avatar),  //  support: Static Image Resources, Network Images, Base64 Uri Data Images
            logoWidth: 50, // fixed logo width. default is `width/3.5`
            logoHeight: 50, // fixed logo height. default is `heigth/3.5`
            
      };
      var qrCode = new QRCode(canvas, options);
    }
  }
  const {t} = useTranslationLanguage()
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <View style={[styles.navigationView,{
        }]}>
          <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
            <Image style={styles.backIcon} source={BackIcon}/>
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>{t('invite friends')}</Text>
          </View>
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={share}/>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center'}}>
          <ImageBackground style={styles.downView} source={downbg}>
            <Text style={styles.downTitle}>{t('my invitation code')}</Text>
            <View style={{alignItems:'center'}}>
              <View style={styles.code}>
                <Canvas ref={generateQRCode}/>
              </View>
              <Text style={styles.downDes}>{t('Scan the QR code to download our APP')}</Text>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
