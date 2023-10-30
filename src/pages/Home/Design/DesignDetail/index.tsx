
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
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import { styles } from './styles'
const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const CollectIcon = require('@/assets/images/collectICON.png')
const shareIcon = require('@/assets/images/share.png')
const downbgIcon = require('@/assets/images/downbg.png')
const hdIcon = require('@/assets/images/hd.png')
const modalLineIcon = require('@/assets/images/tdbg.png')
function DesignDetail(props:any): JSX.Element {
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


  function onShowBuy(){
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
          <TDModalView/>
        </ScrollView>
        <View style={styles.downView}>
          <TouchableOpacity containerStyle={styles.buttonContrianer} style={[styles.downViewItem,showBuy && styles.downViewItemSel]} onPress={onShowBuy}>
            <Image style={styles.downIcon} source={downbgIcon}/>
            <Text style={[styles.downTitle, showBuy && styles.downTitleSel]}>下载图片</Text>
          </TouchableOpacity>
          <TouchableOpacity containerStyle={styles.buttonContrianer} style={[styles.downViewItem,styles.downViewItemRight]}>
            <Image style={styles.downIcon} source={hdIcon}/>
            <Text style={styles.downTitle}>下载3D文件</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
function TDModalView(){
  return <View style={styles.modalView}>
    <WebView
      source={{ uri: 'https://nextjs-3d-modal-j2fc-git-main-chjwrr.vercel.app/' }}
      style={styles.webView}
    />
    <Text style={styles.name}>模型名字</Text>
  </View>
}

export default DesignDetail;
