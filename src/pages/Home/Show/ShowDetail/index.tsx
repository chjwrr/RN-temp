
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  Animated,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  LayoutAnimation,
  UIManager,
  InteractionManager
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import * as _ from 'lodash'
import Colors from '@/utils/colors';
import * as Animatable from 'react-native-animatable';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const shareIcon = require('@/assets/images/share.png')
const accountIcon = require('@/assets/images/account.png')
const collectIcon = require('@/assets/images/collect.png')
const comiconIcon = require('@/assets/images/comicon.png')
const stariconIcon = require('@/assets/images/staricon.png')
const comicontIcon = require('@/assets/images/comicont.png')
const likeiconIcon = require('@/assets/images/likeicon.png')



function RecommendDetail(props:any): JSX.Element {
  const id = props.route.params.id
  const scrollY = useRef(new Animated.Value(0)).current;
  function onBack(){
    props.navigation.goBack()
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
  const [refreshing, setRefreshing] = useState(false);
  const isCanLoadMore = useRef(false)

  function onRefresh(){
    console.log('onRefresh')

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 2000);
  }

  function onEndReached(){
    console.log('loading more')
    setTimeout(() => {
      isCanLoadMore.current = true
    }, 2000);
  }

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", default: undefined })}
        keyboardVerticalOffset={0}
        >
        <SafeAreaView style={{flex:1}}>
          <Animated.View style={[styles.navigationView,{
            backgroundColor:scrollY.interpolate({
              inputRange: [0,88],
              outputRange: ['transparent','#fff'],
            })
          }]}>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Image style={styles.backIcon} source={BackIcon}/>
              </TouchableOpacity>
              <Image style={styles.accounticon} source={accountIcon}/>
              <Text style={styles.accountTitle} numberOfLines={1} ellipsizeMode='tail'>用户名字用户名字用户名字用户名字用户名字</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:'center'}}>
              <FocusButton/>
              <TouchableOpacity style={[styles.backButton,{alignItems:'flex-end'}]} onPress={onShare}>
                <Image style={styles.backIcon} source={shareIcon}/>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <FlatList
            keyboardDismissMode={"onDrag"}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            data={[1,2,3,4,5,6,7]}
            numColumns={1}
            renderItem={({ item, index })=>{
              return <CommonItem item={item} index={index}/>
            }}
            style={{ flex: 1 }}
            ListHeaderComponent={<View style={{flex:1}}>
              <SwiperView/>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>标题</Text>
              <Text style={styles.des}>内容</Text>
              <View style={styles.line}/>
              <View style={styles.commonTitleVieew}>
                <Text style={styles.commonTitle}>共</Text>
                <Text style={styles.commonTitleMain}>16</Text>
                <Text style={styles.commonTitle}>条评论</Text>
              </View>
            </View>}
            ListEmptyComponent={<View/>}
            initialNumToRender={10}
            keyExtractor={(item, index) => 'key' + index}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: scrollY}}}
            ],{
              useNativeDriver:false
            })}
            // onEndReached={() => {
            //   if (isCanLoadMore) {
            //     onEndReached();
            //     isCanLoadMore.current = false;
            //   }
            // }}
            // onContentSizeChange={() => {
            //   isCanLoadMore.current = true;
            // }}
            // onEndReachedThreshold={0.01}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
            // }
          />
          <DownInfo/>
        </SafeAreaView>
        <SafeAreaView style={{flex:0,backgroundColor:Colors.white}}></SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

