import { FC } from 'react'
import styles from './ManageNavigation.module.scss'
import { manageNavItems } from './data/manage-navigation.data'
import ManageNavigationItem from './item/ManageNavigationItem'

const ManageNavigation: FC = () => {
	return (
		<nav className={styles.navigation}>
			<ul className={styles.list}>
				{manageNavItems.map((item) => (
					<ManageNavigationItem key={item.link} item={item} />
				))}
			</ul>
		</nav>
	)
}

export default ManageNavigation
