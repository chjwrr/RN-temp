
import Colors from '@/utils/colors';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from 'react-native';
interface CustomTextInputProps {
  style?:object,
  inputProps:TextInputProps
}


// android 有些机型无法每次都弹出键盘，要点好多次才能弹出一次，比如OPPO、荣耀等等某些机型
const CustomTextInput = forwardRef((props:CustomTextInputProps,ref)=>{
  const inputRef = useRef<any>()
  const [isFocus,setIsFocus] = useState(false)
  const [value,setValue] = useState('')

  useImperativeHandle(ref,()=>(
    {
      onFocus,
      onBlur,
      clear
    }
  ))

  function clear(){
    inputRef.current && inputRef.current.clear()

  }
  function onFocus(e:any){
    inputRef.current && inputRef.current.focus()
  }
  function onBlur(e:any){
    inputRef.current && inputRef.current.blur()
  }
  return (
    <View style={props.style}>
      <TextInput
        ref={inputRef}
        underlineColorAndroid={'transparent'}
        {...props.inputProps}
        style={[{
          flex:1,
          color:Colors.light,
          fontSize:14,
          paddingTop:0,
          paddingBottom:0,
          height:'100%',
        },props.inputProps.style]}
        onFocus={(e:any)=>{
          setIsFocus(true)
          props.inputProps.onFocus && props.inputProps.onFocus(e)
        }}
        onBlur={(e:any)=>{
          setIsFocus(false)
          props.inputProps.onBlur && props.inputProps.onBlur(e)
        }}
      />
      {!isFocus && Platform.OS == 'android' && <TouchableOpacity style={{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        // backgroundColor:'rgba(0,0,0,0.2)',
        zIndex:10
      }} onPressIn={()=>{
        inputRef.current && inputRef.current.focus()
      }}/>}
    </View>
  );
})

export default CustomTextInput