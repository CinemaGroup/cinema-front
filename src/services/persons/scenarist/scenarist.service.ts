import { axiosClassic, instance } from '@/api/api.interceptors'
import { getScenaristsUrl } from '@/config/api.config'
import {
	IFilteredPersons,
	IFullestPerson,
} from '@/shared/interfaces/person/person.interface'
import { TypePersonsQueryFilters } from '@/shared/types/query/query.type'
import { TypePersonInput } from '../types/persons.type'

export const ScenaristService = {
	async getAll(queryDto = {} as TypePersonsQueryFilters) {
		return axiosClassic.get<IFilteredPersons>(getScenaristsUrl(''), {
			params: queryDto,
		})
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IFullestPerson>(
			getScenaristsUrl(`/by-slug/${slug}`)
		)
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypePersonInput>(
			getScenaristsUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getScenaristsUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getScenaristsUrl(''))
	},

	async update(id: string, dto: TypePersonInput) {
		return instance.put<TypePersonInput>(getScenaristsUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getScenaristsUrl(`/${id}`))
	},
}
