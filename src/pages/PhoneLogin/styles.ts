import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT, STATUSBAR_SAFE_AREA_HEIGHT } from '@/utils';
import {
    StyleSheet,
  } from 'react-native';
  
export const styles = StyleSheet.create({
    bgckImg:{
        width:32,
        height:32,
        marginTop:STATUSBAR_SAFE_AREA_HEIGHT
    },
    bgImage:{
        flex:1,
        paddingHorizontal:33,
    },
    main:{
        flex:1,
    },
    mainContent:{
        flex:1,
        justifyContent:'space-between'
    },
    title:{
        marginTop:160 - 32 - STATUSBAR_SAFE_AREA_HEIGHT,
        color:'#261f31',
        fontSize:40,
        fontFamily: 'SmileySans-Oblique',
        marginBottom:95
    },
    inputView:{
        width:'100%',
        height:40,
        borderBottomWidth:1,
        borderBottomColor:'rgba(51, 51, 51, 0.05)',
        flexDirection:'row',
        alignItems:'center'
    },
    input:{
        flex:1,
        color:'#AFACB5',
        fontSize:14,
        paddingVertical:0
    },
    downView:{
        alignItems:'center',
        paddingBottom:10
    },
    agreeView:{
        flexDirection:'row',
        alignItems:'center',
    },
    agreeTextView:{
        flexDirection:'row',
    },
    agreeButton:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center'
    },
    agreeImg:{
        width:12,
        height:12
    },
    agreeText:{
        color:'#8E8A97',
        fontSize:12,
    },
    agreeTextDis:{
        color:'#6D69FA',
        fontSize:12,
    },
    agreeSelButton:{
        marginHorizontal:5,
        alignItems:'center',
        justifyContent:'center'
    },
    loginButton:{
        width:310,
        height:52,
        justifyContent:'center',
        alignItems:'center'
    },
    logintitle:{
        color:'#fff',
        fontSize:14,
    },
    loginButtonvieew:{
        marginTop:50
    },
    phoneArea:{
        color:'rgba(79, 74, 88, 1)',
        fontSize:14,
        marginRight:10
    },
    tips:{
        color:'#E33C64',
        fontSize:14,
        height:20,
        marginTop:10
    }
});
