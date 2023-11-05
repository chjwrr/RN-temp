
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '@/pages/Splash'
import HomeScreen from '@/pages/Home'
import MineScreen from '@/pages/Mine'
import TicketScreen from '@/pages/Ticket'
import EcologyScreen from '@/pages/Ecology'
import PostScreen from '@/pages/Post'

import { routers } from './routers';
import CustomTabbar from '@/components/CustomTabbar';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerTitleAlign:'center'
    }}
    tabBar={(props:BottomTabBarProps)=><CustomTabbar {...props}/>}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown:false,
      }}/>
      <Tab.Screen name="Ticket" component={TicketScreen} options={{
        headerShown:false,
      }}/>
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Ecology" component={EcologyScreen} />
      <Tab.Screen name="Mine" component={MineScreen} options={{
      }}/>
    </Tab.Navigator>
  );
}


function StackNav(){
  return <Stack.Navigator screenOptions={{
    cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
  }}>
    <Stack.Screen options={{
      headerShown:false
    }} name="Splash" component={SplashScreen} />
    {
      routers.map((item:any)=>{
        return <Stack.Screen key={item} options={{
          headerShown:false
        }} name={item.name} component={item.component} />
      })
    }
    <Stack.Screen
      name="Tab"
      component={Tabs}
      options={{
        headerShown: false,
      }}
    />

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
      {/* <DrawerNavigator/> */}
      <StackNav/>
    </NavigationContainer>
  );
}

export default TabNavigator;
