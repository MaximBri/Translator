import { type FC } from 'react'
import { useSpeech } from 'react-text-to-speech'
import { languages } from '@/shared/config/languages'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'

interface LanguageSelectorProps {
  sourceLang: string
  targetLang: string
  switchLanguages: () => void
  changeLanguage: (newValue: string, isTargetLanguage: boolean) => void
  translatedText: string
}

export const LanguageSelector: FC<LanguageSelectorProps> = (data) => {
  const { changeLanguage, switchLanguages, sourceLang, targetLang, translatedText } = data
  const { speechStatus, start: startSpeech, pause: pauseSpeech, stop: stopSpeech } = useSpeech({ text: translatedText })
  
  return (
    <div className='flex justify-between items-center mb-5'>
      <div className='flex'>
        <Select
          value={sourceLang}
          onValueChange={(value) => changeLanguage(value, false)}
        >
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='Исходный язык' />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className='flex justify-between items-center w-full gap-2'>
                  <img
                    src={`/languages/${lang.code}.svg`}
                    alt={`${lang.name} icon`}
                    className='h-5 w-6'
                  />
                  {lang.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant='outline' size='icon' onClick={switchLanguages}>
          ⇄
        </Button>

        <Select
          value={targetLang}
          onValueChange={(value) => changeLanguage(value, true)}
        >
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='Целевой язык' />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className='flex justify-between items-center w-full gap-2'>
                  <img
                    src={`/languages/${lang.code}.svg`}
                    alt={`${lang.name} icon`}
                    className='h-5 w-5'
                  />
                  {lang.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex">
        {
          speechStatus !== "started"
          ?
          <Button variant='outline' size='icon' onClick={startSpeech}>🔊</Button>
          :
          <Button variant='outline' size='icon' onClick={pauseSpeech}>⏸️</Button>
        }
        <Button variant='outline' size='icon' onClick={stopSpeech}>⏹️</Button>
      </div>
    </div>
  )
}
