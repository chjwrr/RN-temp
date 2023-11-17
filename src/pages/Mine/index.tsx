
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './styles'
import { useDispatch } from 'react-redux';
import { saveUserInfo, useUserInfo } from '@/redux/userInfo';
import { CommonActions } from '@react-navigation/native';
import { useUserInfomation } from '@/api';
import * as HTTPS from '@/api/axios'
import { USER_LOGOUT } from '@/api/API';

function Mine(props:any): JSX.Element {
  const dispatch = useDispatch()
  const userInfomation = useUserInfomation()
  const userInfo = useUserInfo()
  console.log('userInfomation===',userInfomation.data)
  function onLogout(){

    HTTPS.post(USER_LOGOUT,{
      token:userInfo.token
    }).then((res:any)=>{
      dispatch(saveUserInfo({}))
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Login' },
          ],
        })
      );
    })

  }

  return (
    <View  style={{
      flex: 1
    }}>
      <TouchableOpacity style={styles.logoutButton} onPressIn={onLogout}>
        <Text>退出登录</Text>
      </TouchableOpacity>
      <Text>用户名：{userInfomation.data?.nickname}</Text>
      <Text>手机号：{userInfomation.data?.phone}</Text>
      <Image style={{width:100,height:100}} source={{uri:HTTPS.getImageUrl(userInfomation.data?.avatar)}}/>
    </View>
  );
}

export default Mine;
