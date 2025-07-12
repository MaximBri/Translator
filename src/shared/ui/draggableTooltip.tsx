import { useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import { Check, Copy, Loader2 } from 'lucide-react'
import { useHomePageModel } from '@/pages/home/model/homePageModel'
import { useTranslator } from '../hooks/useTranslator'
import { LanguageSelector } from '@/features/language-selector'

interface DraggableTooltipProps {
  text: string
}

const DraggableTooltip = ({ text }: DraggableTooltipProps) => {
  const draggableTooltipRef = useRef(null)
  const data = useHomePageModel()
  const translator = useTranslator()
  const {
    sourceLang,
    targetLang,
    copiedInput,
    changeLanguage,
    handleSwitchLanguages,
  } = data
  const { isLoading, error, translatedText, getTranslate } = translator

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
        className='relative p-5 bg-white border-2 border-solid z-20'
        ref={draggableTooltipRef}
      >
        <h1 className='text-3xl font-bold mb-5 text-center'>Translator</h1>
        <LanguageSelector
          changeLanguage={changeLanguage}
          switchLanguages={handleSwitchLanguages}
          sourceLang={sourceLang}
          targetLang={targetLang}
          translatedText={translatedText}
        />
        <div className='flex justify-between items-center'>
          {isLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : error ? (
            <div className='text-red-600 text-sm'>{error}</div>
          ) : (
            <span>{translatedText}</span>
          )}

          {copiedInput ? (
            <Check className='h-5 w-5 text-green-500' />
          ) : (
            <Copy className='h-5 w-5' />
          )}
        </div>
      </div>
    </Draggable>
  )
}

export default DraggableTooltip
