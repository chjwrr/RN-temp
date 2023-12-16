import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT, NAVIGATION_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    bgView:{
      flex:1,
      paddingHorizontal:16,
      // width:SCREEN_WIDTH,
      // height:SCREEN_HEIGHT
    },
    infoView:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:STATUSBAR_HEIGHT + 20
    },
    avatar:{
      width:96,
      height:96,
      borderRadius:48,
      overflow:'hidden',
      marginRight:10
    },
    name:{
      fontSize:20,
      fontWeight:'600',
      color:Colors.black,
      marginBottom:10
    },
    des:{
      fontSize:12,
      color:Colors.black,
      marginBottom:5
    },
    uid:{
      fontSize:12,
      color:Colors.black,
      marginBottom:5,
      width:'50%',
    },
    numbeView:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:60,
      marginBottom:30
    },
    number:{
      fontSize:16,
      color:Colors.label,
    },
    numberDes:{
      fontSize:10,
      color:Colors.light,
    },
    numberBtn:{
      alignItems:'center',
      marginRight:30
    },
    setting:{
      width:28,
      height:28,
      marginRight:10
    },
    editinfo:{
      fontSize:12,
      color:Colors.label,
    },
    editBtn:{
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:15,
      borderRadius:5,
      paddingVertical:5
    },
    lvView:{
      width:SCREEN_WIDTH - 32,
      height:(SCREEN_WIDTH - 32) * 100 / 343,
      paddingLeft:24,
      justifyContent:'center'
    },
    lvname:{
      fontSize:30,
      color:Colors.assist
    },
    lvnum:{
      fontSize:12,
      color:Colors.assist,
      marginVertical:7
    },
    lvnumcen:{
      fontSize:10,
      color:Colors.assist
    },
    lvnumView:{
      justifyContent:'center',
      alignItems:'center',
      width:80,
      height:20,
      borderRadius:10,
      borderWidth:1,
      borderColor:Colors.white
    },
    bg:{
      backgroundColor:'rgba(109,105,250,0.2)',
      borderRadius:8,
      marginTop:10
    },
    inviteView:{
      marginTop:10
    },
    inviteBgView:{
      width:SCREEN_WIDTH - 32,
      height:(SCREEN_WIDTH - 32) * 82 / 343,
    },
    inviteName:{
      fontSize:24,
      color:Colors.assist,
      fontWeight:'600'
    },
    orderView:{
      paddingVertical:24,
      paddingHorizontal:32,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    ovdername:{
      color:Colors.bright,
      fontSize:12
    },
    orderIcon:{
      width:32,
      height:32,
      marginBottom:10
    }
});