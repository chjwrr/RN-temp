
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {styles} from './styles'
import { FadeLoading } from 'react-native-fade-loading';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/utils/colors';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';


const ShareIcon = require('@/assets/images/share.png')

function FocusOn(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const isCanLoadMore = useRef(false)
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1])
  const focusList:any[] = [1,2,3,4,5,6,7,8,9,0]
  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setDataSource([{},{},{},{},{},{},{},{},{},{}])
      setLoading(false)
    }, 2000);
  },[])

  function onRefresh(){
    if (loading || refreshing){
      return
    }
    console.log('onRefresh')
    setLoading(true)
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
      setLoading(false)
      setDataSource([{},{},{},{},{},{},{},{},{},{}])
    }, 2000);
  }

  function onEndReached(){
    if (loading || refreshing){
      return
    }
    console.log('loading more')
    setLoading(true)
    setTimeout(() => {
      const temp = [...dataSource,{},{},{},{},{},{},{},{},{},{}]
      setDataSource(temp)
      isCanLoadMore.current = true
      setLoading(false)
    }, 2000);
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      data={dataSource}
      numColumns={1}
      renderItem={({ item, index })=>{
        return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView]}
          children={''}
          primaryColor={''}
          secondaryColor={''}
          duration={0}
          visible={true}
          animated={true}
        /> : <RenderItem item={item} index={index}/> 
      }}
      ListHeaderComponent={<View style={styles.scrollView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            focusList.map((item:any,index:number)=>{
              return <View style={styles.focusView} key={index+'focus'}>
                <View style={styles.focusAvatarView}>
                  <View style={styles.focusAvtar}/>
                  <View style={styles.focusTipView}/>
                </View>
                <Text style={styles.focusName}>用户名字</Text>
              </View>
            })
          }
        </ScrollView>
      </View>}
      ListEmptyComponent={<View/>}
      ListFooterComponent={<View style={styles.loadMoreView}>
      <Text style={styles.loadMoreTitle}>加载更多...</Text>
        <ActivityIndicator size="small" color={Colors.main} />
      </View>}
      initialNumToRender={10}
      ItemSeparatorComponent={()=><View style={styles.speHeight}/>}
      keyExtractor={(item, index) => 'key' + index}
      getItemLayout={(data, index) => (
        {length: 414, offset: (414+10) * index, index}
      )}
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
      }
    />
  );
}

// 顶部44 + 图片300 + 点20  + 标题20 + 内容30  = 414
function RenderItem({item,index}:any){
  const navigation = useNavigation()

  function onShowMore(){
    //@ts-ignore
    navigation.navigate('ShowDetail',{
      id:index
    })
  }
  return <View style={styles.itemView}>
    <View style={styles.itemTopView}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={styles.itemAvatar}/>
        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode='tail'>名字</Text>
      </View>
      <TouchableOpacity style={styles.shareButton}>
        <Image style={styles.share} source={ShareIcon}/>
      </TouchableOpacity>
    </View>
    <SwiperView/>
    <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode='tail'>标题</Text>
    <View style={styles.itemContent}>
      <Text style={styles.iteemCCont} numberOfLines={1} ellipsizeMode='tail'>内容内容内容内容内容内容内容内容内容</Text>
      <TouchableOpacity onPress={onShowMore}>
        <Text style={styles.itemShowMore}>查看全文</Text>
      </TouchableOpacity>
    </View>
  </View>
}

function SwiperView(){
  const [currentIndex,setCurrentIndex] = useState(0)
  const data:any[] = [1,2,3,4,5,6]
  return <View style={styles.itemScrollView}>
    <View style={{height:300,width:'100%'}}>
      <ScrollView 
        style={{flex:1}}
        horizontal={true} 
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event:any)=>{
          setCurrentIndex(Math.ceil(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 32)))
        }}
      >
        {
          data.map((item:any,index:number)=>{
          return <View style={styles.swiperTopView} key={index+'scrollitem'}>
              <Text>{index}</Text>
            </View>
          })
        }
      </ScrollView>
    </View>
    <View style={styles.itemScrollPointView}>
        {
          data.map((item:any,index:number)=>{
            return <View style={[styles.scrollPointerView,{
              backgroundColor:currentIndex == index ? Colors.buttonMain : '#CCCCCC'
            }]} key={index+'scrollPointer'}/>
          })
        }
    </View>
  </View>
}
export default FocusOn;
