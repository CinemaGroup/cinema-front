import { axiosClassic } from '@/api/api.interceptors'
import { getGoogleAuthUrl } from '@/config/api.config'
import { REFRESH_TOKEN } from '@/constants/auth.constants'
import { IAuthResponse } from '@/store/user/interface/user.interface'
import Cookies from 'js-cookie'
import { removeFromStorage, saveToStorage } from '../auth.helper'

export const GoogleAuthService = {
	async loginGoogle(code: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getGoogleAuthUrl('/login'),
			{
				code,
			}
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data.user
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			getGoogleAuthUrl('/login/access-token'),
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},

	logout() {
		removeFromStorage()
	},
}
