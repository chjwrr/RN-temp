
import React, { useState } from 'react';
import {styles} from './styles'
import { Image as ExpoImage } from 'expo-image';
import { getImageUrl } from '@/api/axios';
import { BLUR_HASH, SCREEN_WIDTH } from '@/utils';
import { CachedImage} from '@georstat/react-native-image-cache'
import ImagePlaceholder from '../ImagePlaceholder';

function DetailImage({imageName}:any){
  const [imageHeight,setImageHeight] = useState(500)
  return <CachedImage
  key={imageName}
  sourceAnimationDuration={100}
  thumbnailAnimationDuration={100}
  resizeMode='cover'
  source={getImageUrl(imageName)}
  style={[styles.detailImage,{
    height:imageHeight
  }]}
  blurRadius={30}
  loadingImageComponent={ImagePlaceholder}
  onLoad={(e:any)=>{
    setImageHeight((SCREEN_WIDTH - 32) * e.nativeEvent.source.height / e.nativeEvent.source.width)
  }}
  />
  return <ExpoImage
    key={imageName}
    style={[styles.detailImage,{
      height:imageHeight
    }]}
    source={getImageUrl(imageName)}
    placeholder={BLUR_HASH}
    contentFit="cover"
    onLoad={(e:any)=>{
      setImageHeight((SCREEN_WIDTH - 32) * e.source.height / e.source.width)
    }}
  />
}
export default DetailImage