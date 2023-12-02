
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  useWindowDimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import {styles} from './styles'
import { TabView, SceneMap } from 'react-native-tab-view';
import { useUserInfo } from '@/redux/userInfo';


import AllOrderScreen from './AllOrder'
import WaitPayOrderScreen from './WaitPayOrder'

const BGImage = require('@/assets/images/homebg.png')
const BackIcon = require('@/assets/images/back_b.png')
const arrowr = require('@/assets/images/back_b_r.png')



function RecommendDetail(props:any): JSX.Element {
  const userInfo = useUserInfo()
  function onBack(){
    props.navigation.goBack()
  }


  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes =[
    { key: 'AllOrder', title: 'AllOrder' },
    { key: 'WaitPayOrder', title: 'WaitPayOrder' }
  ]

  const renderScene = useCallback(({ route, jumpTo }:any) => {
    switch (route.key) {
      case 'AllOrder':
        return <AllOrderScreen navigation={props.navigation} jumpTo={jumpTo}/>
      case 'WaitPayOrder':
        return <WaitPayOrderScreen navigation={props.navigation} jumpTo={jumpTo} />;
    }
  },[])

  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <SafeAreaView style={{flex:1}}>
        <View style={[styles.navigationView,{
        }]}>
          <TouchableOpacity style={styles.backButton} onPressIn={onBack}>
            <Image style={styles.backIcon} source={BackIcon}/>
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>全部订单</Text>
          </View>
        </View>
        <TabView
          swipeEnabled={false}
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props:any)=><TopTabbar {...props}/>}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const tabs:any[] = [
  {
    title:'全部',
    key:'AllOrder'
  },
  {
    title:'待支付',
    key:'WaitPayOrder'
  },
]
function TopTabbar(props:any){
  return <View style={styles.tabView}>
    {
      tabs.map((item:any,index:number)=>{
        return <TouchableOpacity style={[styles.tabButton]} key={item.title} onPressIn={()=>{
          props.jumpTo(item.key)
        }}>
          <Text style={[styles.tabButtonTitle,{
            fontSize:props.navigationState.index == index ? 16 : 14,
            fontWeight:props.navigationState.index == index ? '600' : '400',
          }]}>{item.title}</Text>
        </TouchableOpacity>
      })
    }
  </View>
}

export default RecommendDetail;
