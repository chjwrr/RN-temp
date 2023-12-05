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
  itemView:{
    borderBottomWidth:1,
    borderBottomColor:'#CCCCCC',
    height:60,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:NAVIGATION_HEIGHT,

  },
  modalView:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'flex-end',
  },
  picker:{
    backgroundColor:'#fff',
    paddingBottom:BOTTOM_HEIGHT + BOTTOM_SPACE_HEIGHT
  },
  modalTopviewe:{
    backgroundColor:'#fff',
    borderBottomWidth:1,
    borderColor:'#CCCCCC',
    height:44,
    paddingHorizontal:16,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  titleS:{
    fontSize:16,
    color:Colors.buttonMain,
  }
});
