import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT, SCREEN_HEIGHT, BOTTOM_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
  Platform,
  StyleSheet,
} from 'react-native';
export const styles = StyleSheet.create({
  bgView:{
    flex:1,
    backgroundColor:Colors.black
  },
  navigationView:{
    width:'100%',
    height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
    flexDirection:'row',
    justifyContent:'space-between',
    // top:STATUSBAR_HEIGHT,
    top:0,
    paddingTop:STATUSBAR_HEIGHT,
    paddingHorizontal:16,
    position:'absolute',
    zIndex:100,
    alignItems:'center'
  },
  contentContainerStyle:{
    paddingTop:Platform.OS === 'ios' ? NAVIGATION_HEIGHT : STATUSBAR_HEIGHT + NAVIGATION_HEIGHT,
    paddingHorizontal:16,
  },
  backButton:{
    width:30,
    height:NAVIGATION_HEIGHT,
    justifyContent:'center',
  },
  backIcon:{
    width:16,
    height:16
  },
  webView:{
    width:SCREEN_WIDTH,
    height:SCREEN_WIDTH
  },
  modalView:{
    alignItems:'center',
    paddingHorizontal:16,
  },
  modalLine:{
    width:320,
    height:70,
    marginTop:-20,
  },
  name:{
    fontSize:16,
    color:Colors.assist,
    fontWeight:'600',
    marginTop:6
  },
  swiperView:{
    alignItems:'center',
    paddingHorizontal:16,
  },
  swiperTopView:{
    width:SCREEN_WIDTH - 32 - 4,
    marginHorizontal:2,
    height:'100%',
    borderRadius:8,
    overflow:'hidden'
  },
  sliderView:{
    backgroundColor:'rgba(109,105,250,0.2)',
    borderRadius:10,
    height:20,
    width:36,
    justifyContent:'center',
    alignItems:'center',
    marginTop:12
  },
  sliderTitle:{
    fontSize:10,
    color:Colors.white,
    textAlign:'center'
  },
  detailView:{
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 -2 15 2 rgba(51, 51, 51, 0.05)',
    padding:16,
    marginTop:20
  },
  shopView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  shopIcon:{
    width:24,
    height:24,
    borderRadius:12,
    backgroundColor:'rgba(109,105,250,0.2)',
    marginRight:8
  },
  shopName:{
    height:24,
    fontSize:16,
    color:Colors.assist
  },
  shopDes:{
    fontSize:10,
    color:Colors.light
  },
  focusdis:{
    height:24,
    width:70,
    borderRadius:12,
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'rgba(51, 51, 51, 0.05)',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  focusSel:{
    backgroundColor:'rgba(109,105,250,0.2)',
  },
  shopFocus:{
    fontSize:14,
    color:Colors.light
  },
  shopFocussel:{
    color:Colors.main
  },
  webDetailView:{
    width:'100%',
    height:SCREEN_HEIGHT
  },
  focusButton:{
    height:24,
    justifyContent:'center',
    alignItems:'center',
    width:60,
    borderRadius:12,
    borderWidth:1,
    borderColor:'rgba(175, 172, 181, 1)',
    marginRight:5
  },
  focusButtoned:{
    borderWidth:0,
    backgroundColor:Colors.buttonMain
  },
  focusTitle:{
    fontSize:10,
    color:Colors.light
  },
  focusTitleed:{
    color:Colors.white
  },
  accounticon:{
    width:34,
    height:34,
    marginRight:5,
    borderRadius:17,
    overflow:'hidden'
  },
  accountTitle:{
    fontSize:14,
    color:Colors.white,
    width:130
  },
  title:{
    fontSize:16,
    color:Colors.white,
    width:'100%',
    fontWeight:'600',
    marginVertical:12
  },
  des:{
    fontSize:14,
    color:Colors.white,
  },
  commonTitleVieew:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:12
  },
  commonTitle:{
    fontSize:14,
    color:Colors.white,
  },
  commonTitleMain:{
    fontSize:14,
    color:Colors.buttonMain,
    marginHorizontal:5
  },
  line:{
    width:'100%',
    height:1,
    backgroundColor:Colors.separation,
    marginVertical:12
  },
  comView:{
    flexDirection:'row',
    width:'100%',
  },
  avatar:{
    width:44,
    height:44,
    borderRadius:22,
    marginRight:10,
  },
  comContent:{
    flex:1,
  },
  comName:{
    fontSize:14,
    color:Colors.white,
    marginTop:5
  },
  comFocusView:{
    width:40,
    marginLeft:10,
    alignItems:'center'
  },
  collectIcon:{
    width:18,
    height:16
  },
  collectTitle:{
    fontSize:14,
    color:Colors.white,
  },
  comFocusButton:{
    width:30,
    height:24,
    alignItems:'center',
    justifyContent:'center'
  },
  comContentDes:{
    fontSize:14,
    color:Colors.white,
    marginTop:5,
    lineHeight:20
  },
  comLine:{
    // width:'100%',
    flex:1,
    height:1,
    backgroundColor:Colors.separation,
    marginVertical:16,
    marginLeft:54
  },
  comMain:{
  },
  comDay:{
    fontSize:14,
    color:Colors.light,
  },
  comReplay:{
    fontSize:14,
    color:Colors.sub,
    marginLeft:10
  },
  comRelayButton:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  downView:{
    height:44,
    width:'100%',
    justifyContent:'center'
  },
  downViewCon:{
    height:44,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:16,
    alignItems:'center'
  },
  downIcon:{
    width:24,
    height:24,
    marginRight:5,
    marginLeft:10
  },
  downComIcon:{
    width:16,
    height:16,
  },
  comInputView:{
    flexDirection:'row',
    alignItems:'center',
    height:44,
    borderRadius:22,
    backgroundColor:'rgba(247, 247, 255, 0.3)',
    flex:1,
    paddingHorizontal:10,
    // width:SCREEN_WIDTH - 16 - 16 - 186,
  },
  downInput:{
    flex:1,
    color:Colors.black,
    fontSize:14,
    paddingTop:0,
    paddingBottom:0,
    height:'100%',
  },
  downRight:{
    flexDirection:'row',
    alignItems:'center',
    overflow:'hidden',
    justifyContent:'flex-end',
    width:186
  },
  downRightTitle:{
    color:Colors.label,
    fontSize:12,
  },
  replyTitle:{
    color:Colors.main,
    fontSize:12,
    marginHorizontal:5
  },
  replayView:{
    marginLeft:54,
    marginRight:16,
    marginTop:10
  },
  collectTitleCol:{
    fontSize:14,
    color:Colors.main
  }
});
