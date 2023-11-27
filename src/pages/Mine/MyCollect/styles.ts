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
  flowLoadingView:{
    flex:1,
    height:112,
    borderRadius:12,
    marginVertical:4
  },
  flowView:{
    flex:1,
    height:112,
    borderRadius:12,
    backgroundColor:'#fff',
    paddingHorizontal:20,
    paddingVertical:14,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:4
  },
  flowViewIcon:{
    width:80,
    height:80,
    marginRight:10,
    borderRadius:8,
    backgroundColor:'red'
  },
  flowViewTitle:{
    fontSize:14,
    color:Colors.light
  },
  loadMoreView:{
    flexDirection:'row',
    justifyContent:'center',
    height:30,
    alignItems:'center'
  },
  loadMoreTitle:{
      fontSize:12,
      color:Colors.assist
  },
  flatList:{
    marginTop:STATUSBAR_HEIGHT,
    flex:1,
    paddingHorizontal:16
  }
});
