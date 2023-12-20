'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import styles from '../Menu.module.scss'
import { IMenuItem } from '../interface/menu.interface'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const pathname = usePathname()

	return (
		<li
			className={cn(styles.item, {
				[styles.current]: pathname === item.link,
			})}
		>
			<Link className={styles.link} href={item.link}>
				{item.title}
			</Link>
		</li>
	)
}

export default MenuItem
