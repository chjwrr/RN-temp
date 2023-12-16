import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT, SCREEN_HEIGHT, BOTTOM_HEIGHT, BOTTOM_SPACE_HEIGHT } from '@/utils';
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
    // width:'100%',
    height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
    flexDirection:'row',
    // top:STATUSBAR_HEIGHT,
    top:0,
    paddingTop:STATUSBAR_HEIGHT,
    position:'absolute',
    zIndex:100,
    alignItems:'center',

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
    alignItems:'center',
  },
  title:{
    fontSize:16,
    color:Colors.navTitle,
  },
  chooseBtn:{
    marginTop:NAVIGATION_HEIGHT,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:Colors.black,
    paddingVertical:16,
  },
  chooseBtnTitle:{
    fontSize:16,
    fontWeight:'800',
    color:Colors.black,
    marginBottom:10
  },
  selectTitle:{
    marginTop:NAVIGATION_HEIGHT,
    fontSize:16,
    fontWeight:'800',
    color:Colors.main,
    height:50,
  },
  flatView:{
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1,
    width:'100%'
  },
  flatList:{
    flex:1,
  },
  titleS:{
    fontSize:16,
    color:Colors.title,
  },
  itemBtn:{
    height:44,
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor:'#CCCCCC',
  },
  itemBtnSel:{
    backgroundColor:Colors.main
  },
  titleSel:{
    color:Colors.white
  }
});
