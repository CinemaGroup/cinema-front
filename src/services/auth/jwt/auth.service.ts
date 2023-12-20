import { axiosClassic } from '@/api/api.interceptors'
import { getAuthUrl } from '@/config/api.config'
import { REFRESH_TOKEN } from '@/constants/auth.constants'
import { TypeAuth } from '@/shared/types/auth/auth.type'
import { IAuth, IAuthResponse } from '@/store/user/interface/user.interface'
import Cookies from 'js-cookie'
import { saveToStorage } from '../auth.helper'

export const AuthService = {
	async main(type: TypeAuth, data: IAuth) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl(`/${type}`),
			{
				...data,
			}
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			getAuthUrl('/login/access-token'),
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},
}
