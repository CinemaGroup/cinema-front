import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	IFilesFiltersActionsPayload,
	IFilesFiltersState,
} from '../interface/filters.interface'

const initialState: IFilesFiltersState = {
	isFilterUpdated: false,
	queryParams: {},
}

export const filesFiltersSlice = createSlice({
	name: 'files-filters',
	initialState,
	reducers: {
		updateFilesQueryParam: (
			state,
			action: PayloadAction<IFilesFiltersActionsPayload>
		) => {
			const { key, value } = action.payload
			state.queryParams[key] = value
			state.isFilterUpdated = true
		},
		resetFilesFilterUpdate: (state) => {
			state.isFilterUpdated = false
		},
	},
})
