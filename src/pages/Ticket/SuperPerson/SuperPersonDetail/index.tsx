
import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  Platform,
  FlatList,
  Text,
  Image,
  RefreshControl,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { BLUR_HASH, PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import WaterfallFlow from 'react-native-waterfall-flow'
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { MASTER_DETAIL, MASTER_UNFOLLOW, PROJECT_LIST, MASTER_FOLLOW } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';


const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_1.png')
const BackIcon = require('@/assets/images/back_w.png')
const CollectIcon = require('@/assets/images/collwhi.png')
const shareIcon = require('@/assets/images/share_w.png')
const pertopbg = require('@/assets/images/pertopbg.png')
const tick_icon_2 = require('@/assets/images/tick_icon_2.png')
const numbg = require('@/assets/images/numbg.png')
const tabButtonBg = require('@/assets/images/buttonbg.png')
const downbg = require('@/assets/images/downbg.png')
const focus_n = require('@/assets/images/collwhi.png')
const limmitBg = require('@/assets/images/limmitBg.png')
const downBg = require('@/assets/images/ticketitembg.png')





function Ticket(props:any): JSX.Element {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()
  const recommonList = [1,2,3,4,5,6,7,8]
  const [masterInfo,setMasterInfo] = useState<any>({})
  useEffect(()=>{
    onGetProjectList(0)
    onGetMasterDetail()
  },[])

  function onGetMasterDetail(){
    HTTPS.post(MASTER_DETAIL,{
      "token":userInfo.token,
      master_id: props.route.params.master_id
    }).then((result:any)=>{
      setMasterInfo(result.master_detail)
    }).finally(()=>{
    })
  }
  function onGetProjectList(currenPage:number){
    HTTPS.post(PROJECT_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE,
      master_id: props.route.params.master_id
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.project_list)
        // setDataSource([{},{},{},{},{},{},{}])
      }else {
        setDataSource([...dataSource,...result.project_list])
      }
      if (result.project_list.length < PAGE_SIZE){
        setIsLoadEnd(true)
      }else {
        setIsLoadEnd(false)
      }
      setPage(currenPage)
    }).finally(()=>{
      setRefreshing(false)
      setLoading(false)
    })
  }


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
  return (
    <View style={styles.main}>
      <Image style={styles.topImage} source={pertopbg}/>
      <LinearGradient colors={['#000', 'transparent']} style={styles.topOp}/>
      <LinearGradient colors={['transparent','#000']} style={styles.bottomOp}/>
      <Animated.View style={[styles.navigationView,{
        backgroundColor:scrollY.interpolate({
          inputRange: [0,88],
          outputRange: ['transparent','#000'],
        })
      }]}>
        <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
          <Image style={styles.backIcon} source={BackIcon}/>
        </TouchableOpacity>
        <View style={{flexDirection:"row"}}>
          {/* <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onCollect}>
            <Image style={styles.collectIcon} source={CollectIcon}/>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={shareIcon}/>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}}
        ],{
          useNativeDriver:false
        })}>
        <TopInfo masterInfo={masterInfo}/>
        <View style={styles.line}/>
        <Text style={styles.title}>系列作品</Text>
        {
          dataSource.map((item:any,index:number)=>{
            return <View style={styles.bannerView} key={index+'spdb'}>
              <ExpoImage
                style={styles.banner}
                source={HTTPS.getImageUrl(item.image)}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
            </View>
          })
        }
        <Text style={[styles.title,{marginTop:32}]}>热门推荐</Text>
        <View style={styles.scrollView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            recommonList.map((item:any,index:number)=>{
              return <TouchableOpacity style={[styles.recmmonItem,{
                marginRight:index == recommonList.length - 1 ? 0 : 8
              }]} key={index+'spdr'} onPress={()=>{
                props.navigation.navigate('SuperPersonDetail',{
                  id:0
                })
              }}>
                <ExpoImage
                  style={styles.focusAvatarView}
                  source={ticket_pro_ban_1}
                  placeholder={BLUR_HASH}
                  contentFit="cover"
                  transition={200}
                />
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearsellView}>
                  <Text style={styles.numberdestitle}>热卖中</Text>
                </LinearGradient>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.itemName}>项目01</Text>
                <Text style={styles.itemID}>ID:01</Text>
              </TouchableOpacity>
            })
          }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
function TopInfo({masterInfo}:any){
  const [isFocus,setIsFocus] = useState(false)
  const userInfo = useUserInfo()
  useEffect(()=>{
    setIsFocus(masterInfo.is_follow)
  },[masterInfo])
  function onFocus(){
    HTTPS.post(isFocus ? MASTER_UNFOLLOW : MASTER_FOLLOW,{
      "token":userInfo.token,
      master_id:masterInfo.master_id
    }).then((result:any)=>{
      setIsFocus(!isFocus)
    }).finally(()=>{
    })
  }
  return <View style={styles.topView}>
    <View style={styles.infoView}>
      <ExpoImage
        style={styles.avatar}
        source={masterInfo.avatar}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      <View>
        <Text style={styles.name}>{masterInfo.name}</Text>
        {/* <Text style={styles.des}>衣互号：{masterInfo.}</Text>
        <Text style={styles.des}>IP属地：北京</Text> */}
      </View>
    </View>
    <View style={styles.infoView}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearView}>
        <Text style={styles.desinfo}>金牛座</Text>
      </LinearGradient>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearView}>
        <Text style={styles.desinfo}>**爱好者</Text>
      </LinearGradient>
    </View>
    <View style={styles.numberView}>
      <View style={styles.numItem}>
        <Text style={styles.number}>0</Text>
        <Text style={styles.numberdes}>动态</Text>
      </View>
      <View style={styles.numItem}>
        <Text style={styles.number}>0</Text>
        <Text style={styles.numberdes}>关注</Text>
      </View>
      <View style={styles.numItem}>
        <Text style={styles.number}>0</Text>
        <Text style={styles.numberdes}>粉丝</Text>
      </View>
      <View style={styles.infoView}>
        <TouchableOpacity onPressIn={onFocus}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearVienumw}>
            <Text style={styles.numberdestitle}>{isFocus ? '-关注' : '+关注'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearVienumw}>
            <Text style={styles.numberdestitle}>发消息</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </View>
}

export default Ticket;
