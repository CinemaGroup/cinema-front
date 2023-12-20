import { axiosClassic, instance } from '@/api/api.interceptors'
import { getGenresUrl } from '@/config/api.config'
import {
	IFilteredAffiliations,
	IFullestAffiliation,
} from '@/shared/interfaces/affiliation/affiliation.interface'
import { TypeQueryFilters } from '@/shared/types/query/query.type'
import { TypeAffiliationInput } from '../types/affiliation.type'
import { ICollection } from '@/shared/interfaces/collection/collection.interface'

export const GenreService = {
	async getAll(queryDto = {} as TypeQueryFilters) {
		return axiosClassic.get<IFilteredAffiliations>(getGenresUrl(''), {
			params: queryDto,
		})
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl(`/collections`))
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IFullestAffiliation>(
			getGenresUrl(`/by-slug/${slug}`)
		)
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypeAffiliationInput>(
			getGenresUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getGenresUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getGenresUrl(''))
	},

	async update(id: string, dto: TypeAffiliationInput) {
		return instance.put<TypeAffiliationInput>(getGenresUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getGenresUrl(`/${id}`))
	},
}
