import { axiosClassic, instance } from '@/api/api.interceptors'
import { getOperatorsUrl } from '@/config/api.config'
import {
	IFilteredPersons,
	IFullestPerson,
} from '@/shared/interfaces/person/person.interface'
import { TypePersonsQueryFilters } from '@/shared/types/query/query.type'
import { TypePersonInput } from '../types/persons.type'

export const OperatorService = {
	async getAll(queryDto = {} as TypePersonsQueryFilters) {
		return axiosClassic.get<IFilteredPersons>(getOperatorsUrl(''), {
			params: queryDto,
		})
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IFullestPerson>(getOperatorsUrl(`/by-slug/${slug}`))
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypePersonInput>(
			getOperatorsUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getOperatorsUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getOperatorsUrl(''))
	},

	async update(id: string, dto: TypePersonInput) {
		return instance.put<TypePersonInput>(getOperatorsUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getOperatorsUrl(`/${id}`))
	},
}
