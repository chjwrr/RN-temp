
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
import { useUserInfo } from '@/redux/userInfo';
import LoadingButton from '@/components/LoadingButton';
import { useUserInfomation } from '@/api';

const BGImage = require('@/assets/images/registerbgi.png')
const BackImg = require('@/assets/images/loginback.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const NameNorImg = require('@/assets/images/namebg_nor.png')
const NameSelImg = require('@/assets/images/namebg_sel.png')
const bottomBG = require('@/assets/images/avatarbottombg.png')

const WomenIcon = require('@/assets/images/womenimg.png')
const MenIcon = require('@/assets/images/menimg.png')




function ChooseSex(props:any): JSX.Element {
  const [name,setName] = useState('')
  const [sex,setSex] = useState(0) // 0 = 女    1 = 男
  const userInfo = useUserInfo()
  const [isLoading,setIsLoading] = useState(false)
  const userInfomation = useUserInfomation()
  console.log('vuserInfomation=====',userInfomation.data)
  function onNameChange(e:any){
    setName(e.nativeEvent.text)
  }
  function onBack(){
    props.navigation.pop()
  }
  function onJumpNext(){
    props.navigation.navigate('ChooseAvatar')
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
      // props.navigation.navigate('ChooseAvatar')
      userInfomation.refetch()
    }).finally(()=>{
      setIsLoading(false)
    })   
  }
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
                <Text style={styles.nametitle}>你叫什么名字？</Text>
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
                      placeholder:'请输入名字',
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
                  <TouchableOpacity onPressIn={()=>setSex(0)} style={{backgroundColor:sex == 0 ? 'red' : 'transparent'}}>
                    <Image style={styles.sexImg} source={WomenIcon}/>
                  </TouchableOpacity>
                  <View style={{
                    width:50
                  }}/>
                  <TouchableOpacity onPressIn={()=>setSex(1)} style={{backgroundColor:sex == 1 ? 'red' : 'transparent'}}>
                    <Image style={styles.sexImg} source={MenIcon}/>
                  </TouchableOpacity>
                </View>
                <LoadingButton isLoading={isLoading} onPressIn={onNext} style={[styles.nextButtonView,{
                  backgroundColor:name.length > 0 ? 'transparent' : Colors.bright_2
                }]}>
                  {name.length > 0 ? <ImageBackground source={ButtonImg} style={styles.nextButton} resizeMode='cover'>
                    <Text style={[styles.nextTitle,{
                      color:'#fff'
                    }]}>下一步</Text>
                  </ImageBackground> : <Text style={styles.nextTitle}>下一步</Text>}
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
        <View style={styles.jumpView}>
          <TouchableOpacity onPressIn={onJumpNext}>
            <Text style={styles.agreeText}>跳过</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{
        backgroundColor: "white",
        flex: 0
      }}></SafeAreaView>
    </ImageBackground>
  );
}

export default ChooseSex;
