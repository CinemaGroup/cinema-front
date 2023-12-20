import Icon from '@/components/ui/icon/Icon'
import { FC } from 'react'
import styles from '../Search.module.scss'

const SearchBtn: FC = () => {
	return (
		<button className={styles.open}>
			<Icon name="Search" />
		</button>
	)
}

export default SearchBtn
