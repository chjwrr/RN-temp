import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT, SCREEN_HEIGHT, BOTTOM_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
  StyleSheet,
  Platform
} from 'react-native';
export const styles = StyleSheet.create({
  bgView:{
    flex:1,
  },
  navigationView:{
    width:'100%',
    height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
    flexDirection:'row',
    // top:STATUSBAR_HEIGHT,
    top:0,
    paddingTop:STATUSBAR_HEIGHT,
    paddingHorizontal:16,
    position:'absolute',
    zIndex:100,
    alignItems:'center'
  },
  backButton:{
    width:NAVIGATION_HEIGHT,
    height:NAVIGATION_HEIGHT,
    justifyContent:'center'
  },
  backIcon:{
    width:16,
    height:16
  },
  titleView:{
    width:SCREEN_WIDTH - NAVIGATION_HEIGHT - NAVIGATION_HEIGHT,
    alignItems:'center'
  },
  title:{
    fontSize:16,
    color:Colors.navTitle
  },
  tabView:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:34,
    marginVertical:5,
    marginTop: Platform.OS === 'ios' ? NAVIGATION_HEIGHT : NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
  },
  tabButton:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
  },
  tabButtonBg:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      width:75,
      height:40
  },
  tabButtonTitle:{
      fontSize:14,
      color:Colors.title,
      fontWeight:'400'
  }
});
