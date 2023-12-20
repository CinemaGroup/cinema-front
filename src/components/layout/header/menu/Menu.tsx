import { FC } from 'react'
import styles from './Menu.module.scss'
import { IMenu } from './interface/menu.interface'
import MenuItem from './item/MenuItem'

const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.menu}>
				{items.map((item) => (
					<MenuItem item={item} key={item.link} />
				))}
			</ul>
		</nav>
	)
}

export default Menu
