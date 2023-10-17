import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState:any = {
  userInfo:{}
}

export function useUserInfo(){
  return useSelector((state:RootState)=>state.setting.userInfo)
}
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    saveUserInfo: (state,action:PayloadAction<any>) => {
      state.userInfo = action.payload
    },
  }
})

export const { saveUserInfo } = settingSlice.actions
export default settingSlice.reducer

