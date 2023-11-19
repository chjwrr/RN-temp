
import React, { useEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from 'react-native';
import {styles} from './styles'
import Carousel from 'react-native-reanimated-carousel';
import { PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import { FadeLoading } from 'react-native-fade-loading';
import WaterfallFlow from 'react-native-waterfall-flow'
import Colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as HTTPS from '@/api/axios'
import { DESIGN_CIRCLE_CLOTH_LIST } from '@/api/API';
import { useUserInfo } from '@/redux/userInfo';
import {CachedImage} from '@georstat/react-native-image-cache'
import ImagePlaceholder from '@/components/ImagePlaceholder';

function Design(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const isCanLoadMore = useRef(false)
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()


  async function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(DESIGN_CIRCLE_CLOTH_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      console.log('result=',)
      if (currenPage == 0){
        setDataSource(result.design_circle_cloth_list)
      }else {
        setDataSource([...dataSource,...result.design_circle_cloth_list])
      }
      if (result.design_circle_cloth_list.length < PAGE_SIZE){
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
    // setTimeout(() => {
    //   setRefreshing(false)
    //   setLoading(false)
    //   setDataSource([{},{},{},{},{}])
    // }, 2000);
  }

  function onEndReached(){
    if (loading || refreshing || isLoadEnd){
      return
    }
    console.log('loading more')
    setPage((pre:number)=>pre + 1)
  }

  function onPress(cloth_id:number){
    //@ts-ignore
    navigation.navigate('DesignDetail',{
      id:cloth_id
    })
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataSource}
        numColumns={1}
        renderItem={({ item, index })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        /> : <TouchableOpacity onPressIn={()=>onPress(item.cloth_id)} style={[styles.flowView]}>
            <CachedImage
              resizeMode='cover'
              source={HTTPS.getImageUrl(item.image)}
              style={styles.itemImage}
              blurRadius={30}
              loadingImageComponent={ImagePlaceholder}
              />
            <Text style={styles.modalName} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
            <Text style={styles.modalDes} numberOfLines={4} ellipsizeMode='tail'>{item.intro}</Text>
          </TouchableOpacity>
        }}
        style={{ flex: 1 }}
        ListHeaderComponent={<View style={{flex:1}}>
          <Carousel
          loop
          width={SCREEN_WIDTH - 32}
          height={160}
          autoPlay={true}
          data={dataSource}
          scrollAnimationDuration={3000}
          onSnapToItem={(index) => {}}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 40,
          }}
          renderItem={({ item,index }) => (
            <View style={styles.swiperView}>
              <Text>{index}</Text>
            </View>
          )}
          />
          <Text style={styles.topTitle}>成为初代设计师</Text>
          <View style={styles.topItem}>
          </View>
        </View>}
        ListFooterComponent={!isLoadEnd ? <View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>加载更多...</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View> : <View style={styles.loadMoreView}>
        </View> }
        ListEmptyComponent={<View/>}
        ItemSeparatorComponent={()=><View style={styles.separator}/>}
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
        }
      />
    </View>
  );
}

export default Design;
