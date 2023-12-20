import { IEpisode } from '../episode/episode.interface'

export interface ISeason {
	id: number
	number: number
	episodes: IEpisode[]
	isVisible: boolean
	createdAt: string
}

export interface IFilteredSeasons {
	seasons: ISeason[]
	length: number
}