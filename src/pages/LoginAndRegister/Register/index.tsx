
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {styles} from './styles'
import { CODE_COUNTDOWN_TIME, STATUSBAR_HEIGHT } from '@/utils';
import { isPhoneNumber } from '@/utils/common';
import CustomTextInput from '@/components/CustomTextInput';
import * as HTTPS from '@/api/axios'
import LoadingComponent from '@/components/LoadingComponent';
import LoadingButton from '@/components/LoadingButton';
import { SEND_SMS_CODE, USER_LOGIN, USER_SIGN_UP } from '@/api/API';
import { useDispatch } from 'react-redux';
import { saveUserInfo } from '@/redux/userInfo';
import { showMessage } from 'react-native-flash-message';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

const BGImage = require('@/assets/images/registerbgi.png')
const AgreeDis = require('@/assets/images/agreedis.png')
const AgreeSel = require('@/assets/images/agree.png')
const ArrowRight = require('@/assets/images/arr_right.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const BackImg = require('@/assets/images/loginback.png')




function Register(props:any): JSX.Element {
  const [userAccount,setUserAccount] = useState('')
  const [userPsd,setUserPsd] = useState('')
  const [isAgree,setIsAgree] = useState(false)
  const [tips,setTips] = useState('')
  const [userAgainPsd,seUserAgainPsd] = useState('')
  const [userCode,seUserCode] = useState('')
  const [codeTime,setCodeTime] = useState(CODE_COUNTDOWN_TIME)
  const codeInterval = useRef<any>()
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()
 
  useEffect(()=>{
    return ()=>{
      codeInterval && codeInterval.current && clearInterval(codeInterval.current)
    }
  },[])
  function onBack(){
    props.navigation.pop()
  }
  function onDisKeyboard(){
    Keyboard.dismiss()
  }
  function onUserAccountChange(e:any){
    setUserAccount(e.nativeEvent.text)
    setTips('')
  }
  function onUserPsdChange(e:any){
    setUserPsd(e.nativeEvent.text)
    setTips('')
  }
  function onUserAgaimPsdChange(e:any){
    seUserAgainPsd(e.nativeEvent.text)
    setTips('')
  }
  function onUserCodeChange(e:any){
    seUserCode(e.nativeEvent.text)
    setTips('')
  }
  function onAgree(){
    setIsAgree(!isAgree)
  }
  function onUserAgreement(){

  }
  function onUserPrivacy(){
    
  }

    const {t} = useTranslationLanguage()
  function onGetVerifyCode(){
    if (codeTime != CODE_COUNTDOWN_TIME){
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

  function onRegister(){
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
    if (!isAgree){
      showMessage({
        message:t('Please read and agree to the 衣互 User Agreement and Privacy Policy'),
        type: "info",
      });
      return
    }
    setIsLoading(true)
    HTTPS.post(USER_SIGN_UP,{
      'country': '86',
      'phone': userAccount,
      'nickname': 'nick-'+userAccount,
      'password': userPsd,
      'code': userCode,
    }).then((result:any)=>{
      dispatch(saveUserInfo({
        ...result.my_user_info,
        token:result.token
      }))
      props.navigation.navigate('ChooseSex')

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
                <Text style={styles.title}>{t('Hello!')}</Text>
                <View style={styles.tipReg}>
                  <Text style={styles.tip}>{t('Welcome to Cverselink, register now')}</Text>
                </View>
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                  inputProps={{
                    placeholder:t('Please enter phone number'),
                    value:userAccount,
                    onChange:onUserAccountChange,
                    keyboardType:'number-pad'
                  }}
                  />
                <View style={[styles.inputView,{marginTop:10}]}>
                  <CustomTextInput style={{height:'100%',flex:1}}
                    inputProps={{
                      placeholder:t('please enter verification code'),
                      value:userCode,
                      onChange:onUserCodeChange,
                      keyboardType:'number-pad'
                    }}
                  />
                  <TouchableOpacity style={styles.codeButton} onPressIn={onGetVerifyCode}>
                    <Text style={styles.codetitle}>{codeTime == CODE_COUNTDOWN_TIME ? t('get verification code') : codeTime + ' s'}</Text>
                  </TouchableOpacity>
                </View>
                <CustomTextInput 
                    style={[styles.inputView,{marginTop:10}]}
                    inputProps={{
                      placeholder:t('Please enter password'),
                      value:userPsd,
                      onChange:onUserPsdChange,
                      underlineColorAndroid:'transparent',
                      secureTextEntry:true
                    }}
                  />
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                  inputProps={{
                    placeholder:t('Please enter password again'),
                    value:userAgainPsd,
                    onChange:onUserAgaimPsdChange,
                    underlineColorAndroid:'transparent',
                    secureTextEntry:true
                  }}
                />
                <Text style={styles.tips}>{tips}</Text>
              </View>
              <View style={styles.downView}>
                <LoadingButton isLoading={isLoading} onPressIn={onRegister} style={styles.loginButtonvieew}>
                  <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                    <Text style={styles.logintitle}>{t('register')}</Text>
                  </ImageBackground>
                </LoadingButton>
                <View style={styles.agreeView}>
                  <TouchableOpacity style={styles.agreeButton} onPressIn={onAgree}>
                    <Image style={styles.agreeImg} source={isAgree ? AgreeSel : AgreeDis}/>
                  </TouchableOpacity>
                  <View style={styles.agreeTextView}>
                    <Text style={styles.agreeText}>{t('I have read and agree to 衣互')}</Text>
                    <TouchableOpacity style={styles.agreeSelButton} onPressIn={onUserAgreement}>
                      <Text style={styles.agreeTextDis}>{t('User Agreement')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.agreeText}>{t('and')}</Text>
                    <TouchableOpacity style={styles.agreeSelButton} onPressIn={onUserPrivacy}>
                      <Text style={styles.agreeTextDis}>{t('Privacy Policy')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default Register;
