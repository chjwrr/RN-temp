
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


  function onGetVerifyCode(){
    if (codeTime != 60){
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

  function onRegister(){
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
    props.navigation.navigate('ChooseSex')
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
                <Text style={styles.title}>你好！</Text>
                <View style={styles.tipReg}>
                  <Text style={styles.tip}>欢迎来到 Cverselink，立即注册</Text>
                </View>
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                  inputProps={{
                    placeholder:'请输入手机号',
                    value:userAccount,
                    onChange:onUserAccountChange,
                    keyboardType:'number-pad'
                  }}
                  />
                <View style={[styles.inputView,{marginTop:10}]}>
                  <CustomTextInput style={{height:'100%',flex:1}}
                    inputProps={{
                      placeholder:'请输入验证码',
                      value:userCode,
                      onChange:onUserCodeChange,
                      keyboardType:'number-pad'
                    }}
                  />
                  <TouchableOpacity style={styles.codeButton} onPressIn={onGetVerifyCode}>
                    <Text style={styles.codetitle}>{codeTime == CODE_COUNTDOWN_TIME ? '获取验证码' : codeTime + ' s'}</Text>
                  </TouchableOpacity>
                </View>
                <CustomTextInput 
                    style={[styles.inputView,{marginTop:10}]}
                    inputProps={{
                      placeholder:'请输入密码',
                      value:userPsd,
                      onChange:onUserPsdChange,
                      underlineColorAndroid:'transparent',
                      secureTextEntry:true
                    }}
                  />
                <CustomTextInput style={[styles.inputView,{marginTop:10}]}
                  inputProps={{
                    placeholder:'请再次输入密码',
                    value:userAgainPsd,
                    onChange:onUserAgaimPsdChange,
                    underlineColorAndroid:'transparent',
                    secureTextEntry:true
                  }}
                />
                <Text style={styles.tips}>{tips}</Text>
              </View>
              <View style={styles.downView}>
                <TouchableOpacity onPressIn={onRegister} style={styles.loginButtonvieew}>
                  <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                    <Text style={styles.logintitle}>注册</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <View style={styles.agreeView}>
                  <TouchableOpacity style={styles.agreeButton} onPressIn={onAgree}>
                    <Image style={styles.agreeImg} source={isAgree ? AgreeSel : AgreeDis}/>
                  </TouchableOpacity>
                  <View style={styles.agreeTextView}>
                    <Text style={styles.agreeText}>我已阅读并同意衣互</Text>
                    <TouchableOpacity style={styles.agreeSelButton} onPressIn={onUserAgreement}>
                      <Text style={styles.agreeTextDis}>用户协议</Text>
                    </TouchableOpacity>
                    <Text style={styles.agreeText}>和</Text>
                    <TouchableOpacity style={styles.agreeSelButton} onPressIn={onUserPrivacy}>
                      <Text style={styles.agreeTextDis}>隐私政策</Text>
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
