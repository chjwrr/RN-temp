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
    height:300,
    borderRadius:12,
    marginVertical:4
  },
  flowView:{
    flex:1,
    height:300,
    borderRadius:12,
    backgroundColor:'#fff',
    marginVertical:4,
    width:(SCREEN_WIDTH - 32 - 2) / 2

  },
  flowViewIcon:{
    width:'100%',
    height:240,
    marginRight:10,
    borderRadius:8,
    backgroundColor:'red'
  },
  flowViewTitle:{
    fontSize:14,
    color:Colors.assist
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
    marginTop:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
    flex:1,
    paddingHorizontal:16
  },
  flowViewSubView:{
    // flexDirection:'row',
    // justifyContent:'space-between',
    // alignItems:'center',
    marginTop:10,
    paddingHorizontal:8
  },
  flowIcon:{
    width:16,
    height:16,
    marginRight:8,
    borderRadius:8,
    overflow:'hidden'
  },
  flowName:{
      fontSize:10,
      color:Colors.label,
      width:'70%'
  },
  flowFocus:{
      width:16,
      height:16,
  },
  focusButton:{
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
}
});
