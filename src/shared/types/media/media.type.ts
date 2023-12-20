import { EnumMediaQuerySort } from '@/shared/enums/media/media.enum'

export type TypeMediaQueryFilters = {
	page?: string | number
	perPage: string | number
	sort?: EnumMediaQuerySort | string
	searchTerm?: string
	group?: string
	genre?: string
	actor?: string
	director?: string
	producer?: string
	scenarist?: string
	operator?: string
	year?: string
	age?: string
	country?: string
	averageRating?: string
	isMovie?: boolean | string
	isSeries?: boolean | string
	isVisible?: boolean | string
}
