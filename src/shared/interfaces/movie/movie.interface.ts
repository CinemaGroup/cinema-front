import { ISource } from '../source/source.interface'

export interface IMovie {
	id: number,
	trailers: ISource[],
	videos: ISource[],
	duration: number,
	releaseDate: string,
	createdAt: boolean,
}