import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'

const rootReducer = combineReducers({
	userReducer
})

const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		// @ts-ignore
		devTools: process.env.NODE_ENV === 'development'
	})
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
