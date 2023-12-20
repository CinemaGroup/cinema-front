import { axiosClassic, instance } from '@/api/api.interceptors'
import { getUsersUrl } from '@/config/api.config'
import {
	IFilteredUsers,
	IFullestUser,
} from '@/shared/interfaces/user/user.interface'

import { TypeQueryFilters } from '@/shared/types/query/query.type'
import { TypeProfileInput } from './types/profile.type'
import { TypeUserInput } from './types/user.type'

export const UserService = {
	async getAll(queryDto = {} as TypeQueryFilters) {
		return axiosClassic.get<IFilteredUsers>(getUsersUrl(''), {
			params: queryDto,
		})
	},

	async getProfile() {
		return instance.get<IFullestUser>(getUsersUrl('/profile'))
	},

	async updateProfile(dto: TypeProfileInput) {
		return instance.put<TypeProfileInput>(getUsersUrl('/profile'), {
			dto,
		})
	},

	// Admin Place

	async getById(id: string) {
		const result = await instance.get<TypeUserInput>(getUsersUrl(`/${id}`))

		return result.data
	},

	async toggleVisibility(id: string) {
		return instance.put<string>(getUsersUrl(`/toggle-visibility/${id}`))
	},

	async create() {
		return instance.post<string>(getUsersUrl(''))
	},

	async update(id: string, dto: TypeUserInput) {
		return instance.put<TypeUserInput>(getUsersUrl(`/${id}`), dto)
	},

	async delete(id: string) {
		return instance.delete<string>(getUsersUrl(`/${id}`))
	},
}
