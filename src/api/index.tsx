import {
    useQuery,
    useMutation,
  } from '@tanstack/react-query'
import * as HTTPS from './axios'
import { useUserInfo } from '@/redux/userInfo'
import { 
  MY_USER_INFO,
  DESIGN_CIRCLE_CLOTH_LIST,
  DESIGN_CIRCLE_CLOTH_DETAIL,
  MY_FOLLOWING,
  MERCHANT_CLOTH_DETAIL,
  HOME_BANNER,
  TICKET_BANNER,
  ARTICLE_DETAIL
 } from './API'
import { PAGE_SIZE } from '@/utils'


/**
const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/todos', newTodo)
    },
  })


  mutation.isLoading
  mutation.isSuccess
 */
export function useSendTransaction(){
function sendTransaction(params:any) {
    return new Promise(async() => {
      })
    }
    return useMutation(sendTransaction)
}

export function useUserInfomation(){
  const userInfo = useUserInfo()
  async function fetchData(){
    const info:any = await HTTPS.post(MY_USER_INFO,{
      "token":userInfo.token
    })
    return info.user_info
  }
  return useQuery(["useUserInfomation" + userInfo.token], fetchData, {
    enabled:!!userInfo.token
    // refetchInterval: config.refreshInterval,
  })
}

export function useDesignCircleClothDetail(clothID:number | string){
  const userInfo = useUserInfo()
  async function fetchData(){
    const info:any = await HTTPS.post(DESIGN_CIRCLE_CLOTH_DETAIL,{
      "token":userInfo.token,
      cloth_id:clothID
    })
    return info.design_circle_cloth_detail
  }
  return useQuery(["useDesignCircleClothDetail", userInfo.token, clothID], fetchData, {
    enabled:!!userInfo.token
    // refetchInterval: config.refreshInterval,
  })
}

export function useMyFollowing(){
  const userInfo = useUserInfo()
  async function fetchData(){
    const info:any = await HTTPS.post(MY_FOLLOWING,{
      "token":userInfo.token,
    })
    return info.my_following
  }
  return useQuery(["useMyFollowing", userInfo.token], fetchData, {
    enabled:!!userInfo.token
    // refetchInterval: config.refreshInterval,
  })
}

export function useMerchantClothDetail(clothID:number | string){
  const userInfo = useUserInfo()
  async function fetchData(){
    const info:any = await HTTPS.post(MERCHANT_CLOTH_DETAIL,{
      "token":userInfo.token,
      cloth_id:clothID
    })
    return info.merchant_cloth_detail
  }
  return useQuery(["useMerchantClothDetail", userInfo.token, clothID], fetchData, {
    enabled:!!userInfo.token
    // refetchInterval: config.refreshInterval,
  })
}
export function useHomeBanner(){
  const userInfo = useUserInfo()
  async function fetchData(){
    const info:any = await HTTPS.post(HOME_BANNER,{
      "token":userInfo.token,
    })
    return info.banner_list
  }
  return useQuery(["useHomeBanner", userInfo.token], fetchData, {
    enabled:!!userInfo.token
    // refetchInterval: config.refreshInterval,
  })
}
export function useTicketBanner(){
  const userInfo = useUserInfo()
  async function fetchData(){
    const info:any = await HTTPS.post(TICKET_BANNER,{
      "token":userInfo.token,
    })
    return info.banner_list
  }
  return useQuery(["useTicketBanner", userInfo.token], fetchData, {
    enabled:!!userInfo.token
    // refetchInterval: config.refreshInterval,
  })
}
export function useAaticleDetail(article_id:any){
  const userInfo = useUserInfo()
  async function fetchData(){
    const info:any = await HTTPS.post(ARTICLE_DETAIL,{
      "token":userInfo.token,
      article_id
    })
    return info.article_detail
  }
  return useQuery(["useAaticleDetail", userInfo.token, article_id], fetchData, {
    enabled:!!userInfo.token
    // refetchInterval: config.refreshInterval,
  })
}

