
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
import { SCREEN_WIDTH } from '@/utils';
import WaterfallFlow from 'react-native-waterfall-flow'
import Colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import { FadeLoading } from 'react-native-fade-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';


const focus_n = require('@/assets/images/collect.png')


function Recommend(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])
  const isCanLoadMore = useRef(false)
  const navigation = useNavigation()

  function onPress(columnIndex:number){
    // @ts-ignore
    navigation.navigate('RecommendDetail',{
      id:columnIndex
    })
  }


  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setDataSource([{},{},{},{},{}])
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
      setDataSource([{},{},{},{},{}])
    }, 2000);
  }

  function onEndReached(){
    if (loading || refreshing){
      return
    }
    console.log('loading more')
    setLoading(true)
    setTimeout(() => {
      const temp = [...dataSource,{},{},{},{},{}]
      setDataSource(temp)
      isCanLoadMore.current = true
      setLoading(false)
    }, 2000);
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
          data={[1,2,3,4,5]}
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
        ListFooterComponent={<View style={styles.loadMoreView}>
          <Text style={styles.loadMoreTitle}>加载更多...</Text>
          <ActivityIndicator size="small" color={Colors.main} />
        </View>}
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
