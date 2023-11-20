
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
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

const BGImage = require('@/assets/images/homebg.png')
const AccountImage = require('@/assets/images/account.png')
const SearchImage = require('@/assets/images/search.png')

import PagerView from 'react-native-pager-view';


const FirstRoute = ({navigation,onPress}:any) => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }}>
    <TouchableOpacity onPress={()=>{
      navigation.navigate('Register')
    }}>
      <Text>jump</Text>
    </TouchableOpacity>
  </View>
);

const SecondRoute = ({navigation}:any) => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ThreeRoute = ({navigation}:any) => (
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
);

const FourRoute = ({navigation}:any) => (
  <View style={{ flex: 1, backgroundColor: 'red' }} />
);

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();



function Home({navigation}:any): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FirstRoute}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Notifications"
        component={SecondRoute}
        options={{ tabBarLabel: 'Updates' }}
      />
      <Tab.Screen
        name="Profile"
        component={ThreeRoute}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="Profile1"
        component={FourRoute}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes =[
    { key: 'Recommend', title: 'FirstRoute' },
    { key: 'Design', title: 'SecondRoute' },
    { key: 'Show', title: 'ThreeRoute' },
    { key: 'FocusOn', title: 'FourRoute' },
  ]

  const renderScene = useCallback(({ route, jumpTo }:any) => {
    switch (route.key) {
      case 'Recommend':
        return <FirstRoute navigation={navigation} jumpTo={jumpTo} onPress={()=>{
          navigation.navigate('Register')
        }}/>
      case 'Design':
        return <SecondRoute navigation={navigation} jumpTo={jumpTo} />;
      case 'Show':
        return <ThreeRoute navigation={navigation} jumpTo={jumpTo} />;
      case 'FocusOn':
        return <FourRoute navigation={navigation} jumpTo={jumpTo} />;
    }
  },[])
  return (
    <View style={{
      flex: 1,
    }}>
      {/* <TabView
        swipeEnabled={false}
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      /> */}


    <PagerView style={{flex:1}} initialPage={0}>
      <FirstRoute key="1" navigation={navigation} onPress={()=>{
        navigation.navigate('Register')
      }}/>
      <SecondRoute key="2"/>
      <ThreeRoute key="3"/>
      <FourRoute key="4"/>
    </PagerView>
    </View>
  );
}
export default Home;
