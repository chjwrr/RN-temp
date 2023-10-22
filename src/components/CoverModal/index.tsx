
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity
} from 'react-native';
import {styles} from './styles'
import RootSiblingsManager from 'react-native-root-siblings';
import { SCREEN_HEIGHT } from '@/utils';

const duration = 200

function CoverModal({
  renderContent,
  position = 'center'
}:{
  renderContent:JSX.Element,
  position?:'center' | 'bottom'
}): JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const saleAnim = useRef(new Animated.Value(0)).current;
  const bottomAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(()=>{
    showAnimated()
  }),[]
  const showAnimated = () => {
    position == 'center' ? Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(saleAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    ]).start() : Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(bottomAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      })
    ]).start() 
  };

  function onClose(){
    position == 'center' ? Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(saleAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      })
    ]).start(({finished}) => {
      if (finished){
        hidden()
      }
    }) : Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(bottomAnim, {
        toValue: SCREEN_HEIGHT,
        duration,
        useNativeDriver: true,
      })
    ]).start(({finished}) => {
      if (finished){
        hidden()
      }
    });
  }

  return (
    <Animated.View style={[styles.main,{
      justifyContent:position == 'center' ? 'center' : 'flex-end',
      alignItems:'center'
    },{
      opacity: fadeAnim,
    }]}>
      <TouchableOpacity activeOpacity={1} style={styles.bgButton} onPress={onClose}/>
      <Animated.View style={[{
        width:'100%',
        alignItems:'center',
      },position == 'center' ? {transform:[{scale:saleAnim}]}:{transform: [{translateY: bottomAnim}]}]}>
        {renderContent}
      </Animated.View>
    </Animated.View>
  );
}

let siblings:any = null
export function show(renderContent:JSX.Element,config?:any){
  if (siblings){
    siblings.update(<CoverModal renderContent={renderContent} position={config?.position}/>)
    return
  }
  siblings = new RootSiblingsManager(<CoverModal renderContent={renderContent} position={config?.position}/>);
}
export function hidden(){
  siblings && siblings.destroy();
  siblings = null
}