
import React, { useEffect, useLayoutEffect } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import {styles} from './styles'
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Carousel from 'react-native-snap-carousel';

// import Carousel from 'react-native-reanimated-carousel';

import Share from 'react-native-share';

import { showMessage, hideMessage } from "react-native-flash-message";

import LinearGradient from 'react-native-linear-gradient';

import Hyperlink from 'react-native-hyperlink'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage, useLanguage } from '@/redux/setting';
import { useDispatch } from 'react-redux';

import { show, hidden } from '@/components/CoverModal'



const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
const options = Platform.select({
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});





function Home({navigation}:any): JSX.Element {

  // useLayoutEffect(()=>{
  //   navigation.setOptions({ 
  //     // title: 'Updated!',
  //     headerTitle:()=><View style={{
  //       flex:1,
  //       width:Dimensions.get('screen').width,
  //       backgroundColor:'red',
  //       marginLeft:-16,
  //       flexDirection:'row',
  //       justifyContent:'space-between'
  //     }}>
  //       <Text>211111</Text>
  //       <Text>211111</Text>
  //     </View>,
  //     // headerRight: () => (
  //     //   <Button title="Update count" />
  //     // ),
  //     headerLeft: () => (
  //      null
  //     ),
  //     headerBackTitleVisible:false
  //    })
    
  //   },[navigation])


  const language = useLanguage()
  const dispatch = useDispatch()
  return (
    <SafeAreaView  style={{
      flex: 1
    }}>
     
     <View style={styles.mainView}>
        <Text style={styles.title}>Home1</Text>
        <Text style={styles.title}>当前语言：{language}</Text>
        <Button
        title="修改语言"
        onPress={() => {
          dispatch(changeLanguage('zh-CN'))
        }}
      />
        <Button
        title="储存值"
        onPress={async() => {
          try {
            await AsyncStorage.setItem('my-key', '12');
          } catch (e) {
            // saving error
          }
        }}
      />

        <Button
        title="读取值"
        onPress={async() => {
            try {
              const value = await AsyncStorage.getItem('my-key');
              console.log('value====',value)
              if (value !== null) {
                // value previously stored
              }
            } catch (e) {
              // error reading value
            }
        }}
      />


     



        <Hyperlink linkStyle={ { color: '#2980b9', fontSize: 20 } } onPress={(e:any)=>{
          Alert.alert(e)
        }}>
    <Text style={ { fontSize: 15 } }>
      Make clickable strings like https://github.com/obipawan/hyperlink stylable
    </Text>
  </Hyperlink>




        <LinearGradient colors={['#0f0', '#00f', '#f00']} >
  <Text>
    Sign in with Facebook
  </Text>
</LinearGradient>

        <Button
        title="DropdownAlert"
        onPress={async() => {
          showMessage({
            message: "Hello World",
            description: "This is our second message",
            type: "success",
          });
        }}
      />



        <Button
        title="Share"
        onPress={() => {
          Share.open(options);
        }}
      />





        <Animatable.Text animation="slideInDown" iterationCount={15} direction="alternate">Up and down you go</Animatable.Text>

        <Button
        title="选择相册"
        onPress={() => {
          launchImageLibrary({mediaType:'photo'}, (response:any) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              Alert.alert('自定义按钮:' + response.customButton)
            } else {
              const source = { uri: response.uri };
              Alert.alert(JSON.stringify(source))
              console.log("source:" + JSON.stringify(source))
            }
          });
        }}
      />
       <Button
        title="选择相机"
        onPress={async() => {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: "App Camera Permission",
                message:"App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("Camera permission given");
              launchCamera({mediaType:'photo'},(response:any) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  Alert.alert('自定义按钮:' + response.customButton)
                } else {
                  const source = { uri: response.uri };
                  Alert.alert(JSON.stringify(source))
                  console.log("source:" + JSON.stringify(source))
                }
              })
            } else {
              console.log("Camera permission denied");
            }
          } catch (err) {
            console.warn(err);
          }
        }}
      />


        <Text style={styles.title}>bottom</Text>

        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Login')}
      />

<Button
        title="show Toast"
        onPress={() => {
          Toast.show('This is a message', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
        }}
      />
      <Button
        title="show modal"
        onPress={() => {
          show(<View style={{
            width:'80%',
            backgroundColor:'white',
            height:200
          }}>
            <Text>modal</Text>
          </View>)
        }}/>

<Button
        title="show modal bottom"
        onPress={() => {
          show(<View style={{
            width:'100%',
            backgroundColor:'white',
            height:200
          }}>
            <Text>modal</Text>
          </View>,{
            position:'bottom'
          })
        }}/>
     </View>
    </SafeAreaView>
  );
}

export default Home;
