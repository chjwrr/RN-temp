
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import {styles} from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { changeIsShowGuid, useIsShowGuid } from '@/redux/setting';
import { useUserInfo } from '@/redux/userInfo';
import { SCREEN_WIDTH } from '@/utils';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const BGImage = require('@/assets/images/splashbgi.png')
const Logo = require('@/assets/images/splashlogo.png')
const NextImg = require('@/assets/images/splashnext.png')

function Splash(props:any): JSX.Element {

  const isShowGuid = useIsShowGuid()
  const userInfo = useUserInfo()
  const scrollViewRef = useRef<any>()
  const [showGuid,setShowGuid] = useState(false)
  const [page,setPage] = useState(0)
  const dispatch = useDispatch()
  useEffect(()=>{
    if (!isShowGuid){
      console.log('显示用户引导')
      setTimeout(() => {
        setShowGuid(true)
      }, 1000);
    }else {
      if (userInfo && userInfo.id){
        console.log('用户已经登录')
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Tab' },
            ],
          })
        );
      }else {
        console.log('用户没有登录')
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Login' },
            ],
          })
        );
      }
    }
  },[])


  const fadeInscale = {
    from: {
      opacity: 0,
      scale:0.2
    },
    to: {
      opacity: 1,
      scale:1
    },
  };
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  function onNext(){
    if (page != 2){
      scrollViewRef.current.scrollTo({x: (page + 1) * SCREEN_WIDTH, y: 0, animated: true})
    }else {
      dispatch(changeIsShowGuid(1))
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Login' },
          ],
        })
      );
    }
  }
  return (
    <ImageBackground source={BGImage} resizeMode="contain" style={styles.bgImage}>
      {!showGuid && <Animatable.Image animation={fadeInscale} source={Logo} style={styles.logo}/>}
      {
        showGuid && <SafeAreaView style={{flex:1}}>
          <ScrollView ref={scrollViewRef} style={{flex:1}} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={400}
          onMomentumScrollEnd={(e:any)=>{
            setPage(e.nativeEvent.contentOffset.x / SCREEN_WIDTH)
          }}>
            <View style={styles.subView}>
              <Animatable.Image animation={fadeIn} source={Logo} style={styles.guidImg} resizeMode='cover'/>
              <View style={styles.downView}>
                <View style={styles.downTopView}>
                  <Text style={styles.title}>分享生活</Text>
                  <Text style={styles.des}>分享生活中的乐趣，一个人的快乐，不如一群人的快乐，独乐乐不如众乐乐</Text>
                </View>
              </View>
            </View>
            <View style={styles.subView}>
              <Animatable.Image animation={fadeIn} source={Logo} style={styles.guidImg} resizeMode='cover'/>
              <View style={styles.downView}>
                <View style={styles.downTopView}>
                  <Text style={styles.title}>记录生活</Text>
                  <Text style={styles.des}>记录生活中美好的点滴，留住美好的事物，保存美丽的生活过往</Text>
                </View>
              </View>
            </View>
            <View style={styles.subView}>
              <Animatable.Image animation={fadeIn} source={Logo} style={styles.guidImg} resizeMode='cover'/>
              <View style={styles.downView}>
                <View style={styles.downTopView}>
                  <Text style={styles.title}>享受生活</Text>
                  <Text style={styles.des}>寻找生活中的乐趣，丰富内心的生活，享受时间长河中的快乐</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.downBottomView}>
            <View style={styles.pointer}>
              {
                [1,2,3].map((item:any,index:number)=>{
                  return <View style={[styles.slidepointer,{
                    backgroundColor:page == index ? 'rgba(109, 105, 250, 1)' : 'rgba(109, 105, 250, 0.15)',
                    width:page == index ? 24 : 6
                  }]} key={index + 'pointer'}/>
                })
              }
            </View>
            <TouchableWithoutFeedback onPress={onNext}>
              <Image source={NextImg} style={styles.nextImg} resizeMode='cover'/>
            </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
      }
    </ImageBackground>
  );
}

export default Splash

