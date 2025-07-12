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
import { Settings } from 'lucide-react'
import { LANG_DISPLAY } from '@/shared/config/localStorageKeys'

interface LanguageSelectorProps {
  sourceLang: string
  targetLang: string
  switchLanguages: () => void
  changeLanguage: (newValue: string, isTargetLanguage: boolean) => void
  speechStatus: string
  startSpeech: () => void
  pauseSpeech: () => void
  stopSpeech: () => void
}

export const LanguageSelector: FC<LanguageSelectorProps> = (data) => {
  const navigate = useNavigate()
  const {
    changeLanguage,
    switchLanguages,
    sourceLang,
    targetLang,
    speechStatus,
    startSpeech,
    pauseSpeech,
    stopSpeech,
  } = data

  const langDisplay = localStorage.getItem(LANG_DISPLAY)

  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-2'>
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
          onClick={() => navigate('/settings')}
          aria-label='Settings'
        >
          <Settings className='h-5 w-5' />
        </Button>
      </div>

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
    </div>
  )
}
