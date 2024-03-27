
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
import CustomTextInput from '@/components/CustomTextInput';
import * as HTTPS from '@/api/axios'
import { SEND_SMS_CODE } from '@/api/API';
import LoadingButton from '@/components/LoadingButton';
import { showMessage } from 'react-native-flash-message';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

const BGImage = require('@/assets/images/loginbgi.png')
const AgreeDis = require('@/assets/images/agreedis.png')
const AgreeSel = require('@/assets/images/agree.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const BackImg = require('@/assets/images/loginback.png')



function PhoneLogin(props:any): JSX.Element {
  const [userAccount,setUserAccount] = useState('')
  const [isAgree,setIsAgree] = useState(false)
  const [tips,setTips] = useState('')
  const [isLoading,setIsLoading] = useState(false)

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
  const {t} = useTranslationLanguage()
  function onGetCode(){
    if (!userAccount){
      setTips(t('Please enter phone number'))
      return
    }
    if (!isPhoneNumber(userAccount)){
      setTips(t('Invalid mobile number'))
      return
    }
    if (!isAgree){
      showMessage({
        message: t('Please read and agree to the 衣互 User Agreement and Privacy Policy'),
        type: "info",
      });
      return
    }

    setIsLoading(true)
    HTTPS.post(SEND_SMS_CODE,{
      'country': '86',
      'phone': userAccount,
    }).then((result:any)=>{
      props.navigation.navigate('PhoneCode',{
        phone:userAccount
      })
    }).finally(()=>{
      setIsLoading(false)
    })


  }
  function onBack(){
    props.navigation.pop()
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <TouchableWithoutFeedback style={styles.main} onPressIn={onDisKeyboard}>
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity onPressIn={onBack} style={styles.backButton}>
            <Image source={BackImg} style={styles.bgckImg}/>
          </TouchableOpacity>
          <View style={styles.mainContent}>
            <View>
              <Text style={styles.title}>{t('Mobile phone number login')}</Text>
              <View style={styles.inputView}>
                <Text style={styles.phoneArea}>+86</Text>
                <CustomTextInput style={{height:'100%',flex:1}}
                  inputProps={{
                    placeholder:t('Please enter phone number'),
                    value:userAccount,
                    onChange:onUserAccountChange,
                    keyboardType:'number-pad'
                  }}
                />
              </View>
              <Text style={styles.tips}>{tips}</Text>
              <View style={styles.centerView}>
                <LoadingButton isLoading={isLoading} onPressIn={onGetCode} style={styles.loginButtonvieew}>
                  <ImageBackground source={ButtonImg} style={styles.loginButton} resizeMode='cover'>
                    <Text style={styles.logintitle}>{t('get verification code')}</Text>
                  </ImageBackground>
                </LoadingButton>
              </View>
             
            </View>
            <View style={styles.downView}>
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
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default PhoneLogin;
