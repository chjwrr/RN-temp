import 'react-native-gesture-handler';
import React from 'react';
import TabNavigator from '@/pages/TabNavigator'


function App(): JSX.Element {
  return (
    <TabNavigator/>
  );
}

export default App;



// import 'react-native-gesture-handler';
// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   StatusBar,
//   ScrollView,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   DeviceEventEmitter
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

// // 导航
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();

// // tabbar
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '@/pages/Home'
// import MineScreen from '@/pages/Mine'
// const Tab = createBottomTabNavigator();

// // 侧边栏
// import { createDrawerNavigator } from '@react-navigation/drawer';
// const Drawer = createDrawerNavigator();

// // 所有的页面都写在这里面
// import DetailScreen from '@/pages/Home/Detail'
// import PostScreen from '@/pages/Home/Post'
// import SettingScreen from '@/pages/Mine/Setting'
// import ChangeScreen from '@/pages/Mine/Change'


// const routes:any[] = [
// ]
// // 遍历得到页面


// // TransitionalPage 默认显示,此为过渡页面。在里面判断登录状态，然后reset到相应的页面
// // 打开app即进入给页面
// function StackNavigator() {
//   return <Stack.Navigator >
//     <Stack.Screen  options={{ headerShown: false }} name={'TabNavigator'} component={TabNavigator}/>

//     <Stack.Screen name="Detail" component={DetailScreen} />
//         <Stack.Screen name="Settings" component={SettingScreen} />
//   </Stack.Navigator>
// }

// // tabbar
// function TabNavigator() {
//   return <Tab.Navigator>
//      <Tab.Screen  options={{ headerShown: false }} name="Home" component={HomeScreen} />
//     <Tab.Screen  options={{ headerShown: false }} name="Mine" component={MineScreen} />
//   </Tab.Navigator>
// }

// // 自定义侧边栏
// function CustomDrawerContent({ navigation }:any) {
//   return <View style={{backgroundColor:'red',flex:1,justifyContent:'center',alignItems:'center'}}>
//     <TouchableOpacity onPress={()=>{
//       navigation.closeDrawer();
//       navigation.navigate('MineChatCenter')
//     }}>
//       <Text>点击跳转到用户中心</Text>
//     </TouchableOpacity>
//   </View>
// }

// // 侧边栏啊
// function DrawerNavigator(params:any) {
//   return <Drawer.Navigator 
//     drawerContent={(props) => <CustomDrawerContent {...props} />} // 自定义侧边栏样式
//   >
//     <Drawer.Screen name={'StackNavigator'} component={StackNavigator}/>
//   </Drawer.Navigator>
// }


// const App=()=>{
//     return (
//       <NavigationContainer>
//         <DrawerNavigator/>
//       </NavigationContainer>
//   );
// };

// export default App
// const styles = StyleSheet.create({
// });