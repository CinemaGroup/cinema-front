import { instance } from '@/api/api.interceptors'
import { getCardsUrl } from '@/config/api.config'
import { TypeCardInput } from './types/card.type'

export const CardService = {
	// Admin And User Place

	async getById(id: string) {
		const result = await instance.get<TypeCardInput>(getCardsUrl(`/${id}`))

		return result.data
	},

	async create() {
		return instance.post<string>(getCardsUrl(''))
	},

	async update(id: string, dto: TypeCardInput) {
		return instance.put<TypeCardInput>(getCardsUrl(`/${id}`), {
			dto,
		})
	},

	async delete(id: string) {
		return instance.delete<string>(getCardsUrl(`/${id}`))
	},
}
