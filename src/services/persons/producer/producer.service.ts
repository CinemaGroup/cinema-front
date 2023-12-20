import { axiosClassic, instance } from '@/api/api.interceptors'
import { getProducersUrl } from '@/config/api.config'
import {
	IFilteredPersons,
	IFullestPerson,
} from '@/shared/interfaces/person/person.interface'
import { TypePersonsQueryFilters } from '@/shared/types/query/query.type'
import { TypePersonInput } from '../types/persons.type'

export const ProducerService = {
	async getAll(queryDto = {} as TypePersonsQueryFilters) {
		return axiosClassic.get<IFilteredPersons>(getProducersUrl(''), {
			params: queryDto,
		})
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IFullestPerson>(getProducersUrl(`/by-slug/${slug}`))
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypePersonInput>(
			getProducersUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getProducersUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getProducersUrl(''))
	},

	async update(id: string, dto: TypePersonInput) {
		return instance.put<TypePersonInput>(getProducersUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getProducersUrl(`/${id}`))
	},
}
