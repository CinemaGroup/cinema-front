import { ICard } from '../card/card.interface'
import { IPromocode } from '../promocode/promocode.interface'
import { ISubscribe } from '../subscribe/subscribe.interface'

export interface IUser {
	id: number
	login: string
	email: string
	avatarPath: string
	isAdmin: boolean
	isSubscribed: boolean
	isVisible: boolean
	createdAt: string
}

export interface IFullestUser extends IUser {
	promocodes: IPromocode[]
	cards: ICard[]
	subscribes: ISubscribe[]
}

export interface IFilteredUsers {
	users: IUser[]
	length: number
}
