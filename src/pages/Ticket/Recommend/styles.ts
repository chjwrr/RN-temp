import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT,STATUSBAR_SAFE_AREA_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    mainView:{
        flex:1,
        backgroundColor:Colors.black
    },
    topbg:{
        width:SCREEN_WIDTH,
        height:SCREEN_WIDTH * 1200 / 750,
        marginTop:-STATUSBAR_HEIGHT,
        position:'absolute',
        top:0,
        left:0
    },
    topOp:{
        position:'absolute',
        top:0,
        left:0,
        height:STATUSBAR_HEIGHT + NAVIGATION_HEIGHT,
        width:SCREEN_WIDTH,
        zIndex:2
    },
    downOp:{
        position:'absolute',
        bottom:0,
        left:0,
        height:SCREEN_WIDTH * 1200 / 750 / 2,
        width:'100%',
        // zIndex:2
    },
    contentView:{
        flex:1,
    },
    topBanner:{
      width:SCREEN_WIDTH,
      height:SCREEN_WIDTH * 640 / 750
    },
    bannerView:{
        paddingHorizontal:16,
        marginTop:-SCREEN_WIDTH * 600 / 750 / 2  - 20,
    },
    centerbg:{
        width:SCREEN_WIDTH,
        height:SCREEN_WIDTH * 600 / 750,
        // marginTop:-20
    },
    centerTitle:{
        fontSize:16,
        color:'#fff',
        marginBottom:10
    },
    banner:{
        width:SCREEN_WIDTH - 32,
        height:(SCREEN_WIDTH - 32) * 380 / 686,
        borderRadius:8
    },
    bannerTitleView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:5
    },
    bannerTitle:{
        fontSize:14,
        color:Colors.white
    },
    bannerTitleDes:{
        fontSize:12,
        color:Colors.white
    },
    pointView:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
        marginTop:-24
    },
    point:{
        width:4,
        height:4,
        borderRadius:2,
        marginHorizontal:2
    },
    centerLine:{ 
        width:'100%',
        height:SCREEN_WIDTH * 102 / 750,
        position:'absolute',
        top:-25,
    },
    centerItemView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:16,
        marginTop:50,
        zIndex:2,
    },    
    centerItem:{
        width:74,
        height:67,
    },
    navigationView:{
        width:'100%',
        height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:STATUSBAR_HEIGHT,
        position:'absolute',
        zIndex:10,
        top:0,
        backgroundColor:Colors.black
    },
    tabButton:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    tabButtonBg:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:75,
        height:40,
    },
    flowLoadingView:{
        width:(SCREEN_WIDTH - 32 - 2) / 2,
        height:270,
        borderRadius:8,
        overflow:'hidden'
        // marginHorizontal:16
      },
    flowView:{
        width:(SCREEN_WIDTH - 32 - 2) / 2,
        height:270,
        borderRadius:8,
        overflow:'hidden',
    },
    flowView2:{
        // width:SCREEN_WIDTH - 32,
        paddingHorizontal:16
    },
    typeItem:{
        width:(SCREEN_WIDTH - 32 - 2) / 2,
        height:180,
        justifyContent:'flex-end',
        overflow:'hidden',
        alignItems:'flex-start'
    },
    typeItemDownBlur:{
      height:64,
      width:'100%',
      position:'absolute',
      bottom:0,
  },
  typeItemDown2:{
    height:64,
    width:'100%',
    paddingHorizontal:10,
    justifyContent:'center',
    zIndex:2,
},
    typeItemDown:{
        height:90,
        paddingHorizontal:10,
        justifyContent:'center',
        zIndex:2,
        width:(SCREEN_WIDTH - 32 - 2) / 2,
    },
    typeItemDownbg:{
      position:'absolute',
      top:0,
      bottom:0,
      left:0,
      right:0
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
    flowViewTitle:{
        fontSize:14,
        color:Colors.white,
        width:'60%',
    },
    flowViewSubView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
    },
    flowIcon:{
        width:24,
        height:24,
        marginRight:8,
        borderRadius:12,
    },
    flowName:{
        fontSize:10,
        color:Colors.white,
        width:'40%'
    },
    flowNameid:{
      fontSize:12,
      color:Colors.white,
      marginBottom:5
    },
    flowFocus:{
        width:16,
        height:15,
    },
    focusButton:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',
    },
    focusView:{
        alignItems:'center',
        width:70
    },
    focusAvatarView:{
        width:44,
        position:'relative'
    },
    focusAvtar:{
        width:44,
        height:44,
        borderRadius:22
    },
    focusTipView:{
        width:12,
        height:12,
        borderRadius:6,
        backgroundColor:Colors.tipPoint,
        position:'absolute',
        right:0,
        top:0,
        zIndex:10
    },
    focusName:{
        fontSize:12,
        color:Colors.white,
    },
    scrollView:{
        width:'100%',
        height:78,
    },
    moenyUni:{
      fontSize:16,
      color:Colors.white,
      marginRight:5
    },
    moeny:{
      fontSize:20,
      color:Colors.white,
    },
    limmitbg:{
      width:81,
      height:18,
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      left:0,
      bottom:-1
    },
    limmittitle:{
      fontSize:10,
      color:Colors.white,
    }
});

