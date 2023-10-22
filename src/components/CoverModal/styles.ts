import { BOTTOM_HEIGHT, COVER_MODAL_Z_INDEX, SCREEN_WIDTH, TABBAR_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
} from 'react-native';
export const styles = StyleSheet.create({
  main:{
   flex:1,
   backgroundColor:'rgba(0,0,0,0.5)',
   width:'100%',
   height:'100%',
   zIndex:COVER_MODAL_Z_INDEX,
   position:'absolute'
  },
  bgButton:{
    flex:1,
    position:'absolute',
    width:'100%',
    height:'100%',
  }
})