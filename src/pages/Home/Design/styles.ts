import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    swiperView:{
        width:'100%',
        height:160,
        borderRadius:8,
    },
    flowView:{
        width:'100%',
        height:160,
        borderRadius:5,
        padding:8,
        overflow:'hidden',

    },
    itemImage:{
      position:'absolute',
      left:0,
      right:0,
      top:0,
      bottom:0
    },
    flowLoadingView:{
      width:'100%',
      height:160,
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
      fontWeight:'600'
    },
    modalDes:{
      fontSize:12,
      color:Colors.label
    }
});
  