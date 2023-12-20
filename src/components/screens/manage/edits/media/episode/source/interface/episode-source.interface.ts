import { TypeEpisodeInput } from '@/services/media/episode/types/episode.type'
import { Control } from 'react-hook-form'

export interface IManageEpisodeSourceEdit {
	control: Control<TypeEpisodeInput, any>
	variant: 'trailers' | 'videos'
}

export interface IManageEpisodeSourceItemsEdit
	extends IManageEpisodeSourceEdit {
	sourceIndex: number
}
