import { LanguageSelector } from '@/features/language-selector'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { useHomePageModel } from './model/homePageModel'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@/shared/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'

export const HomePage = () => {
  const data = useHomePageModel()
  const {
    text,
    error,
    setText,
    isLoading,
    translated,
    sourceLang,
    targetLang,
    changeLanguage,
    handleTranslate,
    handleSwitchLanguages,
  } = data

  return (
    <>
      {error && (
        <Alert variant='destructive'>
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className='max-w-xl mx-auto mt-20 p-4 space-y-4'>
        <h1 className='text-3xl font-bold'>Переводчик</h1>
        <LanguageSelector
          changeLanguage={changeLanguage}
          switchLanguages={handleSwitchLanguages}
          sourceLang={sourceLang}
          targetLang={targetLang}
        />
        <Textarea
          placeholder='Введите текст'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleTranslate} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            'Перевести'
          )}
        </Button>
        {isLoading ? (
          <Skeleton className='h-20 rounded-md' />
        ) : (
          <div className='mt-4 p-4 border rounded bg-gray-50 min-h-[80px]'>
            {translated || 'Здесь будет перевод'}
          </div>
        )}
      </div>
    </>
  )
}
