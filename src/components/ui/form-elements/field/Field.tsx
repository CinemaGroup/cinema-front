import cn from 'classnames'
import { forwardRef } from 'react'
import styles from '../FormElements.module.scss'
import { IField } from './interface/field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{
			label,
			className,
			placeholder,
			error,
			variant = 'default',
			type = 'text',
			style,
			...rest
		},
		ref
	) => {
		return (
			<div
				className={cn(
					{
						[styles.field]: variant === 'default',
					},
					className && className
				)}
			>
				{label && <label>{label}</label>}
				{error && <p className={styles.error}>{error.message}</p>}
				<input ref={ref} type={type} {...rest} placeholder={placeholder} />
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
