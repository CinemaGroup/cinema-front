import { TypeMediaMovieInput } from '@/services/media/types/media.type'
import { Control } from 'react-hook-form'

export interface IManageMovieGeneral {
	control: Control<TypeMediaMovieInput, any>
}

export interface IManageMovieSelects extends IManageMovieGeneral {
	selectClassName?: string
}

export interface IManageMovieSelects extends IManageMovieGeneral {
	selectClassName?: string
}

export interface IManageMovieFields extends IManageMovieGeneral {
	mediaFieldClassName: string
	movieFieldClassName: string
	editorClassName: string
	uploadClassName: string
}
