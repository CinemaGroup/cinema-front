import { EnumQuerySort } from '@/shared/enums/query/query.enum'

export type TypeEpisodesQueryFilters = {
	page?: string | number
	perPage: string | number
	sort?: EnumQuerySort
	searchTerm?: string
	seasonId: string
	isVisible?: boolean
}
