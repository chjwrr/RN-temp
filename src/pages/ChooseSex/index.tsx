
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from 'react-native';
import {styles} from './styles'
import Colors from '@/utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const BGImage = require('@/assets/images/registerbgi.png')
const BackImg = require('@/assets/images/loginback.png')
const ButtonImg = require('@/assets/images/buttonbg.png')
const NameNorImg = require('@/assets/images/namebg_nor.png')
const NameSelImg = require('@/assets/images/namebg_sel.png')
const bottomBG = require('@/assets/images/avatarbottombg.png')

const WomenIcon = require('@/assets/images/womenimg.png')
const MenIcon = require('@/assets/images/menimg.png')




function ChooseSex(props:any): JSX.Element {
  const [name,setName] = useState('')
  const [sex,setSex] = useState(-1) // 0 = 女    1 = 男   -1 = 未知
  function onNameChange(e:any){
    setName(e.nativeEvent.text)
  }
  function onBack(){
    props.navigation.pop()
  }
  function onJumpNext(){
    props.navigation.navigate('ChooseAvatar')
  }
  function onNext(){
    if (name.length == 0){
      return
    }
    props.navigation.navigate('ChooseAvatar',{
      name,
      sex
    })
  }
  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <SafeAreaView style={{
        flex: 0
      }}></SafeAreaView>
      <SafeAreaView style={{flex:1}} >
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Image source={BackImg} style={styles.bgckImg}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainContent} activeOpacity={1} onPress={()=>Keyboard.dismiss()}>
          <View style={styles.mainContent}>
            <View style={styles.topNameView}>
              <Text style={styles.title}>Hi~!</Text>
              <View style={styles.tipReg}>
                <Text style={styles.nametitle}>你叫什么名字？</Text>
              </View>
              <View style={styles.nameView}>
                <ImageBackground source={ButtonImg} resizeMode="cover" style={styles.nameBG}>
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChange={onNameChange}
                    underlineColorAndroid={'transparent'}
                    placeholder='请输入名字'
                    placeholderTextColor={Colors.white}
                  />
                </ImageBackground>
                <Image style={styles.nameIcon} source={name.length > 0 ? NameSelImg : NameNorImg}/>
              </View>
            </View>
            <View style={styles.agreeView}>
              <ImageBackground source={bottomBG} resizeMode="cover" style={styles.bottombg}>
                <View style={{
                  flexDirection:'row'
                }}>
                  <TouchableOpacity onPress={()=>setSex(0)}>
                    <Image style={styles.sexImg} source={WomenIcon}/>
                  </TouchableOpacity>
                  <View style={{
                    width:50
                  }}/>
                  <TouchableOpacity onPress={()=>setSex(1)}>
                    <Image style={styles.sexImg} source={MenIcon}/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onNext} style={[styles.nextButtonView,{
                  backgroundColor:name.length > 0 ? 'transparent' : Colors.bright_2
                }]}>
                  {name.length > 0 ? <ImageBackground source={ButtonImg} style={styles.nextButton} resizeMode='cover'>
                    <Text style={[styles.nextTitle,{
                      color:'#fff'
                    }]}>下一步</Text>
                  </ImageBackground> : <Text style={styles.nextTitle}>下一步</Text>}
                </TouchableOpacity>
                <View style={{
                  height:'100%',
                  width:'100%',
                  backgroundColor:Colors.white
                }}/>
              </ImageBackground>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.jumpView}>
          <TouchableOpacity onPress={onJumpNext}>
            <Text style={styles.agreeText}>跳过</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{
        backgroundColor: "white",
        flex: 0
      }}></SafeAreaView>
    </ImageBackground>
  );
}

export default ChooseSex;
