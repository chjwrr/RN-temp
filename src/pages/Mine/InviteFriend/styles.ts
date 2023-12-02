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
    justifyContent:'space-between',
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
    justifyContent:'center',
  },
  backIcon:{
    width:16,
    height:16
  },
  titleView:{
    width:200,
    alignItems:'center',
  },
  title:{
    fontSize:16,
    color:Colors.navTitle
  },
  downView:{
    width:310,
    height:450,
    marginTop: Platform.OS === 'ios' ? NAVIGATION_HEIGHT : NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
    alignItems:'center',
    paddingVertical:55,
    justifyContent:'space-between'
  },
  downTitle:{
    fontSize:24,
    fontWeight:'500',
    color:Colors.buttonMain
  },
  downDes:{
    fontSize:14,
    color:Colors.label
  },
  code:{
    width:140,
    height:140,
    backgroundColor:'#fff',
    marginBottom:20,
    justifyContent:'center',
    alignItems:'center'
  }
});
