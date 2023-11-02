
import React, { useEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {styles} from './styles'
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '@/utils';
import { FadeLoading } from 'react-native-fade-loading';
import WaterfallFlow from 'react-native-waterfall-flow'
import Colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';


const focus_n = require('@/assets/images/collect.png')


function Design(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const isCanLoadMore = useRef(false)
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1])

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

  function onPress(columnIndex:number){
    //@ts-ignore
    navigation.navigate('DesignDetail',{
      id:columnIndex
    })
  }

  return (
    <View style={{flex:1}}>

    <WaterfallFlow
      showsVerticalScrollIndicator={false}
      data={dataSource}
      numColumns={1}
      renderItem={({ item, index, columnIndex })=>{
        return item == 1 ? <FadeLoading
        style={[styles.flowLoadingView]}
        children={''}
        primaryColor={''}
        secondaryColor={''}
        duration={0}
        visible={true}
        animated={true}
      />: <TouchableOpacity onPress={()=>onPress(columnIndex)} style={[styles.flowView]}>
          <Text style={styles.modalName} numberOfLines={1} ellipsizeMode='tail'>模型{index}</Text>
          <Text style={styles.modalDes} numberOfLines={4} ellipsizeMode='tail'>模型介绍</Text>
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
        <Text style={styles.topTitle}>成为初代设计师</Text>
        <View style={styles.topItem}>
        </View>
      </View>}
      ListFooterComponent={<View style={styles.loadMoreView}>
        <Text style={styles.loadMoreTitle}>加载更多...</Text>
        <ActivityIndicator size="small" color={Colors.main} />
      </View>}
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
