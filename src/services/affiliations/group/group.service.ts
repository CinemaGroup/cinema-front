import { axiosClassic, instance } from '@/api/api.interceptors'
import { getGroupsUrl } from '@/config/api.config'
import {
	IFilteredAffiliations,
	IFullestAffiliation,
} from '@/shared/interfaces/affiliation/affiliation.interface'
import { ICollection } from '@/shared/interfaces/collection/collection.interface'
import { TypeQueryFilters } from '@/shared/types/query/query.type'
import { TypeAffiliationInput } from '../types/affiliation.type'

export const GroupService = {
	async getAll(queryDto = {} as TypeQueryFilters) {
		return axiosClassic.get<IFilteredAffiliations>(getGroupsUrl(''), {
			params: queryDto,
		})
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getGroupsUrl(`/collections`))
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IFullestAffiliation>(
			getGroupsUrl(`/by-slug/${slug}`)
		)
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypeAffiliationInput>(
			getGroupsUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getGroupsUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getGroupsUrl(''))
	},

	async update(id: string, dto: TypeAffiliationInput) {
		return instance.put<TypeAffiliationInput>(getGroupsUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getGroupsUrl(`/${id}`))
	},
}
