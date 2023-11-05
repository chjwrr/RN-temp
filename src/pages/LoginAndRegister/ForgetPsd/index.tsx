
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {styles} from './styles'
import { isPhoneNumber } from '@/utils/common';
import { CODE_COUNTDOWN_TIME } from '@/utils';
import CustomTextInput from '@/components/CustomTextInput';

const BGImage = require('@/assets/images/loginbgi.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const BackImg = require('@/assets/images/loginback.png')


function ForgetPsd(props:any): JSX.Element {
  const [userAccount,setUserAccount] = useState('')
  const [tips,setTips] = useState('')
  const [userPsd,setUserPsd] = useState('')
  const [userAgainPsd,seUserAgainPsd] = useState('')
  const [userCode,seUserCode] = useState('')
  const [codeTime,setCodeTime] = useState(CODE_COUNTDOWN_TIME)
  const codeInterval = useRef<any>()

  useEffect(()=>{
    return ()=>{
      codeInterval && codeInterval.current && clearInterval(codeInterval.current)
    }
  },[])

  function onDisKeyboard(){
    Keyboard.dismiss()
  }
  function onUserPsdChange(e:any){
    setUserPsd(e.nativeEvent.text)
    setTips('')
  }
  function onUserAgaimPsdChange(e:any){
    seUserAgainPsd(e.nativeEvent.text)
    setTips('')
  }
  function onUserAccountChange(e:any){
    setUserAccount(e.nativeEvent.text)
    setTips('')
  }
  function onUserCodeChange(e:any){
    seUserCode(e.nativeEvent.text)
    setTips('')
  }
  function onBack(){
    props.navigation.pop()
  }

  function onGetVerifyCode(){
    if (codeTime != 60){
      return
    }
    if (!userPsd){
      setTips('请输入密码')
      return
    }
    if (!userAgainPsd){
      setTips('请再次输入密码')
      return
    }
    if (userPsd != userAgainPsd){
      setTips('两次输入密码不一致，请重新输入')
      return
    }
    if (!userAccount){
      setTips('请输入手机号')
      return
    }
    if (!isPhoneNumber(userAccount)){
      setTips('手机号无效')
      return
    }


    setCodeTime(CODE_COUNTDOWN_TIME - 1)
    let countDown = CODE_COUNTDOWN_TIME - 1
    codeInterval.current = setInterval(()=>{
      console.log('countDown',countDown)
      if (countDown <= 0){
        clearInterval(codeInterval.current)
        setCodeTime(CODE_COUNTDOWN_TIME)
        return
      }
      setCodeTime((pre:number)=>pre - 1)
      countDown --
    },1000)
  }
  function onComplate(){
    if (!userPsd){
      setTips('请输入密码')
      return
    }
    if (!userAgainPsd){
      setTips('请再次输入密码')
      return
    }
    if (userPsd != userAgainPsd){
      setTips('两次输入密码不一致，请重新输入')
      return
    }
    if (!userAccount){
      setTips('请输入手机号')
      return
    }
    if (!isPhoneNumber(userAccount)){
      setTips('手机号无效')
      return
    }
    if (!userCode){
      setTips('请输入验证码')
      return
    }

    console.log('忘记密码-')
    onBack()

  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <TouchableWithoutFeedback style={styles.main} onPressIn={onDisKeyboard}>
        <SafeAreaView style={{flex:1}}>
          <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={'padding'}
            keyboardVerticalOffset={0}
            >
            <TouchableOpacity onPressIn={onBack} style={styles.backButton}>
              <Image source={BackImg} style={styles.bgckImg}/>
            </TouchableOpacity>
            <View style={[styles.mainContent,{
            }]}>
              <View>
                <Text style={styles.title}>忘记密码</Text>
                <CustomTextInput style={[styles.inputView]}
                   inputProps={{
                    placeholder:'新的密码',
                    value:userPsd,
                    onChange:onUserPsdChange,
                    underlineColorAndroid:'transparent',
                    secureTextEntry:true
                   }}
                  />
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                   inputProps={{
                    placeholder:'再次确认密码',
                    value:userAgainPsd,
                    onChange:onUserAgaimPsdChange,
                    underlineColorAndroid:'transparent',
                    secureTextEntry:true
                   }}
                  />
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                   inputProps={{
                    placeholder:'手机号',
                    value:userAccount,
                    onChange:onUserAccountChange,
                    underlineColorAndroid:'transparent',
                    keyboardType:'number-pad'
                   }}
                  />
                <View style={[styles.inputView,{marginTop:10}]}>
                  <CustomTextInput style={{height:'100%',flex:1}}
                   inputProps={{
                    placeholder:'验证码',
                    value:userCode,
                    onChange:onUserCodeChange,
                    underlineColorAndroid:'transparent',
                    keyboardType:'number-pad'
                   }}
                  />
                  <TouchableOpacity style={styles.codeButton} onPressIn={onGetVerifyCode}>
                    <Text style={styles.codetitle}>{codeTime == CODE_COUNTDOWN_TIME ? '获取验证码' : codeTime + ' s'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.tips}>{tips}</Text>
                <View style={styles.centerView}>
                  <TouchableOpacity onPressIn={onComplate} style={styles.loginButtonvieew}>
                    <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                      <Text style={styles.logintitle}>确认</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default ForgetPsd;
