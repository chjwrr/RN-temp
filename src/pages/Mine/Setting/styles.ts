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
    width:SCREEN_WIDTH - 30 - 30 - 32,
    alignItems:'center'
  },
  title:{
    fontSize:16,
    color:Colors.navTitle
  },
  value:{
    fontSize:14,
    color:Colors.light
  },
  scrollView:{
    flex:1,
    paddingHorizontal:16,
    marginTop: Platform.OS === 'ios' ? NAVIGATION_HEIGHT : NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
  },
  itemView:{
    borderBottomWidth:1,
    borderBottomColor:'#CCCCCC',
    height:60,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  arrow:{
    width:16,
    height:16,
    marginLeft:8
  },
  avatar:{
    width:30,
    height:30,
    borderRadius:15
  },
  name:{
    flex:1,
    fontSize:14,
    color:Colors.light,
    paddingTop:0,
    paddingBottom:0,
    height:'100%',
    textAlign:'right'
  },
  logoutButton:{
    height:44,
    borderRadius:5,
    backgroundColor:Colors.main,
    justifyContent:'center',
    alignItems:'center',
    marginTop:50
  },
  logoutTitle:{
    fontSize:20,
    color:Colors.white,
    fontWeight:'500'
  }
});
