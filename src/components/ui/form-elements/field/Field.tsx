'use client'

import cn from 'classnames'
import { forwardRef, useState } from 'react'
import Icon from '../../icon/Icon'
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
		const [showPassword, setShowPassword] = useState(false)

		const toggleShowPassword = () => {
			setShowPassword(!showPassword)
		}

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
				{type === 'password' ? (
					<div className={styles.password} tabIndex={1}>
						<input
							ref={ref}
							type={showPassword ? 'text' : type}
							{...rest}
							placeholder={placeholder}
						/>
						<button
							type="button"
							className={styles.showPassword}
							onMouseDown={toggleShowPassword}
							onMouseUp={toggleShowPassword}
						>
							<Icon name={showPassword ? 'EyeOff' : 'Eye'} size={22} />
						</button>
					</div>
				) : (
					<input ref={ref} type={type} {...rest} placeholder={placeholder} />
				)}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
