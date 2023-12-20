import { EnumMediaQuerySort } from '@/shared/enums/media/media.enum'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	IMediaFiltersActionsPayload,
	IMediaFiltersState,
} from '../interface/filters.interface'

const initialState: IMediaFiltersState = {
	isFilterUpdated: false,
	queryParams: {
		sort: EnumMediaQuerySort.NEWEST,
		searchTerm: '',
		page: 1,
		perPage: -1,
	},
}

export const mediaFiltersSlice = createSlice({
	name: 'media-filters',
	initialState,
	reducers: {
		updateMediaQueryParam: (
			state,
			action: PayloadAction<IMediaFiltersActionsPayload>
		) => {
			const { key, value } = action.payload
			state.queryParams[key] = value
			state.isFilterUpdated = true
		},
		resetMediaFilterUpdate: (state) => {
			state.isFilterUpdated = false
		},
	},
})
