import { axiosClassic, instance } from '@/api/api.interceptors'
import { getDirectorsUrl } from '@/config/api.config'
import {
	IFilteredPersons,
	IFullestPerson,
} from '@/shared/interfaces/person/person.interface'
import { TypePersonsQueryFilters } from '@/shared/types/query/query.type'
import { TypePersonInput } from '../types/persons.type'

export const DirectorService = {
	async getAll(queryDto = {} as TypePersonsQueryFilters) {
		return axiosClassic.get<IFilteredPersons>(getDirectorsUrl(''), {
			params: queryDto,
		})
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IFullestPerson>(getDirectorsUrl(`/by-slug/${slug}`))
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypePersonInput>(
			getDirectorsUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getDirectorsUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getDirectorsUrl(''))
	},

	async update(id: string, dto: TypePersonInput) {
		return instance.put<TypePersonInput>(getDirectorsUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getDirectorsUrl(`/${id}`))
	},
}
