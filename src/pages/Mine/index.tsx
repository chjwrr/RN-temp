
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Button,
  ScrollView,
  Animated
} from 'react-native';
import {styles} from './styles'
import { NAVIGATION_HEIGHT, STATUSBAR_HEIGHT } from '@/utils';
import { CachedImage, CacheManager } from '@georstat/react-native-image-cache';
import ImagePlaceholder from '@/components/ImagePlaceholder';


const prefetchImage =
  'https://upload.wikimedia.org/wikipedia/commons/0/02/Oia_dal_battello_al_tramonto_-_Santorini_-_Grecia_-_agosto_2018.jpg';

const prefetchImageTwo =
  'https://upload.wikimedia.org/wikipedia/commons/4/48/Thira_%28Santorini%29_-_Ia-01.jpg';

const prefetchImageThree =
  'https://upload.wikimedia.org/wikipedia/commons/3/37/Oia_sunset_-_panoramio_%282%29.jpg';



function Mine(): JSX.Element {

  return (
    <View  style={{
      flex: 1
    }}>
      {
        Platform.OS == 'ios' ? <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={'padding'}
        keyboardVerticalOffset={STATUSBAR_HEIGHT + NAVIGATION_HEIGHT}
        >
          <Content/>
        </KeyboardAvoidingView> : <Content/>
      }
    </View>
  );
}
const imageHeight = 200
const navHeight = STATUSBAR_HEIGHT + NAVIGATION_HEIGHT
function Content(){
  const scrollY = useRef(new Animated.Value(0)).current;
  console.log('scrollY=',scrollY)

  return <View style={styles.mainView}>
    <Animated.Image source={{uri:'https://img2.baidu.com/it/u=3219906533,2982923681&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'}}
      style={[{
        width:'100%',
        height:imageHeight,
        position:'absolute',
        top:0,
        zIndex:2
      },{
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [-imageHeight, 0, imageHeight - navHeight, imageHeight],
            outputRange: [imageHeight / 2, 0, -(imageHeight - navHeight), -(imageHeight - navHeight)],
          })
        }, {
          scale: scrollY.interpolate({
            inputRange: [-imageHeight, 0, imageHeight],
            outputRange: [2, 1, 1],
          })
        }]
      }]}
    
    />

    <SafeAreaView style={{flex:1,width:'100%'}}>

    <ScrollView style={{flex:1,width:'100%'}}
    contentContainerStyle={{paddingTop:imageHeight}}
    scrollEventThrottle={16}
    onScroll={Animated.event([
      {nativeEvent: {contentOffset: {y: scrollY}}}
    ],{
      useNativeDriver:false
    })}
      // onScroll={(e:any)=>{
      //   console.log('e.nativeEvent.contentOffset==',e.nativeEvent.contentOffset)
      // }}
    >
      <Text style={styles.title}>Min</Text>
      <Text style={[styles.title,{
        height:200,
        marginVertical:10,
        backgroundColor:'blue'
      }]}>bottom</Text>
      <Text style={[styles.title,{
        height:200,
        marginVertical:10,
        backgroundColor:'blue'
      }]}>bottom</Text>
      <Text style={[styles.title,{
        height:200,
        marginVertical:10,
        backgroundColor:'blue'
      }]}>bottom</Text>
      <Text style={[styles.title,{
        height:200,
        marginVertical:10,
        backgroundColor:'blue'
      }]}>bottom</Text>
      <Text style={[styles.title,{
        height:200,
        marginVertical:10,
        backgroundColor:'blue'
      }]}>bottom</Text>
      <CachedImage
        source={'https://img2.baidu.com/it/u=3219906533,2982923681&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'}
        style={{ height: 200, width: 200 }}
        blurRadius={30}
        loadingImageComponent={ImagePlaceholder}
        thumbnailSource='https://img2.baidu.com/it/u=3219906533,2982923681&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
        />


      <Button
        title="清理 CachedImage 缓存"
        onPress={async() => {
          await CacheManager.clearCache();
        }}
      />
    </ScrollView>

      <TextInput  style={{
        width:'100%',
        height:44,
        backgroundColor:'purple',
      }} placeholder='enter'/>
          </SafeAreaView>

    </View>
}

export default Mine;
