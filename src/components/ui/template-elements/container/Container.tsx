import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'
import styles from './Container.module.scss'
import { IContainer } from './interface/container.interface'

const Container: FC<PropsWithChildren<IContainer>> = ({
	children,
	className,
}) => {
	return (
		<div className={cn(styles.container, className && className)}>
			{children}
		</div>
	)
}

export default Container
