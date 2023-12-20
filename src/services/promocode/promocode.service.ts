import { axiosClassic, instance } from '@/api/api.interceptors'
import { getPromocodesUrl } from '@/config/api.config'
import {
	IFilteredPromocodes,
	IPromocode,
} from '@/shared/interfaces/promocode/promocode.interface'
import { TypeQueryFilters } from '@/shared/types/query/query.type'
import { TypePromocodeInput } from './types/promocode.type'

export const PromocodeService = {
	async getAll(queryDto = {} as TypeQueryFilters) {
		return axiosClassic.get<IFilteredPromocodes>(getPromocodesUrl(''), {
			params: queryDto,
		})
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypePromocodeInput>(
			getPromocodesUrl(`/${id}`)
		)

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getPromocodesUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getPromocodesUrl(''))
	},

	async update(id: string, dto: TypePromocodeInput) {
		return instance.put<TypePromocodeInput>(getPromocodesUrl(`/${id}`), {
			dto,
		})
	},

	async delete(id: string) {
		return instance.delete<IPromocode>(getPromocodesUrl(`/${id}`))
	},
}
