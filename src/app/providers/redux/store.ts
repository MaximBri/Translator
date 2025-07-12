import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({})

export const store = configureStore({
	reducer: rootReducer,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat([])
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
