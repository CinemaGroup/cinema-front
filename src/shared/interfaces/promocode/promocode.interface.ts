export interface IPromocode {
	id: number
	sale: number
	code: string
	description: string
	expiresAt: string
	isVisible: boolean
	createdAt: string
}

export interface IFilteredPromocodes {
	promocodes: IPromocode[]
	length: number
}