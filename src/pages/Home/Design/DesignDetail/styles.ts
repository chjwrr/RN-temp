import { BOTTOM_HEIGHT, NAVIGATION_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '@/utils';
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
    // top:STATUSBAR_HEIGHT,
    top:0,
    paddingTop:STATUSBAR_HEIGHT,
    paddingHorizontal:16,
    position:'absolute',
    zIndex:100,
    alignItems:'center'
  },
  contentContainerStyle:{
    marginTop:Platform.OS === 'ios' ? NAVIGATION_HEIGHT : STATUSBAR_HEIGHT + NAVIGATION_HEIGHT,
    paddingBottom:88+BOTTOM_HEIGHT,
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
  webView:{
    width:SCREEN_WIDTH,
    height:SCREEN_WIDTH
  },
  webDetailView:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT
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
    marginTop:12
  },
  swiperView:{
    alignItems:'center',
    paddingHorizontal:16,
  },
  swiperTopView:{
    width:SCREEN_WIDTH - 32,
    height:(SCREEN_WIDTH - 32) * 3508 / 2480,
    borderRadius:8,
    overflow:'hidden',
    // backgroundColor:'#fff'
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
    color:Colors.assist,
    textAlign:'center'
  },
  detailView:{
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 -2 15 2 rgba(51, 51, 51, 0.05)',
    padding:16,
    marginTop:20,
    marginBottom:Platform.OS == 'ios'?0:66 + BOTTOM_HEIGHT,
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
  downView:{
    flexDirection:'row',
    position:'absolute',
    height:66+BOTTOM_HEIGHT,
    width:'100%',
    bottom:0,
    zIndex:10,
    alignItems:'center',
    padding:16,
    paddingBottom:BOTTOM_HEIGHT + 16,
    backgroundColor:Colors.white
  },
  downViewItem:{
    height:44,
    flex:1,
    borderWidth:1,
    borderStyle:'solid',
    borderColor:Colors.main,
    backgroundColor: 'rgba(109, 105, 250, 0.2)',
    borderRadius:4,
    paddingHorizontal:8,
    flexDirection:'row'
  },
  downViewItemSel:{
    backgroundColor:Colors.main
  },
  buttonContrianer:{
    flex:1,
    height:44,
  },
  downViewItemRight:{
    backgroundColor:'transparent',
    marginLeft:8
  },
  downIcon:{
    width:38,
    height:38,
  },
  downTitle:{
    fontSize:16,
    color:Colors.label,
    flex:1,
    textAlign:'center',
    lineHeight:44,
    fontWeight:'600'
  },
  downTitleSel:{
    color:Colors.white
  },
  showBuyView:{
    height:220,
    flex:1,
    position:'absolute',
    bottom:-220,
    left:0,
    right:0,
    zIndex:6,
    flexDirection:'row',
  },
  showBuyLeftView:{
    flex:3,
    backgroundColor:Colors.white,
    borderTopLeftRadius:12,
    borderTopRightRadius:12,
    paddingTop:30,
    paddingLeft:40
  },
  showBuyLeftSubView:{
    flexDirection:'row',
    marginBottom:12,
    alignItems:'center'
  },
  showBuyLeftIcon:{
    width:30,
    height:30,
    marginRight:12
  },
  showBuyLeftName:{
    fontSize:14,
    color:Colors.assist
  },
  showBuyLine:{
    width:2,
    height:208,
    backgroundColor:'#fff',
    marginTop:12
  },
  showBuyRightView:{
    flex:2,
    backgroundColor:Colors.white,
    alignItems:'center',
    paddingTop:30,
    borderTopLeftRadius:12,
    borderTopRightRadius:12
  },
  showBuyRightIcon:{
    width:44,
    height:44,
    position:'absolute',
    top:-22,
    left:'44%'
  },
  showBuyRightDownIcon:{
    width:88,
    height:88,
    marginTop:16
  },
  showBuyRightDownBg:{
    width:292,
    height:245,
    position:'absolute',
    right:-50,
    top:0,
    bottom:0,
  },
  showBuyRightName:{
    fontSize:12,
    color:Colors.assist,
  },
  bgModal:{
    position:'absolute',
    zIndex:4,
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0.4)',
    // flex:1,
    // width:'100%',
    // height:'100%',
  },
  detailInfo:{
    width:'100%',
    marginTop:16,
    paddingVertical:16,
    alignItems:'center',
    marginBottom:Platform.OS == 'ios'?0:66 + BOTTOM_HEIGHT,
  },
  detailTopBg:{
    width:SCREEN_WIDTH - 32,
    height:(SCREEN_WIDTH - 32) * 226 / 1377,
    flexDirection:'row',
    alignItems:'center',
  },
  detailLeftButton:{
    width:(SCREEN_WIDTH - 32) / 5 * 3,
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  detailRightButton:{
    width:(SCREEN_WIDTH - 32) / 5 * 2,
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  detailTopTitle:{
    fontSize:14,
    color:Colors.label,
    fontWeight:'600',
    marginBottom:10
  },
  detailTopTitledis:{
    fontSize:12,
    color:Colors.label,
    marginBottom:10
  },
  downImageView:{
    width:290,
    // height:420,
    backgroundColor:'#fff',
    borderRadius:10,
    alignItems:'center',
    paddingVertical:8,
    overflow:'hidden'
  },
  downImageContent:{
    width:274,
    height:320,
    backgroundColor:'rgba(109,105,250,0.2)',
    borderRadius:8
  },
  downImageLineView:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    justifyContent:'center',
    marginTop:10
  },
  downImageLine:{
    width:278,
    height:278 * 2 / 266
  },
  downlinecir:{
    width:12,
    height:12,
    borderRadius:6,
    backgroundColor:'rgba(0,0,0,0.5)',
    left:-6,
    position:'absolute'
  },
  downlinercir:{
    width:12,
    height:12,
    borderRadius:6,
    backgroundColor:'rgba(0,0,0,0.5)',
    right:-6,
    position:'absolute'
  },
  downImagebutton:{
    backgroundColor:' rgba(109, 105, 250, 0.2)',
    borderRadius:20,
    borderWidth:1,
    borderColor:'rgba(109, 105, 250, 1)',
    height:40,
    flexDirection:'row',
    paddingLeft:10,
    width:114,
    alignItems:'center'
  },
  downImagebuttonSpa:{
    marginLeft:12
  },
  downImagebuttonicon:{
    width:18,
    height:18,
    marginRight:8
  },
  downImagebuttontitle:{
    fontSize:14,
    color:Colors.label,
    fontWeight:'500'
  },
  downButtonView:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20,
    marginBottom:12
  },
  detailImage:{
    width:SCREEN_WIDTH - 32,
    height:500
  },
  detailName:{
    fontSize:14,
    color:Colors.title,
    marginVertical:2
  },
  transImage:{
    width:320,
    height:70,
    marginTop:-30
  },
});