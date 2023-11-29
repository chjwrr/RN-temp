
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


const BGImage = require('@/assets/images/homebg.png')
const setting = require('@/assets/images/setting.png')
const lvbg = require('@/assets/images/lvbg.png')
const mineitem = require('@/assets/images/mineitem.png')


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
  

  console.log('user====',userInfo)
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
            <Text style={styles.uid} numberOfLines={1} ellipsizeMode='tail'>衣互号:{userInfo.uid}</Text>
            <Text style={styles.des}>IP属地:-</Text>
          </View>
        </View>
        <View style={styles.numbeView}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.numberBtn}>
              <Text style={styles.number}>{userInfo.article_count}</Text>
              <Text style={styles.numberDes}>动态</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numberBtn}>
              <Text style={styles.number}>{userInfo.follow_count}</Text>
              <Text style={styles.numberDes}>关注</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numberBtn}>
              <Text style={styles.number}>{userInfo.follower_count}</Text>
              <Text style={styles.numberDes}>粉丝</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPressIn={onSetting}>
              <Image style={styles.setting} source={setting}/>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={onEdit}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(232,227,255)', 'rgb(223,209,255)']} style={styles.editBtn}>
                <Text style={styles.editinfo}>编辑资料</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground style={styles.lvView} source={lvbg}>
          <Text style={styles.lvname}>LV{userInfo.level}会员</Text>
          <Text style={styles.lvnum}>经验值:{userInfo.exp}</Text>
          <TouchableOpacity style={styles.lvnumView}>
            <Text style={styles.lvnumcen}>积分中心</Text>
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity style={[styles.inviteView,styles.bg]} onPressIn={onInvite}>
          <Text style={styles.inviteName}>邀请好友</Text>
        </TouchableOpacity>
        <View style={[styles.orderView,styles.bg]}>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyOrder}>
            <Image style={styles.orderIcon} source={mineitem}/>
            <Text style={styles.ovdername}>全部订单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyCollect}>
            <Image style={styles.orderIcon} source={mineitem}/>
            <Text style={styles.ovdername}>我的收藏</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyFocus}>
            <Image style={styles.orderIcon} source={mineitem}/>
            <Text style={styles.ovdername}>我的关注</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.orderView,styles.bg]}>
          <TouchableOpacity style={{alignItems:'center'}} onPressIn={onMyPost}>
            <Image style={styles.orderIcon} source={mineitem}/>
            <Text style={styles.ovdername}>我的笔记</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}>
            <Image style={styles.orderIcon} source={mineitem}/>
            <Text style={styles.ovdername}>消息中心</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}>
            <Image style={styles.orderIcon} source={mineitem}/>
            <Text style={styles.ovdername}>客服中心</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default Mine;
