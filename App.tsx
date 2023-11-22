import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import TabNavigator from '@/pages/TabNavigator'
import { RootSiblingParent } from 'react-native-root-siblings';
import FlashMessage from "react-native-flash-message";
import {
  Platform,
  UIManager,
} from 'react-native'
import Provider from '@/provider'
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 200,
  thumbnailAnimationDuration: 200,
};
console.log('images_cache===',`${Dirs.CacheDir}/images_cache/`)

function App(): JSX.Element {
  useEffect(()=>{
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
  },[])
  return (
    <Provider>
      <RootSiblingParent>
        <TabNavigator/>
        <FlashMessage position="top" />
      </RootSiblingParent>
    </Provider>
  );
}

export default App;