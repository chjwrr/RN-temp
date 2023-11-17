
import React, { useEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles'
import Carousel from 'react-native-reanimated-carousel';
import { PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import WaterfallFlow from 'react-native-waterfall-flow'
import Colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { FadeLoading } from 'react-native-fade-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserInfo } from '@/redux/userInfo';
import * as HTTPS from '@/api/axios'
import { RECOMMEND_MERCHANT_CLOTH_LIST } from '@/api/API';


const focus_n = require('@/assets/images/collect.png')


function Recommend(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const navigation = useNavigation()
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  async function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(RECOMMEND_MERCHANT_CLOTH_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      console.log('result=',)
      if (currenPage == 0){
        setDataSource(result.recommend_merchant_cloth_list)
      }else {
        setDataSource([...dataSource,...result.recommend_merchant_cloth_list])
      }
      if (result.recommend_merchant_cloth_list.length < PAGE_SIZE){
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



  function onPress(columnIndex:number){
    // @ts-ignore
    navigation.navigate('RecommendDetail',{
      id:columnIndex
    })
  }


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

  console.log('当前数据条数=',dataSource.length)
  return (
    <View style={{flex:1}}>
      <WaterfallFlow
        showsVerticalScrollIndicator={false}
        data={dataSource}
        numColumns={2}
        renderItem={({ item, index, columnIndex })=>{
          return item == 1 ? <FadeLoading
          style={[styles.flowLoadingView,{
            marginVertical:2,
            marginRight:columnIndex == 0 ? 2 : 0,
            marginLeft:columnIndex == 0 ? 0 : 2,
          }]}
          children={''}
          primaryColor={'#a6abe2'}
          secondaryColor={'#b391e8'}
          duration={0}
          visible={true}
          animated={true}
        />: <TouchableOpacity onPress={()=>onPress(columnIndex)} style={[styles.flowView,{
            marginVertical:2,
            marginRight:columnIndex == 0 ? 2 : 0,
            marginLeft:columnIndex == 0 ? 0 : 2
          }]}>
            <View style={styles.flowViewIcon}/>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>服饰的名称</Text>
            <View style={styles.flowViewSubView}>
              <View style={{flexDirection:'row'}}>
                <View style={styles.flowIcon}/>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>淘宝旗舰店</Text>
              </View>
              <TouchableOpacity style={styles.focusButton}>
                <Image style={styles.flowFocus} source={focus_n}/>
              </TouchableOpacity>
            </View>
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
          <Text style={styles.topTitle}>穿越不同朝代</Text>
          <View style={styles.topItem}>
            <TouchableOpacity containerStyle={styles.topItemSub}>
              <Text style={styles.topItemName}>唐</Text>
            </TouchableOpacity>
            <TouchableOpacity containerStyle={[styles.topItemSub,styles.topItemSubSpa]}>
              <Text style={styles.topItemName}>宋</Text>
            </TouchableOpacity>
            <TouchableOpacity containerStyle={styles.topItemSub}>
              <Text style={styles.topItemName}>元</Text>
            </TouchableOpacity>
          </View>
        </View>}
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.main]}/>
        }
      />
    </View>
  );
}

export default Recommend;
