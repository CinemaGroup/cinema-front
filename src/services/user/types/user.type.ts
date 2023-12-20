import { TypeProfileInput } from './profile.type'

export type TypeUserInput = Omit<TypeProfileInput, 'cards'> & {
	promocodes?: number[]
	isAdmin?: boolean
	isSubscribed?: boolean
}
