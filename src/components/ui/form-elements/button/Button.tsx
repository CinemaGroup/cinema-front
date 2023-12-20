import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'
import styles from '../FormElements.module.scss'
import { IButton } from './interface/button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button className={cn(styles.button, className && className)} {...rest}>
			{children}
		</button>
	)
}

export default Button
