import axios from 'axios'
import { showMessage } from 'react-native-flash-message';

const instance = axios.create({})
instance.defaults.timeout = 30000;
instance.defaults.baseURL = 'https://xxx.intoverse.co/api/'

export async function get(pathName:string,params?:Record<string,any>,config?:any) {
  let paramsString = '?'
  let newPathName = pathName
  if (params){
    Object.keys(params).map((item:string)=>{
      paramsString += `${item}=${params[item]}&`
    })
    const urlParams = pathName + paramsString
    newPathName = urlParams.slice(0,-1)
  }

  return new Promise((resolut,reject)=>{
    instance.get(newPathName,config).then((result:any)=>{
      console.log('get result=',newPathName,result)
      if (result.status == 200){
        if (result.data && result.data.code == 200){
          resolut(result.data)
        }else {
          reject(result.data.code)
          // 根据code 弹出相应的提示
        }
      }else {
        reject()
        showMessage({
          message: "网络请求异常",
          description: "请稍后再试~",
          type: "danger",
        });
      }
    }).catch((e:any)=>{
      console.log('get e===',e);
      reject(e)
      showMessage({
        message: "网络异常",
        description: "请检查网络环境",
        type: "danger",
      });
      throw e;
    })
  })
}


export async function post(url:string,params:Record<string,any>,config?:any) {
  return new Promise((resolut,reject)=>{
    instance.post(url,params,config).then((result:any)=>{
      console.log('post result=',url,result)
      if (result.status == 200){
        if (result.data){
          resolut(result.data)
        }else {
          reject(result.data.code)
          // 根据code 弹出相应的提示
        }
      }else {
        reject()
        showMessage({
          message: "网络请求异常",
          description: "请稍后再试~",
          type: "danger",
        });
      }
    }).catch((e:any)=>{
      console.log('get e===',e);
      reject(e)
      showMessage({
        message: "网络异常",
        description: "请检查网络环境",
        type: "danger",
      });
      throw e;
    })
  })
}