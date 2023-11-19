
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import { styles } from './styles'
import { show, hidden } from '@/components/CoverModal'
import * as HTTPS from '@/api/axios'
import { useDesignCircleClothDetail } from '@/api';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const CollectIcon = require('@/assets/images/unxingxing.png')
const shareIcon = require('@/assets/images/share.png')
const downbgIcon = require('@/assets/images/downbg.png')
const hdIcon = require('@/assets/images/hd.png')
const model_left_bgIcon = require('@/assets/images/model_left_bg.png')
const model_right_bgIcon = require('@/assets/images/model_right_bg.png')
const spebgIcon = require('@/assets/images/spebg.png')
const download_nIcon = require('@/assets/images/download_n.png')
const share_nIcon = require('@/assets/images/share_n.png')


function DesignDetail(props:any): JSX.Element {
  const [showBuy,setShowBuy] = useState(false)
  const [scrollEnabled,setScrollEnabled] = useState(true)
  const scrollY = useRef(new Animated.Value(0)).current;
  const designCircleClothDetail = useDesignCircleClothDetail(props.route.params.id)

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


  function onShowDown(){
    show(<DownImage/>)
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <Animated.View style={[styles.navigationView,{
          backgroundColor:scrollY.interpolate({
            inputRange: [0,88],
            outputRange: ['transparent','#fff'],
          })
        }]}>
            <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
              <Image style={styles.backIcon} source={BackIcon}/>
            </TouchableOpacity>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onCollect}>
                <Image style={styles.collectIcon} source={CollectIcon}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
                <Image style={styles.backIcon} source={shareIcon}/>
              </TouchableOpacity>
            </View>
          </Animated.View>
        <ScrollView style={{flex:1}}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}}
          ],{
            useNativeDriver:false
          })}
          >
          <View style={styles.modalView}>
            <WebView
              source={{uri:'https://www.baidu.com'}}
              // source={{ uri: Platform.OS == 'ios' ? 'https://nextjs-3d-modal-j2fc-git-main-chjwrr.vercel.app/' : 'http://test.yingxiong123.top/' }}
              style={styles.webView}
              onTouchStart={()=>{
                setScrollEnabled(false)
              }}
              onTouchCancel={()=>{
                setScrollEnabled(true)
              }}
              onTouchEnd={()=>{
                setScrollEnabled(true)
              }}
            />
            <Text style={styles.name}>{designCircleClothDetail.data?.name}</Text>
          </View>
          <DetailInfo/>
        </ScrollView>
        <View style={styles.downView}>
          <TouchableOpacity style={[styles.downViewItem,showBuy && styles.downViewItemSel]} onPressIn={onShowDown}>
            <Image style={styles.downIcon} source={downbgIcon}/>
            <Text style={[styles.downTitle, showBuy && styles.downTitleSel]}>下载图片</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.downViewItem,styles.downViewItemRight]}>
            <Image style={styles.downIcon} source={hdIcon}/>
            <Text style={styles.downTitle}>下载3D文件</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function DetailInfo(){
  // model_right_bgIcon model_left_bgIcon
  const [selectIndex,setSelectIndex] = useState(0)
  return <View style={styles.detailInfo}>
    <ImageBackground resizeMode='cover' source={selectIndex == 0 ? model_right_bgIcon : model_left_bgIcon} style={styles.detailTopBg}>
      <TouchableOpacity style={selectIndex == 0 ? styles.detailLeftButton : styles.detailLeftButton} onPressIn={()=>setSelectIndex(0)}>
        <Text style={selectIndex == 0 ? styles.detailTopTitle : styles.detailTopTitledis}>模型介绍</Text>
      </TouchableOpacity>
      <TouchableOpacity style={selectIndex != 0 ? styles.detailRightButton : styles.detailRightButton} onPressIn={()=>setSelectIndex(1)}>
        <Text style={selectIndex != 0 ? styles.detailTopTitle : styles.detailTopTitledis}>制作公司介绍</Text>
      </TouchableOpacity>
    </ImageBackground>
    <WebView
      source={{ uri: 'https://www.baidu.com' }}
      style={styles.webDetailView}
    />
  </View>
}
function DownImage(){
  return <View style={styles.downImageView}>
    <View style={styles.downImageContent}/>
    <View style={styles.downImageLineView}>
      <View style={styles.downlinecir}/>
        <Image style={styles.downImageLine} source={spebgIcon}/>
      <View style={styles.downlinercir}/>
    </View>
    <View style={styles.downButtonView}>
      <TouchableOpacity style={styles.downImagebutton}>
        <Image style={styles.downImagebuttonicon} source={download_nIcon}/>
        <Text style={styles.downImagebuttontitle}>保存图片</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.downImagebutton,styles.downImagebuttonSpa]}>
        <Image style={styles.downImagebuttonicon} source={share_nIcon}/>
        <Text style={styles.downImagebuttontitle}>分享链接</Text>
      </TouchableOpacity>
    </View>
  </View>
}
export default DesignDetail;
