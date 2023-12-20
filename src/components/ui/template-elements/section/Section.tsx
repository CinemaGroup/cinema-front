import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'
import styles from './Section.module.scss'
import { ISection } from './interface/section.interface'

const Section: FC<PropsWithChildren<ISection>> = ({ children, className }) => {
	return (
		<div className={cn(styles.container, className && className)}>
			{children}
		</div>
	)
}

export default Section
