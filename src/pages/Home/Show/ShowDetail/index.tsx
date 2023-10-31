
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native';
import {styles} from './styles'
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import * as _ from 'lodash'
import Colors from '@/utils/colors';

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const shareIcon = require('@/assets/images/share.png')
const accountIcon = require('@/assets/images/account.png')
const collectIcon = require('@/assets/images/collect.png')



function RecommendDetail(props:any): JSX.Element {
  const id = props.route.params.id

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
      <SafeAreaView style={{flex:1}}>
        <View style={styles.navigationView}>
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
        </View>
        <FlatList
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
    </ImageBackground>
  );
}
function DownInfo(){
  return <View style={styles.downView}>
    <View style={styles.downViewCon}>
      
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
