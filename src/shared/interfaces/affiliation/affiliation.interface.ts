import { IMedia } from '../media/media.interface'

export interface IAffiliation {
	id: number
	name: string
	slug: string
	description: string
	icon: string
	isVisible: boolean
	createdAt: string
}

export interface IFullestAffiliation extends IAffiliation {
	media: IMedia
}

export interface IFilteredAffiliations {
	affiliations: IAffiliation[]
	length: number
}
