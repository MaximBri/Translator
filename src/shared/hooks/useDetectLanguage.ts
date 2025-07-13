import { useCallback } from 'react'
import { franc } from 'franc'
import { languages } from '@/shared/config/languages'

const francLanguagesMap: Record<string, string> = {
	eng: 'en',
	rus: 'ru',
	fra: 'fr',
	spa: 'es',
	deu: 'de',
}

export const useDetectLanguage = () => {
	const supportedCodes = languages.map(lang => lang.code)
	const defaultLanguageCode = languages[0].code

	const detect = useCallback((text: string): string => {
		const francLanguageCode = franc(text || '', { minLength: 2 })
		const supportedLanguageCode = francLanguagesMap[francLanguageCode]

		if (
			supportedLanguageCode &&
			supportedCodes.includes(supportedLanguageCode)
		) {
			return supportedLanguageCode
		}

		return defaultLanguageCode
	}, [])

	return { detect }
}
