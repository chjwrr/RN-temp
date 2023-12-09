
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
import WaterfallFlow from 'react-native-waterfall-flow'
import { FadeLoading } from 'react-native-fade-loading';
import * as Animatable from 'react-native-animatable';
import { BlurView } from "@react-native-community/blur";
import * as HTTPS from '@/api/axios'
import { TICKET_LIST } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {CachedImage} from '@georstat/react-native-image-cache'
import { Image as ExpoImage } from 'expo-image';


const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_w.png')
const CollectIcon = require('@/assets/images/collwhi.png')
const shareIcon = require('@/assets/images/share_w.png')
const ticket_pro_ban_1 = require('@/assets/images/ticket_pro_ban_1.png')
const ticketavatar = require('@/assets/images/ticketavatar.png')
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


  function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(TICKET_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE,
      project_id:props.route.params.project_id,
    }).then((result:any)=>{
      if (currenPage == 0){
        setDataSource(result.ticket_list)
      }else {
        setDataSource([...dataSource,...result.ticket_list])
      }
      if (result.ticket_list.length < PAGE_SIZE){
        setIsLoadEnd(true)
      }else {
        setIsLoadEnd(false)
      }
    }).finally(()=>{
      setRefreshing(false)
      setLoading(false)
    })
  }

  useEffect(()=>{
    getData(page)
  },[page])


  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setRefreshing(true);
    setPage(0)
    getData(0)
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    console.log('loading more')
    setPage((pre:number)=>pre + 1)
  }



  function onBack(){
    props.navigation.goBack()
  }
  function onCollect(){

  }
  function onShare(){
    const url = HTTPS.getImageUrl(props.route.params.image)
    const title = props.route.params.name;
    const message = '';
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
        source={HTTPS.getImageUrl(props.route.params.image)}
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
          {/* <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onCollect}>
            <Image style={styles.collectIcon} source={CollectIcon}/>
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPressIn={onShare}>
            <Image style={styles.backIcon} source={shareIcon}/>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        columnWrapperStyle={{justifyContent:'space-between'}}
        numColumns={2}
        renderItem={({ item, index })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:2,
            marginRight:index % 2 == 0 ? 2 : 0,
            marginLeft:index % 2 == 0 ? 0 : 2,
          }]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        />: <RemmenntRenderItem item={item} columnIndex={index} 
          name={props.route.params.name}
          avatar={props.route.params.avatar}
          navigation={props.navigation}
        />
        }}
        style={{ flex: 1, paddingHorizontal:16}}
        ListHeaderComponent={
          <View style={styles.contentView}>
            <View style={styles.avatatView}>
              <ExpoImage
                style={styles.avatar}
                source={HTTPS.getImageUrl(props.route.params.avatar)}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={200}
              />
            </View>
            <Text style={styles.title}>{props.route.params.pro_name}</Text>
          </View>
        }
        ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>加载更多...</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View> : <View style={styles.loadMoreView}/>}
        ListEmptyComponent={<View/>}
        initialNumToRender={10}
        keyExtractor={(item, index) => 'key' + index}
        onEndReached={() => {
          if (isCanLoadMore) {
            onEndReached();
            isCanLoadMore.current = false;
          }
        }}
        onContentSizeChange={() => {
          isCanLoadMore.current = true;
        }}
        onEndReachedThreshold={0.01}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fff']}/>
        }
      />
    </View>
  );
}

function RemmenntRenderItem({item,columnIndex,name,avatar,navigation}:any){
  function onPress(index:any){
    navigation.navigate('BuyTicket',{
      ticket_id:item.ticket_id,
      avatar:avatar,
      name:name
    })
  }
  return <TouchableOpacity onPress={()=>onPress(columnIndex)} style={[styles.flowView,{
    marginVertical:2,
    marginRight:columnIndex % 2 == 0 ? 2 : 0,
    marginLeft:columnIndex % 2 == 0 ? 0 : 2,
  }]}>
    <View style={styles.typeItem}>
      <ExpoImage
        style={styles.typeItem}
        source={HTTPS.getImageUrl(item.image)}
        placeholder={BLUR_HASH}
        contentFit="cover"
        transition={200}
      />
      {/* <ImageBackground source={limmitBg} style={styles.limmitbg}>
        <Text style={styles.limmittitle}>限量:{item.total}份</Text>
      </ImageBackground> */}
    </View>
    <View style={styles.typeItemDown}>
      {/* <Image style={styles.typeItemDownbg} source={downBg} resizeMode='cover'/> */}
      <LinearGradient colors={['rgba(64,14,179,0.6)', 'transparent']} style={styles.typeItemDownbg}/>
      <View style={styles.flowViewSubView}>
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>{item.name}</Text>
        {/* <TouchableOpacity style={styles.focusButton}>
          <Image style={styles.flowFocus} source={focus_n}/>
        </TouchableOpacity> */}
      </View>
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowNameid}>id:{item.ticket_id}</Text>
      <View style={styles.flowViewSubView}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <ExpoImage
              style={styles.flowIcon}
              source={HTTPS.getImageUrl(avatar)}
              placeholder={BLUR_HASH}
              contentFit="cover"
              transition={200}
            />
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>{name}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={styles.moenyUni}>$</Text>
          <Text style={styles.moeny}>{item.price}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
}
export default Ticket;
