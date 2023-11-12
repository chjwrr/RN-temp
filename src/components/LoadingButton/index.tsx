
import React, { useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import LoadingComponent from '../LoadingComponent';
import { styles } from './styles';

function LoadingButton({
  children,
  onPressIn,
  style,
  isLoading,
  loadingWidth = 50,
}: {
  children: React.ReactNode,
  onPressIn:(event: GestureResponderEvent) => void,
  style:any,
  isLoading:boolean,
  loadingWidth?:number
}): JSX.Element {

  // const onPress = useCallback(_.throttle(onPressIn,5000),[isLoading])

  function onPress(e:GestureResponderEvent){
    if (!isLoading){
      onPressIn(e)
      return
    }
  }

  return (
   <View>
     <TouchableOpacity onPressIn={onPress} style={[style,{
      opacity:isLoading ? 0.3 : 1,
    }]}>
      {children}
    </TouchableOpacity>
    {
      isLoading && <View style={[style,styles.loadingView]}>
        <LoadingComponent width={loadingWidth}/>
      </View>
    }
   </View>
  );
}
export default LoadingButton