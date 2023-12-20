'use client'

import '@/assets/styles/react-select.scss'
import cn from 'classnames'
import { FC } from 'react'
import Select, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import styles from './ReactSelect.module.scss'
import { IOption, IReactSelect } from './interface/react-select.interface'

const animatedComponents = makeAnimated()

const ReactSelect: FC<IReactSelect> = ({
	placeholder,
	label,
	error,
	isMulti,
	isSearchable = true,
	isCreatable = false,
	options,
	field,
	isLoading,
	className,
}) => {
	const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
		console.log(newValue)
		if (!newValue) return field.onChange(isMulti ? [] : '')
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value)
		} else {
			return isMulti ? [] : ''
		}
	}

	return (
		<div className={cn(styles.selectContainer, className && className)}>
			{label && <label className={styles.label}>{label}</label>}
			{error && <p className={styles.error}>{error.message}</p>}
			{isCreatable ? (
				<CreatableSelect
					classNamePrefix={`react-select`}
					value={getValue()}
					options={options}
					isMulti={isMulti}
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
					placeholder={placeholder || ''}
					menuPortalTarget={document.body}
					menuPosition={'fixed'}
				/>
			) : (
				<Select
					classNamePrefix={`react-select`}
					options={options}
					value={getValue()}
					isMulti={isMulti}
					isSearchable={isSearchable}
					isClearable
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
					placeholder={placeholder || ''}
					menuPortalTarget={document.body}
					menuPosition={'fixed'}
				/>
			)}
		</div>
	)
}

export default ReactSelect
