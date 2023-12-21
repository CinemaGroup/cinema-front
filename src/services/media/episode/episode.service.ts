import { instance } from '@/api/api.interceptors'
import { getEpisodesUrl } from '@/config/api.config'
import { IFilteredEpisodes } from '@/shared/interfaces/episode/episode.interface'
import { TypeEpisodesQueryFilters } from '@/shared/types/episode/episode.type'
import { TypeEpisodeInput } from './types/episode.type'

export const EpisodeService = {
	// Admin Place

	async getAll(queryDto = {} as TypeEpisodesQueryFilters) {
		return instance.get<IFilteredEpisodes>(getEpisodesUrl(''), {
			params: queryDto,
		})
	},

	async getById(id: string) {
		const result = await instance.get<TypeEpisodeInput>(
			getEpisodesUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getEpisodesUrl(`/toggle-visibility/${id}`))
	},

	async create(mediaId: string) {
		return instance.post<string>(getEpisodesUrl(`/${mediaId}`))
	},

	async update(id: string, dto: TypeEpisodeInput) {
		return instance.put<TypeEpisodeInput>(getEpisodesUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getEpisodesUrl(`/${id}`))
	},
}
