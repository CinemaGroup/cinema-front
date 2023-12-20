import { axiosClassic, instance } from '@/api/api.interceptors'
import { getActorsUrl } from '@/config/api.config'

import {
	IFilteredPersons,
	IFullestPerson,
} from '@/shared/interfaces/person/person.interface'
import { TypePersonsQueryFilters } from '@/shared/types/query/query.type'
import { TypePersonInput } from '../types/persons.type'

export const ActorService = {
	async getAll(queryDto = {} as TypePersonsQueryFilters) {
		return axiosClassic.get<IFilteredPersons>(getActorsUrl(''), {
			params: queryDto,
		})
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IFullestPerson>(getActorsUrl(`/by-slug/${slug}`))
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypePersonInput>(getActorsUrl(`/${id}`))

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getActorsUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getActorsUrl(''))
	},

	async update(id: string, dto: TypePersonInput) {
		return instance.put<TypePersonInput>(getActorsUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getActorsUrl(`/${id}`))
	},
}
