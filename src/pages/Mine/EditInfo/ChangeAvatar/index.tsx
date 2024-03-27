
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
  PermissionsAndroid,
  Platform
} from 'react-native';
import {styles} from './styles'
import Colors from '@/utils/colors';
import { launchImageLibrary} from 'react-native-image-picker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CommonActions } from '@react-navigation/native';
import { saveUserInfo, useUserInfo } from '@/redux/userInfo';
import * as HTTPS from '@/api/axios'
import LoadingButton from '@/components/LoadingButton';
import { GET_MEDIA_ID, MY_USER_INFO_UPDATE } from '@/api/API';
import { useDispatch } from 'react-redux';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

const BGImage = require('@/assets/images/registerbgi.png')
const BackImg = require('@/assets/images/loginback.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const Avatarbg = require('@/assets/images/avatarbg.png')
const AvatarBottom = require('@/assets/images/avabottomicon.png')
const Avataricon = require('@/assets/images/avataricon.png')


function ChooseAvatar(props:any): JSX.Element {
  const [avatorFile,setAvator] = useState('')
  const userInfo = useUserInfo()
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()
  function onBack(){
    props.navigation.pop()
  }
  function onNext(){
    if (avatorFile.length > 0){
      setIsLoading(true)
      HTTPS.post(GET_MEDIA_ID,{
        token:userInfo.token
      }).then((res:any)=>{
        HTTPS.upload(res.media_id,avatorFile).then((result:any)=>{
          HTTPS.post(MY_USER_INFO_UPDATE,{
            "token":userInfo.token,
            'avatar': res.media_id,
            // 'province': '广东省',
            // 'city': '深圳市',
            // 'birthday': 1699708371238,
            // 'email': 'xxx@163.com',
            // 'intro': 'test_intro',
          }).then((result:any)=>{
            dispatch(saveUserInfo({
              ...userInfo,
              avatar:res.media_id,
            }))
            onBack()
          }).finally(()=>{
            setIsLoading(false)
          })
        }).catch(()=>{
        })
      }).catch((e:any)=>{
        setIsLoading(false)
      })
    }
  }
  const {t} = useTranslationLanguage()
  async function onChangeAvator(){
    if (Platform.OS == 'android'){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: t('Cverselink wants to access your images'),
            message:
              t('Choose a picture from the photo album to set your avatar'),
            buttonNeutral: t('visit later'),
            buttonNegative: t('Cancel'),
            buttonPositive: t('confirm'),
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          readLibrary()
        } else {
          showMessage({
            message: t('No access to photo album yet'),
            description: t('Please go to the settings page to turn on Cverselink album permissions'),
            type: "warning",
            });
        }
      } catch (err) {
        console.warn(err);
      }
    }else {
      readLibrary()
    }
  }
  function readLibrary(){
    launchImageLibrary({mediaType:'photo',quality:0.5}, (response:any) => {
      console.log('Response = ', response);
      if (response.didCancel) {
          console.log('User cancelled image picker');
      } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
      } else {
          console.log("response.uri :",response.assets[0].uri )
          setAvator(response.assets[0].uri)
      }
    });
  }
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <SafeAreaView style={{flex:1}} >
        <TouchableOpacity onPressIn={onBack} style={styles.backButton}>
          <Image source={BackImg} style={styles.bgckImg}/>
        </TouchableOpacity>
        <View style={styles.mainContent}>
          <View style={styles.topNameView}>
            <Text style={styles.title}>{t('My icon')}</Text>
            <View style={styles.tipReg}>
              <Text style={styles.nametitle}>{t('Take a nice photo')}</Text>
            </View>
          </View>
          <View style={styles.agreeView}>
            <TouchableOpacity onPressIn={onChangeAvator}>
              <ImageBackground source={Avatarbg} resizeMode="cover" style={styles.avatarbg}>
                {avatorFile ? <Image style={styles.avatarImage} source={{uri:avatorFile}}/> : <Image style={styles.avatarIcon} source={Avataricon}/>}
              </ImageBackground>
            </TouchableOpacity>
            <Image style={styles.avatarBottom} source={AvatarBottom}/>
            <LoadingButton isLoading={isLoading} onPressIn={onNext} style={[styles.nextButtonView,{
              backgroundColor:avatorFile.length > 0 ? 'transparent' : Colors.bright_2
            }]}>
              {avatorFile.length > 0 ? <ImageBackground source={ButtonImg} style={styles.nextButton} resizeMode='cover'>
                <Text style={[styles.nextTitle,{
                  color:'#fff'
                }]}>{t('Confirm the changes')}</Text>
              </ImageBackground> : <Text style={styles.nextTitle}>{t('Select pictures from album')}</Text>}
            </LoadingButton>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{
        flex: 0
      }}></SafeAreaView>
    </ImageBackground>
  );
}

export default ChooseAvatar;
