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
    width:30,
    height:NAVIGATION_HEIGHT,
    justifyContent:'center'
  },
  backIcon:{
    width:16,
    height:16
  },
  titleView:{
    width:SCREEN_WIDTH - NAVIGATION_HEIGHT - NAVIGATION_HEIGHT -32,
    alignItems:'center'
  },
  title:{
    fontSize:16,
    color:Colors.navTitle
  },
  flowLoadingView:{
    flex:1,
    height:175,
    borderRadius:12,
    marginVertical:4
  },
  flowView:{
    flex:1,
    height:175,
    borderRadius:12,
    backgroundColor:'#fff',
    marginVertical:4
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
    flex:1,
    paddingHorizontal:16
  },
  time:{
    fontSize:16,
    color:Colors.light,
    marginHorizontal:16,
    marginTop:10
  },
  line:{
    width:'100%',
    height:1,
    backgroundColor:Colors.border,
    marginTop:5,
    marginBottom:10
  },
  itemView:{
    marginHorizontal:16,
    flexDirection:'row',
    // alignItems:'center'
  },
  itemImage:{
    width:120,
    height:120,
    borderRadius:8,
    marginRight:10
  },
  name:{
    fontSize:16,
    color:Colors.light,
    lineHeight:30
  },
  buytitle:{
    fontSize:14,
    color:Colors.white,
  },
  buyBtn:{
    justifyContent:'center',
    alignItems:'center',
    height:30,
    borderRadius:6,
    paddingHorizontal:40,
  }
});
