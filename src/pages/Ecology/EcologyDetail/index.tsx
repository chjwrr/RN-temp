
import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Platform,
  ImageBackground,
  Text,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { GAME_COLLECT, GAME_DETAIL, GAME_UNCOLLECT, TICKET_LIST } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import { Image as ExpoImage } from 'expo-image';
import { isImage } from '@/utils/common';

const BackIcon = require('@/assets/images/back_w.png')
const CollectIcon = require('@/assets/images/unlike.png')
const Collect_SIcon = require('@/assets/images/like.png')

function Ticket(props:any): JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const userInfo = useUserInfo()
  const [gameDetail,setGameDetail] = useState<any>({})
  const [isCollect,setIsCollect] = useState(false)
  useEffect(()=>{
    HTTPS.post(GAME_DETAIL,{
      "token":userInfo.token,
      game_id:props.route.params.game_id
    }).then((result:any)=>{
      setGameDetail(result.game_detail)
      setIsCollect(result.game_detail.is_collect)
    }).finally(()=>{
    })
  },[])

  function onBack(){
    props.navigation.goBack()
  }
  function onBuy(){
    
  }
  function onCollect(){
    HTTPS.post(isCollect ? GAME_UNCOLLECT : GAME_COLLECT,{
      "token":userInfo.token,
      game_id:props.route.params.game_id
    }).then((result:any)=>{
      setIsCollect(!isCollect)
    }).finally(()=>{
    })
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
  return (
    <View style={styles.main}>
      <ExpoImage
        style={styles.topImage}
        source={HTTPS.getImageUrl(gameDetail.image)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>
      <LinearGradient colors={['transparent','#000']} style={styles.bottomOp}/>
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
            <Image style={styles.collectIcon} source={isCollect ? Collect_SIcon : CollectIcon}/>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={shareIcon}/>
          </TouchableOpacity> */}
        </View>
      </Animated.View>
      {/* <SafeAreaView style={{flex:1}}> */}
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={styles.downContent}>
            <View style={styles.downView}>
              <Text style={styles.title}>{gameDetail.name}</Text>
            </View>
            {
              gameDetail.intro && JSON.parse(gameDetail.intro).map((item:string,index:number)=>{
                if (isImage(item)){
                  return <DetailImage key={item} imageName={item}/>
                }
                return <Text key={item} style={styles.detailName}>{item}</Text>
              })
            }
          </View>
        </ScrollView>
        <TouchableOpacity onPressIn={onBuy}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.buyBtn}>
            <Text style={styles.buy}>进入游戏</Text>
          </LinearGradient>
        </TouchableOpacity>
    </View>
  );
}
function DetailImage({imageName}:any){
  const [imageHeight,setImageHeight] = useState(500)
  return <ExpoImage
    style={[styles.detailImage,{
      height:imageHeight
    }]}
    source={HTTPS.getImageUrl(imageName)}
    placeholder={BLUR_HASH}
    contentFit="cover"
    transition={200}
    onLoad={(e:any)=>{
      setImageHeight((SCREEN_WIDTH - 32) * e.source.height / e.source.width)
    }}
  />
}
export default Ticket;
