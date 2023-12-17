import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
  bgView:{
    flex:1,
    paddingHorizontal:16
  },
  input:{
    height:160,
    color:Colors.black,
    fontSize:14,
    paddingTop:0,
    paddingBottom:0,
    marginTop:NAVIGATION_HEIGHT,
  },
  imageView:{
    flexWrap:'wrap',
    flexDirection:'row',
  },
  imageBtn:{
    width:Math.floor((SCREEN_WIDTH - 32 - 30) / 3),
    height:Math.floor((SCREEN_WIDTH - 32 - 30) / 3),
    marginTop:10,
    marginHorizontal:5,
  },
  image:{
    width:Math.floor((SCREEN_WIDTH - 32 - 30) / 3),
    height:Math.floor((SCREEN_WIDTH - 32 - 30) / 3),
  },
  del:{
    position:'absolute',
    top:0,
    right:0,
    width:20,
    height:20,
    backgroundColor:'red',
    borderRadius:10
  },
  delImage:{
    width:20,
    height:20
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
    alignItems:'center',
    justifyContent:'flex-end'
  },
  backButton:{
    width:60,
    height:NAVIGATION_HEIGHT,
    justifyContent:'center',
    alignItems:'flex-end',
  },
  backIcon:{
    width:16,
    height:16
  },
  titleView:{
    width:SCREEN_WIDTH - 30 - 30 - 32,
    alignItems:'center'
  },
  title:{
    fontSize:16,
    color:Colors.navTitle
  },
})