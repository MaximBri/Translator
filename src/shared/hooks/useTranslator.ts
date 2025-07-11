import { getTranslatedMessage } from '@/pages/home/model/getTranslatedMessage'
import { useState } from 'react'

export const useTranslator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [translatedText, setTranslatedText] = useState<string>('')

  const getTranslate = async (
    text: string,
    sourceLang: string,
    targetLang: string
  ) => {
    setError('')
    setIsLoading(true)
    try {
      const response = await getTranslatedMessage(text, sourceLang, targetLang)
      setTranslatedText(response.responseData.translatedText)
    } catch (error) {
      console.error('Error with translate: ', error)
      setError('Что-то пошло не так')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    translatedText,
    getTranslate,
  }
}
