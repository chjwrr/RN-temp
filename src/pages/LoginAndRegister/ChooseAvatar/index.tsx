
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
import { useUserInfo } from '@/redux/userInfo';
import * as HTTPS from '@/api/axios'
import LoadingButton from '@/components/LoadingButton';
import { GET_MEDIA_ID, MY_USER_INFO_UPDATE } from '@/api/API';
import { useUserInfomation } from '@/api';

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
  const serInfomation = useUserInfomation()
  console.log('userInfo====',userInfo)
  console.log('serInfomation====',serInfomation.data)

  function onBack(){
    props.navigation.pop()
  }
  function onJumpNext(){
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Tab' },
        ],
      })
    );
    // props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       { name: 'Login' },
    //     ],
    //   })
    // );
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
  async function onChangeAvator(){
    if (Platform.OS == 'android'){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cverselink 想要访问您的图片',
            message:
              '从相册中选取图片设置您的头像',
            buttonNeutral: '稍后访问',
            buttonNegative: '取消',
            buttonPositive: '确认',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          readLibrary()
        } else {
          showMessage({
            message: "暂无访问相册权限",
            description: "请前往设置页打开 Cverselink 相册权限",
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
            <Text style={styles.title}>我的头像</Text>
            <View style={styles.tipReg}>
              <Text style={styles.nametitle}>来个靓照</Text>
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
                }]}>下一步</Text>
              </ImageBackground> : <Text style={styles.nextTitle}>从相册选取图片</Text>}
            </LoadingButton>
          </View>
        </View>
        <View style={styles.jumpView}>
          <TouchableOpacity onPressIn={onJumpNext}>
            <Text style={styles.agreeText}>跳过</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{
        flex: 0
      }}></SafeAreaView>
    </ImageBackground>
  );
}

export default ChooseAvatar;
