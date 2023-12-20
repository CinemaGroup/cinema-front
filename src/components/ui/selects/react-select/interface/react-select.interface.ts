import { IFieldProps } from '@/components/ui/form-elements/field/interface/field.interface'
import { ControllerRenderProps } from 'react-hook-form'
import { Options } from 'react-select'

export interface IOption {
	label: string
	value: string | number
}

export interface IReactSelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	isSearchable?: boolean
	isCreatable?: boolean
}
