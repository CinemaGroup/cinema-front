import { IMedia } from '../media/media.interface'

export interface IPerson {
	id: number
	name: string
	slug: string
	photo: string
	isVisible: boolean
	createdAt: string
}

export interface IFullestPerson extends IPerson {
	media: IMedia
}

export interface IFilteredPersons {
	persons: IPerson[]
	length: number
}
