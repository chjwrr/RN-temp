import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState:any = {
  language:'zh-CN',
  isShowGuid:0
}
export function useLanguage():string{
  return useSelector((state:RootState)=>state.setting.language)
}
export function useIsShowGuid():string{
  return useSelector((state:RootState)=>state.setting.isShowGuid)
}
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeLanguage: (state,action:PayloadAction<string>) => {
      state.language = action.payload
    },
    changeIsShowGuid: (state,action:PayloadAction<number>) => {
      state.isShowGuid = action.payload
    },
  }
})

export const { changeLanguage, changeIsShowGuid } = settingSlice.actions
export default settingSlice.reducer

