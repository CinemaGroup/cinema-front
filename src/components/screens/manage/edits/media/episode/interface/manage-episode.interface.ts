import { TypeEpisodeInput } from '@/services/media/episode/types/episode.type'
import { Control } from 'react-hook-form'

export interface IManageEpisodeGeneral {
	control: Control<TypeEpisodeInput, any>
}

export interface IManageEpisodeSelects extends IManageEpisodeGeneral {
	selectClassName?: string
}

export interface IManageEpisodeSelects extends IManageEpisodeGeneral {
	selectClassName?: string
}

export interface IManageEpisodeFields extends IManageEpisodeGeneral {
	fieldClassName: string
	editorClassName: string
	uploadClassName: string
}
