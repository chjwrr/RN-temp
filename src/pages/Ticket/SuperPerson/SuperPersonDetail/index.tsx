
import React, { useEffect, useRef, useState } from 'react';
import {
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
import { TouchableOpacity } from 'react-native-gesture-handler';
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
import { MASTER_DETAIL, MASTER_UNFOLLOW, PROJECT_LIST, MASTER_FOLLOW,PROJECT_RECOMMEND_LIST } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';


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
  const [recommonList,seRecommenList] = useState<any[]>([])
  const [masterInfo,setMasterInfo] = useState<any>({})
  useEffect(()=>{
    onGetProjectList(0)
    onGetMasterDetail()
    getRecommenList()
  },[])

  function getRecommenList(){
    HTTPS.post(PROJECT_RECOMMEND_LIST,{
      "token":userInfo.token,
      "limit":5,
      offset:0
    }).then((result:any)=>{
      seRecommenList(result.project_recommend_list)
    }).finally(()=>{
    })
  }

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
    // const url = HTTPS.getImageUrl(projectDetail.image)
    // const title = 'Cverselink';
    // const message = '';
    // const options = Platform.select({
    //   default: {
    //     title,
    //     subject: title,
    //     message: `${message} ${url}`,
    //   },
    // });
    // Share.open(options);
  }
  const {t} = useTranslationLanguage()
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
          {/* <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={shareIcon}/>
          </TouchableOpacity> */}
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
        <TopInfo navigation={props.navigation} masterInfo={masterInfo} onFocusChange={props.route.params.onFocusChange}/>
        <View style={styles.line}/>
        <Text style={styles.title}>{t('series of works')}</Text>
        {
          dataSource.map((item:any,index:number)=>{
            return <TouchableOpacity style={styles.bannerView} key={index+'spdb'} onPress={()=>{
              // props.navigation.navigate('TicketBannerDetailList',{
              //   project_id:item.project_id,
              //   image:item.image,
              //   avatar:masterInfo.avatar,
              //   pro_name:item.name,
              //   name:masterInfo.name
              // })
              props.navigation.navigate('TicketBannerDetail',{
                project_id:item.project_id
              })
            }}>
              <ExpoImage
                style={styles.banner}
                source={HTTPS.getImageUrl(item.image)}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
            </TouchableOpacity>
          })
        }
        <Text style={[styles.title,{marginTop:32}]}>{t('Popular recommendations')}</Text>
        <View style={styles.scrollView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            recommonList.map((item:any,index:number)=>{
              return <TouchableOpacity style={[styles.recmmonItem,{
                marginRight:index == recommonList.length - 1 ? 0 : 8
              }]} key={index+'spdr'} onPress={()=>{
                props.navigation.navigate('TicketBannerDetail',{
                  project_id:item.project_id
                })
              }}>
                <ExpoImage
                  style={styles.focusAvatarView}
                  source={HTTPS.getImageUrl(item.image)}
                  placeholder={BLUR_HASH}
                  contentFit="cover"
                  transition={200}
                />
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearsellView}>
                  <Text style={styles.numberdestitle}>{t('on sale')}</Text>
                </LinearGradient>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemID}>ID:{item.project_id}</Text>
              </TouchableOpacity>
            })
          }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
function TopInfo({masterInfo,onFocusChange,navigation}:any){
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
      onFocusChange && onFocusChange(!isFocus)
    }).finally(()=>{
    })
  }
  const {t} = useTranslationLanguage()
  return <View style={styles.topView}>
    <View style={styles.infoView}>
      <ExpoImage
        style={styles.avatar}
        source={HTTPS.getImageUrl(masterInfo.avatar)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      <View>
        <Text style={styles.name}>{masterInfo.name}</Text>
        <Text style={[styles.des,{width:200}]} numberOfLines={1} ellipsizeMode='tail'>{t('clothing number')}：{masterInfo.master_id}</Text>
        <Text style={styles.des}>{t('IP territory')}：-</Text>
      </View>
    </View>
    {/* <View style={styles.infoView}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearView}>
        <Text style={styles.desinfo}>金牛座</Text>
      </LinearGradient>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearView}>
        <Text style={styles.desinfo}>**爱好者</Text>
      </LinearGradient>
    </View> */}
    <View style={styles.numberView}>
      <View style={styles.numItem}>
        <Text style={styles.number}>{masterInfo.article_count}</Text>
        <Text style={styles.numberdes}>{t("dynamic")}</Text>
      </View>
      <View style={styles.numItem}>
        <Text style={styles.number}>{masterInfo.follow_count}</Text>
        <Text style={styles.numberdes}>{t('following')}</Text>
      </View>
      <View style={styles.numItem}>
        <Text style={styles.number}>{masterInfo.follower_count}</Text>
        <Text style={styles.numberdes}>{t('fan')}</Text>
      </View>
      <View style={styles.infoView}>
        <TouchableOpacity onPressIn={onFocus}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearVienumw}>
            <Text style={styles.numberdestitle}>{isFocus ? t('unsubscribe') : t('Click to follow')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={()=>{
          navigation.navigate('SendMessage',{
            info:masterInfo,
            isDark:true
          })
        }}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(140,105,255)', 'rgb(0,102,255)']} style={styles.linearVienumw}>
            <Text style={styles.numberdestitle}>{t('send message')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </View>
}

export default Ticket;
