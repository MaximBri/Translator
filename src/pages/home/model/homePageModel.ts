import { useEffect, useRef, useState } from 'react'
import { languages } from '@/shared/config/languages'
import { useTranslator } from '@/shared/hooks/useTranslator'

export const useHomePageModel = () => {
  const translator = useTranslator()
  const { isLoading, error, translatedText, getTranslate } = translator
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const [text, setText] = useState<string>('')
  const [sourceLang, setSourceLang] = useState<string>(languages[0].code)
  const [targetLang, setTargetLang] = useState<string>(languages[1].code)
  const [copiedInput, setCopiedInput] = useState<boolean>(false)
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false)
  const [selection, setSelection] = useState<string>('')
  
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

  const handleTextSelect = () => {
    const textarea = textareaRef.current

    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end).trim()

      if (selectedText) {
        setSelection(selectedText)
      } else {
        setSelection('')
      }
    }
  }

  const clearSelection = () => {
    const text = window.getSelection()?.toString().trim() || ''

    if (!text) {
      setSelection('')
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', clearSelection)
    document.addEventListener('keyup', clearSelection)

    return () => {
      document.removeEventListener('mouseup', clearSelection)
      document.removeEventListener('keyup', clearSelection)
    }
  }, [])

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
    handleTextSelect,
    handleCopyOutput,
    handleSwitchLanguages,
    translated: translatedText,
    selection,
    textareaRef
  }
}
