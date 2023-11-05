import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT } from '@/utils';
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
        width:'100%',
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
        color:'rgba(250, 212, 142, 1)',
        marginBottom:10
    },
    banner:{
        width:SCREEN_WIDTH - 16,
        height:(SCREEN_WIDTH - 16) * 380 / 686
    },
    bannerTitleView:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10
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
        height:SCREEN_WIDTH * 162 / 890,
        position:'absolute',
        top:0
    },
    centerItemView:{
        flexDirection:'row',
        justifyContent:'space-between',
        // paddingHorizontal:16,
        marginTop:20,
        zIndex:2
    },
    centerItem:{
        width:SCREEN_WIDTH/4,
        height:SCREEN_WIDTH/4
    }
});
