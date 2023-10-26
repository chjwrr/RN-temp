import { NAVIGATION_HEIGHT, STATUSBAR_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    bgView:{
        flex:1,
        paddingHorizontal:16,
    },
    navigationView:{
        width:'100%',
        height:NAVIGATION_HEIGHT,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:STATUSBAR_HEIGHT
    },
    searchView:{
        flex:1,
        backgroundColor:Colors.white,
        height:32,
        marginRight:12,
        borderRadius:32 / 2,
        paddingHorizontal:16,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    input:{
        flex:1,
        color:Colors.black,
        fontSize:14,
        paddingTop:0,
        paddingBottom:0,
        height:'100%'
    },
    accounticon:{
        width:24,
        height:24,
    },
    searchicon:{
        width:16,
        height:16,
    },
    tabView:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:34,
        marginVertical:5,
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
        height:40
    },
    tabButtonTitle:{
        fontSize:14,
        color:Colors.title,
        fontWeight:'400'
    }
});
  