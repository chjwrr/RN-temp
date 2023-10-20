
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {styles} from './styles'
import RootSiblingsManager from 'react-native-root-siblings';
import LottieView from "lottie-react-native";

const loadinglottie = require('@/assets/lottie/loading.json')

function LoadingComponent({msg}:{msg:string}): JSX.Element {
  return (
    <View style={styles.main}>
      <LottieView style={styles.lottieView} source={loadinglottie} autoPlay loop />
      <Text style={styles.msg}>{msg}</Text>
    </View>
  );
}

let siblings:any = null
export function show(msg:string){
  if (siblings){
    siblings.update(<LoadingComponent msg={msg}/>)
    return
  }
  siblings = new RootSiblingsManager(<LoadingComponent msg={msg}/>);
}
export function hidden(){
  siblings && siblings.destroy();
  siblings = null
}