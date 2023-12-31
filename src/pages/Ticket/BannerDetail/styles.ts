import { BOTTOM_HEIGHT, NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT,STATUSBAR_SAFE_AREA_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:Colors.black
  },
  topOp:{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      height:STATUSBAR_HEIGHT + NAVIGATION_HEIGHT,
      zIndex:2
  },
  bottomOp:{
    height:150,
    width:'100%',
    top:150,
    position:'absolute',
  },
  navigationView:{
      height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingTop:STATUSBAR_HEIGHT,
      position:'absolute',
      zIndex:10,
      top:0,
      left:16,
      right:16,
      backgroundColor:Colors.black
  },
  backButton:{
    width:30,
    height:NAVIGATION_HEIGHT,
    justifyContent:'center'
  },
  backIcon:{
    width:16,
    height:16
  },
  collectIcon:{
    width:18,
    height:16
  },
  topImage:{
    width:SCREEN_WIDTH,
    height:300,
    position:'absolute',
    top:0
  },
  downContent:{
    width:'100%',
    paddingHorizontal:16,
    marginTop:240,
    marginBottom:BOTTOM_HEIGHT
  },
  avatatView:{
    flexDirection:'row',
    justifyContent:'center',
    zIndex:10,
    position:'absolute',
    left:0,
    right:0
  },
  avatar:{
    width:58,
    height:58,
    borderRadius:29,
    overflow:'hidden'
  },
  downView:{
    width:'100%',
    backgroundColor: 'rgba(5, 5, 5, 1)',
    borderWidth:1,
    borderColor:'#6067FE',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    paddingVertical:16,
    paddingBottom:0,
    zIndex:2,
    marginTop:29,
    marginBottom:10
  },
  title:{
    fontSize:24,
    color:Colors.white,
    textAlign:'center',
    width:'100%',
    marginTop:20
  },
  by:{
    fontSize:12,
    color:'#0AE7C9',
    marginLeft:16
  },
  byath:{
    fontSize:12,
    color:Colors.light
  },
  numView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:8,
    backgroundColor:' rgba(109, 105, 250, 0.2)',
    height:52,
    paddingLeft:26,
    marginTop:6,
    marginHorizontal:16
  },
  numTitle:{
    fontSize:16,
    color:Colors.white,
    fontWeight:'600'
  },
  numDes:{
    fontSize:10,
    color:Colors.light,
  },
  numbg:{
    width:110,
    height:52,
    justifyContent:'center',
    alignItems:'center'
  },
  buy:{
    fontSize:20,
    color:Colors.white,
    fontWeight:'600'
  },
  focus:{
    fontSize:16,
    color:Colors.white,
    fontWeight:'600'
  },
  time:{
    fontSize:10,
    color:Colors.white,
    textAlign:'right'
  },
  des:{
    fontSize:12,
    color:Colors.white,
    lineHeight:24,
    marginVertical:20
  },
  tabButtonBg:{
    width:310,
    height:52,
    justifyContent:'center',
    alignItems:'center',
    marginTop:24
  },
  buyicon:{
    position:'absolute',
    width:38,
    height:38,
    left:24
  },
  buyBtn:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:SCREEN_WIDTH - 32,
    marginLeft:16,
    marginBottom:BOTTOM_HEIGHT + 10,
    height:42,
    borderRadius:5,
    position:'relative',
  },
  detailImage:{
    width:'100%',
    marginVertical:20,
    height:500,
    marginBottom:0
  },
  detailName:{
    fontSize:14,
    color:Colors.title,
    marginVertical:2
  }
});