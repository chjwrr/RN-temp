
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';
import {styles} from './styles'
import Colors from '@/utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';



const BGImage = require('@/assets/images/homebg.png')
const AccountImage = require('@/assets/images/account.png')
const SearchImage = require('@/assets/images/search.png')

function Home({navigation}:any): JSX.Element {

  const [searchValue,setSearchValue] = useState('')
  const [tabIndex,setTabIndex] = useState(0)

  function onSearch(){

  }
  function onAccount(){

  }
  function onSearchChange(e:any){
    setSearchValue(e.nativeEvent.text)
  }

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
        <View style={styles.tabView}>
          {
            ['推荐','设计圈','秀场','关注'].map((item:string,index:number)=>{
              return <TouchableOpacity containerStyle={{flex:1}} style={[styles.tabButton]} key={item} onPress={()=>{
                setTabIndex(index)
              }}>
                <Text style={[styles.tabButtonTitle,{
                  fontSize:tabIndex == index ? 16 : 14,
                  fontWeight:tabIndex == index ? '600' : '400',
                }]}>{item}</Text>
              </TouchableOpacity>
            })
          }
        </View>




        
      </View>
    </ImageBackground>
  );
}

export default Home;
