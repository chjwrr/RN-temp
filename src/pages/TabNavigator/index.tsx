
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/pages/Home'
import DetailScreen from '@/pages/Home/Detail'
import PostScreen from '@/pages/Home/Post'

import MineScreen from '@/pages/Mine'
import SettingScreen from '@/pages/Mine/Setting'
import ChangeScreen from '@/pages/Mine/Change'
import { Text, View } from 'react-native';

import FlowScreen from '@/pages/Flow'
import TDModalScreen from '@/pages/TDModal'


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerTitleAlign:'center',
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mine" component={MineScreen} />
      <Tab.Screen name="Flow" component={FlowScreen} />
      <Tab.Screen name="3dModal" component={TDModalScreen} />
    </Tab.Navigator>
  );
}

function StackNav(){
  return <Stack.Navigator screenOptions={{
    animation:'slide_from_right',
    headerTitleAlign:'center',
  }}>
  <Stack.Screen
      name="Tab"
      component={Tabs}
      options={{ 
        headerShown: false,
      }}
    />
    <Stack.Screen name="Detail" component={DetailScreen} />
    <Stack.Screen name="Settings" component={SettingScreen} />
  </Stack.Navigator>
}

// 侧边栏啊
function DrawerNavigator(params:any) {
  return <Drawer.Navigator 
  screenOptions={{
    headerShown:false
  }}
    drawerContent={(props) => <View>
      <Text>123</Text>
    </View>} // 自定义侧边栏样式
  >
    <Drawer.Screen name={'DrawerkNavigator'} component={StackNav}/>
  </Drawer.Navigator>
}

function TabNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}

export default TabNavigator;
