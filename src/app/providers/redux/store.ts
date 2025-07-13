import { languagesControlReducer } from '@/entities/languages/redux'
import { historyReducer } from '@/features/translate-history/redux'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	translationHistory: historyReducer,
	languagesControl: languagesControlReducer,
})

export const store = configureStore({
	reducer: rootReducer,

	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat([])
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
