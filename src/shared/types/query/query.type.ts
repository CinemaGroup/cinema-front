import { EnumQuerySort } from '@/shared/enums/query/query.enum'

export type TypePersonsQueryFilters = {
	page?: string | number
	perPage: string | number
	sort?: EnumQuerySort
	searchTerm?: string
	media?: string
	isVisible?: boolean
}

export type TypeQueryFilters = {
	page?: string | number
	perPage: string | number
	sort?: EnumQuerySort
	searchTerm?: string
	isVisible?: boolean
}
