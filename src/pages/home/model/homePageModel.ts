import { useState } from 'react'
import { useSpeech } from "react-text-to-speech";
import { languages } from '@/shared/config/languages'
import { useTranslator } from '@/shared/hooks/useTranslator'

export const useHomePageModel = () => {
  const translator = useTranslator()
  const { isLoading, error, translatedText, getTranslate } = translator
  const { speechStatus, start: startSpeech, pause: pauseSpeech, stop: stopSpeech } = useSpeech({ text: translatedText })
  
  const [text, setText] = useState<string>('')
  const [sourceLang, setSourceLang] = useState<string>(languages[0].code)
  const [targetLang, setTargetLang] = useState<string>(languages[1].code)

  const handleSwitchLanguages = () => {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
  }

  const handleTranslate = () => {
    getTranslate(text, sourceLang, targetLang)
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
    error,
    setText,
    isLoading,
    sourceLang,
    targetLang,
    changeLanguage,
    handleTranslate,
    handleSwitchLanguages,
    translated: translatedText,
    speechStatus,
    startSpeech,
    pauseSpeech,
    stopSpeech
  }
}
