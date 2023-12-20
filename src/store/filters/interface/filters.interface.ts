import { TypeFileQueryFilters } from '@/shared/types/file/file.type'
import { TypeMediaQueryFilters } from '@/shared/types/media/media.type'

export interface IMediaFiltersState {
	isFilterUpdated: boolean
	queryParams: TypeMediaQueryFilters
}

export interface IMediaFiltersActionsPayload {
	key: keyof TypeMediaQueryFilters
	value: string
}

export interface IFilesFiltersState {
	isFilterUpdated: boolean
	queryParams: TypeFileQueryFilters
}

export interface IFilesFiltersActionsPayload {
	key: keyof TypeFileQueryFilters
	value: string
}
