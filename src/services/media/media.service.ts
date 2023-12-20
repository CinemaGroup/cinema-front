import { axiosClassic, instance } from '@/api/api.interceptors'
import { getMediaUrl } from '@/config/api.config'
import {
	IFilteredMedia,
	IMedia,
} from '@/shared/interfaces/media/media.interface'
import { TypeMediaQueryFilters } from '@/shared/types/media/media.type'
import {
	TypeMediaInput,
	TypeMediaMovieInput,
	TypeMovieViewsInput,
} from './types/media.type'

export const MediaService = {
	async getAll(queryDto = {} as TypeMediaQueryFilters) {
		return axiosClassic.get<IFilteredMedia>(getMediaUrl(''), {
			params: queryDto,
		})
	},

	async getSimilar(slug: string) {
		return axiosClassic.get<IMedia[]>(getMediaUrl(`/similar/${slug}`))
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IMedia>(getMediaUrl(`/by-slug/${slug}`))
	},

	async updateMediaMovieViews(dto: TypeMovieViewsInput) {
		return axiosClassic.put<IMedia>(getMediaUrl(`/movie/update-views`), {
			dto,
		})
	},

	// Admin Place

	async toggleVisibility(id: string) {
		return instance.put<string>(getMediaUrl(`/toggle-visibility/${id}`))
	},

	async movieById(id: string) {
		const result = await instance.get<TypeMediaMovieInput>(
			getMediaUrl(`/movie/${id}`)
		)

		return result.data
	},

	async seriesById(id: string) {
		const result = await instance.get<TypeMediaInput>(
			getMediaUrl(`/series/${id}`)
		)

		return result.data
	},

	async createMovie() {
		return instance.post<string>(getMediaUrl('/movie'))
	},

	async createSeries() {
		return instance.post<string>(getMediaUrl('/series'))
	},

	async updateMovie(id: string, dto: TypeMediaMovieInput) {
		return instance.put<TypeMediaMovieInput>(getMediaUrl(`/movie/${id}`), dto)
	},

	async updateSeries(id: string, dto: TypeMediaInput) {
		return instance.put<TypeMediaInput>(getMediaUrl(`/series/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getMediaUrl(`/${id}`))
	},
}
