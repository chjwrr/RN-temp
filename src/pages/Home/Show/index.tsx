
import React, { useEffect, useRef, useState } from 'react';
import {
  RefreshControl,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {styles} from './styles'
import Carousel from 'react-native-reanimated-carousel';
import { PAGE_SIZE, SCREEN_WIDTH } from '@/utils';
import { FadeLoading } from 'react-native-fade-loading';
import WaterfallFlow from 'react-native-waterfall-flow'
import Colors from '@/utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUserInfo } from '@/redux/userInfo';
import { FOLLOWING_ARTICLE_LIST } from '@/api/API';
import * as HTTPS from '@/api/axios'


const focus_n = require('@/assets/images/collect.png')


function Show(props:any): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const isCanLoadMore = useRef(false)
  const [loading, setLoading] = useState(false);
  const [dataSource,setDataSource] = useState<any[]>([1,1,1,1,1,1])
  const [page,setPage] = useState(0)
  const [isLoadEnd,setIsLoadEnd] = useState(false)
  const userInfo = useUserInfo()

  async function getData(currenPage:number){
    setLoading(true)
    HTTPS.post(FOLLOWING_ARTICLE_LIST,{
      "token":userInfo.token,
      "limit":PAGE_SIZE,
      offset:currenPage * PAGE_SIZE
    }).then((result:any)=>{
      console.log('result=',)
      if (currenPage == 0){
        setDataSource(result.following_article_list)
      }else {
        setDataSource([...dataSource,...result.following_article_list])
      }
      if (result.following_article_list.length < PAGE_SIZE){
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



  function onPress(columnIndex:number){
    props.navigation.navigate('ShowDetail',{
      id:columnIndex
    })
  }

  return (
    <View style={{flex:1}}>

    <FlatList
      showsVerticalScrollIndicator={false}
      data={dataSource}
      numColumns={2}
      columnWrapperStyle={{justifyContent:'space-between'}}
      renderItem={({ item, index })=>{
        return item == 1 ? <FadeLoading
        style={[styles.flowLoadingView,{
          marginVertical:2,
          marginRight:index % 2 == 0 ? 2 : 0,
          marginLeft:index % 2 == 0 ? 0 : 2
        }]}
        children={''}
        primaryColor={'#a6abe2'}
        secondaryColor={'#b391e8'}
        duration={0}
        visible={true}
        animated={true}
      />: <TouchableOpacity onPressIn={()=>onPress(index)} style={[styles.flowView,{
          marginVertical:2,
          marginRight:index % 2 == 0 ? 2 : 0,
          marginLeft:index % 2 == 0 ? 0 : 2
        }]}>
          <View style={styles.flowViewIcon}/>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowViewTitle}>标题</Text>
          <View style={styles.flowViewSubView}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.flowIcon}/>
              <Text ellipsizeMode='tail' numberOfLines={1} style={styles.flowName}>内容</Text>
            </View>
            <TouchableOpacity style={styles.focusButton}>
              <Image style={styles.flowFocus} source={focus_n}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      }}
      style={{ flex: 1, width:SCREEN_WIDTH - 32 }}
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

export default Show;
