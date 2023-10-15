import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState:any = {
  language:'zh-CN',
}
export function useLanguage():string{
  return useSelector((state:RootState)=>state.setting.language)
}
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeLanguage: (state,action:PayloadAction<string>) => {
      state.language = action.payload
    },
  }
})

export const { changeLanguage } = settingSlice.actions
export default settingSlice.reducer

