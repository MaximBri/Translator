import { useAppDispatch, useAppSelector } from '@/app/providers/redux/hooks'
import {
  setSourceLanguage,
  setTargetLanguage,
  switchLanguages,
} from '@/entities/languages/redux/slice'
import { languages } from '@/shared/config/languages'
import { useDetectLanguage } from '@/shared/hooks/useDetectLanguage'
import { useTranslator } from '@/shared/hooks/useTranslator'
import { useRef, useState } from 'react'

export const useHomePageModel = () => {
  const dispatch = useAppDispatch()
  const translator = useTranslator()
  const { detect } = useDetectLanguage()

  const { isLoading, error, translatedText, getTranslate } = translator

  const sourceLang = useAppSelector(
    (state) => state.languagesControl.sourceLanguage
  )
  const targetLang = useAppSelector(
    (state) => state.languagesControl.targetLanguage
  )
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [text, setText] = useState<string>('')
  const [copiedInput, setCopiedInput] = useState<boolean>(false)
  const [selection, setSelection] = useState<string>('')

  const getFallbackTargetLang = (source: string): string => {
    const fallback = languages.find((lang) => lang.code !== source)
    return fallback?.code ?? 'en'
  }

  const handleSwitchLanguages = () => {
    dispatch(switchLanguages())
  }

  const handleTranslate = () => {
    const detectedLanguage = detect(text)

    dispatch(setSourceLanguage(detectedLanguage))

    if (detectedLanguage === targetLang) {
      const fallbackTarget = getFallbackTargetLang(detectedLanguage)
      dispatch(setTargetLanguage(fallbackTarget))
    }

    getTranslate(text, detectedLanguage, targetLang)
  }

  const changeLanguage = (code: string, isTarget: boolean) => {
    if (sourceLang === code || targetLang === code) {
      dispatch(switchLanguages())
    } else {
      isTarget
        ? dispatch(setTargetLanguage(code))
        : dispatch(setSourceLanguage(code))
    }
  }

  const handleCopyInput = () => {
    navigator.clipboard.writeText(text)
    setCopiedInput(true)
    setTimeout(() => setCopiedInput(false), 3000)
  }

  const handleTextSelect = () => {
    const textarea = textareaRef.current

    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end).trim()

      if (selectedText) {
        const detectedLanguage = detect(selectedText)
        dispatch(setSourceLanguage(detectedLanguage))

        if (detectedLanguage === targetLang) {
          const fallbackTarget = getFallbackTargetLang(detectedLanguage)
          dispatch(setTargetLanguage(fallbackTarget))
        }

        setSelection(selectedText)
      } else {
        setSelection('')
      }
    }
  }

  return {
    text,
    error,
    setText,
    isLoading,
    copiedInput,
    changeLanguage,
    handleCopyInput,
    handleTranslate,
    handleTextSelect,
    handleSwitchLanguages,
    translated: translatedText,
    selection,
    textareaRef,
  }
}
