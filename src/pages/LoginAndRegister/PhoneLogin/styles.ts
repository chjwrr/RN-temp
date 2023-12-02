import { BOTTOM_SPACE_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT, STATUSBAR_SAFE_AREA_HEIGHT } from '@/utils';
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
        marginBottom:95
    },
    inputView:{
        width:'100%',
        height:40,
        borderBottomWidth:1,
        borderBottomColor:Colors.border,
        flexDirection:'row',
        alignItems:'center'
    },
    downView:{
        alignItems:'center',
        paddingBottom:BOTTOM_SPACE_HEIGHT
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
        marginTop:50
    },
    phoneArea:{
        color:Colors.assist,
        fontSize:14,
        marginRight:10
    },
    tips:{
        color:Colors.error,
        fontSize:14,
        height:20,
        marginTop:10
    },
    centerView:{
      alignItems:'center'
    }
});
