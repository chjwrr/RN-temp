import {
    useQuery,
    useMutation,
  } from '@tanstack/react-query'
import * as HTTPS from './axios'
import { MY_USER_INFO } from './API'
import { useUserInfo } from '@/redux/userInfo'


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
