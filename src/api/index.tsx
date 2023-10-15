import {
    useQuery,
    useMutation,
  } from '@tanstack/react-query'
import { getRequest } from './axios'



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

export function useIsMint(){
  async function fetchData(){
    const isMining = await getRequest('')
    console.log('isMining===',isMining)
    return {
    }
  }
  return useQuery(["useIsMint"], fetchData, {
    // enabled:!!chain.id && !!address && !!mintContranct,
    // refetchInterval: config.refreshInterval,
  })
}
