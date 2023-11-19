import { SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    swiperView:{
        flex:1,
        height:160,
        borderRadius:8,
        backgroundColor: "blue",
    },
    flowView:{
        flex:1,
        height:260,
        backgroundColor:Colors.white,
        borderRadius:5,
        padding:8
    },
    flowLoadingView:{
      flex:1,
      height:260,
      borderRadius:5,
    },
    flowViewIcon:{
        height:180,
        borderRadius:8,
    },
    flowViewTitle:{
        fontSize:14,
        color:Colors.title,
        marginVertical:12
    },
    flowViewSubView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    flowIcon:{
        width:16,
        height:16,
        marginRight:8,
        borderRadius:88,
        backgroundColor:'blue',
    },
    flowName:{
        fontSize:10,
        color:Colors.label,
        width:'70%'
    },
    flowFocus:{
        width:16,
        height:16,
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
    topTitle:{
        marginTop:12,
        marginBottom:6,
        fontSize:16,
        fontWeight:'600',
        color:Colors.title,
    },
    topItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:12,
        // flex:1,
        paddingHorizontal:8,
        width:SCREEN_WIDTH - 32
    },
    topItemSub:{
        flex:1,
        borderRadius:8,
        backgroundColor:'blue',
        height:54,
        justifyContent:'center',
        alignItems:'center',
    },
    topItemSubSpa:{
        marginHorizontal:12
    },
    topItemName:{
        fontSize:14,
        color:Colors.white,
        fontWeight:'600'
    },
    focusButton:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',
    }
});
  