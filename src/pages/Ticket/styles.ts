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
    navigationView:{
        width:'100%',
        height:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:STATUSBAR_HEIGHT,
        position:'absolute',
        zIndex:10,
        top:0,
        backgroundColor:Colors.black,
        opacity:0,
        overflow:'hidden'
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
});


