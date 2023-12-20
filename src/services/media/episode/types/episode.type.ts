import { TypeSourceInput } from '../../source/types/source.type'

export type TypeEpisodeInput = {
	number: number
	excerpt: string
	description: string
	poster: string
	bigPoster: string
	duration: number
	trailers: TypeSourceInput[]
	videos: TypeSourceInput[]
	releaseDate?: string
}
