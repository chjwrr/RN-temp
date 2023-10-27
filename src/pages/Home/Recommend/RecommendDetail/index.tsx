
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  Animated
} from 'react-native';
import {styles} from './styles'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '@/utils';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const CollectIcon = require('@/assets/images/collectICON.png')
const shareIcon = require('@/assets/images/share.png')
const downbgIcon = require('@/assets/images/downbg.png')
const hdIcon = require('@/assets/images/hd.png')
const modalLineIcon = require('@/assets/images/tdbg.png')
const buytopiconIcon = require('@/assets/images/buytopicon.png')
const buylineIcon = require('@/assets/images/buyline.png')
const buybgIcon = require('@/assets/images/buybg.png')



function RecommendDetail(props:any): JSX.Element {
  const id = props.route.params.id
  const [showBuy,setShowBuy] = useState(false)

  function onBack(){
    props.navigation.goBack()
  }
  function onCollect(){

  }
  function onShare(){
    const url = 'https://awesome.contents.com/';
    const title = 'Awesome Contents';
    const message = 'Please check this out.';
    const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
    const options = Platform.select({
      default: {
        title,
        subject: title,
        message: `${message} ${url}`,
      },
    });
    Share.open(options);
  }

  const bottomAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function onShowBuy(){
    if (showBuy){
      Animated.parallel([
        Animated.timing(bottomAnim, {
          toValue: 0,
          duration:200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration:200,
          useNativeDriver: true,
        })
      ]).start(()=>{})
    }else {
      Animated.parallel([
        Animated.timing(bottomAnim, {
          toValue: -240,
          duration:200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration:200,
          useNativeDriver: true,
        })
      ]).start(()=>{})
    }
    setShowBuy(!showBuy)
  }
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <View style={styles.navigationView}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Image style={styles.backIcon} source={BackIcon}/>
            </TouchableOpacity>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPress={onCollect}>
                <Image style={styles.collectIcon} source={CollectIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPress={onShare}>
                <Image style={styles.backIcon} source={shareIcon}/>
              </TouchableOpacity>
            </View>
          </View>
          {id == 0 ? <TDModalView/> : <SwiperView/>}
          <View style={styles.detailView}>
            <ShopInfo/>
            <WebView
              source={{ uri: 'https://www.baidu.com' }}
              style={styles.webDetailView}
            />
          </View>
        </ScrollView>
        <View style={styles.downView}>
          <TouchableOpacity containerStyle={styles.buttonContrianer} style={[styles.downViewItem,showBuy && styles.downViewItemSel]} onPress={onShowBuy}>
            <Image style={styles.downIcon} source={downbgIcon}/>
            <Text style={[styles.downTitle, showBuy && styles.downTitleSel]}>服饰购买</Text>
          </TouchableOpacity>
          <TouchableOpacity containerStyle={styles.buttonContrianer} style={[styles.downViewItem,styles.downViewItemRight]}>
            <Image style={styles.downIcon} source={hdIcon}/>
            <Text style={styles.downTitle}>联名合作</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.showBuyView,{
            transform: [{translateY: bottomAnim}]
          }]}>

        </Animated.View>
        <Animated.View style={[styles.bgModal,{
          opacity:fadeAnim
        }]}/>
      </SafeAreaView>
    </ImageBackground>
  );
}
function ShopInfo(){
  const [focus,setFocus] = useState(false)
  function onFocus(){
    setFocus(!focus)
  }
  return <View style={styles.shopView}>
    <View style={{flexDirection:'row'}}>
      <View style={styles.shopIcon}/>
      <View>
        <Text style={styles.shopName}>店铺名称</Text>
        <Text style={styles.shopDes}>1.5万+收藏</Text>
      </View>
    </View>
    <TouchableOpacity style={[styles.focusdis,focus && styles.focusSel]} onPress={onFocus}>
      <Text style={[styles.shopFocus,focus && styles.shopFocussel]}>{focus ? '已关注' : '+ 关注'}</Text>
    </TouchableOpacity>
  </View>
}
function SwiperView(){
  const [currentIndex,setCurrentIndex] = useState(0)
  const data:any[] = [1,2,3,4,5,6]
  return <View style={styles.swiperView}>
    <Carousel
      loop
      width={SCREEN_WIDTH - 32}
      height={SCREEN_WIDTH + 20}
      // autoPlay={true}
      data={data}
      // scrollAnimationDuration={3000}
      onSnapToItem={(index) => setCurrentIndex(index)}
      // mode="parallax"
      // modeConfig={{
      //   parallaxScrollingScale: 0.9,
      //   parallaxScrollingOffset: 40,
      // }}
      renderItem={({ item,index }) => (
        <View style={styles.swiperTopView}>
          <Text>{index}</Text>
        </View>
      )}
      />
    <View style={styles.sliderView}>
      <Text style={styles.sliderTitle}>{currentIndex + 1}/{data.length}</Text>
    </View>
    <Text style={styles.name}>服饰名字</Text>
  </View>
}
function TDModalView(){
  return <View style={styles.modalView}>
    <WebView
      source={{ uri: 'https://nextjs-3d-modal-j2fc-git-main-chjwrr.vercel.app/' }}
      style={styles.webView}
    />
    <Image style={styles.modalLine} source={modalLineIcon}/>
    <Text style={styles.name}>服饰名字</Text>
  </View>
}

export default RecommendDetail;
