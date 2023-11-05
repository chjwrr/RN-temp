
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles'
import { useDispatch } from 'react-redux';
import { saveUserInfo } from '@/redux/userInfo';
import { CommonActions } from '@react-navigation/native';

function Mine(props:any): JSX.Element {
  const dispatch = useDispatch()
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
  }
  return (
    <View  style={{
      flex: 1
    }}>
      <TouchableOpacity style={styles.logoutButton} onPressIn={onLogout}>
        <Text>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Mine;
