import { useLanguage } from '@/redux/setting';
import { useCallback } from 'react';

import EN from '@/loccal/en-US.json'
import CN from '@/loccal/zh-CN.json'

const LocalesCommon:any = {
  'zh-CN':CN,
  'en-US':EN,
}
export default function useTranslationLanguage(){
  const language = useLanguage()
  console.log('language-==',language)

  let languageJson:any = LocalesCommon[language]
  if(!languageJson){
    languageJson = LocalesCommon['zh-CN']
  }

  const t = useCallback(
    (key:string, params: Record<string, any> = {}) => {
      const value = languageJson[key]
      if (!value) return key
      return value
    },[language]
  )
  return { t, language}
}
