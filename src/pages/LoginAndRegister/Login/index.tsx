
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles'
import * as Loading from '@/components/Loading'
import * as HTTPS from '@/api/axios'
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { saveUserInfo } from '@/redux/userInfo';
import CustomTextInput from '@/components/CustomTextInput';
import { USER_LOGIN } from '@/api/API';
import { showMessage } from 'react-native-flash-message';

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
  const dispatch = useDispatch()

  function onDisKeyboard(){
    Keyboard.dismiss()
  }
  function onRegister(){
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
      setTips('请输入手机号')
      return
    }
    if (!userPsd){
      setTips('请输入密码')
      return
    }
    if (!isAgree){
      showMessage({
        message: "请阅读并同意衣互 用户协议 和 隐私政策",
        type: "info",
      });
      return
    }

    Loading.show('正在登录...')
    HTTPS.post(USER_LOGIN,{
      phone:userAccount,
      password:userPsd,
      country:'86'
    }).then((result:any)=>{
      Loading.show('登录成功，正在跳转...')
      setTimeout(() => {
        dispatch(saveUserInfo(result))
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Tab' },
            ],
          })
        );
      },250)
    }).finally(()=>{
      Loading.hidden()
    })
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <TouchableWithoutFeedback style={styles.main} onPressIn={onDisKeyboard}>
        <SafeAreaView style={{flex:1}}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'padding'}
            keyboardVerticalOffset={0}
          >
            <View style={[styles.mainContent]}>
              <View>
                <Text style={styles.title}>欢迎登录</Text>
                <View style={styles.tipReg}>
                  <Text style={styles.tip}>还没有账号</Text>
                  <TouchableOpacity onPressIn={onRegister}>
                    <Text style={styles.regist}>注册</Text>
                  </TouchableOpacity>
                </View>
                <CustomTextInput 
                  style={styles.inputView}
                  inputProps={{
                    placeholder:'输入手机号',
                    value:userAccount,
                    onChange:onUserAccountChange,
                  }} />
                <CustomTextInput 
                    style={[styles.inputView,{marginTop:40}]}
                    inputProps={{
                      placeholder:'输入密码',
                      value:userPsd,
                      onChange:onUserPsdChange,
                      returnKeyType:'done',
                      secureTextEntry:true
                    }}
                  />
                <View style={styles.forgetpsd}>
                  <Text style={styles.tips}>{tips}</Text>
                  <TouchableOpacity onPressIn={onForgetPsd}>
                    <Text style={styles.forgetpsdtitle}>忘记密码</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.downView}>
                <TouchableOpacity onPressIn={onLogin} style={styles.loginButtonvieew}>
                  <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                    <Text style={styles.logintitle}>登录</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.verify} onPressIn={onLoginVerify}>
                  <Text style={styles.veifytitle}>验证码登录</Text>
                  <Image style={styles.arrow} source={ArrowRight}/>
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

export default Login;
