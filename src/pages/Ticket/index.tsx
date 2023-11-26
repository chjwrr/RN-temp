
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  Image,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import {styles} from './styles'
import Colors from '@/utils/colors';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Animatable from 'react-native-animatable';
import { NAVIGATION_HEIGHT, STATUSBAR_HEIGHT } from '@/utils';

import RecommendScreen from './Recommend'
import SuperPersonScreen from './SuperPerson'
import FocusOnScreen from './FocusOn'

let recommendShowTab = false
function Home({navigation}:any): JSX.Element {
  const [searchValue,setSearchValue] = useState('')
  const [showTab,setShowTab] = useState(false)

  function onSearch(){

  }
  function onAccount(){

  }
  function onSearchChange(e:any){
    setSearchValue(e.nativeEvent.text)
  }

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes =[
    { key: 'Recommend', title: 'Recommend' },
    { key: 'SuperPerson', title: 'SuperPerson' },
    { key: 'FocusOn', title: 'FocusOn' },
    { key: 'Play', title: 'Play' },

  ]

  const renderScene = useCallback(({ route, jumpTo }:any) => {
    switch (route.key) {
      case 'Recommend':
        return <RecommendScreen navigation={navigation} jumpTo={jumpTo} tabState={(show:boolean,index:number)=>{
          setShowTab(show)
          onChangeType(index)
          if (index == 0){
            recommendShowTab = show
          }
        }} onItemPress={(item:any)=>{
          navigation.navigate('BuyTicket',{
            id:item.ticket_id
          })
        }} onBannerPress={(item:any)=>{
          navigation.navigate('TicketBannerDetail',{
            id:0
          })
        }}/>
      case 'SuperPerson':
        return <SuperPersonScreen navigation={navigation} jumpTo={jumpTo} />;
      case 'FocusOn':
        return <FocusOnScreen navigation={navigation} jumpTo={jumpTo} />;
      case 'Play':
        return <SuperPersonScreen navigation={navigation} jumpTo={jumpTo} />;
    }
  },[])

  const [currentType,setCurrentType] = useState(0)
  function onChangeType(index:any){
    setCurrentType(index)
  }

  return (
      <View style={{
        flex: 1,
        backgroundColor:Colors.black
      }}>
      <TabView
        swipeEnabled={false}
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props:any)=><TopTabbar showTab={showTab} {...props} onChange={onChangeType} current={currentType}/>}
        onIndexChange={(index:number)=>{
          setIndex(index)
          if (index == 0){
            setShowTab(recommendShowTab)
          }else {
            setShowTab(true)
          }
        }}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}

const tabs:any[] = [
  {
    title:'推荐',
    icon_n:require('@/assets/images/ticket_tj.png'),
    icon_s:require('@/assets/images/ticket_tj_s.png'),
    key:'Recommend'
  },
  {
    title:'达人',
    icon_n:require('@/assets/images/ticket_sj.png'),
    icon_s:require('@/assets/images/ticket_sj_s.png'),
    key:'SuperPerson'
  },
  {
    title:'关注',
    icon_n:require('@/assets/images/ticket_xc.png'),
    icon_s:require('@/assets/images/ticket_xc_s.png'),
    key:'FocusOn'
  },
  {
    title:'玩圈',
    icon_n:require('@/assets/images/ticket_gz.png'),
    icon_s:require('@/assets/images/ticket_gz_s.png'),
    key:'Play'
  },
]
function TopTabbar({onChange,current,showTab,jumpTo}:any){
  const animatedView = useRef<any>()
  useEffect(()=>{
    if (showTab){
      console.log('show')
      animatedView.current.transitionTo({ opacity: 1,height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT })
    }else {
      console.log('hidden')

      animatedView.current.transitionTo({ opacity: 0,height:0 })
    }
  },[showTab])
  return <Animatable.View duration={250} easing={'linear'} ref={animatedView} style={[styles.navigationView]}>
    {
      tabs.map((item:any,index:number)=>{
        return <TouchableOpacity style={[styles.tabButton]} key={item.title+'type'} onPressIn={()=>{
          onChange(index)
          jumpTo(item.key)
        }}>
          <ImageBackground style={styles.tabButtonBg} source={current == index ? item.icon_s : item.icon_n}>
            <Text style={{
              fontSize:current == index ? 18 : 14,
              fontWeight:current == index ? '600' : '400',
              color:current == index ? Colors.white : Colors.light
            }}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      })
    }
  </Animatable.View>
}


export default Home;
