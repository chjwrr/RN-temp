import { BOTTOM_HEIGHT, SCREEN_WIDTH, TABBAR_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
} from 'react-native';
export const styles = StyleSheet.create({
  main:{
    flexDirection:'row',
    height:TABBAR_HEIGHT,
    marginBottom:BOTTOM_HEIGHT,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
  },
  tabbar:{
    width:SCREEN_WIDTH / 4,
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
  }
})