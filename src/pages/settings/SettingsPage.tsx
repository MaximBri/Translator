import { useEffect, useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { useTheme, type ThemeOption } from '@/shared/hooks/useTheme'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LANG_DISPLAY } from '@/shared/config/localStorageKeys'

type LanguageDisplayOption = 'flag-name' | 'name-only' | 'flag-only'

export const SettingsPage = () => {
  const navigate = useNavigate()

  const { theme, setTheme } = useTheme()

  const currentLanguage = localStorage.getItem(LANG_DISPLAY) ?? 'flag-name'

  const [langDisplay, setLangDisplay] = useState<LanguageDisplayOption>(
    currentLanguage as LanguageDisplayOption
  )

  useEffect(() => {
    localStorage.setItem(LANG_DISPLAY, langDisplay)
  }, [langDisplay])

  return (
    <div className='max-w-xl mx-auto mt-20 p-4 space-y-6'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => navigate('/')}
        aria-label='Назад'
        className='w-8 cursor-pointer'
      >
        <ChevronLeft />
      </Button>
      <h1 className='text-3xl font-bold'>Настройки</h1>

      <div className='space-y-2'>
        <h2 className='text-lg font-medium'>Отображение языков</h2>
        <Select
          value={langDisplay}
          onValueChange={(value) =>
            setLangDisplay(value as LanguageDisplayOption)
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Выберите вариант' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='flag-name'>Флаг + название</SelectItem>
            <SelectItem value='name-only'>Только название</SelectItem>
            <SelectItem value='flag-only'>Только флаг</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-2'>
        <h2 className='text-lg font-medium'>Тема</h2>
        <Select
          value={theme}
          onValueChange={(value) => setTheme(value as ThemeOption)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Выберите тему' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Светлая</SelectItem>
            <SelectItem value='dark'>Тёмная</SelectItem>
            <SelectItem value='system'>Авто (системная)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant='outline'
        onClick={() => {
          setLangDisplay('flag-name')
          setTheme('system')
          localStorage.removeItem('langDisplay')
        }}
      >
        Сбросить настройки
      </Button>
    </div>
  )
}
