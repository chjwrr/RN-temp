import { LOADING_Z_INDEX } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
} from 'react-native';
export const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.2)',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:LOADING_Z_INDEX
  },
  msg:{
    fontSize:14,
    color:Colors.bright,
  },
  lottieView:{
    width:100,
    height:100
  }
})