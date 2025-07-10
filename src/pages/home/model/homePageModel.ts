import { useState } from 'react'
import { languages } from '@/shared/config/languages'
import { getTranslatedMessage } from './getTranslatedMessage'

export const homePageModel = () => {
  const [text, setText] = useState<string>('')
  const [translated, setTranslated] = useState<string>('')
  const [sourceLang, setSourceLang] = useState<string>(languages[0].code)
  const [targetLang, setTargetLang] = useState<string>(languages[1].code)

  const handleTranslate = async () => {
    const response = await getTranslatedMessage(text, sourceLang, targetLang)
    console.log(response)
  }

  const handleSwitchLanguages = () => {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
  }

  const changeLanguage = (code: string, isTarget: boolean) => {
    if (sourceLang === code || targetLang === code) {
      handleSwitchLanguages()
    } else {
      isTarget ? setTargetLang(code) : setSourceLang(code)
    }
  }

  return {
    text,
    setText,
    sourceLang,
    targetLang,
    translated,
    changeLanguage,
    handleTranslate,
    handleSwitchLanguages,
  }
}
