export interface ITariff {
	id: number
	name: string
	slug: string
	duration: number
	price: number
	salePrice?: number
	description: string
	isVisible: boolean
	createdAt: string
}
