import { FC } from 'react'
import styles from './ManageFilters.module.scss'
import ManageSort from './sort/ManageSort'
import ManageVisibility from './visibility/ManageVisibility'

const ManageFilters: FC = () => {
	return (
		<div className={styles.wrapper}>
			<ManageSort />
			<ManageVisibility />
		</div>
	)
}

export default ManageFilters
