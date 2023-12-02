import { BOTTOM_HEIGHT, SCREEN_WIDTH, TABBAR_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
} from 'react-native';
export const styles = StyleSheet.create({
  main:{
    flexDirection:'row',
    height:TABBAR_HEIGHT + BOTTOM_HEIGHT,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:Colors.white,
    paddingBottom:BOTTOM_HEIGHT,
  },
  tabbar:{
    width:SCREEN_WIDTH / 5,
    height:'100%',
    // justifyContent:'center',
    alignItems:'center',
  },
  tabbaricon:{
    width:24,
    height:24,
    marginTop:4,
    // marginBottom:4
    // marginBottom:4
  },
  tabbariconBig:{
    width:40,
    height:40,
    marginTop:-8,
    // marginBottom:4
  },
  tabbartitle:{
    fontSize:10,
    fontWeight:'600',
  }
})