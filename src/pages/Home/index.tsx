
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Text,
  View,
  TextInput,
  Image,
  useWindowDimensions
} from 'react-native';
import {styles} from './styles'
import Colors from '@/utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import RecommendScreen from './Recommend'
import DesignScreen from './Design'
import ShowScreen from './Show'
import FocusOnScreen from './FocusOn'


const BGImage = require('@/assets/images/homebg.png')
const AccountImage = require('@/assets/images/account.png')
const SearchImage = require('@/assets/images/search.png')

const renderScene = SceneMap({
  Recommend: RecommendScreen,
  Design: DesignScreen,
  Show: ShowScreen,
  FocusOn: FocusOnScreen,
});

function Home({navigation}:any): JSX.Element {

  const [searchValue,setSearchValue] = useState('')

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
    { key: 'Design', title: 'Design' },
    { key: 'Show', title: 'Show' },
    { key: 'FocusOn', title: 'FocusOn' },
  ]
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgView}>
      <View style={{
        flex: 1,
      }}>
        <View style={styles.navigationView}>
          <View style={styles.searchView}>
            <TextInput style={styles.input}
              placeholder='周末午后的闲暇时光'
              placeholderTextColor={Colors.placeholder}
              returnKeyType='search'
              value={searchValue}
              onChange={onSearchChange}
            />
            <TouchableOpacity onPress={onSearch}>
              <Image style={styles.searchicon} source={SearchImage}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onAccount}>
            <Image style={styles.accounticon} source={AccountImage}/>
          </TouchableOpacity>
        </View>
        

        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props:any)=><TopTabbar {...props}/>}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />


        
      </View>
    </ImageBackground>
  );
}
const tabs:any[] = [
  {
    title:'推荐',
    icon_n:require('@/assets/images/home_tab_1_nor.png'),
    icon_s:require('@/assets/images/home_tab_1_sel.png'),
    key:'Recommend'
  },
  {
    title:'设计圈',
    icon_n:require('@/assets/images/home_tab_2_nor.png'),
    icon_s:require('@/assets/images/home_tab_2_sel.png'),
    key:'Design'
  },
  {
    title:'秀场',
    icon_n:require('@/assets/images/home_tab_3_nor.png'),
    icon_s:require('@/assets/images/home_tab_3_sel.png'),
    key:'Show'
  },
  {
    title:'关注',
    icon_n:require('@/assets/images/home_tab_4_nor.png'),
    icon_s:require('@/assets/images/home_tab_4_sel.png'),
    key:'FocusOn'
  },
  
]
function TopTabbar(props:any){  
  return <View style={styles.tabView}>
  {
    tabs.map((item:any,index:number)=>{
      return <TouchableOpacity containerStyle={{flex:1}} style={[styles.tabButton]} key={item.title} onPress={()=>{
        props.jumpTo(item.key)
      }}>

        <ImageBackground style={styles.tabButtonBg} source={props.navigationState.index == index ? item.icon_s : item.icon_n}>
          <Text style={[styles.tabButtonTitle,{
            fontSize:props.navigationState.index == index ? 16 : 14,
            fontWeight:props.navigationState.index == index ? '600' : '400',
          }]}>{item.title}</Text>
        </ImageBackground>


       
      </TouchableOpacity>
    })
  }
</View>
}

export default Home;
