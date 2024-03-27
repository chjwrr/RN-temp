
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from 'react-native';
import {styles} from './styles'
import { useDispatch } from 'react-redux';
import { saveUserInfo, useUserInfo } from '@/redux/userInfo';
import { CommonActions } from '@react-navigation/native';
import * as HTTPS from '@/api/axios'
import { MY_USER_INFO, USER_LOGOUT } from '@/api/API';
import { Image as ExpoImage } from 'expo-image';
import { BLUR_HASH } from '@/utils';
import LinearGradient from 'react-native-linear-gradient';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';


const BGImage = require('@/assets/images/homebg.png')
const setting = require('@/assets/images/setting.png')
const lvbg = require('@/assets/images/lvbg.png')
const inviteBgImg = require('@/assets/images/inviteBgImg.png')
const mine_allorder = require('@/assets/images/mine_allorder.png')
const mine_mycollect = require('@/assets/images/mine_mycollect.png')
const mine_myfocus = require('@/assets/images/mine_myfocus.png')
const mine_messagecenter = require('@/assets/images/mine_messagecenter.png')
const mine_customer = require('@/assets/images/mine_customer.png')
const mine_mypost = require('@/assets/images/mine_mypost.png')


function Mine(props:any): JSX.Element {
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  useEffect(()=>{
    HTTPS.post(MY_USER_INFO,{
      token:userInfo.token
    }).then((result:any)=>{
      dispatch(saveUserInfo({
        ...result.my_user_info,
        token:userInfo.token
      }))
    })
  },[])
  function onEdit(){
    props.navigation.navigate('EditInfo')
  }
  function onSetting(){
    props.navigation.navigate('Setting')
  }
  function onInvite(){
    props.navigation.navigate('InviteFriend')
  }
  function onMyCollect(){
    props.navigation.navigate('MyCollect')
  }
  function onMyFocus(){
    props.navigation.navigate('MyFocus')
  }
  function onMyOrder(){
    props.navigation.navigate('MyOrder')
  }
  function onMyPost(){
    props.navigation.navigate('MyPost')
  }
  function onMessageCenter(){
    props.navigation.navigate('MyMessageCenter')
  }

  const {t} = useTranslationLanguage()
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <ScrollView style={{
        flex: 1,
      }}>
        <View style={styles.infoView}>
          <ExpoImage
            style={styles.avatar}
            source={HTTPS.getImageUrl(userInfo.avatar)}
            placeholder={BLUR_HASH}
            contentFit="cover"
            transition={200}
          />
          <View>
            <Text style={styles.name}>{userInfo.nickname}</Text>
            <Text style={styles.uid} numberOfLines={1} ellipsizeMode='tail'>{t('clothing number')}:{userInfo.uid}</Text>
            <Text style={styles.des}>{t('IP territory')}:-</Text>
          </View>
        </View>
        <View style={styles.numbeView}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.numberBtn}>
              <Text style={styles.number}>{userInfo.article_count}</Text>
              <Text style={styles.numberDes}>{t('dynamic')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numberBtn}>
              <Text style={styles.number}>{userInfo.follow_count}</Text>
              <Text style={styles.numberDes}>{t('following')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numberBtn}>
              <Text style={styles.number}>{userInfo.follower_count}</Text>
              <Text style={styles.numberDes}>{t('fan')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPressIn={onSetting}>
              <Image style={styles.setting} source={setting}/>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={onEdit}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(232,227,255)', 'rgb(223,209,255)']} style={styles.editBtn}>
                <Text style={styles.editinfo}>{t('edit information')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground style={styles.lvView} source={lvbg}>
          <Text style={styles.lvname}>LV{userInfo.level}{t('member')}</Text>
          <Text style={styles.lvnum}>{t('Experience')}:{userInfo.exp}</Text>
          <TouchableOpacity style={styles.lvnumView}>
            <Text style={styles.lvnumcen}>{t('Points Center')}</Text>
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity style={[styles.inviteView]} onPressIn={onInvite}>
          <ImageBackground style={styles.inviteBgView} source={inviteBgImg}/>
        </TouchableOpacity>
        <View style={[styles.orderView,styles.bg]}>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyOrder}>
            <Image style={styles.orderIcon} source={mine_allorder}/>
            <Text style={styles.ovdername}>{t('All orders')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyCollect}>
            <Image style={styles.orderIcon} source={mine_mycollect}/>
            <Text style={styles.ovdername}>{t('my collection')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyFocus}>
            <Image style={styles.orderIcon} source={mine_myfocus}/>
            <Text style={styles.ovdername}>{t('my focus')}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.orderView,styles.bg]}>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyPost}>
            <Image style={styles.orderIcon} source={mine_mypost}/>
            <Text style={styles.ovdername}>{t('my notes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMessageCenter}>
            <Image style={styles.orderIcon} source={mine_messagecenter}/>
            <Text style={styles.ovdername}>{t('Message Center')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={()=>{
             props.navigation.navigate('SendMessage',{
              info:{
                name:t('Customer Service')
              },
              customer:true
            })
          }}>
            <Image style={styles.orderIcon} source={mine_customer}/>
            <Text style={styles.ovdername}>{t('Customer Service')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default Mine;
