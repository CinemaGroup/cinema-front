import { ISource } from '../source/source.interface'

export interface IEpisode {
	id: number
	number: number
	excerpt: string
	description: string
	poster: string
	bigPoster: string
	duration: number
	trailers: ISource[]
	videos: ISource[]
	rating: number
	views: number
	likes: number
	releaseDate?: string
	isVisible: boolean
	createdAt: string
}

export interface IFilteredEpisodes {
	episodes: IEpisode[]
	length: number
}