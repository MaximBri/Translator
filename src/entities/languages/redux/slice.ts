import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { languages } from '@/shared/config/languages'

interface LangState {
	sourceLanguage: string
	targetLanguage: string
}

const initialState: LangState = {
	sourceLanguage: languages[0].code,
	targetLanguage: languages[1].code,
}

export const languagesControlSlice = createSlice({
	name: 'languagesControl',
	initialState,
	reducers: {
		setSourceLanguage(state, action: PayloadAction<string>) {
			state.sourceLanguage = action.payload
		},
		setTargetLanguage(state, action: PayloadAction<string>) {
			state.targetLanguage = action.payload
		},
		switchLanguages(state) {
			const temp = state.sourceLanguage
			state.sourceLanguage = state.targetLanguage
			state.targetLanguage = temp
		},
	},
})

export const { setSourceLanguage, setTargetLanguage, switchLanguages } =
	languagesControlSlice.actions

export default languagesControlSlice
