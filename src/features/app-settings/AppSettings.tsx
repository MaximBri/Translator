import { type FC } from 'react'
import { languages } from '@/shared/config/languages'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { useSpeech } from 'react-text-to-speech'
import { Settings } from 'lucide-react'
import { LANG_DISPLAY } from '@/shared/config/localStorageKeys'

interface AppSettingsProps {
  changeLanguage: (newValue: string, isTargetLanguage: boolean) => void
  switchLanguages: () => void
  sourceLang: string
  targetLang: string
  translatedText: string
}

export const AppSettings: FC<AppSettingsProps> = (data) => {
  const navigate = useNavigate()
  const {
    changeLanguage,
    switchLanguages,
    sourceLang,
    targetLang,
    translatedText,
  } = data
  const {
    speechStatus,
    start: startSpeech,
    pause: pauseSpeech,
    stop: stopSpeech,
  } = useSpeech({ text: translatedText })

  const langDisplay = localStorage.getItem(LANG_DISPLAY)

  return (
    <div className='flex flex-col gap-4 sm:justify-between sm:items-center'>
      <div className='flex flex-col gap-2 items-center sm:flex-row sm:flex-nowrap sm:items-center'>
        <Select
          value={sourceLang}
          onValueChange={(value) => changeLanguage(value, false)}
        >
          <SelectTrigger className='min-w-[180px]'>
            <SelectValue placeholder='Исходный язык' />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className='flex items-center gap-2 w-full'>
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

        <Button
          variant='outline'
          size='icon'
          onClick={switchLanguages}
          className='rotate-90 sm:rotate-0'
        >
          ⇄
        </Button>

        <Select
          value={targetLang}
          onValueChange={(value) => changeLanguage(value, true)}
        >
          <SelectTrigger className='min-w-[180px]'>
            <SelectValue placeholder='Целевой язык' />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className='flex items-center gap-2 w-full'>
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
      </div>

      <div className='flex gap-2 flex-wrap sm:flex-nowrap justify-between w-full'>
        <div className='flex gap-2'>
          {speechStatus !== 'started' ? (
            <Button variant='outline' size='icon' onClick={startSpeech}>
              🔊
            </Button>
          ) : (
            <Button variant='outline' size='icon' onClick={pauseSpeech}>
              ⏸️
            </Button>
          )}
          <Button variant='outline' size='icon' onClick={stopSpeech}>
            ⏹️
          </Button>
        </div>
        <Button
          variant='outline'
          size='icon'
          onClick={() => navigate('/settings')}
          aria-label='Settings'
        >
          <Settings className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}
