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
  const [copiedInput, setCopiedInput] = useState<boolean>(false)
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false)

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

  const handleCopyInput = () => {
    navigator.clipboard.writeText(text)
    setCopiedInput(true)
    setTimeout(() => setCopiedInput(false), 3000)
  }

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(translatedText)
    setCopiedOutput(true)
    setTimeout(() => setCopiedOutput(false), 3000)
  }

  return {
    text,
    error,
    setText,
    isLoading,
    sourceLang,
    targetLang,
    copiedInput,
    copiedOutput,
    changeLanguage,
    handleCopyInput,
    handleTranslate,
    handleCopyOutput,
    handleSwitchLanguages,
    translated: translatedText,
    speechStatus,
    startSpeech,
    pauseSpeech,
    stopSpeech
  }
}
