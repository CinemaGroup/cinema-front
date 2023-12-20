import { FC } from 'react'
import styles from '../ManageTable.module.scss'
import ManageTableActions from '../actions/ManageTableActions'
import { IManageTableItem } from '../interface/manage-table.interface'

const ManageTableItem: FC<IManageTableItem> = ({ item, removeHandler, toggleHandler }) => {
	return (
		<div className={styles.item}>
			{item.data.map((value, index) => (
				<div className={styles.value} key={index}>
					{value}
				</div>
			))}
			<ManageTableActions
				isVisible={item.isVisible}
				editUrl={item.editUrl}
				seasonUrl={item.seasonUrl}
				episodeUrl={item.episodeUrl}
				toggleHandler={toggleHandler}
				removeHandler={removeHandler}
			/>
		</div>
	)
}

export default ManageTableItem
