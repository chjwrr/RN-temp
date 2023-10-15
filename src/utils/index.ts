
  import {
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native';
const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

const IPHONE12_H = 844
const IPHONE12_MAX = 926
const IPHONE12_MINI = 780

const IPHONE13_H = 844
const IPHONE13_MAX = 926
const IPHONE13_MINI = 812

const IPHONE14_H = 844
const IPHONE14_W = 393
const IPHONE14_MAX = 932
const IPHONE14_PLUS = 926
const IPHONE14_MINI = 852


const { width, height } = Dimensions.get('window')

const isIPhoneX = (() => {
    if (Platform.OS === 'web') return false
    if (Platform.OS === 'android') return false
  
    return (
        (Platform.OS === 'ios' &&
            ((height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT))) ||
        ((height === XSMAX_HEIGHT && width === XSMAX_WIDTH) ||
            (height === XSMAX_WIDTH && width === XSMAX_HEIGHT) ||
            (height === IPHONE12_H || height === IPHONE12_MAX || height === IPHONE12_MINI) ||
            (height === IPHONE13_H || height === IPHONE13_MAX || height === IPHONE13_MINI) ||
            (height === IPHONE14_H || height === IPHONE14_MAX || height === IPHONE14_MINI || height === IPHONE14_PLUS))
    )
  })()
  
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ?(isIPhoneX?44:20):StatusBar.currentHeight || 32;
export const NAVIGATION_HEIGHT =  Platform.OS === 'ios' ?44:48
