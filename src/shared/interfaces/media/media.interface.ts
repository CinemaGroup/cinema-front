import { IAffiliation } from '../affiliation/affiliation.interface'
import { IMovie } from '../movie/movie.interface'
import { IPerson } from '../person/person.interface'
import { ISeason } from '../season/season.interface'

export interface IMedia {
	id: number,
	name: string,
	slug: string,
	excerpt: string,
	description: string,
	poster: string,
	bigPoster: string,
	movie: IMovie,
	seasons: ISeason[],
	genres: IAffiliation[],
	groups: IAffiliation[],
	actors: IPerson[],
	directors: IPerson[],
	producers: IPerson[],
	operators: IPerson[],
	scenarists: IPerson[],
	year: number,
	age: number,
	countries: string[],
	averageRating: number,
	totalViews: number,
	totalLikes: number,
	isMovie: boolean,
	isSeries: boolean,
	isVisible: boolean,
	createdAt: string,
}

export interface IFilteredMedia {
	media: IMedia[]
	length: number
}