import { Textarea } from '@/shared/ui/textarea'
import { useHomePageModel } from './model/homePageModel'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Check, Copy } from 'lucide-react'
import DraggableTootlip from '@/shared/ui/draggableTooltip'
import { TranslationHistoryPopover } from '@/features/translate-history/ui'
import { languages } from '@/shared/config/languages'
import { LANG_DISPLAY } from '@/shared/config/localStorageKeys'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { useAppSelector } from '@/app/providers/redux/hooks'

export const HomePage = () => {
  const data = useHomePageModel()
  const {
    text,
    error,
    setText,
    copiedInput,
    handleCopyInput,
    handleTextSelect,
    selection,
    textareaRef,
    changeLanguage,
  } = data
  const sourceLang = useAppSelector(
    (state) => state.languagesControl.sourceLanguage
  )
  const langDisplay = localStorage.getItem(LANG_DISPLAY)

  return (
    <>
      {error && (
        <Alert variant='destructive'>
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {selection && <DraggableTootlip text={selection} />}
      <div className='max-w-xl mx-auto mt-20 p-4 space-y-4'>
        <div className='relative'>
          <div className='flex justify-between my-2'>
            <Select
              value={sourceLang}
              onValueChange={(value) => changeLanguage(value, false)}
            >
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Select text language...' />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className='flex justify-between items-center w-full gap-2'>
                      {langDisplay !== 'name-only' && (
                        <img
                          src={`/languages/${lang.code}.svg`}
                          alt={`${lang.name} icon`}
                          className='h-5 w-5'
                        />
                      )}
                      {langDisplay !== 'flag-only' && lang.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <TranslationHistoryPopover />
          </div>

          <Textarea
            ref={textareaRef}
            className='pb-8'
            placeholder='Введите текст'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSelect={handleTextSelect}
          />

          {text && (
            <button
              className='absolute bottom-1 right-1 p-1 z-10'
              onClick={handleCopyInput}
              aria-label='Копировать текст'
            >
              {copiedInput ? (
                <Check className='h-5 w-5 text-green-500' />
              ) : (
                <Copy className='h-5 w-5' />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
