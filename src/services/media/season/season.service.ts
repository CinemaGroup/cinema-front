import { instance } from '@/api/api.interceptors'
import { getSeasonsUrl } from '@/config/api.config'
import { TypeSeasonInput } from './types/season.type'
import { IFilteredSeasons } from '@/shared/interfaces/season/season.interface'

export const SeasonService = {
	// Admin Place

	async getAll(mediaId: string) {
		return instance.get<IFilteredSeasons>(getSeasonsUrl(`/media/${mediaId}`))
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
