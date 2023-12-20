import Container from '@/components/ui/template-elements/container/Container'
import { FC } from 'react'
import styles from './Header.module.scss'
import Logo from './logo/Logo'
import Menu from './menu/Menu'
import { MENU } from './menu/data/menu.data'
import ProfileBtn from './profile/ProfileBtn'
import Search from './search/Search'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.left}>
						<Logo />
						<Menu menu={MENU} />
					</div>
					<div className={styles.right}>
						<Search />
						<ProfileBtn />
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header
