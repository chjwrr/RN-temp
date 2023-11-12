import axios from 'axios'
import { showMessage } from 'react-native-flash-message';
import sha256 from 'crypto-js/sha256';

const instance = axios.create({})
instance.defaults.timeout = 30000;
// instance.defaults.baseURL = "http://119.45.143.198/yuanyiapi/"

const BASE_URL = 'http://119.45.143.198/yuanyiapi/'

instance.defaults.headers.post['Content-Type'] = 'application/json'

const APP_NAME = "yuanyi-app";
const APP_SECRET = "3b57ff81-27ea-45d9-a2e3-6e24920b17ac";
const API_VESSION = "1";

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

function signature(key:string, data:any) {
  const dataList = Object.entries(data).map(([k, v]) => `${k}=${v}`);
  dataList.sort();
  const dataStr = dataList.join('&') + '&' + key;
  console.log('dataStr==',dataStr)
  return sha256(dataStr).toString()
}

export async function post(method:string,params:Record<string,any>,config?:any) {
  params.method = method
  params.ver = API_VESSION
  params.ts = Date.now()
  params.app = APP_NAME
  params.sig = signature(APP_SECRET, params)

  console.log('params==',params)

  return new Promise((resolut,reject)=>{
    instance.post(BASE_URL,params,config).then((result:any)=>{
      // console.log('post result=',method,result)
      if (result.status == 200){
        console.log('result.data==',result.data)

        if (result.data && result.data.code == 0){
          resolut(result.data)
        }else {
          reject(result.data.code)
          showMessage({
            message:  result.data.err_msg,
            type: "danger",
          });
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