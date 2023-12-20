import { TypeSourceInput } from '../source/types/source.type'

export type TypeMovieViewsInput = {
	mediaSlug: string
}

export type TypeMediaInput = {
	name: string
	excerpt: string
	description: string
	poster: string
	bigPoster: string
	year: number
	age: number
	countries: string[]
	genres: number[]
	actors: number[]
	directors: number[]
	producers: number[]
	operators: number[]
	scenarists: number[]
	groups: number[]
}

export type TypeMovieInput = {
	duration: number
	releaseDate?: string
	trailers: TypeSourceInput[]
	videos: TypeSourceInput[]
}

export type TypeMediaMovieInput = TypeMediaInput & {
	movie: TypeMovieInput
}