
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground
} from 'react-native';
import {styles} from './styles'
const BGImage = require('@/assets/images/loginbgi.png')

function Login(): JSX.Element {
  return (
    <ImageBackground source={BGImage} resizeMode="contain" style={styles.bgImage}>

    </ImageBackground>
  );
}

export default Login;
