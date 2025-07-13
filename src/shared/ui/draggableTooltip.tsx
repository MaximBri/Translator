import { useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import { Check, Copy, Loader2 } from 'lucide-react'
import { useHomePageModel } from '@/pages/home/model/homePageModel'
import { useTranslator } from '../hooks/useTranslator'
import { LanguageSelector } from '@/features/language-selector'
import { useAppSelector } from '@/app/providers/redux/hooks'
import { useDetectLanguage } from '../hooks/useDetectLanguage'

interface DraggableTooltipProps {
  text: string
}

const DraggableTooltip = ({ text }: DraggableTooltipProps) => {
  const { detect } = useDetectLanguage()

  const sourceLang = useAppSelector(
    (state) => state.languagesControl.sourceLanguage
  )
  const targetLang = useAppSelector(
    (state) => state.languagesControl.targetLanguage
  )

  const draggableTooltipRef = useRef(null)
  const data = useHomePageModel()
  const translator = useTranslator()
  const {
    copiedInput,
    changeLanguage,
    handleSwitchLanguages,
    pauseSpeech,
    speechStatus,
    startSpeech,
    stopSpeech,
  } = data
  const { isLoading, error, translatedText, getTranslate } = translator

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
        <LanguageSelector
          changeLanguage={changeLanguage}
          switchLanguages={handleSwitchLanguages}
          sourceLang={sourceLang}
          targetLang={targetLang}
          translatedText={translatedText}
          pauseSpeech={pauseSpeech}
          speechStatus={speechStatus}
          startSpeech={startSpeech}
          stopSpeech={stopSpeech}
        />
        <div className='flex justify-between items-center mt-4'>
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
