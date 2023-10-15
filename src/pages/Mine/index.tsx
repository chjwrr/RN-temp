
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Button
} from 'react-native';
import {styles} from './styles'
import { NAVIGATION_HEIGHT, STATUSBAR_HEIGHT } from '@/utils';
import { CachedImage, CacheManager } from '@georstat/react-native-image-cache';
import ImagePlaceholder from '@/components/ImagePlaceholder';


const prefetchImage =
  'https://upload.wikimedia.org/wikipedia/commons/0/02/Oia_dal_battello_al_tramonto_-_Santorini_-_Grecia_-_agosto_2018.jpg';

const prefetchImageTwo =
  'https://upload.wikimedia.org/wikipedia/commons/4/48/Thira_%28Santorini%29_-_Ia-01.jpg';

const prefetchImageThree =
  'https://upload.wikimedia.org/wikipedia/commons/3/37/Oia_sunset_-_panoramio_%282%29.jpg';



function Mine(): JSX.Element {

  return (
    <SafeAreaView  style={{
      flex: 1
    }}>
<KeyboardAvoidingView style={{ flex: 1 }}
  behavior={Platform.OS === 'android' ? 'height' : 'padding'}
  keyboardVerticalOffset={STATUSBAR_HEIGHT + NAVIGATION_HEIGHT}>
      <View style={styles.mainView}>
      <Text style={styles.title}>Min</Text>
        <Text style={styles.title}>bottom</Text>
        <CachedImage
          source={'https://img2.baidu.com/it/u=3219906533,2982923681&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'}
          style={{ height: 200, width: 200 }}
          blurRadius={30}
          loadingImageComponent={ImagePlaceholder}
          thumbnailSource='https://img2.baidu.com/it/u=3219906533,2982923681&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
          />
    
    
        <Button
          title="清理 CachedImage 缓存"
          onPress={async() => {
            await CacheManager.clearCache();
          }}
        />

        <TextInput  style={{
        width:'100%',
        height:44,
        backgroundColor:'purple',
      }} placeholder='enter'/>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Mine;
