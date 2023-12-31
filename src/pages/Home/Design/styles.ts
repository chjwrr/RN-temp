import { SCREEN_WIDTH } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    swiperView:{
        width:'100%',
        height:180,
        // height:(SCREEN_WIDTH - 32)*256/343,
        borderRadius:8,
    },
    flowView:{
        width:'100%',
        height:200,
        borderRadius:5,
        padding:8,
        overflow:'hidden',
    },
    itemImage:{
      width:'100%',
      height:160
    },
    flowLoadingView:{
      width:'100%',
      height:200,
      borderRadius:5,
      padding:8
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
        flex:1,
        height:60,
        backgroundColor:'rgba(109,105,250,0.2)',
        borderRadius:5,
      },
    focusButton:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',
    },
    separator:{
      height:10
    },
    modalName:{
      fontSize:16,
      color:Colors.title,
      fontWeight:'600',
      marginTop:10
    },
    modalDes:{
      fontSize:12,
      color:Colors.label
    }
});
  