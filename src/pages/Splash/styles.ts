import { BOTTOM_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils';
import {
    StyleSheet,
    Dimensions
} from 'react-native';
  

export const styles = StyleSheet.create({
    bgImage:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    logo:{
        width:180,
        height:175
    },
    guidImg:{
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT / 2,
        flex:1
    },
    downView:{
        flex:1,
        justifyContent:'space-between',
    },
    downTopView:{
        width:'100%',
        alignItems:'center',
        paddingTop:20,
    },
    title:{
        color:'#6d69fa',
        fontSize:40,
        fontFamily: 'SmileySans-Oblique',
    },
    des:{
        color: 'rgba(38, 31, 49, 1)',
        fontSize:16,
        lineHeight: 24,
        fontWeight: '400',
        width:300,
        marginTop:40,
        textAlign:'center'
    },
    downBottomView:{
        width:SCREEN_WIDTH,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:30,
        position:'absolute',
        bottom:BOTTOM_HEIGHT + 20,
    },
    nextImg:{
        width:50,
        height:50
    },
    subView:{
        width:SCREEN_WIDTH,
        flex:1
    },
    pointer:{
        flexDirection:'row'
    },
    slidepointer:{
        width:6,
        height:6,
        borderRadius:3,
        backgroundColor:'rgba(109, 105, 250, 0.15)',
        marginRight:5
    }
});