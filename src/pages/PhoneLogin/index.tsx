
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image
} from 'react-native';
import {styles} from './styles'
import { isPhoneNumber } from '@/utils/common';

const BGImage = require('@/assets/images/loginbgi.png')
const AgreeDis = require('@/assets/images/agreedis.png')
const AgreeSel = require('@/assets/images/agree.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const BackImg = require('@/assets/images/loginback.png')



function PhoneLogin(props:any): JSX.Element {
  const [userAccount,setUserAccount] = useState('')
  const [isAgree,setIsAgree] = useState(false)
  const [tips,setTips] = useState('')

  function onDisKeyboard(){
    Keyboard.dismiss()
  }
  function onUserAccountChange(e:any){
    setUserAccount(e.nativeEvent.text)
    setTips('')
  }
  function onAgree(){
    setIsAgree(!isAgree)
  }
  function onUserAgreement(){

  }
  function onUserPrivacy(){
    
  }
  function onGetCode(){
    if (!userAccount){
      setTips('请输入手机号')
      return
    }
    if (!isPhoneNumber(userAccount)){
      setTips('手机号无效')
      return
    }
    props.navigation.navigate('PhoneCode',{
      phone:userAccount
    })
  }
  function onBack(){
    props.navigation.pop()
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <TouchableWithoutFeedback style={styles.main} onPress={onDisKeyboard}>
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity onPress={onBack}>
            <Image source={BackImg} style={styles.bgckImg}/>
          </TouchableOpacity>
          <View style={styles.mainContent}>
            <View>
              <Text style={styles.title}>手机号登录</Text>
              <View style={styles.inputView}>
                <Text style={styles.phoneArea}>+86</Text>
                <TextInput style={styles.input}
                  placeholder='请输入手机号'
                  value={userAccount}
                  onChange={onUserAccountChange}
                  underlineColorAndroid={'transparent'}
                  keyboardType='number-pad'
                />
              </View>
              <Text style={styles.tips}>{tips}</Text>
              <View style={styles.centerView}>
                <TouchableOpacity onPress={onGetCode} style={styles.loginButtonvieew}>
                  <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                    <Text style={styles.logintitle}>获取验证码</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
             
            </View>
            <View style={styles.downView}>
              <View style={styles.agreeView}>
                <TouchableOpacity style={styles.agreeButton} onPress={onAgree}>
                  <Image style={styles.agreeImg} source={isAgree ? AgreeSel : AgreeDis}/>
                </TouchableOpacity>
                <View style={styles.agreeTextView}>
                  <Text style={styles.agreeText}>我已阅读并同意衣互</Text>
                  <TouchableOpacity style={styles.agreeSelButton} onPress={onUserAgreement}>
                    <Text style={styles.agreeTextDis}>用户协议</Text>
                  </TouchableOpacity>
                  <Text style={styles.agreeText}>和</Text>
                  <TouchableOpacity style={styles.agreeSelButton} onPress={onUserPrivacy}>
                    <Text style={styles.agreeTextDis}>隐私政策</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default PhoneLogin;
