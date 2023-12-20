import {
	ACCESS_TOKEN,
	PROVIDER,
	REFRESH_TOKEN,
} from '@/constants/auth.constants'
import { TypeAuthProvider } from '@/shared/types/auth/auth.type'
import { IAuthResponse, ITokens } from '@/store/user/interface/user.interface'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	const accessToken = Cookies.get(ACCESS_TOKEN)
	return accessToken || null
}

export const getAuthProvider = () => {
	const provider = Cookies.get(PROVIDER)
	return provider || null
}

export const saveProviderStorage = (provider: TypeAuthProvider) => {
	Cookies.set(PROVIDER, provider)
}

export const getUserFromStorage = async () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set(ACCESS_TOKEN, data.accessToken)
	Cookies.set(REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	Cookies.remove(ACCESS_TOKEN)
	Cookies.remove(REFRESH_TOKEN)
	Cookies.remove(PROVIDER)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	saveProviderStorage(data.provider)
	localStorage.setItem('user', JSON.stringify(data.user))
}
