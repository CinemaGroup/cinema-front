import { FC } from 'react'
import SearchField from '../../form-elements/search-field/SearchField'
import styles from './ManageHeader.module.scss'
import ManageCreateButton from './create-button/ManageCreateButton'
import { IManageHeader } from './interface/manage-header.interface'

const ManageHeader: FC<IManageHeader> = ({
	searchTerm,
	handleSearch,
	onClick,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} variant='custom' className={styles.search} />
			{onClick && <ManageCreateButton onClick={onClick} />}
		</div>
	)
}

export default ManageHeader
