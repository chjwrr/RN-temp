import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT, SCREEN_HEIGHT, BOTTOM_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
  StyleSheet,
  Platform
} from 'react-native';
export const styles = StyleSheet.create({
  bgView:{
    flex:1,
    paddingHorizontal:16,

  },
  navigationView:{
    width:'100%',
    height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
    flexDirection:'row',
    // top:STATUSBAR_HEIGHT,
    top:0,
    paddingTop:STATUSBAR_HEIGHT,
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
    width:SCREEN_WIDTH - NAVIGATION_HEIGHT - NAVIGATION_HEIGHT - 32,
    alignItems:'center'
  },
  title:{
    fontSize:16,
    color:Colors.navTitle
  },
  input:{
    height:160,
    color:Colors.black,
    fontSize:14,
    paddingTop:0,
    paddingBottom:0,
    marginTop:NAVIGATION_HEIGHT,
    marginBottom:50
  },
  logoutButton:{
    height:44,
    borderRadius:5,
    backgroundColor:Colors.main,
    justifyContent:'center',
    alignItems:'center',
  },
  logoutTitle:{
    fontSize:20,
    color:Colors.white,
    fontWeight:'500'
  }
});
