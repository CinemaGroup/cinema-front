import { IUser } from '@/shared/interfaces/user/user.interface'
import { TypeAuthProvider } from '@/shared/types/auth/auth.type'

export interface IUserState {
	email: string
	isAdmin: boolean
	isSubscribed: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IAuth {
	login?: string
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
	provider: TypeAuthProvider
}
