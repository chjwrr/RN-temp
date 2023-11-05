
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  LayoutAnimation,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image
} from 'react-native';
import {styles} from './styles'

const BGImage = require('@/assets/images/loginbgi.png')
const AgreeDis = require('@/assets/images/agreedis.png')
const AgreeSel = require('@/assets/images/agree.png')
const BackImg = require('@/assets/images/loginback.png')



function PhoneCode(props:any): JSX.Element {
  const [codeValue,setCodeValue] = useState('')
  const [isAgree,setIsAgree] = useState(false)
  const inputRef = useRef<any>()
  const [mainTop,setMainTop] = useState(0)

  // useEffect(()=>{
  //   const keyboardDidShow = Keyboard.addListener('keyboardDidShow',(e:any)=>{
  //     console.log('-e-',e)
  //     LayoutAnimation.spring()
  //     setMainTop(-100)
  //   })
  //   const keyboardDidHide = Keyboard.addListener('keyboardDidHide',()=>{
  //     LayoutAnimation.spring()
  //     setMainTop(0)
  //   })
  //   return ()=>{
  //     keyboardDidShow.remove()
  //     keyboardDidHide.remove()
  //   }
  // },[])

  useEffect(()=>{
    setTimeout(() => {
      inputRef.current && inputRef.current.focus()
    }, 500);
  },[])

  function onDisKeyboard(){
    Keyboard.dismiss()
  }
  function onChange(e:any){
    if (e.nativeEvent.text.length == 4){
      Keyboard.dismiss()

      // 调用接口


    }
    setCodeValue(e.nativeEvent.text.slice(0,4))
  }
  function onAgree(){
    setIsAgree(!isAgree)
  }
  function onUserAgreement(){

  }
  function onUserPrivacy(){
    
  }
  function onBack(){
    props.navigation.pop()
  }
  function onShowKeyboard(){
    inputRef.current && inputRef.current.focus()
  }


  return (
    <ImageBackground source={BGImage} resizeMode="cover" style={styles.bgImage}>
      <TouchableOpacity activeOpacity={1} style={styles.main} onPressIn={onDisKeyboard}>
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity onPressIn={onBack} style={styles.backButton}>
            <Image source={BackImg} style={styles.bgckImg}/>
          </TouchableOpacity>
          <View style={[styles.mainContent,{
            marginTop:mainTop
          }]}>
            <View>
              <Text style={styles.title}>输入验证码</Text>
              <View style={styles.inputView}>
                <Text style={styles.phonetip}>验证码已发送至 {props.route.params.phone}</Text>
              </View>
              <View style={styles.CodeMianView}>
                <TouchableOpacity activeOpacity={1} style={styles.codeView} onPressIn={onShowKeyboard}>
                  <Text style={styles.labCode}>{codeValue.slice(0,1)}</Text>
                  <Text style={styles.labCode}>{codeValue.slice(1,2)}</Text>
                  <Text style={styles.labCode}>{codeValue.slice(2,3)}</Text>
                  <Text style={styles.labCode}>{codeValue.slice(3,4)}</Text>
                </TouchableOpacity>
                <TextInput ref={inputRef} style={styles.input} value={codeValue} onChange={onChange} keyboardType='number-pad'/>
              </View>
            </View>
            <View style={styles.downView}>
              <View style={styles.agreeView}>
                <TouchableOpacity style={styles.agreeButton} onPressIn={onAgree}>
                  <Image style={styles.agreeImg} source={isAgree ? AgreeSel : AgreeDis}/>
                </TouchableOpacity>
                <View style={styles.agreeTextView}>
                  <Text style={styles.agreeText}>我已阅读并同意衣互</Text>
                  <TouchableOpacity style={styles.agreeSelButton} onPressIn={onUserAgreement}>
                    <Text style={styles.agreeTextDis}>用户协议</Text>
                  </TouchableOpacity>
                  <Text style={styles.agreeText}>和</Text>
                  <TouchableOpacity style={styles.agreeSelButton} onPressIn={onUserPrivacy}>
                    <Text style={styles.agreeTextDis}>隐私政策</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default PhoneCode;
