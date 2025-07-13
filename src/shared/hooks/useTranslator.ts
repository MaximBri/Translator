import { useAppDispatch } from '@/app/providers/redux/hooks'
import { addToHistory } from '@/features/translate-history/redux/slice'
import { getTranslatedMessage } from '@/pages/home/model/getTranslatedMessage'
import { useState } from 'react'

export const useTranslator = () => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [translatedText, setTranslatedText] = useState<string>('')

	const getTranslate = async (
		text: string,
		sourceLang: string,
		targetLang: string
	) => {
		setError('')
		setIsLoading(true)
		try {
			const response = await getTranslatedMessage(text, sourceLang, targetLang)

			const translated = response?.responseData?.translatedText

			if (translated) {
				setTranslatedText(translated)

				dispatch(
					addToHistory({
						text,
						translatedText: translated,
						sourceLang,
						targetLang,
					})
				)
			}
		} catch (error) {
			console.error('Error with translate: ', error)
			setError('Что-то пошло не так')
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		translatedText,
		getTranslate,
	}
}
