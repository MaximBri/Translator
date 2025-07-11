import { LanguageSelector } from '@/features/language-selector'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { useHomePageModel } from './model/homePageModel'
import { Check, Copy, Loader2 } from 'lucide-react'
import { Skeleton } from '@/shared/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'

export const HomePage = () => {
  const data = useHomePageModel()
  const {
    text,
    error,
    setText,
    isLoading,
    sourceLang,
    targetLang,
    copiedInput,
    copiedOutput,
    changeLanguage,
    handleCopyInput,
    handleTranslate,
    handleCopyOutput,
    handleSwitchLanguages,
    speechStatus,
    startSpeech,
    pauseSpeech,
    stopSpeech,
    translated,
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
          speechStatus={speechStatus}
          startSpeech={startSpeech}
          pauseSpeech={pauseSpeech}
          stopSpeech={stopSpeech}
        />
        <div className='relative'>
          <Textarea
            className='pb-8'
            placeholder='Введите текст'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <button
              className='absolute bottom-1 right-1 p-1'
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
          <div className='relative mt-4 pb-6 p-4 border rounded bg-gray-50 min-h-[80px]'>
            {translated || 'Здесь будет перевод'}
            {translated && (
              <button
                className='absolute bottom-0 right-0 p-1 cursor-pointer'
                onClick={handleCopyOutput}
                aria-label='Скопировать перевод'
              >
                {copiedOutput ? (
                  <Check className='h-5 w-5 text-green-500' />
                ) : (
                  <Copy className='h-5 w-5' />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
