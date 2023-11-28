//@ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  PermissionsAndroid,
  ImageBackground,
  Platform,
  TextInput,
  Text,
  Image,
  Button,
  View,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import {styles} from './styles'
import { showMessage, hideMessage } from "react-native-flash-message";
import { launchImageLibrary} from 'react-native-image-picker';
import * as HTTPS from '@/api/axios'
import { GET_MEDIA_ID, MY_USER_INFO_UPDATE,ARTICLE_PUBLISH } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import * as Loading from '@/components/Loading'
import LoadingButton from '@/components/LoadingButton';
import CustomTextInput from '@/components/CustomTextInput';

const BGImage = require('@/assets/images/homebg.png')
const add = require('@/assets/images/addimage.png')
const deleteicon = require('@/assets/images/delete.png')

function Post(props:any): JSX.Element {
  const userInfo = useUserInfo()
  const [isLoading,setIsLoading] = useState(false)

  async function onChangeAvator(){
    if (isLoading)return
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
    launchImageLibrary({mediaType:'photo',quality:0.8,selectionLimit:9 - images.length}, (response:any) => {
      console.log('Response = ', response);
      if (response.didCancel) {
          console.log('User cancelled image picker');
      } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
      } else {
          console.log("response.uri :",response.assets)
          let temp = [...images,...response.assets]
          setImages(temp)
      }
    });
  }
  const [images,setImages] = useState<any[]>([])
  function onDelete(index:number){
    if (isLoading)return
    let temp = [...images]
    temp.splice(index,1)
    setImages(temp)
  }

  async function onPost(){
    if (!inputValue)return
    if (images.length < 1)return
    let mediaID:any[] = []
    try {
      setIsLoading(true)
      for (let index = 0; index < images.length; index++) {
        const element = images[index];
        const mediaIDInfo = await HTTPS.post(GET_MEDIA_ID,{
          token:userInfo.token
        }).catch(()=>setIsLoading(false))
        if (mediaIDInfo?.code != 0){
          showMessage({
            message: `第${index}张图片ID获取失败`,
            type: "error",
          });
          break
        }
        const uploadResult = await HTTPS.upload(mediaIDInfo.media_id,element.uri).catch(()=>setIsLoading(false))
        if (uploadResult?.code != 0){
          showMessage({
            message: `第${index}张图片上传失败`,
            type: "error",
          });
          break
        }
        mediaID.push(mediaIDInfo.media_id + '.jpg')
      }
    } catch (error) {
      setIsLoading(false)
    }
    let params = {
      token:userInfo.token,
      content:inputValue,
      images:mediaID
    }
    const postResult = await HTTPS.post(ARTICLE_PUBLISH,params).catch(()=>setIsLoading(false))
    setIsLoading(false)
    if (postResult?.code == 0){{
      setInputValue('')
      setImages([])
      showMessage({
        message: '发布成功',
        type: "success",
      });
      props.navigation.navigate('Home')
      DeviceEventEmitter.emit('postSuccess')
    }}

  }
  const [inputValue,setInputValue] = useState('')

  function onChange(e:any){
    setInputValue(e.nativeEvent.text)
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{
        flex: 1
      }}>
        <View style={[styles.navigationView,{
        }]}>
          <LoadingButton isLoading={isLoading} style={styles.backButton} onPressIn={onPost}>
            <Text style={styles.title}>发布</Text>
          </LoadingButton>
        </View>
        <CustomTextInput 
          style={styles.input}
          inputProps={{
            value:inputValue,
            onChange:onChange,
            editable:!isLoading,
            multiline:true,
            placeholder:'说点什么吧~',
            style:{color:'#000',fontSize:16}
          }}/>
        <View style={styles.imageView}>
          {
            images.map((item:any,index:number)=>{
              return <TouchableOpacity style={styles.imageBtn} key={index + 'images'}>
                <Image style={styles.image} resizeMode='cover' source={{uri:item.uri}}/>
                <TouchableOpacity style={styles.del} onPressIn={()=>onDelete(index)}>
                  <Image style={styles.delImage} source={deleteicon}/>
                </TouchableOpacity>
              </TouchableOpacity>
            })
          }
          {images.length < 9 && <TouchableOpacity style={styles.imageBtn}  onPressIn={onChangeAvator}>
            <Image style={styles.image} resizeMode='cover' source={add}/>
          </TouchableOpacity>}
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

export default Post;
