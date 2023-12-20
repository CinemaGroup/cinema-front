import { TypeMediaInput } from '@/services/media/types/media.type'
import { Control } from 'react-hook-form'

export interface IManageSeriesGeneral {
	control: Control<TypeMediaInput, any>
}

export interface IManageSeriesSelects extends IManageSeriesGeneral {
	selectClassName?: string
}

export interface IManageSeriesSelects extends IManageSeriesGeneral {
	selectClassName?: string
}

export interface IManageSeriesFields extends IManageSeriesGeneral {
	fieldClassName: string
	editorClassName: string
	uploadClassName: string
}
