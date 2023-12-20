import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as toastrReducer } from 'react-redux-toastr'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore,
} from 'redux-persist'
import { filesFiltersSlice } from './filters/files/files-filters.slice'
import { mediaFiltersSlice } from './filters/media/media-filters.slice'
import { userSlice } from './user/user.slice'

const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
	user: userSlice.reducer,
	mediaFilters: mediaFiltersSlice.reducer,
	filesFilters: filesFiltersSlice.reducer,
	toastr: toastrReducer,
})

let mainReducer = combinedReducers

if (isClient) {
	const { persistReducer } = require('redux-persist')
	const storage = require('redux-persist/lib/storage').default

	const persistConfig = {
		key: 'prizma-cinema',
		storage,
	}

	mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>
