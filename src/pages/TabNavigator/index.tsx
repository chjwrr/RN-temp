
import React from 'react';
import {
  Animated
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';




import HomeScreen from '@/pages/Home'
import MineScreen from '@/pages/Mine'
import FlowScreen from '@/pages/Flow'
import TDModalScreen from '@/pages/TDModal'


import LoginScreen from '@/pages/Login'
import SplashScreen from '@/pages/Splash'
import PhoneLoginScreen from '@/pages/PhoneLogin'
import PhoneCodeScreen from '@/pages/PhoneCode'
import ForgetPsdScreen from '@/pages/ForgetPsd'
import RegisterScreen from '@/pages/Register'
import ChooseSexScreen from '@/pages/ChooseSex'
import ChooseAvatarScreen from '@/pages/ChooseAvatar'


import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();





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


const routers:any[] = [
  {
    name:'Login',
    component:LoginScreen
  },
  {
    name:'PhoneLogin',
    component:PhoneLoginScreen
  },
  {
    name:'PhoneCode',
    component:PhoneCodeScreen
  },
  {
    name:'ForgetPsd',
    component:ForgetPsdScreen
  },
  {
    name:'Register',
    component:RegisterScreen
  },
  {
    name:'ChooseSex',
    component:ChooseSexScreen
  },
  {
    name:'ChooseAvatar',
    component:ChooseAvatarScreen
  }
]

function StackNav(){
  return <Stack.Navigator screenOptions={{
    cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
  }}>
    {/* <Stack.Screen options={{
      headerShown:false
    }} name="Splash" component={SplashScreen} />
    {
      routers.map((item:any)=>{
        return <Stack.Screen key={item} options={{
          headerShown:false
        }} name={item.name} component={item.component} />
      })
    } */}
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