function DownInfo(){
  const [rightWidth,setRightWidth] = useState(186)
  const rightWidthAnim = useRef(new Animated.Value(0)).current;

  function onFocus(){
    // LayoutAnimation.configureNext({
    //   duration:500,
    //   create:{
    //     delay:250,
    //     type:LayoutAnimation.Types.spring,
    //   },
    //   update:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   },
    //   delete:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   }
    // })
    // Animated.timing(rightWidthAnim, {
    //   toValue: SCREEN_WIDTH,
    //   duration:2000,
    //   useNativeDriver: true,
    // }).start(()=>{
     
    // })
    // LayoutAnimation.linear()
    // setRightWidth(0)
    // setRightWidth(0)
    setRightWidth(0)
    // setTimeout(() => {
    //   downRightRef.current.transitionTo({width:0})
    // }, 2000);
  }
  function onBlur(){
    setRightWidth(186)

    // setTimeout(() => {
    //   downRightRef.current.transitionTo({width:186})
    // }, 2000);
    // Animated.timing(rightWidthAnim, {
    //   toValue: 0,
    //   duration:2000,
    //   useNativeDriver: true,
    // }).start(()=>{
     
    // })
    // LayoutAnimation.linear()
    // setRightWidth(186)
    // LayoutAnimation.configureNext({
    //   duration:500,
    //   create:{
    //     delay:250,
    //     type:LayoutAnimation.Types.spring,
    //   },
    //   update:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   },
    //   delete:{
    //     delay:250,
    //     type:LayoutAnimation.Types.linear,
    //   }})
    // setRightWidth(186)
  }

  const downRightRef = useRef<any>()
  const downLeftRef = useRef<any>()
  const inputRef = useRef<any>()

  function onCommon(){
    inputRef && inputRef.current && inputRef.current.focus()
  }
  function onCollect(){
  }
  function onLike(){
  }

  return <View style={[styles.downView]}>
    <View style={styles.downViewCon}>
      <Animatable.View ref={downLeftRef} style={[styles.comInputView]}>
        <Image style={styles.downComIcon} source={comicontIcon}/>
        <TextInput ref={inputRef} multiline={false} numberOfLines={1} style={styles.downInput} onFocus={onFocus} onBlur={onBlur}/>
      </Animatable.View>
      <Animatable.View ref={downRightRef} style={[styles.downRight,{width:rightWidth}]}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={onLike}>
          <Image style={styles.downIcon} source={likeiconIcon} resizeMode='contain'/>
          <Text style={styles.downRightTitle}>点赞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={onCollect}>
          <Image style={styles.downIcon} source={stariconIcon}/>
          <Text style={styles.downRightTitle}>收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={onCommon}>
          <Image style={styles.downIcon} source={comiconIcon}/>
          <Text style={styles.downRightTitle}>评论</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  </View>
}
function CommonItem({item,index}:any){
  return <View style={styles.comMain}>
    <View style={styles.comView}>
      <View style={styles.avatar}/>
      <View style={styles.comContent}>
        <Text style={styles.comName} numberOfLines={1} ellipsizeMode='tail'>昵称</Text>
        <Text style={styles.comContentDes}>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</Text>
        <View style={styles.comRelayButton}>
          <Text style={styles.comDay}>6天前</Text>
          <TouchableOpacity>
            <Text style={styles.comReplay}>回复</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.comFocusView}>
        <TouchableOpacity style={styles.comFocusButton}>
          <Image style={styles.collectIcon} source={collectIcon}/>
        </TouchableOpacity>
        <Text style={styles.collectTitle}>123</Text>
      </View>
    </View>
    <View style={styles.comLine}/>
  </View>
}
function FocusButton(){
  const [focus,setFocus] = useState(false)
  function onFocus(){
    setFocus(!focus)
  }
  return <TouchableOpacity style={[styles.focusButton,focus && styles.focusButtoned]} onPress={onFocus}>
    <Text style={[styles.focusTitle,focus && styles.focusTitleed]}>{focus ? '已关注' : '关注'}</Text>
  </TouchableOpacity>
}
function SwiperView(){
  const [currentIndex,setCurrentIndex] = useState(0)
  const data:any[] = [1,2,3,4,5,6]
  return <View style={styles.swiperView}>
    <Carousel
      loop
      width={SCREEN_WIDTH - 32}
      height={500}
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
  </View>
}

export default RecommendDetail;
