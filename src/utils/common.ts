import dayjs from "dayjs"
import { PermissionsAndroid, Platform } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { Dirs } from 'react-native-file-access';
import { CacheManager } from "@georstat/react-native-image-cache";
import { showMessage } from "react-native-flash-message";


let isPhoneNumberReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

export function isPhoneNumber(phoneNumber:string){
  return isPhoneNumberReg.test(phoneNumber)
}

export function formatTime(time:number,format?:string){
  let formatString = format || 'YYYY-MM-DD HH:mm:ss'
  return dayjs(time).format(formatString)
}

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Number(Platform.Version) >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Number(Platform.Version) >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

export async function savePicture(imageFile:string) {

  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    showMessage({
      message: "请开启访问相册权限",
      type: "info",
    });
    return;
  }
  if (!CacheManager.isImageCached(imageFile)){
    showMessage({
      message: "图片加载中，请稍后",
      type: "info",
    });
    return
  }
  const cacheM = CacheManager.get(imageFile,undefined)
  cacheM.getPath().then((imageLocalFile:string | undefined)=>{
    if (imageLocalFile){
      if (!imageLocalFile.startsWith('file://')){
        imageLocalFile = 'file://' + imageLocalFile
      }
      CameraRoll.save(imageLocalFile, { type:'photo' }).then((res:any)=>{
        console.log('res==',res)
        showMessage({
          message: "成功保存到相册",
          type: "success",
        });
      }).catch(()=>{
        showMessage({
          message: "图片保存失败",
          type: "danger",
        });
      })
    }else {
      showMessage({
        message: "获取图片路径失败",
        type: "danger",
      });
    }
  }).catch(()=>{
    showMessage({
      message: "获取图片失败",
      type: "danger",
    });
  })

};
export function isImage(str:string){
  if (!str) return false
  return str.endsWith('.jpg') ||
    str.endsWith('.JPG') ||
    str.endsWith('.png') ||
    str.endsWith('.PNG') ||
    str.endsWith('.jpeg') ||
    str.endsWith('.JPEG')
}