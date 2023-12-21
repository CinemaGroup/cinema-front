import { EnumQuerySort } from '@/shared/enums/query/query.enum'

export type TypeSeasonsQueryFilters = {
	page?: string | number
	perPage: string | number
	sort?: EnumQuerySort
	searchTerm?: string
	mediaId: string
	isVisible?: boolean
}
