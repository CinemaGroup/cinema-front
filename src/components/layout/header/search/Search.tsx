import { FC } from 'react'
import styles from './Search.module.scss'
import SearchBox from './search-box/SearchBox'
import SearchBtn from './search-btn/SearchBtn'

const Search: FC = () => {
	return (
		<div className={styles.wrapper}>
			<SearchBtn />
			<SearchBox />
		</div>
	)
}

export default Search
