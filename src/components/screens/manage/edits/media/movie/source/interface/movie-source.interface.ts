import { TypeMediaMovieInput } from '@/services/media/types/media.type'
import { Control } from 'react-hook-form'

export interface IManageMovieSourceEdit {
	control: Control<TypeMediaMovieInput, any>
	variant: 'trailers' | 'videos'
}

export interface IManageMovieSourceItemsEdit extends IManageMovieSourceEdit {
	sourceIndex: number
}
