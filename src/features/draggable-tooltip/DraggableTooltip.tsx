import Draggable from 'react-draggable'
import { useAppSelector } from '@/app/providers/redux/hooks'
import { Check, Copy, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useHomePageModel } from '@/pages/home/model/homePageModel'
import { useTranslator } from '../../shared/hooks/useTranslator'
import { AppSettings } from '@/features/app-settings'

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

  const translator = useTranslator()
  const { changeLanguage, handleSwitchLanguages } = useHomePageModel()
  const { isLoading, error, translatedText, getTranslate } = translator

  const draggableTooltipRef = useRef(null)

  const [isCopied, setIsCopied] = useState<boolean>(false)

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(translatedText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  useEffect(() => {
    getTranslate(text, sourceLang, targetLang)
  }, [text, sourceLang, targetLang])

  return (
    <Draggable
      nodeRef={draggableTooltipRef}
      defaultPosition={{ x: 0, y: 300 }}
      bounds={{ top: -50, left: -600, right: 600, bottom: 600 }}
    >
      <div
        ref={draggableTooltipRef}
        className={`
            relative p-5 z-20 bg-white text-gray-900 border-2 border-solid
            border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
            transition-colors duration-200
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
