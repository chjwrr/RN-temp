
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
import Colors from '@/utils/colors';
import CustomTextInput from '@/components/CustomTextInput';
import * as HTTPS from '@/api/axios'
import { MY_USER_INFO_UPDATE } from '@/api/API';
import { saveUserInfo, useUserInfo } from '@/redux/userInfo';
import LoadingButton from '@/components/LoadingButton';
import { useDispatch } from 'react-redux';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

const BGImage = require('@/assets/images/registerbgi.png')
const BackImg = require('@/assets/images/loginback.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const NameNorImg = require('@/assets/images/namebg_nor.png')
const NameSelImg = require('@/assets/images/namebg_sel.png')
const bottomBG = require('@/assets/images/avatarbottombg.png')
const WomenIcon = require('@/assets/images/womenimg.png')
const MenIcon = require('@/assets/images/menimg.png')
const WomenIcon_s = require('@/assets/images/womenimg_s.png')
const MenIcon_s = require('@/assets/images/menimg_s.png')
const boy = require('@/assets/images/boy.png')
const boy_icon = require('@/assets/images/boy_icon.png')
const boy_icon_s = require('@/assets/images/boy_icon_s.png')
const girl_icon_s = require('@/assets/images/girl_icon_s.png')
const girl_icon = require('@/assets/images/girl_icon.png')
const girl = require('@/assets/images/Girl.png')


function ChooseSex(props:any): JSX.Element {
  const [name,setName] = useState('')
  const [sex,setSex] = useState(0) // 0 = 女    1 = 男
  const userInfo = useUserInfo()
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setName(userInfo.nickname)
    setSex(userInfo.gender)
  },[userInfo])

  function onNameChange(e:any){
    setName(e.nativeEvent.text)
  }
  function onBack(){
    props.navigation.pop()
  }
  function onNext(){
    if (name.length == 0){
      return
    }
    setIsLoading(true)
    HTTPS.post(MY_USER_INFO_UPDATE,{
      "token":userInfo.token,
      'nickname': name, 
      'gender': sex, 
      // 'avatar': 'image_id', 
      // 'province': '广东省',
      // 'city': '深圳市', 
      // 'birthday': 1699708371238, 
      // 'email': 'xxx@163.com', 
      // 'intro': 'test_intro', 
    }).then((result:any)=>{
      dispatch(saveUserInfo({
        ...userInfo,
        nickname:name,
        gender:sex
      }))
      onBack()
    }).finally(()=>{
      setIsLoading(false)
    })
  }
  const {t} = useTranslationLanguage()
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <SafeAreaView style={{
        flex: 0
      }}></SafeAreaView>
      <SafeAreaView style={{flex:1}} >
        <TouchableOpacity onPressIn={onBack} style={styles.backButton}>
          <Image source={BackImg} style={styles.bgckImg}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainContent} activeOpacity={1} onPressIn={()=>Keyboard.dismiss()}>
          <View style={styles.mainContent}>
            <View style={styles.topNameView}>
              <Text style={styles.title}>Hi~!</Text>
              <View style={styles.tipReg}>
                <Text style={styles.nametitle}>{t('May I have your name?')}</Text>
              </View>
              <View style={styles.nameView}>
                <ImageBackground source={ButtonImg} resizeMode="cover" style={styles.nameBG}>
                  <CustomTextInput
                    style={styles.nameInput}
                    inputProps={{
                      style:{
                        fontSize:24,
                        color:Colors.white,
                        fontFamily: 'SmileySans-Oblique',
                      },
                      value:name,
                      onChange:onNameChange,
                      underlineColorAndroid:'transparent',
                      placeholder:t('Please enter name'),
                      placeholderTextColor:Colors.white
                    }}
                  />
                </ImageBackground>
                <Image style={styles.nameIcon} source={name.length > 0 ? NameSelImg : NameNorImg}/>
              </View>
            </View>
            <View style={styles.agreeView}>
              <ImageBackground source={bottomBG} resizeMode="cover" style={styles.bottombg}>
                <View style={{
                  flexDirection:'row'
                }}>
                  <TouchableOpacity onPressIn={()=>setSex(0)} style={[styles.sexBtn]}>
                    <Image style={styles.sexImg} source={sex == 0 ? WomenIcon_s : WomenIcon}/>
                    <View style={styles.sexItem}>
                      <Image style={styles.secIcon} source={sex == 0 ? girl_icon_s : girl_icon}/>
                      <Text style={styles.sexName}>{t('girl')}</Text>
                    </View>
                    <Image style={styles.girlImage} source={girl}/>
                  </TouchableOpacity>
                  <View style={{
                    width:50
                  }}/>
                  <TouchableOpacity onPressIn={()=>setSex(1)} style={[styles.sexBtn]}>
                    <Image style={styles.sexImg} source={sex == 1 ? MenIcon_s : MenIcon}/>
                    <View style={styles.sexItem}>
                      <Image style={styles.secIcon} source={sex == 1 ? boy_icon_s : boy_icon}/>
                      <Text style={styles.sexName}>{t('boy')}</Text>
                    </View>
                    <Image style={styles.boyImage} source={boy}/>
                  </TouchableOpacity>
                </View>
                <LoadingButton isLoading={isLoading} onPressIn={onNext} style={[styles.nextButtonView,{
                  backgroundColor:name.length > 0 ? 'transparent' : Colors.bright_2
                }]}>
                  {name.length > 0 ? <ImageBackground source={ButtonImg} style={styles.nextButton} resizeMode='cover'>
                    <Text style={[styles.nextTitle,{
                      color:'#fff'
                    }]}>{t('Confirm the changes')}</Text>
                  </ImageBackground> : <Text style={styles.nextTitle}>{t('Confirm the changes')}</Text>}
                </LoadingButton>
                <View style={{
                  height:'100%',
                  width:'100%',
                  backgroundColor:Colors.white
                }}/>
              </ImageBackground>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={{
        backgroundColor: "white",
        flex: 0
      }}></SafeAreaView>
    </ImageBackground>
  );
}

export default ChooseSex;
