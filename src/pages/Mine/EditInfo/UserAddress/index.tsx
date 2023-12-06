
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import * as _ from 'lodash'
import {CacheManager, CachedImage} from '@georstat/react-native-image-cache'
import ImagePlaceholder from '@/components/ImagePlaceholder';
import * as HTTPS from '@/api/axios'
import { Image as ExpoImage } from 'expo-image';
import { MERCHANT_CLOTH_DETAIL, MERCHANT_FOLLOW, MERCHANT_UNFOLLOW,  MERCHANT_CLOTH_UNCOLLECT , MERCHANT_CLOTH_COLLECT, MY_USER_INFO_UPDATE } from '@/api/API';
import { saveUserInfo, useUserInfo } from '@/redux/userInfo';
import { savePicture } from '@/utils/common';
import dayjs from 'dayjs';
import CustomTextInput from '@/components/CustomTextInput';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import LoadingButton from '@/components/LoadingButton';
import {Picker} from '@react-native-picker/picker';
import CitySource from '@/assets/json/pca.json'
import { TouchableOpacity } from 'react-native-gesture-handler';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const userInfo = useUserInfo()
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()

  function onBack(){
    props.navigation.goBack()
  }

  function onPost(){
    if (isLoading || secondIndex < 0)return
    setIsLoading(true)
    HTTPS.post(MY_USER_INFO_UPDATE,{
      "token":userInfo.token,
      // 'avatar': res.media_id,
      'province': CitySource[firstIndex].name,
      'city': CitySource[firstIndex].children[secondIndex].name,
      // 'birthday': 1699708371238,
      // 'email': 'xxx@163.com',
      // 'intro': inputValue
    }).then((result:any)=>{
      dispatch(saveUserInfo({
        ...userInfo,
        'province': CitySource[firstIndex].name,
        'city': CitySource[firstIndex].children[secondIndex].name
      }))
      onBack()
    }).finally(()=>{
      setIsLoading(false)
    })
  }

  const [firstIndex,setFirstIndex] = useState(0)
  const [secondIndex,setSecondIndex] = useState(-1)
  const [threeIndex,setThreeIndex] = useState(-1)

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <View style={[styles.navigationView,{
        }]}>
          <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
            <Image style={styles.backIcon} source={BackIcon}/>
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>选择地址</Text>
          </View>
          <LoadingButton isLoading={isLoading} style={styles.backButton} onPressIn={onPost}>
            <Text style={[styles.title,{textAlign:'right'}]}>修改</Text>
          </LoadingButton>
        </View>
        <Text style={styles.selectTitle}>
          {CitySource[firstIndex].name} 
          {secondIndex > -1 && CitySource[firstIndex].children[secondIndex].name} 
          {threeIndex > -1 && CitySource[firstIndex].children[secondIndex].children[threeIndex]?.name} 
          </Text>
        <View style={styles.flatView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={CitySource}
            renderItem={({ item, index }:any)=>{
              return <TouchableOpacity onPress={()=>{
                setFirstIndex(index)
                setSecondIndex(-1)
                setThreeIndex(-1)
              }} style={[styles.itemBtn,firstIndex == index && styles.itemBtnSel]}>
                <Text style={[styles.titleS,firstIndex == index && styles.titleSel]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
              
            }}
            style={styles.flatList}
            ListEmptyComponent={<View/>}
            initialNumToRender={10}
            keyExtractor={(item, index) => 'key' + item.name + item.code}
          />
          <View style={{width:16,height:'100%'}}/>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={CitySource[firstIndex].children}
            renderItem={({ item, index }:any)=>{
              return <TouchableOpacity onPress={()=>{
                setSecondIndex(index)
                setThreeIndex(-1)
              }} style={[styles.itemBtn,secondIndex == index && styles.itemBtnSel]}>
                <Text style={[styles.titleS,secondIndex == index && styles.titleSel]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
              
            }}
            style={styles.flatList}
            ListEmptyComponent={<View/>}
            initialNumToRender={10}
            keyExtractor={(item, index) => 'key' + item.name + item.code}
          />
          <View style={{width:16,height:'100%'}}/>
           <FlatList
            showsVerticalScrollIndicator={false}
            data={CitySource[firstIndex].children[secondIndex]?.children}
            renderItem={({ item, index }:any)=>{
              return <TouchableOpacity onPress={()=>{
                setThreeIndex(index)
              }} style={[styles.itemBtn,threeIndex == index && styles.itemBtnSel]}>
                <Text style={[styles.titleS,threeIndex == index && styles.titleSel]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
              
            }}
            style={styles.flatList}
            ListEmptyComponent={<View/>}
            initialNumToRender={10}
            keyExtractor={(item, index) => 'key' + item.name + item.code}
          />
        </View>
       


       
      </SafeAreaView>
    </ImageBackground>
  );
}
export default RecommendDetail;
