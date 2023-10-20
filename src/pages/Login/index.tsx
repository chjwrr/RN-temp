
import React, { useEffect, useState } from 'react';
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
  LayoutAnimation,
} from 'react-native';
import {styles} from './styles'
import * as Loading from '@/components/Loading'

const BGImage = require('@/assets/images/loginbgi.png')
const AgreeDis = require('@/assets/images/agreedis.png')
const AgreeSel = require('@/assets/images/agree.png')
const ArrowRight = require('@/assets/images/arr_right.png')
const ButtonImg = require('@/assets/images/buttonbg.png')




function Login(props:any): JSX.Element {
  const [userAccount,setUserAccount] = useState('')
  const [userPsd,setUserPsd] = useState('')
  const [isAgree,setIsAgree] = useState(false)
  const [tips,setTips] = useState('')
  const [mainTop,setMainTop] = useState(0)

  useEffect(()=>{
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow',(e:any)=>{
      console.log('-e-',e)
      LayoutAnimation.spring()
      setMainTop(-100)
    })
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide',()=>{
      LayoutAnimation.spring()
      setMainTop(0)
    })
    return ()=>{
      keyboardDidShow.remove()
      keyboardDidHide.remove()
    }
  },[])


  function onDisKeyboard(){
    Keyboard.dismiss()
  }
  function onRegister(){
    Keyboard.dismiss()
    props.navigation.navigate('Register')
  }
  function onForgetPsd(){
    Keyboard.dismiss()
    props.navigation.navigate('ForgetPsd')
  }
  function onUserAccountChange(e:any){
    setUserAccount(e.nativeEvent.text)
    setTips('')
  }
  function onUserPsdChange(e:any){
    setUserPsd(e.nativeEvent.text)
    setTips('')
  }
  function onAgree(){
    setIsAgree(!isAgree)
  }
  function onUserAgreement(){

  }
  function onUserPrivacy(){
  }
  function onLoginVerify(){
    props.navigation.navigate('PhoneLogin')
  }
  function onLogin(){
    if (!userAccount){
      setTips('请输入手机号/用户名')
      return
    }
    if (!userPsd){
      setTips('请输入密码')
      return
    }
    Loading.show('正在登录...')
    setTimeout(() => {
      Loading.show('登录成功，正在跳转...')
      setTimeout(() => {
        Loading.hidden()
      }, 2000);
    }, 3000);

  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <TouchableWithoutFeedback style={styles.main} onPress={onDisKeyboard}>
        <SafeAreaView style={{flex:1}}>
          <View style={[styles.mainContent,{
            marginTop:mainTop
          }]}>
            <View>
              <Text style={styles.title}>欢迎登录</Text>
              <View style={styles.tipReg}>
                <Text style={styles.tip}>还没有账号</Text>
                <TouchableOpacity onPress={onRegister}>
                  <Text style={styles.regist}>注册</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.input}
                  placeholder='输入手机号/用户名'
                  value={userAccount}
                  onChange={onUserAccountChange}
                  underlineColorAndroid={'transparent'}
                />
              </View>
              <View style={[styles.inputView,{marginTop:40}]}>
                <TextInput style={styles.input}
                  placeholder='输入密码'
                  value={userPsd}
                  onChange={onUserPsdChange}
                  returnKeyType='done'
                  underlineColorAndroid={'transparent'}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.forgetpsd}>
                <Text style={styles.tips}>{tips}</Text>
                <TouchableOpacity onPress={onForgetPsd}>
                  <Text style={styles.forgetpsdtitle}>忘记密码</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.downView}>
              <TouchableOpacity onPress={onLogin} style={styles.loginButtonvieew}>
                <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                  <Text style={styles.logintitle}>登录</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.verify} onPress={onLoginVerify}>
                <Text style={styles.veifytitle}>验证码登录</Text>
                <Image style={styles.arrow} source={ArrowRight}/>
              </TouchableOpacity>
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

export default Login;
