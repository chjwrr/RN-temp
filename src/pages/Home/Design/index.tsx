
import React, { useRef, useState } from 'react';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';


const focus_n = require('@/assets/images/collect.png')


function Design(props:any): JSX.Element {
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


  const navigation = useNavigation()
  function onPress(columnIndex:number){
    navigation.navigate('DesignDetail',{
      id:columnIndex
    })
  }

  return (
    <View style={{flex:1}}>

    <WaterfallFlow
      showsVerticalScrollIndicator={false}
      data={[1,2,3,4,5,6,7]}
      numColumns={1}
      renderItem={({ item, index, columnIndex })=>{
        return <TouchableOpacity onPress={()=>onPress(columnIndex)} style={[styles.flowView]}>
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
