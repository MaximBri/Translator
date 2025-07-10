export interface LanguageModel {
  name: string
  code: string
}

export const languages: LanguageModel[] = [
  { name: 'English', code: 'en' },
  { name: 'Русский', code: 'ru' },
  { name: 'French', code: 'fr' },
  { name: 'Spanish', code: 'es' },
  { name: 'German', code: 'de' },
]
