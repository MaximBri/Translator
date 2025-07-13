import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TranslationHistoryItem } from '../types'
import { LOCAL_STORAGE_KEY } from '@/shared/config/localStorageKeys'

const loadFromLocalStorage = (): TranslationHistoryItem[] => {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
		const parsed = raw ? JSON.parse(raw) : []
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

const saveToLocalStorage = (items: TranslationHistoryItem[]) => {
	try {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
	} catch (error) {
		console.warn('Ошибка при сохранении в историю:', error)
	}
}

interface HistoryState {
	items: TranslationHistoryItem[]
}

const initialState: HistoryState = {
	items: loadFromLocalStorage(),
}

const MAX_ITEMS = 20

export const historySlice = createSlice({
	name: 'translationHistory',
	initialState,
	reducers: {
		addToHistory: (
			state,
			action: PayloadAction<Omit<TranslationHistoryItem, 'createdAt' | 'id'>>
		) => {
			const newItem: TranslationHistoryItem = {
				...action.payload,
				id: Date.now().toString(),
				createdAt: Date.now(),
			}

			state.items.unshift(newItem)

			if (state.items.length > MAX_ITEMS) {
				state.items = state.items.slice(0, MAX_ITEMS)
			}

			saveToLocalStorage(state.items)
		},
		removeFromHistory: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.id !== action.payload)
			saveToLocalStorage(state.items)
		},

		clearHistory: state => {
			state.items = []
			saveToLocalStorage([])
		},
	},
})

export const selectHistoryItems = (state: {
	translationHistory: HistoryState
}) => state.translationHistory.items

export const { addToHistory, removeFromHistory, clearHistory } =
	historySlice.actions

export default historySlice
