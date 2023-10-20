import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUSBAR_SAFE_AREA_HEIGHT } from '@/utils';
import Colors from '@/utils/colors';
import {
    StyleSheet,
} from 'react-native';
export const styles = StyleSheet.create({
    backButton:{
        width:32,
        height:32,
        marginLeft:-10,
        marginTop:STATUSBAR_SAFE_AREA_HEIGHT

    },
    bgckImg:{
        width:32,
        height:32,
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
        marginTop:120 - 32 - STATUSBAR_SAFE_AREA_HEIGHT,
        color:Colors.title,
        fontSize:40,
        fontFamily: 'SmileySans-Oblique',
    },
    tipReg:{
        flexDirection:'row',
        marginTop:5,
        marginBottom:70
    },
    tip:{
        color:Colors.light,
        fontSize:14,
    },
    regist:{
        color:Colors.forbidBg,
        fontSize:14,
        marginLeft:10,
        fontWeight:'600'
    },
    inputView:{
        width:'100%',
        height:40,
        borderBottomWidth:1,
        borderBottomColor:Colors.border,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    input:{
        flex:1,
        color:Colors.light,
        fontSize:14,
        paddingTop:0,
        paddingBottom:0,
        height:'100%'
    },
    forgetpsd:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20
    },
    forgetpsdtitle:{
        color:Colors.light,
        fontSize:14,
        fontWeight:'600'
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
        color:Colors.forbidBg,
        fontSize:12,
    },
    agreeTextDis:{
        color:Colors.bright,
        fontSize:12,
    },
    agreeSelButton:{
        marginHorizontal:5,
        alignItems:'center',
        justifyContent:'center'
    },
    arrow:{
        width:4,
        height:7,
        marginLeft:10
    },
    verify:{
        flexDirection:'row',
        marginBottom:20,
        alignItems:'center'
    },
    veifytitle:{
        color:Colors.light,
        fontSize:14,
    },
    loginButton:{
        width:310,
        height:52,
        justifyContent:'center',
        alignItems:'center'
    },
    logintitle:{
        color:Colors.white,
        fontSize:14,
    },
    loginButtonvieew:{
        marginBottom:70
    },
    tips:{
        color:Colors.error,
        fontSize:14,
    },
    codeButton:{
        width:70,
        height:20,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    codetitle:{
        color:Colors.light,
        fontSize:14,
    }
});
