import { API_URL } from '@/config/api.config'
import {
	getAccessToken,
	getAuthProvider,
	removeFromStorage,
} from '@/services/auth/auth.helper'
import { GoogleAuthService } from '@/services/auth/google/google-auth.service'
import { AuthService } from '@/services/auth/jwt/auth.service'
import axios from 'axios'
import { errorCatch, getContentType } from './api.helpers'

const axiosOptions = {
	baseURL: API_URL,
	headers: getContentType(),
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(async (config) => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const provider = getAuthProvider()
				if (provider === 'cinema') {
					await AuthService.getNewTokens()
				} else {
					await GoogleAuthService.getNewTokens()
				}
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}

		throw error
	}
)
