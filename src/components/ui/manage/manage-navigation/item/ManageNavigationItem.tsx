'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import styles from '../ManageNavigation.module.scss'
import { IManageNavItem } from '../interface/manage-navigation.interface'

const ManageNavigationItem: FC<{ item: IManageNavItem }> = ({
	item: { title, link },
}) => {
	const pathname = usePathname()

	return (
		<li className={styles.item}>
			<Link
				className={cn(styles.link, {
					[styles.active]: pathname === link,
				})}
				href={link}
			>
				{title}
			</Link>
		</li>
	)
}

export default ManageNavigationItem
