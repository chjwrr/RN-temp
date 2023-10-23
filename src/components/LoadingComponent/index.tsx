
import React from 'react';
import LottieView from "lottie-react-native";

const loadinglottie = require('@/assets/lottie/loading.json')

function LoadingComponent({width = 20}:{width:number}): JSX.Element {
  return (
    <LottieView style={{
      width:width,
      height:width
    }} source={loadinglottie} autoPlay loop />
  );
}
export default LoadingComponent