
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
import * as HTTPS from '@/api/axios'
import { SEND_SMS_CODE, USER_PASSWORD_UPDATE } from '@/api/API';
import LoadingButton from '@/components/LoadingButton';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

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
  const [isLoading,setIsLoading] = useState(false)

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

  const {t} = useTranslationLanguage()
  function onGetVerifyCode(){
    if (codeTime != 60){
      return
    }
    if (!userPsd){
      setTips(t('Please enter password'))
      return
    }
    if (!userAgainPsd){
      setTips(t('Please enter password again'))
      return
    }
    if (userPsd != userAgainPsd){
      setTips(t('The password you entered twice is inconsistent, please re-enter it'))
      return
    }
    if (!userAccount){
      setTips(t('Please enter phone number'))
      return
    }
    if (!isPhoneNumber(userAccount)){
      setTips(t('Invalid mobile number'))
      return
    }

    HTTPS.post(SEND_SMS_CODE,{
      'country': '86',
       'phone': userAccount,
    }).then((result:any)=>{
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
    }).finally(()=>{
    })
  }
  function onComplate(){
    if (!userPsd){
      setTips(t('Please enter password'))
      return
    }
    if (!userAgainPsd){
      setTips(t('Please enter password again'))
      return
    }
    if (userPsd != userAgainPsd){
      setTips(t('The password you entered twice is inconsistent, please re-enter it'))
      return
    }
    if (!userAccount){
      setTips(t('Please enter phone number'))
      return
    }
    if (!isPhoneNumber(userAccount)){
      setTips(t('Invalid mobile number'))
      return
    }
    if (!userCode){
      setTips(t('please enter verification code'))
      return
    }
    setIsLoading(true)
    HTTPS.post(USER_PASSWORD_UPDATE,{
      'country': '86', 
      'phone': userAccount,
      'password': userPsd, 
      'new_password':userAgainPsd,
      'code': userCode,
    }).then((result:any)=>{
      onBack()
    }).finally(()=>{
      setIsLoading(false)
    })
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
                <Text style={styles.title}>{t('forget the password')}</Text>
                <CustomTextInput style={[styles.inputView]}
                   inputProps={{
                    placeholder:t('new password'),
                    value:userPsd,
                    onChange:onUserPsdChange,
                    underlineColorAndroid:'transparent',
                    secureTextEntry:true
                   }}
                  />
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                   inputProps={{
                    placeholder:t('Confirm password again'),
                    value:userAgainPsd,
                    onChange:onUserAgaimPsdChange,
                    underlineColorAndroid:'transparent',
                    secureTextEntry:true
                   }}
                  />
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                   inputProps={{
                    placeholder:t('Phone number'),
                    value:userAccount,
                    onChange:onUserAccountChange,
                    underlineColorAndroid:'transparent',
                    keyboardType:'number-pad'
                   }}
                  />
                <View style={[styles.inputView,{marginTop:10}]}>
                  <CustomTextInput style={{height:'100%',flex:1}}
                   inputProps={{
                    placeholder:t('Verification code'),
                    value:userCode,
                    onChange:onUserCodeChange,
                    underlineColorAndroid:'transparent',
                    keyboardType:'number-pad'
                   }}
                  />
                  <TouchableOpacity style={styles.codeButton} onPressIn={onGetVerifyCode}>
                    <Text style={styles.codetitle}>{codeTime == CODE_COUNTDOWN_TIME ? t('get verification code') : codeTime + ' s'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.tips}>{tips}</Text>
                <View style={styles.centerView}>
                  <LoadingButton isLoading={isLoading} onPressIn={onComplate} style={styles.loginButtonvieew}>
                    <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                      <Text style={styles.logintitle}>{t('confirm')}</Text>
                    </ImageBackground>
                  </LoadingButton>
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
