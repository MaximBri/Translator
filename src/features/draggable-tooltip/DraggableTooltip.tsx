import Draggable from 'react-draggable'
import { Check, Copy, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useHomePageModel } from '@/pages/home/model/homePageModel'
import { useTranslator } from '@/shared/hooks/useTranslator'
import { AppSettings } from '@/features/app-settings'
import { useAppSelector } from '@/app/providers/redux/hooks'
import { useDetectLanguage } from '@/shared/hooks/useDetectLanguage'

interface DraggableTooltipProps {
  text: string
}

export const DraggableTooltip = ({ text }: DraggableTooltipProps) => {
  const sourceLang = useAppSelector(
    (state) => state.languagesControl.sourceLanguage
  )
  const targetLang = useAppSelector(
    (state) => state.languagesControl.targetLanguage
  )

  const data = useHomePageModel()
  const translator = useTranslator()
  const { detect } = useDetectLanguage()
  const { changeLanguage, handleSwitchLanguages } = data
  const { isLoading, error, translatedText, getTranslate } = translator

  const draggableTooltipRef = useRef(null)

  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(translatedText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  useEffect(() => {
    const source = detect(text)
    if (source === sourceLang) {
      getTranslate(text, sourceLang, targetLang)
    } else if (source === targetLang) {
      getTranslate(text, targetLang, sourceLang)
      handleSwitchLanguages()
    } else {
      getTranslate(text, source, targetLang)
    }
  }, [text, sourceLang, targetLang])

  return (
    <Draggable
      nodeRef={draggableTooltipRef}
      defaultPosition={{ x: 300, y: 300 }}
      bounds='parent'
    >
      <div
        ref={draggableTooltipRef}
        className={`
            relative p-5 z-20 bg-white text-gray-900 border-2 border-solid
            border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
            transition-colors duration-200 max-w-xl
        `}
      >
        <h1 className='text-3xl font-bold mb-5 text-center'>Translator</h1>
        <AppSettings
          changeLanguage={changeLanguage}
          switchLanguages={handleSwitchLanguages}
          sourceLang={sourceLang}
          targetLang={targetLang}
          translatedText={translatedText}
        />
        <div className='flex justify-between items-center mt-4'>
          {isLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : error ? (
            <div className='text-red-600 text-sm'>{error}</div>
          ) : (
            <span>{translatedText}</span>
          )}

          <button>
            {isCopied ? (
              <Check className='h-5 w-5 text-green-500' />
            ) : (
              <Copy onClick={handleCopyOutput} className='h-5 w-5' />
            )}
          </button>
        </div>
      </div>
    </Draggable>
  )
}
