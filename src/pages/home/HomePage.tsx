import { LanguageSelector } from '@/features/language-selector'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { homePageModel } from './model/homePageModel'

export const HomePage = () => {
  const data = homePageModel()
  const {
    text,
    setText,
    translated,
    sourceLang,
    targetLang,
    changeLanguage,
    handleTranslate,
    handleSwitchLanguages,
  } = data

  return (
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
      <Button onClick={handleTranslate}>Перевести</Button>
      <div className='mt-4 p-4 border rounded bg-gray-50 min-h-[80px]'>
        {translated || 'Здесь будет перевод'}
      </div>
    </div>
  )
}
