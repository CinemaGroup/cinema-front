import { instance } from '@/api/api.interceptors'
import { getSeasonsUrl } from '@/config/api.config'
import { IFilteredSeasons } from '@/shared/interfaces/season/season.interface'
import { TypeSeasonsQueryFilters } from '@/shared/types/season/season.type'
import { TypeSeasonInput } from './types/season.type'

export const SeasonService = {
	// Admin Place

	async getAll(queryDto = {} as TypeSeasonsQueryFilters) {
		return instance.get<IFilteredSeasons>(getSeasonsUrl(''), {
			params: queryDto,
		})
	},

	async getById(id: string) {
		const result = await instance.get<TypeSeasonInput>(getSeasonsUrl(`/${id}`))

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getSeasonsUrl(`/toggle-visibility/${id}`))
	},

	async create(mediaId: string) {
		return instance.post<string>(getSeasonsUrl(`/${mediaId}`))
	},

	async update(id: string, dto: TypeSeasonInput) {
		return instance.put<TypeSeasonInput>(getSeasonsUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getSeasonsUrl(`/${id}`))
	},
}
