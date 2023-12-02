import { NAVIGATION_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT,STATUSBAR_SAFE_AREA_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:Colors.black,
        paddingHorizontal:16,
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
    collectIcon:{
      width:18,
      height:16
    },
    topImage:{
      width:SCREEN_WIDTH,
      height:230,
      position:'absolute',
      top:0,
    },
    bottomOp:{
      height:150,
      width:SCREEN_WIDTH,
      top:90,
      position:'absolute',
      left:0,
      right:0
    },
    topOp:{
        position:'absolute',
        top:0,
        right:0,
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
    navigationView:{
        width:SCREEN_WIDTH,
        height:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:STATUSBAR_HEIGHT,
        position:'absolute',
        zIndex:10,
        top:0,
        paddingHorizontal:16,
        backgroundColor:Colors.black
    },
    scrollView:{
        flex:1,
        marginBottom:12,
        width:SCREEN_WIDTH - 32,
    },
    topView:{
        marginLeft:14,
        marginTop:NAVIGATION_HEIGHT + STATUSBAR_HEIGHT + 10,

    },
    infoView:{
        flexDirection:'row',
        alignItems:'center',
    },
    avatar:{
        width:80,
        height:80,
        borderRadius:40,
        overflow:'hidden',
        backgroundColor:'red',
        marginRight:32,
    },
    name:{
        fontSize:28,
        color:Colors.white
    },
    des:{
        fontSize:12,
        color:Colors.white,
        marginTop:5
    },
    desinfo:{
        fontSize:10,
        color:Colors.white,
    },
    linearView:{
        height:24,
        justifyContent:'center',
        alignItems:'center',
        // width:60,
        paddingHorizontal:10,
        borderRadius:12,
        marginTop:30,
        marginRight:10
    },
    linearVienumw:{
        height:30,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
        marginLeft:10
    },
    numberView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:20
    },
    number:{
        fontSize:16,
        color:Colors.white,
    },
    numItem:{
        alignItems:'center',
        marginRight:10
    },
    numberdes:{
        fontSize:10,
        color:Colors.light,
        marginTop:5
    },
    numberdestitle:{
        fontSize:12,
        color:Colors.white,
    },
    title:{
      fontSize:16,
      fontWeight:'600',
      color:Colors.white,
    },
    line:{
      width:'100%',
      height:1,
      backgroundColor:'rgba(255,255,255,0.3)',
      marginVertical:16
    },
    bannerView:{
      width:'100%',
      height:200,
      borderRadius:8,
      overflow:'hidden',
      marginTop:8
    },
    banner:{
      width:'100%',
      height:200,
    },
    recmmonItem:{
      width:86,
      marginRight:8,
      marginTop:12
    },
    focusAvatarView:{
      width:86,
      height:86,
      borderRadius:12,
      overflow:'hidden',
    },
    itemName:{
      fontSize:10,
      color:Colors.white,
      marginTop:5
    },
    itemID:{
      fontSize:10,
      color:Colors.white,
      marginTop:2
    },
    linearsellView:{
      height:20,
      justifyContent:'center',
      alignItems:'center',
      // width:60,
      paddingHorizontal:5,
      borderRadius:10,
      position:'absolute',
      top:60,
      right:5

    }
});

