
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

const BGImage = require('@/assets/images/registerbgi.png')
const BackImg = require('@/assets/images/loginback.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const Avatarbg = require('@/assets/images/avatarbg.png')
const AvatarBottom = require('@/assets/images/avabottomicon.png')
const Avataricon = require('@/assets/images/avataricon.png')


function ChooseAvatar(props:any): JSX.Element {
  const [avatorFile,setAvator] = useState('')
  function onBack(){
    props.navigation.pop()
  }
  function onJumpNext(){
  }
  function onNext(){
    onChangeAvator()
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
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
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
            <TouchableOpacity onPress={onChangeAvator}>
              <ImageBackground source={Avatarbg} resizeMode="cover" style={styles.avatarbg}>
                {avatorFile ? <Image style={styles.avatarImage} source={{uri:avatorFile}}/> : <Image style={styles.avatarIcon} source={Avataricon}/>}
              </ImageBackground>
            </TouchableOpacity>
            <Image style={styles.avatarBottom} source={AvatarBottom}/>
            <TouchableOpacity onPress={onNext} style={[styles.nextButtonView,{
              backgroundColor:avatorFile.length > 0 ? 'transparent' : Colors.bright_2
            }]}>
              {avatorFile.length > 0 ? <ImageBackground source={ButtonImg} style={styles.nextButton} resizeMode='cover'>
                <Text style={[styles.nextTitle,{
                  color:'#fff'
                }]}>下一步</Text>
              </ImageBackground> : <Text style={styles.nextTitle}>从相册选取图片</Text>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.jumpView}>
          <TouchableOpacity onPress={onJumpNext}>
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
